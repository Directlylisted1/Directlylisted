import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { StatusBadge } from "@/components/AppShell";
import { fmtMoney } from "@/lib/offering-types";
import { PromoVideo } from "@/components/PromoVideo";

export default async function PortalDashboard() {
  const user = (await getCurrentUser())!;
  const [investments, liveOfferings] = await Promise.all([
    db.investment.findMany({
      where: { investorId: user.id },
      include: { offering: true, payment: true, agreement: true },
      orderBy: { createdAt: "desc" },
    }),
    db.offering.findMany({ where: { status: "LIVE" }, take: 3 }),
  ]);

  const totalInvested = investments
    .filter((i) => ["FUNDS_RECEIVED", "COUNTERSIGNED", "COMPLETED"].includes(i.status))
    .reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-10">
      <div className="max-w-3xl">
        <PromoVideo settingKey="promo_investor" title="For investors — Directly Listed" />
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="card">
          <div className="text-xs uppercase tracking-wide text-navy-900/70">Total Invested</div>
          <div className="text-3xl font-bold">${totalInvested.toLocaleString()}</div>
        </div>
        <div className="card">
          <div className="text-xs uppercase tracking-wide text-navy-900/70">Investments</div>
          <div className="text-3xl font-bold">{investments.length}</div>
        </div>
        <div className="card">
          <div className="text-xs uppercase tracking-wide text-navy-900/70">Accreditation</div>
          <div className="mt-2">
            <StatusBadge value={user.investorProfile?.accreditationStatus ?? "NOT_STARTED"} />
          </div>
          <Link href="/portal/accreditation" className="mt-2 block text-xs font-semibold text-brand-600">
            Update →
          </Link>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-bold">My Investments</h2>
        {investments.length === 0 ? (
          <div className="card text-sm text-navy-900/60">
            You haven&apos;t invested yet.{" "}
            <Link href="/offerings" className="font-semibold text-brand-600">Browse live offerings →</Link>
          </div>
        ) : (
          <div className="card overflow-x-auto !p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-navy-900/10 text-left text-xs uppercase text-navy-900/70">
                <tr>
                  <th scope="col" className="px-5 py-3">Offering</th>
                  <th scope="col" className="px-5 py-3">Amount</th>
                  <th scope="col" className="px-5 py-3">Status</th>
                  <th scope="col" className="px-5 py-3">Payment</th>
                  <th scope="col" className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {investments.map((i) => (
                  <tr key={i.id} className="border-b border-navy-900/5">
                    <td className="px-5 py-3 font-medium">{i.offering.name}</td>
                    <td className="px-5 py-3">${i.amount.toLocaleString()}</td>
                    <td className="px-5 py-3"><StatusBadge value={i.status} /></td>
                    <td className="px-5 py-3">{i.payment ? <StatusBadge value={i.payment.status} /> : "—"}</td>
                    <td className="px-5 py-3">
                      <Link href={`/portal/investments/${i.id}`} className="font-semibold text-brand-600">
                        Continue →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Open Opportunities</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {liveOfferings.map((o) => (
            <Link key={o.id} href={`/offerings/${o.slug}`} className="card hover:border-brand-300">
              <div className="font-bold">{o.name}</div>
              <div className="mb-3 text-xs text-navy-900/70">{o.industry}</div>
              <div className="text-sm">
                <span className="font-semibold">{fmtMoney(o.raisedAmount)}</span>
                <span className="text-navy-900/70"> raised</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
