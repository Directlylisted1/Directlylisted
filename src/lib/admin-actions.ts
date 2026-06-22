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
