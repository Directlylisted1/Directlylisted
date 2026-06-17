import Link from "next/link";
import { db } from "@/lib/db";
import { fmtMoney, productByType } from "@/lib/offering-types";

export const metadata = {
  title: "Case Studies — Directly Listed",
  description:
    "How companies raise capital and go public on the Directly Listed platform.",
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage() {
  const offerings = await db.offering
    .findMany({
      where: { status: { in: ["LIVE", "CLOSED"] } },
      orderBy: { raisedAmount: "desc" },
      include: { issuer: true },
    })
    .catch(() => []);

  return (
    <>
      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-3 text-5xl font-bold">Case Studies</h1>
          <p className="max-w-2xl text-white/70">
            Real raises on the platform — the exemption, the strategy, and the
            result.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {offerings.map((o) => (
            <article key={o.id} className="card overflow-hidden !p-0">
              <div
                className="flex h-36 items-end p-6 text-white"
                style={{ background: `linear-gradient(160deg, ${o.heroColor} 0%, #061629 100%)` }}
              >
                <div>
                  <span className="mb-2 inline-block rounded-full bg-white/15 px-3 py-0.5 text-xs backdrop-blur">
                    {productByType(o.type).shortLabel}
                  </span>
                  <h2 className="text-2xl font-bold">{o.name}</h2>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <p className="text-sm text-navy-900/75">{o.description}</p>
                <dl className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <dt className="text-xs uppercase text-navy-900/60">{o.type === "ELOC" ? "Committed" : "Raised"}</dt>
                    <dd className="text-xl font-bold">{o.raisedAmount > 0 ? fmtMoney(o.raisedAmount) : "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase text-navy-900/60">Investors</dt>
                    <dd className="text-xl font-bold">{o.investorCount > 0 ? o.investorCount.toLocaleString() : "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase text-navy-900/60">Structure</dt>
                    <dd className="text-xl font-bold">{productByType(o.type).shortLabel}</dd>
                  </div>
                </dl>
                <Link href={`/offerings/${o.slug}`} className="btn-dark !py-2 text-xs">
                  View Offering
                </Link>
              </div>
            </article>
          ))}
          {offerings.length === 0 && (
            <p className="text-navy-900/70">Case studies are being prepared — check back soon.</p>
          )}
        </div>
        <p className="mt-10 text-xs text-navy-900/60">
          Results shown reflect demonstration data until live deal metrics are
          published. Past performance does not guarantee future results.
        </p>
      </section>
    </>
  );
}
