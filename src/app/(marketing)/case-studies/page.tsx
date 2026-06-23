import Link from "next/link";
import { db } from "@/lib/db";
import { fmtMoney, productByType } from "@/lib/offering-types";

export const metadata = {
  title: "Current Deals & Case Studies — Directly Listed",
  description:
    "Browse current deals and case studies on Directly Listed — real raises, the exemption, the strategy, and the result.",
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage() {
  const offerings = await db.offering
    .findMany({
      where: { status: { in: ["LIVE", "CLOSED"] }, archivedAt: null },
      orderBy: [{ featured: "desc" }, { featuredRank: "asc" }, { raisedAmount: "desc" }],
      include: {
        issuer: true,
        assets: {
          where: { kind: "IMAGE" },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
          take: 1,
        },
      },
    })
    .catch(() => []);

  return (
    <>
      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Current Deals &amp; Case Studies
          </div>
          <h1 className="mb-3 text-5xl font-bold">Current Deals &amp; Case Studies</h1>
          <p className="max-w-2xl text-white/70">
            Real raises on the platform — the company, the structure, the strategy,
            and the result. Click any deal to view its full offering page and media.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o) => {
            const banner = o.assets[0]?.url;
            return (
              <Link
                key={o.id}
                href={`/offerings/${o.slug}`}
                className="group card flex flex-col overflow-hidden !p-0 transition-shadow hover:shadow-xl"
              >
                {/* Banner — issuer hero image if uploaded, else the brand gradient */}
                <div
                  className="relative flex h-44 items-end p-6 text-white"
                  style={
                    banner
                      ? { backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" }
                      : { background: `linear-gradient(160deg, ${o.heroColor} 0%, #061629 100%)` }
                  }
                >
                  {banner && <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 to-navy-950/10" />}
                  <div className="relative">
                    <span className="mb-2 inline-block rounded-full bg-white/15 px-3 py-0.5 text-xs backdrop-blur">
                      {productByType(o.type).shortLabel}
                    </span>
                    <h2 className="text-xl font-bold leading-tight">{o.headline || o.name}</h2>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur">
                    {o.status === "LIVE" ? "Live" : "Closed"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <p className="line-clamp-3 text-sm text-navy-900/75">
                    {o.subheadline || o.description || o.tagline}
                  </p>
                  <dl className="mt-auto grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-xs uppercase text-navy-900/60">
                        {o.type === "ELOC" ? "Committed" : "Raised"}
                      </dt>
                      <dd className="text-xl font-bold">
                        {o.raisedAmount > 0 ? `${fmtMoney(o.raisedAmount)}+` : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase text-navy-900/60">Investors</dt>
                      <dd className="text-xl font-bold">
                        {o.investorCount > 0 ? o.investorCount.toLocaleString() : "—"}
                      </dd>
                    </div>
                  </dl>
                  <span className="text-sm font-semibold text-brand-600 group-hover:underline">
                    Read More →
                  </span>
                </div>
              </Link>
            );
          })}
          {offerings.length === 0 && (
            <p className="text-navy-900/70">
              Current deals are being prepared — check back soon.
            </p>
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
