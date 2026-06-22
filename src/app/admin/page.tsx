import Link from "next/link";
import { db } from "@/lib/db";
import { fmtMoney } from "@/lib/offering-types";

export default async function AdminOverview() {
  const [users, offerings, investments, leads, settledPayments] = await Promise.all([
    db.user.count(),
    db.offering.count(),
    db.investment.count(),
    db.lead.count({ where: { status: "NEW" } }),
    db.payment.aggregate({ where: { status: "SETTLED" }, _sum: { amount: true } }),
  ]);
  const pendingReview = await db.offering.count({ where: { status: "PENDING_REVIEW" } });
  const pendingFunds = await db.investment.count({ where: { status: "PAYMENT_PENDING" } });

  const stats = [
    { label: "Users", value: users.toLocaleString(), href: "/admin/users" },
    { label: "Offerings", value: offerings.toLocaleString(), href: "/admin/offerings" },
    { label: "Investments", value: investments.toLocaleString(), href: "/admin/investments" },
    { label: "Funds Settled", value: fmtMoney(settledPayments._sum.amount ?? 0), href: "/admin/investments" },
    { label: "New Leads", value: leads.toLocaleString(), href: "/admin/leads" },
  ];

  return (
    <div className="space-y-10">
      <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card hover:border-brand-300">
            <div className="text-xs uppercase tracking-wide text-navy-900/70">{s.label}</div>
            <div className="text-3xl font-bold">{s.value}</div>
          </Link>
        ))}
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="mb-2 font-bold">Action Required</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Offerings pending review</span>
              <Link href="/admin/offerings" className="font-semibold text-brand-600">{pendingReview} →</Link>
            </li>
            <li className="flex justify-between">
              <span>Wire/ACH transfers awaiting reconciliation</span>
              <Link href="/admin/investments" className="font-semibold text-brand-600">{pendingFunds} →</Link>
            </li>
            <li className="flex justify-between">
              <span>New leads to triage</span>
              <Link href="/admin/leads" className="font-semibold text-brand-600">{leads} →</Link>
            </li>
          </ul>
        </div>
        <div className="card">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-bold">Integrations</h2>
            <Link href="/admin/integrations" className="text-sm font-semibold text-brand-600">Manage →</Link>
          </div>
          <ul className="space-y-2 text-sm text-navy-900/70">
            <li><span aria-hidden="true">💳 </span>Card payments — under $5,000, routed to each issuer&apos;s merchant account</li>
            <li><span aria-hidden="true">✍️ </span>Adobe Acrobat Sign — connect/rotate the Enterprise API key on the integrations page</li>
            <li><span aria-hidden="true">🏦 </span>Wire/ACH transfers — reconciled manually on this dashboard</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
