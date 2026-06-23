import Link from "next/link";
import { db } from "@/lib/db";
import { fmtMoney, productByType } from "@/lib/offering-types";

export const metadata = {
  title: "Live Offerings — Directly Listed",
  description:
    "Browse live capital raises conducted by issuers on the Directly Listed platform. Review documents, verify eligibility, and invest online.",
  alternates: { canonical: "/offerings" },
};

export default async function OfferingsPage() {
  const offerings = await db.offering
    .findMany({
      where: { status: { in: ["LIVE", "CLOSED"] }, archivedAt: null },
      orderBy: [{ status: "asc" }, { raisedAmount: "desc" }],
    })
    .catch(() => []);

  return (
    <>
      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-3 text-5xl font-bold">Live Offerings</h1>
          <p className="max-w-2xl text-white/70">
            Offerings conducted by issuers in reliance on their own exemptions.
            Review the documents, verify your eligibility, and invest online.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-2 lg:grid-cols-3">
        {offerings.map((o) => {
          const pct = o.targetAmount > 0 ? Math.min(100, (o.raisedAmount / o.targetAmount) * 100) : 0;
          return (
            <Link key={o.id} href={`/offerings/${o.slug}`} className="card group overflow-hidden !p-0">
              <div
                className="flex h-44 items-end p-6 text-white"
                style={{ background: `linear-gradient(160deg, ${o.heroColor} 0%, #061629 100%)` }}
              >
                <div>
                  <span className="mb-2 inline-block rounded-full bg-white/15 px-3 py-0.5 text-xs backdrop-blur">
                    {productByType(o.type).shortLabel}
                  </span>
                  <div className="text-2xl font-bold">{o.name}</div>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <p className="text-sm text-navy-900/70">{o.tagline}</p>
                {o.targetAmount > 0 && (
                  <>
                    <div aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-brand-100">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-bold">
                        {fmtMoney(o.raisedAmount)} {o.type === "ELOC" ? "committed" : "raised"}
                      </span>
                      <span className="text-navy-900/70">of {fmtMoney(o.targetAmount)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-xs text-navy-900/70">
                  <span>{o.industry}</span>
                  <span>{o.investorCount.toLocaleString()} investors</span>
                </div>
                <span className="btn-dark !py-2 text-xs group-hover:bg-navy-700">View Offering</span>
              </div>
            </Link>
          );
        })}
        {offerings.length === 0 && (
          <p className="text-navy-900/60">No live offerings right now. Check back soon.</p>
        )}
      </section>
    </>
  );
}
