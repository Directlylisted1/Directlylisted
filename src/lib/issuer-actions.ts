"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { getCurrentUser } from "./session";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function createOffering(formData: FormData) {
  const user = await getCurrentUser();
  if (!user?.issuerProfile) redirect("/signin");

  const name = String(formData.get("name") ?? "").trim();
  let slug = slugify(name);
  if (await db.offering.findUnique({ where: { slug } })) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const offering = await db.offering.create({
    data: {
      issuerId: user.issuerProfile.id,
      name,
      slug,
      type: String(formData.get("type")) as never,
      tagline: String(formData.get("tagline") ?? "") || null,
      industry: String(formData.get("industry") ?? "") || null,
      description: String(formData.get("description") ?? "") || null,
      targetAmount: Number(formData.get("targetAmount") ?? 0),
      pricePerUnit: Number(formData.get("pricePerUnit") ?? 0),
      minInvestment: Number(formData.get("minInvestment") ?? 0),
      exemptionNote: String(formData.get("exemptionNote") ?? "") || null,
      status: "DRAFT",
    },
  });
  redirect(`/issuer/offerings/${offering.id}`);
}

export async function submitForReview(formData: FormData) {
  const user = await getCurrentUser();
  if (!user?.issuerProfile) redirect("/signin");
  const id = String(formData.get("offeringId"));
  const offering = await db.offering.findUnique({ where: { id } });
  if (!offering || offering.issuerId !== user.issuerProfile.id) redirect("/issuer");

  // A campaign can't go live until the issuer has connected their own Braintree
  // merchant account — funds must settle directly to the issuer.
  const p = user.issuerProfile;
  const braintreeConnected = Boolean(
    p.braintreeMerchantId && p.braintreePublicKey && p.braintreePrivateKey,
  );
  if (!braintreeConnected) {
    redirect(`/issuer/offerings/${id}?error=braintree`);
  }

  await db.offering.update({ where: { id }, data: { status: "PENDING_REVIEW" } });
  revalidatePath(`/issuer/offerings/${id}`);
}

/**
 * Issuer records (or rotates) their own group-level Braintree credentials.
 * Funds on this issuer's offerings settle directly into this merchant account.
 * The private key is sensitive — only overwritten when a new value is supplied,
 * so saving other fields doesn't wipe a stored secret.
 */
export async function saveIssuerBraintree(formData: FormData) {
  const user = await getCurrentUser();
  if (!user?.issuerProfile) redirect("/signin");

  const merchantId = String(formData.get("merchantId") ?? "").trim() || null;
  const publicKey = String(formData.get("publicKey") ?? "").trim() || null;
  const privateKeyInput = String(formData.get("privateKey") ?? "").trim();
  const environment = String(formData.get("environment") ?? "sandbox") === "production"
    ? "production"
    : "sandbox";

  await db.issuerProfile.update({
    where: { id: user.issuerProfile.id },
    data: {
      braintreeMerchantId: merchantId,
      braintreePublicKey: publicKey,
      braintreeEnvironment: environment,
      // Keep the existing private key when the field is left blank.
      ...(privateKeyInput ? { braintreePrivateKey: privateKeyInput } : {}),
    },
  });
  revalidatePath("/issuer/account");
  redirect("/issuer/account?saved=braintree");
}

export async function acceptQuotation(formData: FormData) {
  const user = await getCurrentUser();
  if (!user?.issuerProfile) redirect("/signin");
  const id = String(formData.get("quotationId"));
  const quote = await db.quotation.findUnique({ where: { id } });
  if (!quote || quote.issuerId !== user.issuerProfile.id || quote.status !== "SENT") {
    redirect("/issuer");
  }
  await db.quotation.update({
    where: { id },
    data: { status: "ACCEPTED", acceptedAt: new Date() },
  });
  revalidatePath("/issuer");
}
