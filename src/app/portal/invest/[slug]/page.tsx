import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { startInvestment } from "@/lib/invest-actions";
import { CARD_LIMIT_USD } from "@/lib/payments";
import { productByType } from "@/lib/offering-types";

export default async function InvestPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { slug } = await params;
  const { error } = await searchParams;
  const offering = await db.offering.findUnique({ where: { slug } });
  if (!offering || offering.status !== "LIVE") notFound();

  const user = (await getCurrentUser())!;
  const profile = user.investorProfile!;

  // Reg D offerings require an accredited-investor certification first.
  const needsAccreditation =
    ["REG_D_506B", "REG_D_506C"].includes(offering.type) &&
    profile.accreditationStatus === "NOT_STARTED";
  if (needsAccreditation) {
    redirect(`/portal/accreditation?next=/portal/invest/${slug}`);
  }

  return (
    <div className="mx-auto max-w-xl">
      <Link href={`/offerings/${slug}`} className="text-sm text-brand-600">
        ← Back to offering
      </Link>
      <div className="card mt-4 !p-8">
        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-600">
          {productByType(offering.type).label}
        </div>
        <h2 className="mb-6 text-2xl font-bold">Invest in {offering.name}</h2>
        <form action={startInvestment} className="space-y-5">
          <input type="hidden" name="slug" value={slug} />
          <div>
            <label htmlFor="inv-amount" className="label">Investment Amount (USD)</label>
            <input
              id="inv-amount"
              name="amount"
              type="number"
              min={offering.minInvestment}
              max={offering.maxInvestment ?? undefined}
              step="0.01"
              required
              className="input text-lg font-semibold"
              placeholder={offering.minInvestment.toLocaleString()}
            />
            <p className="mt-2 text-xs text-navy-900/70">
              Minimum ${offering.minInvestment.toLocaleString()}
              {offering.pricePerUnit > 0 &&
                ` · $${offering.pricePerUnit.toFixed(2)} per ${offering.unitName}`}
            </p>
          </div>
          {error === "min" && (
            <p role="alert" className="text-sm text-red-600">Amount is below the offering minimum.</p>
          )}
          {error === "max" && (
            <p role="alert" className="text-sm text-red-600">Amount exceeds the offering maximum.</p>
          )}
          <div className="rounded-xl bg-brand-50 p-4 text-xs leading-relaxed text-navy-900/70">
            Funds are handled directly from you to the issuer — pay by card for
            amounts under ${CARD_LIMIT_USD.toLocaleString()}, or by ACH or wire
            transfer straight to the issuer&apos;s bank account for $
            {CARD_LIMIT_USD.toLocaleString()} or more. You&apos;ll sign your
            subscription agreement electronically via Adobe Acrobat Sign before
            payment.
          </div>
          <button className="btn-primary w-full">Continue</button>
        </form>
      </div>
    </div>
  );
}
