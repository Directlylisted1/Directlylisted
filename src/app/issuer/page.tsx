import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { StatusBadge } from "@/components/AppShell";
import { fmtMoney, productByType } from "@/lib/offering-types";
import { acceptQuotation } from "@/lib/issuer-actions";
import { FeeDisclosure } from "@/components/FeeDisclosure";
import { PromoVideo } from "@/components/PromoVideo";

export default async function IssuerDashboard() {
  const user = (await getCurrentUser())!;
  const issuer = user.issuerProfile!;
  const [offerings, quotations] = await Promise.all([
    db.offering.findMany({
      where: { issuerId: issuer.id },
      include: { _count: { select: { investments: true } } },
      orderBy: { createdAt: "desc" },
    }),
    db.quotation.findMany({
      where: { issuerId: issuer.id },
      include: { offering: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalRaised = offerings.reduce((s, o) => s + o.raisedAmount, 0);

  return (
    <div className="space-y-10">
      <div className="max-w-3xl">
        <PromoVideo settingKey="promo_issuer" title="For issuers — Directly Listed" />
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="card">
          <div className="text-xs uppercase tracking-wide text-navy-900/70">Total Raised</div>
          <div className="text-3xl font-bold">{fmtMoney(totalRaised)}</div>
        </div>
        <div className="card">
          <div className="text-xs uppercase tracking-wide text-navy-900/70">Offerings</div>
          <div className="text-3xl font-bold">{offerings.length}</div>
        </div>
        <div className="card">
          <div className="text-xs uppercase tracking-wide text-navy-900/70">Investors</div>
          <div className="text-3xl font-bold">
            {offerings.reduce((s, o) => s + o.investorCount, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Quotations from the platform */}
      {quotations.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold">Platform Quotations</h2>
          <div className="space-y-4">
            {quotations.map((q) => (
              <div key={q.id} className="card flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-bold">{q.offering.name}</div>
                  <div className="text-sm text-navy-900/60">
                    Flat fee <strong>${q.flatFeeUsd.toLocaleString()}</strong> +{" "}
                    <strong>{q.equityGrantPct}%</strong> equity grant at signing
                  </div>
                  {q.notes && <div className="mt-1 text-xs text-navy-900/70">{q.notes}</div>}
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge value={q.status} />
                  {q.status === "SENT" && (
                    <form action={acceptQuotation}>
                      <input type="hidden" name="quotationId" value={q.id} />
                      <button className="btn-primary !py-2 text-xs">Accept Quotation</button>
                    </form>
                  )}
                </div>
              </div>
            ))}
            <FeeDisclosure compact />
          </div>
        </section>
      )}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">My Offerings</h2>
          <Link href="/issuer/offerings/new" className="btn-dark !py-2 text-xs">
            + New Offering
          </Link>
        </div>
        {offerings.length === 0 ? (
          <div className="card text-sm text-navy-900/60">
            No offerings yet. Create your first offering to get a platform quotation.
          </div>
        ) : (
          <div className="card overflow-x-auto !p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-navy-900/10 text-left text-xs uppercase text-navy-900/70">
                <tr>
                  <th scope="col" className="px-5 py-3">Offering</th>
                  <th scope="col" className="px-5 py-3">Type</th>
                  <th scope="col" className="px-5 py-3">Raised / Target</th>
                  <th scope="col" className="px-5 py-3">Subscriptions</th>
                  <th scope="col" className="px-5 py-3">Status</th>
                  <th scope="col" className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {offerings.map((o) => (
                  <tr key={o.id} className="border-b border-navy-900/5">
                    <td className="px-5 py-3 font-medium">{o.name}</td>
                    <td className="px-5 py-3 text-xs">{productByType(o.type).shortLabel}</td>
                    <td className="px-5 py-3">
                      {fmtMoney(o.raisedAmount)}
                      <span className="text-navy-900/60"> / {fmtMoney(o.targetAmount)}</span>
                    </td>
                    <td className="px-5 py-3">{o._count.investments}</td>
                    <td className="px-5 py-3"><StatusBadge value={o.status} /></td>
                    <td className="px-5 py-3">
                      <Link href={`/issuer/offerings/${o.id}`} className="font-semibold text-brand-600">
                        Manage →
                      </Link>
                    </td>
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
