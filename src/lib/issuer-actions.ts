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
  await db.offering.update({ where: { id }, data: { status: "PENDING_REVIEW" } });
  revalidatePath(`/issuer/offerings/${id}`);
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
