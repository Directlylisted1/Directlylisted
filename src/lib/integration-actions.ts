"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { getCurrentUser } from "./session";
import { getAgreementStatus } from "./adobe-sign";
import { SMTP_KEYS, sendTestEmail } from "./mailer";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/signin?next=/admin/integrations");
  return user;
}

/** Save (or rotate) the Adobe Acrobat Sign / Enterprise API connection. */
export async function saveAdobeConfig(formData: FormData) {
  await requireAdmin();
  const baseUrl = String(formData.get("baseUrl") ?? "").trim();
  const key = String(formData.get("integrationKey") ?? "").trim();
  const mode = String(formData.get("mode") ?? "teams") === "enterprise" ? "enterprise" : "teams";

  const upsert = (k: string, v: string) =>
    db.siteSetting.upsert({ where: { key: k }, update: { value: v }, create: { key: k, value: v } });

  if (baseUrl) await upsert("adobe_sign_base_url", baseUrl);
  // Only overwrite the key when a new value is supplied (keeps it on blank submit).
  if (key) await upsert("adobe_sign_integration_key", key);
  await upsert("adobe_sign_mode", mode);

  revalidatePath("/admin/integrations");
  redirect("/admin/integrations?saved=1");
}

/** Disconnect Adobe Sign (back to simulation / env fallback). */
export async function disconnectAdobe() {
  await requireAdmin();
  await db.siteSetting.deleteMany({
    where: { key: { in: ["adobe_sign_base_url", "adobe_sign_integration_key", "adobe_sign_mode"] } },
  });
  revalidatePath("/admin/integrations");
}

/**
 * Save (or rotate) the outgoing email (SMTP) connection — e.g. a GoDaddy /
 * Microsoft 365 mailbox. Credentials live in the database, entered here by an
 * admin; the password is never stored in source code. The password is only
 * overwritten when a new value is supplied, so other edits don't wipe it.
 */
export async function saveSmtpConfig(formData: FormData) {
  await requireAdmin();
  const upsert = (k: string, v: string) =>
    db.siteSetting.upsert({ where: { key: k }, update: { value: v }, create: { key: k, value: v } });

  const host = String(formData.get("smtp_host") ?? "").trim();
  const port = String(formData.get("smtp_port") ?? "").trim();
  const secure = String(formData.get("smtp_secure") ?? "") === "true" ? "true" : "false";
  const user = String(formData.get("smtp_user") ?? "").trim();
  const pass = String(formData.get("smtp_pass") ?? "").trim();
  const from = String(formData.get("mail_from") ?? "").trim();
  const notify = String(formData.get("notify_email") ?? "").trim();

  if (host) await upsert("smtp_host", host);
  if (port) await upsert("smtp_port", port);
  await upsert("smtp_secure", secure);
  if (user) await upsert("smtp_user", user);
  if (pass) await upsert("smtp_pass", pass); // only overwrite when provided
  if (from) await upsert("mail_from", from);
  if (notify) await upsert("notify_email", notify);

  revalidatePath("/admin/integrations");
  redirect("/admin/integrations?saved=smtp");
}

/** Disconnect SMTP (back to env fallback / no-send). Keeps notify_email. */
export async function disconnectSmtp() {
  await requireAdmin();
  await db.siteSetting.deleteMany({
    where: { key: { in: SMTP_KEYS.filter((k) => k !== "notify_email") } },
  });
  revalidatePath("/admin/integrations");
}

/** Send a real test email to the configured notify address. */
export async function sendSmtpTest() {
  await requireAdmin();
  const result = await sendTestEmail();
  revalidatePath("/admin/integrations");
  if (result.sent) {
    redirect(`/admin/integrations?test=ok&to=${encodeURIComponent(result.to)}`);
  }
  redirect(`/admin/integrations?test=fail&msg=${encodeURIComponent(result.error ?? "send failed")}`);
}

/** Pull the latest status of one agreement from Acrobat Sign and store it. */
export async function refreshAgreement(formData: FormData) {
  await requireAdmin();
  const agreementId = String(formData.get("agreementId"));
  const agreement = await db.agreement.findUnique({ where: { id: agreementId } });
  if (!agreement?.acrobatAgreementId) return;

  try {
    const status = await getAgreementStatus(agreement.acrobatAgreementId);
    const signed = ["SIGNED", "APPROVED", "COMPLETED"].includes(status.toUpperCase());
    await db.agreement.update({
      where: { id: agreementId },
      data: {
        status: signed ? "SIGNED" : "OUT_FOR_SIGNATURE",
        signedAt: signed ? (agreement.signedAt ?? new Date()) : agreement.signedAt,
      },
    });
    if (signed) {
      await db.investment.update({
        where: { id: agreement.investmentId },
        data: { status: "DOCS_SIGNED" },
      }).catch(() => {});
    }
  } catch {
    // Leave status unchanged on API error.
  }
  revalidatePath("/admin/integrations");
}
