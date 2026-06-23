"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { getCurrentUser } from "./session";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/signin?next=/admin");
  return user;
}

export async function setOfferingStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("offeringId"));
  const status = String(formData.get("status")) as
    | "DRAFT" | "PENDING_REVIEW" | "LIVE" | "CLOSED" | "WITHDRAWN";
  await db.offering.update({ where: { id }, data: { status } });
  revalidatePath("/admin/offerings");
}

/** Toggle an offering as a homepage flagship and set its display rank (1–3). */
export async function setOfferingFeatured(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("offeringId"));
  const featured = String(formData.get("featured") ?? "") === "on";
  const featuredRank = Number(formData.get("featuredRank") ?? 0) || 0;
  await db.offering.update({ where: { id }, data: { featured, featuredRank } });
  revalidatePath("/admin/offerings");
  revalidatePath("/");
}

/** Archive / unarchive an offering (hidden from public + homepage, kept in admin). */
export async function setOfferingArchived(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("offeringId"));
  const archive = String(formData.get("archive") ?? "") === "1";
  await db.offering.update({
    where: { id },
    data: { archivedAt: archive ? new Date() : null, ...(archive ? { featured: false } : {}) },
  });
  revalidatePath("/admin/offerings");
  revalidatePath("/");
}

/** Permanently delete an offering and all its dependent records (cascades). */
export async function deleteOffering(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("offeringId"));
  await db.offering.delete({ where: { id } }).catch((e) => {
    console.error("[deleteOffering]", e instanceof Error ? e.message : e);
  });
  revalidatePath("/admin/offerings");
  revalidatePath("/");
}

/** Archive / unarchive a user (archived users can't sign in). */
export async function setUserArchived(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("userId"));
  const archive = String(formData.get("archive") ?? "") === "1";
  if (id === admin.id) return; // never archive yourself
  await db.user.update({ where: { id }, data: { archivedAt: archive ? new Date() : null } });
  revalidatePath("/admin/users");
}

/** Permanently delete a user (investor or issuer) and their dependent records. */
export async function deleteUser(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("userId"));
  if (id === admin.id) return; // never delete yourself
  await db.user.delete({ where: { id } }).catch((e) => {
    console.error("[deleteUser]", e instanceof Error ? e.message : e);
  });
  revalidatePath("/admin/users");
  revalidatePath("/admin/offerings");
}

export async function sendQuotation(formData: FormData) {
  await requireAdmin();
  const offeringId = String(formData.get("offeringId"));
  const flatFeeUsd = Number(formData.get("flatFeeUsd"));
  const equityGrantPct = Number(formData.get("equityGrantPct"));
  const notes = String(formData.get("notes") ?? "") || null;

  const offering = await db.offering.findUniqueOrThrow({ where: { id: offeringId } });
  await db.quotation.upsert({
    where: { offeringId },
    update: { flatFeeUsd, equityGrantPct, notes, status: "SENT", sentAt: new Date() },
    create: {
      offeringId,
      issuerId: offering.issuerId,
      flatFeeUsd,
      equityGrantPct,
      notes,
      status: "SENT",
      sentAt: new Date(),
    },
  });
  revalidatePath("/admin/offerings");
  redirect("/admin/offerings");
}

/** Reconcile an incoming wire/ACH: mark funds received and update the raise. */
export async function confirmFundsReceived(formData: FormData) {
  await requireAdmin();
  const investmentId = String(formData.get("investmentId"));
  const investment = await db.investment.findUniqueOrThrow({
    where: { id: investmentId },
    include: { payment: true },
  });
  if (!investment.payment || investment.payment.status === "SETTLED") return;

  await db.$transaction([
    db.payment.update({
      where: { investmentId },
      data: { status: "SETTLED", receivedAt: new Date() },
    }),
    db.investment.update({
      where: { id: investmentId },
      data: { status: "FUNDS_RECEIVED" },
    }),
    db.offering.update({
      where: { id: investment.offeringId },
      data: {
        raisedAmount: { increment: investment.amount },
        investorCount: { increment: 1 },
      },
    }),
  ]);
  revalidatePath("/admin/investments");
}

export async function countersignInvestment(formData: FormData) {
  await requireAdmin();
  const investmentId = String(formData.get("investmentId"));
  await db.investment.update({
    where: { id: investmentId },
    data: { status: "COMPLETED" },
  });
  revalidatePath("/admin/investments");
}

export async function setLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("leadId"));
  const status = String(formData.get("status"));
  await db.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

/**
 * Admin assigns (or clears) an issuer's isolated Adobe Sign group id. Agreements
 * for that issuer's offerings are then created inside their branded group.
 */
export async function setIssuerAdobeGroup(formData: FormData) {
  await requireAdmin();
  const issuerId = String(formData.get("issuerId"));
  const adobeGroupId = String(formData.get("adobeGroupId") ?? "").trim() || null;
  await db.issuerProfile.update({ where: { id: issuerId }, data: { adobeGroupId } });
  revalidatePath("/admin/integrations");
}

export async function setAccreditation(formData: FormData) {
  await requireAdmin();
  const profileId = String(formData.get("profileId"));
  const status = String(formData.get("status")) as "VERIFIED" | "REJECTED";
  await db.investorProfile.update({
    where: { id: profileId },
    data: { accreditationStatus: status, verifiedAt: status === "VERIFIED" ? new Date() : null },
  });
  revalidatePath("/admin/users");
}
