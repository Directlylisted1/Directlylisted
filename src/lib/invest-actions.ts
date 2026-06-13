"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { getCurrentUser } from "./session";
import { sendAgreement } from "./adobe-sign";
import { allowedPaymentMethods, chargeCard, isBraintreeConfigured } from "./payments";

export async function startInvestment(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== "INVESTOR") redirect("/signin");

  const slug = String(formData.get("slug"));
  const amount = Number(formData.get("amount"));
  const offering = await db.offering.findUnique({ where: { slug } });
  if (!offering || offering.status !== "LIVE") redirect("/offerings");
  if (!amount || amount < offering.minInvestment) {
    redirect(`/portal/invest/${slug}?error=min`);
  }
  if (offering.maxInvestment && amount > offering.maxInvestment) {
    redirect(`/portal/invest/${slug}?error=max`);
  }

  const investment = await db.investment.create({
    data: {
      offeringId: offering.id,
      investorId: user.id,
      amount,
      units: offering.pricePerUnit > 0 ? amount / offering.pricePerUnit : 0,
    },
  });
  redirect(`/portal/investments/${investment.id}`);
}

export async function updateAccreditation(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || !user.investorProfile) redirect("/signin");

  const basis = String(formData.get("basis") ?? "");
  const isAccredited = basis !== "none";
  await db.investorProfile.update({
    where: { userId: user.id },
    data: {
      accreditationBasis: isAccredited ? basis : null,
      accreditationStatus: isAccredited ? "SELF_CERTIFIED" : "NOT_STARTED",
      state: String(formData.get("state") ?? "") || null,
      country: String(formData.get("country") ?? "US"),
    },
  });
  const next = String(formData.get("next") ?? "");
  redirect(next || "/portal");
}

export async function sendInvestmentDocs(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");
  const id = String(formData.get("investmentId"));
  const investment = await db.investment.findUnique({
    where: { id },
    include: { offering: true, agreement: true },
  });
  if (!investment || investment.investorId !== user.id) redirect("/portal");
  if (investment.agreement) redirect(`/portal/investments/${id}`);

  const result = await sendAgreement({
    name: `${investment.offering.name} — Subscription Agreement`,
    signerEmail: user.email,
    signerName: `${user.firstName} ${user.lastName}`,
    libraryDocumentId: investment.offering.acrobatTemplateId,
  });

  await db.$transaction([
    db.agreement.create({
      data: {
        investmentId: id,
        acrobatAgreementId: result.agreementId,
        name: `${investment.offering.name} — Subscription Agreement`,
        status: "OUT_FOR_SIGNATURE",
        signingUrl: result.signingUrl,
      },
    }),
    db.investment.update({ where: { id }, data: { status: "DOCS_SENT" } }),
  ]);
  revalidatePath(`/portal/investments/${id}`);
  redirect(`/portal/investments/${id}`);
}

/** Marks docs signed. In production this is driven by an Acrobat Sign webhook;
 * in simulation mode the investor confirms after signing. */
export async function confirmDocsSigned(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");
  const id = String(formData.get("investmentId"));
  const investment = await db.investment.findUnique({
    where: { id },
    include: { agreement: true },
  });
  if (!investment || investment.investorId !== user.id || !investment.agreement) {
    redirect("/portal");
  }
  await db.$transaction([
    db.agreement.update({
      where: { investmentId: id },
      data: { status: "SIGNED", signedAt: new Date() },
    }),
    db.investment.update({ where: { id }, data: { status: "DOCS_SIGNED" } }),
  ]);
  revalidatePath(`/portal/investments/${id}`);
  redirect(`/portal/investments/${id}`);
}

export async function payByCard(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");
  const id = String(formData.get("investmentId"));
  const nonce = String(formData.get("nonce") ?? "");
  const investment = await db.investment.findUnique({ where: { id } });
  if (!investment || investment.investorId !== user.id) redirect("/portal");
  if (!allowedPaymentMethods(investment.amount).includes("CARD")) {
    return { error: "This amount must be funded by wire or ACH." };
  }

  let txnId = "simulated";
  if (isBraintreeConfigured()) {
    const result = await chargeCard({ amount: investment.amount, nonce, investmentId: id });
    if (!result.ok) return { error: result.error };
    txnId = result.txnId;
  }

  await db.$transaction([
    db.payment.upsert({
      where: { investmentId: id },
      update: { status: "SETTLED", braintreeTxnId: txnId, receivedAt: new Date() },
      create: {
        investmentId: id,
        method: "CARD",
        status: "SETTLED",
        amount: investment.amount,
        braintreeTxnId: txnId,
        receivedAt: new Date(),
      },
    }),
    db.investment.update({
      where: { id },
      data: { status: "FUNDS_RECEIVED", paymentMethod: "CARD" },
    }),
    db.offering.update({
      where: { id: investment.offeringId },
      data: {
        raisedAmount: { increment: investment.amount },
        investorCount: { increment: 1 },
      },
    }),
  ]);
  revalidatePath(`/portal/investments/${id}`);
  redirect(`/portal/investments/${id}`);
}

export async function chooseBankTransfer(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");
  const id = String(formData.get("investmentId"));
  const method = String(formData.get("method")) === "ACH" ? "ACH" : "WIRE";
  const investment = await db.investment.findUnique({ where: { id } });
  if (!investment || investment.investorId !== user.id) redirect("/portal");

  const wireReference = `DL-${id.slice(-8).toUpperCase()}`;
  await db.$transaction([
    db.payment.upsert({
      where: { investmentId: id },
      update: { method, wireReference },
      create: {
        investmentId: id,
        method,
        status: "PENDING",
        amount: investment.amount,
        wireReference,
      },
    }),
    db.investment.update({
      where: { id },
      data: { status: "PAYMENT_PENDING", paymentMethod: method },
    }),
  ]);
  revalidatePath(`/portal/investments/${id}`);
  redirect(`/portal/investments/${id}`);
}
