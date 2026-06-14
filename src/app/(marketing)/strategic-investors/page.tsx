import Link from "next/link";
import { PromoVideo } from "@/components/PromoVideo";

export const metadata = {
  title: "Strategic & Large Investors — Directly Listed",
  description:
    "Family offices, venture capital, private equity, hedge funds, and sovereign wealth funds — strategic capital partners for companies preparing to list.",
  alternates: { canonical: "/strategic-investors" },
};

const INVESTOR_TYPES = [
  {
    title: "Family Offices",
    body: "Family offices value diversification, legacy preservation, and bespoke deal structures. They often take a long-term view, can move quickly, and bring patient capital plus multi-generational relationships that support a company well beyond the listing.",
  },
  {
    title: "Venture Capital Firms",
    body: "VC firms bring deep sector expertise and hands-on operating support. They prioritize scalable business models and clear growth trajectories, and frequently add strategic introductions, recruiting help, and board-level guidance.",
  },
  {
    title: "Private Equity Funds",
    body: "PE funds commit meaningful ticket sizes and run rigorous due diligence. They prioritize strong governance, clear exit pathways, and disciplined execution — ideal partners for companies professionalizing ahead of the public markets.",
  },
  {
    title: "Hedge Funds",
    body: "Hedge funds can provide flexible, sizable capital and sophisticated structuring. They look for clear catalysts and liquidity pathways, and are natural counterparties for pre-listing rounds, PIPEs, and equity lines of credit.",
  },
  {
    title: "Sovereign Wealth Funds",
    body: "Sovereign wealth funds bring scale, stability, and a long investment horizon. Their participation can anchor a round and enhance credibility with the broader market as a company approaches its listing.",
  },
];

export default function StrategicInvestorsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Strategic & Large Investors",
    description:
      "Family offices, venture capital, private equity, hedge funds, and sovereign wealth funds as strategic capital partners for companies preparing to list.",
    url: "https://www.directlylisted.com/strategic-investors",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-navy-950 px-6 pb-24 pt-40 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Strategic &amp; Large Investors
          </div>
          <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-tight">
            Family Offices, VC, PE &amp; Hedge Funds
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            The strategic capital partners who back high-growth companies before
            and through the public markets — and how we connect qualified issuers
            to them.
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/get-started" className="btn-primary">Request a Quote</Link>
            <Link href="/products/eloc" className="btn-light">Explore the ELOC Facility</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-14 max-w-3xl">
          <PromoVideo settingKey="promo_default" title="Strategic & Large Investors — Directly Listed" />
        </div>

        <div className="mx-auto mb-14 max-w-3xl space-y-5 text-navy-900/80">
          <p>
            Typical institutional investors — including family offices, venture
            capital firms, private equity funds, hedge funds, and sovereign
            wealth funds — are often drawn to pre-public listings because these
            opportunities offer early access to high-growth companies, attractive
            valuation entry points, and the potential for outsized returns.
          </p>
          <p>
            These investors generally bring deep sector expertise, rigorous due
            diligence processes, and the capacity to commit meaningful ticket
            sizes — making them ideal partners for founders seeking not only
            capital but strategic guidance and long-term support. Aligning with
            the right investor type can accelerate growth, enhance credibility,
            and smooth the path to a successful public offering.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {INVESTOR_TYPES.map((t) => (
            <div key={t.title} className="card !p-7">
              <h2 className="mb-2 text-xl font-bold">{t.title}</h2>
              <p className="text-sm leading-relaxed text-navy-900/75">{t.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-navy-900/10 bg-brand-50 p-6 text-sm leading-relaxed text-navy-900/80">
          <h2 className="mb-2 text-base font-bold text-navy-900">How We Make Introductions</h2>
          <p>
            We refer our clients to this group of investors only when they
            qualify — ensuring introductions are made when a company&apos;s
            stage, financials, and governance meet the standards these investors
            require. Directly Listed is a technology platform and does not provide
            investment advice or act as a broker-dealer; introductions are a
            convenience and not a solicitation or recommendation.
          </p>
        </div>

        <div className="mt-12">
          <Link href="/get-started" className="btn-dark">Scope My Deal</Link>
        </div>
      </section>
    </>
  );
}
