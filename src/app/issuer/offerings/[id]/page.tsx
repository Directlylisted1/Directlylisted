import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { StatusBadge } from "@/components/AppShell";
import { fmtMoney, productByType } from "@/lib/offering-types";
import { submitForReview } from "@/lib/issuer-actions";

export default async function IssuerOfferingDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const user = (await getCurrentUser())!;
  const offering = await db.offering.findUnique({
    where: { id },
    include: {
      quotation: true,
      investments: {
        include: { investor: true, payment: true, agreement: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!offering || offering.issuerId !== user.issuerProfile!.id) notFound();

  const funded = offering.investments.filter((i) =>
    ["FUNDS_RECEIVED", "COUNTERSIGNED", "COMPLETED"].includes(i.status),
  );

  return (
    <div className="space-y-8">
      {error === "braintree" && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <span>
            <strong>Connect your payment account first.</strong> You must record
            your merchant credentials before submitting a campaign for review so
            investor funds settle directly into your account.
          </span>
          <Link href="/issuer/account" className="btn-dark !py-2 text-xs">
            Connect Payments
          </Link>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/issuer" className="text-sm text-brand-600">← All offerings</Link>
          <h2 className="text-2xl font-bold">{offering.name}</h2>
          <div className="text-sm text-navy-900/60">
            {productByType(offering.type).label}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge value={offering.status} />
          <Link href={`/issuer/offerings/${offering.id}/media`} className="btn-outline !py-2 text-xs">
            Campaign Media
          </Link>
          {offering.status === "DRAFT" && (
            <form action={submitForReview}>
              <input type="hidden" name="offeringId" value={offering.id} />
              <button className="btn-primary !py-2 text-xs">Submit for Review</button>
            </form>
          )}
          {offering.status === "LIVE" && (
            <Link href={`/offerings/${offering.slug}`} className="btn-outline !py-2 text-xs">
              View Public Page
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-4">
        <div className="card">
          <div className="text-xs uppercase tracking-wide text-navy-900/70">Raised</div>
          <div className="text-2xl font-bold">{fmtMoney(offering.raisedAmount)}</div>
        </div>
        <div className="card">
          <div className="text-xs uppercase tracking-wide text-navy-900/70">Target</div>
          <div className="text-2xl font-bold">{fmtMoney(offering.targetAmount)}</div>
        </div>
        <div className="card">
          <div className="text-xs uppercase tracking-wide text-navy-900/70">Subscriptions</div>
          <div className="text-2xl font-bold">{offering.investments.length}</div>
        </div>
        <div className="card">
          <div className="text-xs uppercase tracking-wide text-navy-900/70">Funded</div>
          <div className="text-2xl font-bold">{funded.length}</div>
        </div>
      </div>

      {offering.quotation && (
        <div className="card flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm">
            <strong>Platform engagement:</strong> flat fee $
            {offering.quotation.flatFeeUsd.toLocaleString()} +{" "}
            {offering.quotation.equityGrantPct}% equity grant at signing
          </div>
          <StatusBadge value={offering.quotation.status} />
        </div>
      )}

      <section>
        <h3 className="mb-4 text-lg font-bold">Investor Subscriptions</h3>
        {offering.investments.length === 0 ? (
          <div className="card text-sm text-navy-900/60">No subscriptions yet.</div>
        ) : (
          <div className="card overflow-x-auto !p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-navy-900/10 text-left text-xs uppercase text-navy-900/70">
                <tr>
                  <th scope="col" className="px-5 py-3">Investor</th>
                  <th scope="col" className="px-5 py-3">Amount</th>
                  <th scope="col" className="px-5 py-3">Docs</th>
                  <th scope="col" className="px-5 py-3">Payment</th>
                  <th scope="col" className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {offering.investments.map((i) => (
                  <tr key={i.id} className="border-b border-navy-900/5">
                    <td className="px-5 py-3">
                      <div className="font-medium">{i.investor.firstName} {i.investor.lastName}</div>
                      <div className="text-xs text-navy-900/70">{i.investor.email}</div>
                    </td>
                    <td className="px-5 py-3">${i.amount.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      {i.agreement ? <StatusBadge value={i.agreement.status} /> : "—"}
                    </td>
                    <td className="px-5 py-3">
                      {i.payment ? (
                        <>
                          <StatusBadge value={i.payment.status} />
                          <span className="ml-1 text-xs text-navy-900/70">{i.payment.method}</span>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-5 py-3"><StatusBadge value={i.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
