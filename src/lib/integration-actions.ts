"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { getCurrentUser } from "./session";
import { getAgreementStatus } from "./adobe-sign";

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
