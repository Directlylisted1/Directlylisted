import Link from "next/link";
import { db } from "@/lib/db";
import { PRODUCTS, fmtMoney, productByType } from "@/lib/offering-types";
import { loadLegalDoc } from "@/lib/legal";
import { HeroBackground } from "@/components/HeroBackground";
import { PromoVideo } from "@/components/PromoVideo";
import { CountUpStat } from "@/components/CountUpStat";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqGraph } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { HOME_FAQ_SECTIONS } from "@/lib/faq.home";

// Homepage metadata per the SEO rebuild spec: exact title tag, meta
// description, canonical https://www.directlylisted.com/, OG mirrors title.
export const metadata = buildMetadata("home");

// NOTE: confirm these figures are accurate/substantiated before launch.
const HERO_STATS = [
  { value: "$6B+", label: "Raised by customers · ABC since 1999" },
  { value: "4.9M+", label: "Investments processed · ABC since 1999" },
  { value: "600+", label: "Offerings" },
];

const RAISE_STEPS = [
  {
    n: "1",
    title: "Book a call",
    body: "Talk to our team of experts to find the capital solution that fits your business — exemption, exchange, and timeline.",
  },
  {
    n: "2",
    title: "Stage your offering",
    body: "After due diligence we configure your deal, prepare and file your SEC forms, and build your branded investment page.",
  },
  {
    n: "3",
    title: "Launch your offering",
    body: "Your offering page goes live with its own Invest Now button — embeddable right on your existing website.",
  },
  {
    n: "4",
    title: "Market your offering",
    body: "Turn your earliest supporters into your loudest advocates, then widen the funnel with strategic campaign marketing.",
  },
  {
    n: "5",
    title: "Receive your funds",
    body: "Close subscriptions and access your capital in tranches or as a lump sum — the timing is in your hands.",
  },
];

const SERVICES = [
  "SEC filings & forms",
  "Investor relations",
  "Shareholder services",
  "Transfer agent & DTC coordination",
  "Real-time data dashboards",
  "Digital payment processing",
  "Industry-leading KYC/AML",
  "Campaign marketing & investor acquisition",
  "Funnel analytics",
  "eSignature with full audit trail",
];

export default async function HomePage() {
  const disclaimer = loadLegalDoc("disclaimer");
  // Homepage flagships: admin-selected "featured" LIVE offerings first; if none
  // are flagged, fall back to the top LIVE offerings. Archived are excluded.
  let featured = await db.offering
    .findMany({
      where: { status: "LIVE", archivedAt: null, featured: true },
      orderBy: [{ featuredRank: "asc" }, { raisedAmount: "desc" }],
      take: 3,
    })
    .catch(() => []);
  if (featured.length === 0) {
    featured = await db.offering
      .findMany({
        where: { status: "LIVE", archivedAt: null },
        orderBy: { raisedAmount: "desc" },
        take: 3,
      })
      .catch(() => []);
  }
  // Always lay out three equal slots so a status change never leaves a white gap.
  const slots = [featured[0], featured[1], featured[2]];

  return (
    <>
      {/* FAQ structured data — wins AI Overview / "People Also Ask" placement. */}
      <JsonLd data={faqGraph()} id="ld-faq-home" />
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-950">
        <HeroBackground />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-1rem] left-0 right-0 select-none text-center font-black tracking-tighter text-white/10"
          style={{ fontSize: "clamp(6rem, 18vw, 16rem)", lineHeight: 1 }}
        >
          directlylisted
        </div>
        <div className="relative z-10 w-full px-4 pb-20 pt-10 sm:px-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Strategic &amp; Elevated
          </div>
          <div className="mb-6 max-w-md border-t border-white/30 pt-4 text-sm text-white/80">
            The Future of Retail Capital.{" "}
            <span className="font-semibold text-accent">Empower Your Raise.</span>
          </div>
          {/* The page's single H1 — primary keyword, per the SEO spec. */}
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Direct NASDAQ and NYSE listings: go public without an IPO
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            A direct listing lets a company list its shares on a national
            exchange without an underwritten offering. No syndicate, no roadshow
            priced by intermediaries, no mandatory lock-up. Directly Listed
            prepares companies for direct listings on NASDAQ and the New York
            Stock Exchange, and manages the work from the first filing to the
            first trade.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            The desk is led by Andy Altahawi, a former Senior Vice President of
            Investment Banking at Prudential Securities and an international
            attorney in practice since 1986. His advisory work spans hundreds of
            issuer engagements and billions of dollars raised across public
            offerings.
          </p>
          <div className="mt-10 space-y-8">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="flex items-end gap-4">
                <CountUpStat
                  value={s.value}
                  className="text-6xl font-light tracking-tight text-white md:text-7xl"
                />
                <span className="mb-3 border-t border-white/30 pt-1 text-xs uppercase tracking-widest text-white/70">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/book" className="btn-primary">Book a listing consultation</Link>
            <Link href="/get-started" className="btn-light">See if your company qualifies</Link>
          </div>
        </div>
      </section>

      {/* ============ CURRENT DEALS & CASE STUDIES (featured, split-panel look) ============ */}
      {featured.length > 0 && (
        <section className="bg-navy-950 text-white">
          {/* Clickable header → full Current Deals & Case Studies page */}
          <div className="relative overflow-hidden">
            {/* Oversized faded watermark — echoes the hero treatment */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-4 left-0 right-0 select-none text-center font-black uppercase tracking-tighter text-white/[0.035]"
              style={{ fontSize: "clamp(4rem, 13vw, 11rem)", lineHeight: 1 }}
            >
              Current Deals
            </div>
            <div className="relative mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8 px-6 pb-12 pt-24">
              <div className="max-w-2xl">
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-10 bg-accent" />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                    Current Deals &amp; Case Studies
                  </span>
                </div>
                <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                  Real <span className="text-accent">raises</span>,
                  <br />
                  on the platform.
                </h2>
                <p className="mt-5 max-w-md text-white/60">
                  Live and completed offerings — explore the structure, the
                  strategy, and the outcome behind every raise.
                </p>
              </div>
              <Link
                href="/case-studies"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-bold text-navy-950 shadow-lg shadow-accent/20 transition-transform duration-200 hover:scale-[1.04]"
              >
                View All Current Deals
                <span aria-hidden className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Featured three — one large, two stacked (classic split-panel look) */}
          <div className="grid md:grid-cols-2">
            {slots.map((o, i) =>
              o ? (
                <Link
                  key={o.id}
                  href={`/offerings/${o.slug}`}
                  className={`group relative flex min-h-[420px] flex-col justify-end p-10 text-white transition-[filter] hover:brightness-110 ${
                    i === 0 ? "md:row-span-2 md:min-h-[840px]" : ""
                  }`}
                  style={{
                    background: `linear-gradient(180deg, ${o.heroColor}cc 0%, #061629 100%)`,
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <div className="text-xl font-bold leading-tight">{o.headline || o.name}</div>
                      <div className="mt-1 text-sm text-white/70">{o.subheadline || o.tagline}</div>
                    </div>
                    <div className="flex gap-10">
                      <div>
                        <div className="stat-rule" />
                        <div className="text-xs text-white/60">
                          {o.type === "ELOC" ? "Capital Committed" : "Capital Raised"}
                        </div>
                        <div className="text-3xl font-light">{fmtMoney(o.raisedAmount)}+</div>
                      </div>
                      <div>
                        <div className="stat-rule" />
                        <div className="text-xs text-white/60">Investors</div>
                        <div className="text-3xl font-light">
                          {o.investorCount >= 1000
                            ? `${Math.round(o.investorCount / 1000)}K+`
                            : o.investorCount}
                        </div>
                      </div>
                    </div>
                    <span className="btn-primary !py-2.5 w-fit">Learn More</span>
                  </div>
                  <span className="absolute right-10 top-10 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                    {productByType(o.type).shortLabel}
                  </span>
                </Link>
              ) : (
                // Branded placeholder keeps the panel full when a slot is empty —
                // no white gap when an offering's status changes.
                <div
                  key={`slot-${i}`}
                  className={`relative flex min-h-[420px] flex-col items-center justify-center gap-4 p-10 text-center text-white ${
                    i === 0 ? "md:row-span-2 md:min-h-[840px]" : ""
                  }`}
                  style={{ background: "linear-gradient(180deg, #0A2540 0%, #061629 100%)" }}
                >
                  <div className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Featured Offering
                  </div>
                  <div className="text-2xl font-bold">More offerings coming soon</div>
                  <p className="max-w-xs text-sm text-white/70">
                    Raising capital or going public? Your company could be featured here.
                  </p>
                  <Link href="/get-started" className="btn-primary !py-2.5">
                    Get Started
                  </Link>
                </div>
              ),
            )}
          </div>
        </section>
      )}

      {/* ============ WHAT IS A DIRECT LISTING (SEO pillar copy) ============ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">What is a direct listing?</h2>
          <div className="space-y-5 text-[15px] leading-relaxed text-navy-900/80">
            <p>
              In a direct listing, a company registers its shares with the SEC
              and lists them on an exchange, where they begin trading at a price
              set by market orders rather than by underwriters. Spotify used
              this route onto the NYSE in 2018. Coinbase followed on NASDAQ in
              2021. The method is no longer reserved for household names:
              exchange rule changes approved since 2020 also allow companies to
              raise new capital in a primary direct listing, subject to exchange
              and SEC conditions. For a deeper walkthrough, read{" "}
              <Link
                href="/blog/what-is-a-direct-listing"
                className="font-semibold text-brand-600 hover:underline"
              >
                our complete guide to direct listings
              </Link>
              .
            </p>
            <p>
              The appeal is straightforward. Existing shareholders can sell from
              day one. The company avoids underwriting discounts that typically
              run about seven percent of an offering. And the opening price
              reflects actual demand, not an allocation decided the night
              before.
            </p>
            <p>
              A direct listing is still a full exchange listing. Your company
              must meet the same NASDAQ or NYSE quantitative and governance
              standards as any IPO candidate, file a registration statement with
              the SEC, and operate as a reporting company afterward. That is
              where preparation decides the outcome.
            </p>
          </div>

          <h2 className="mb-6 mt-14 text-3xl font-bold md:text-4xl">
            Direct listing vs. traditional IPO
          </h2>
          <div className="card overflow-x-auto !p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-navy-900/10 bg-brand-50/60 text-left text-xs uppercase text-navy-900/70">
                <tr>
                  <th scope="col" className="px-5 py-3"></th>
                  <th scope="col" className="px-5 py-3">Direct listing</th>
                  <th scope="col" className="px-5 py-3">Traditional IPO</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Underwriters", "None required", "Syndicate engaged"],
                  ["Underwriting discount", "None", "Typically ~7% of proceeds"],
                  ["Lock-up period", "None required", "Usually 180 days"],
                  ["Opening price", "Set by market orders", "Set by underwriters"],
                  ["New capital", "Optional (primary direct listing)", "Yes"],
                  [
                    "Exchange standards",
                    "Full NASDAQ/NYSE standards apply",
                    "Full NASDAQ/NYSE standards apply",
                  ],
                  ["SEC registration", "Required (S-1 or F-1)", "Required (S-1 or F-1)"],
                ].map(([label, dl, ipo]) => (
                  <tr key={label} className="border-b border-navy-900/5">
                    <th scope="row" className="px-5 py-3 text-left font-semibold">
                      {label}
                    </th>
                    <td className="px-5 py-3 text-navy-900/80">{dl}</td>
                    <td className="px-5 py-3 text-navy-900/80">{ipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-navy-900/80">
            Neither route is better in the abstract. An underwritten IPO suits a
            company that wants a guaranteed raise and institutional placement. A
            direct exchange listing suits a company with a clear equity story,
            existing shareholders who want liquidity, and no appetite for
            dilution on an underwriter&apos;s terms. We help you decide which
            fits before any money is spent.
          </p>

          <h2 className="mb-3 mt-14 text-3xl font-bold md:text-4xl">
            How the direct listing process works
          </h2>
          <p className="mb-8 text-[15px] leading-relaxed text-navy-900/80">
            Our engagements run in three phases. Most companies complete the
            full path in four to nine months, driven mainly by audit readiness.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Phase one: prepare",
                b: "We assess your financials, capitalization, and governance against exchange standards, then build the plan to close any gaps. This phase covers PCAOB-standard audits, board composition and committee independence, corporate cleanup, and the drafting of your S-1 or, for foreign issuers, F-1 registration statement.",
              },
              {
                t: "Phase two: qualify",
                b: "We manage the SEC review and comment process on the registration statement and the exchange application in parallel: NASDAQ or NYSE listing application, symbol reservation, and the exchange's qualification review. Our filings are prepared to SEC EDGAR standards, including Inline XBRL tagging.",
              },
              {
                t: "Phase three: list",
                b: "Once the registration statement is effective and the exchange approves the listing, your shares open for trading. We coordinate with the transfer agent, DTC, and market makers so the first day of trading is orderly, then stay on for post-listing compliance: 10-K, 10-Q, and 8-K reporting, Section 16 filings, and governance requirements under the exchange rules.",
              },
            ].map((p) => (
              <div key={p.t} className="card !p-6">
                <h3 className="mb-2 text-lg font-bold">{p.t}</h3>
                <p className="text-sm leading-relaxed text-navy-900/75">{p.b}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 mt-14 text-3xl font-bold md:text-4xl">
            NASDAQ and NYSE listing requirements, in brief
          </h2>
          <p className="text-[15px] leading-relaxed text-navy-900/80">
            Each exchange publishes quantitative standards a company must meet:
            stockholders&apos; equity, market value of publicly held shares,
            share price, and round-lot shareholder counts, along with corporate
            governance rules on board independence and audit committees. NASDAQ
            offers three alternative standards for its Capital Market tier;
            NYSE and NYSE American have their own tests. Most private companies
            do not meet these standards on day one. Closing that gap is the
            core of the preparation phase.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-navy-900/80">
            For the specifics, see our guides to{" "}
            <Link
              href="/products/nasdaq-direct-listing"
              className="font-semibold text-brand-600 hover:underline"
            >
              NASDAQ direct listing requirements
            </Link>{" "}
            and{" "}
            <Link
              href="/products/nyse-direct-listing"
              className="font-semibold text-brand-600 hover:underline"
            >
              NYSE direct listing requirements
            </Link>
            , or ask us for a free qualification review of your current numbers.
          </p>

          <h2 className="mb-5 mt-14 text-3xl font-bold md:text-4xl">
            More ways to raise: Reg A+, Reg D, and equity lines
          </h2>
          <p className="mb-5 text-[15px] leading-relaxed text-navy-900/80">
            A direct listing is one path among several, and it pairs well with
            others. Depending on your stage and goals, we also structure:
          </p>
          <ul className="space-y-3 text-[15px] leading-relaxed text-navy-900/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✓</span>
              <span>
                <Link href="/products/reg-a-plus" className="font-semibold text-brand-600 hover:underline">
                  Regulation A+ offerings
                </Link>
                , which allow a company to raise up to $75 million in a 12-month
                period from the general public, before or alongside an exchange
                listing.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✓</span>
              <span>
                Regulation D private placements under{" "}
                <Link href="/products/reg-d-506b" className="font-semibold text-brand-600 hover:underline">
                  Rule 506(b)
                </Link>{" "}
                and{" "}
                <Link href="/products/reg-d-506c" className="font-semibold text-brand-600 hover:underline">
                  506(c)
                </Link>
                , with no dollar ceiling, for accredited investors.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✓</span>
              <span>
                <Link href="/products/reg-s" className="font-semibold text-brand-600 hover:underline">
                  Regulation S offerings
                </Link>{" "}
                for capital raised outside the United States.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✓</span>
              <span>
                <Link href="/products/eloc" className="font-semibold text-brand-600 hover:underline">
                  Equity line facilities
                </Link>{" "}
                of up to $350 million, giving a listed company committed capital
                to draw after trading begins.
              </span>
            </li>
          </ul>
          <p className="mt-5 text-[15px] leading-relaxed text-navy-900/80">
            Many clients combine these: a Reg D or Reg A+ raise pre-listing, the
            direct listing itself, then an equity line for follow-on capital.
            The sequencing matters, and it is designed case by case.
          </p>

          <h2 className="mb-5 mt-14 text-3xl font-bold md:text-4xl">Who leads the work</h2>
          <div className="space-y-5 text-[15px] leading-relaxed text-navy-900/80">
            <p>
              Andy Altahawi has spent his career on both sides of a listing: the
              banking side and the legal side. He was a Senior Vice President in
              Investment Banking at Prudential Securities from 1994 to 1999,
              working on public offerings, private placements, and M&amp;A
              during the firm&apos;s years under former NASDAQ Chairman Wick
              Simons. In 1998 he founded Adamson Brothers, a FINRA-registered
              broker-dealer (CRD #46684) that took hundreds of companies public
              and operated without a single customer complaint or regulatory
              citation. After 2008 the firm became the capital markets advisory
              practice behind Directly Listed.
            </p>
            <p>
              He is also an international attorney, admitted since 1986, with a
              Ph.D. in Finance. He has held nine FINRA examinations, including
              the Series 7, 24, and 79. U.S. securities law matters are handled
              in co-counsel with U.S.-admitted securities attorneys. His full
              background and regulatory record are published at{" "}
              <a
                href="https://andyaltahawi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-600 hover:underline"
              >
                andyaltahawi.com
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{" "}
              — including the primary-source documents. We would rather you read
              the record than take our word for it.
            </p>
          </div>

          <h2 className="mb-5 mt-14 text-3xl font-bold md:text-4xl">
            Why companies choose Directly Listed
          </h2>
          <div className="space-y-5 text-[15px] leading-relaxed text-navy-900/80">
            <p>
              One desk covers the whole listing. The financial structuring and
              the legal preparation are run together, rather than split between
              a bank and a law firm that bill separately and coordinate slowly.
              The process is built for issuers who want to reach NASDAQ or NYSE
              on their own terms: no underwriting discount, no forced lock-up,
              and an advisor whose record is published in full.
            </p>
            <p>
              Cross-border issuers are a particular focus. We structure foreign
              companies for U.S. market entry through F-1 registration
              statements, redomiciliation where needed, and governance
              frameworks that satisfy both the exchange and home-country law.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/book" className="btn-dark">Book a listing consultation</Link>
          </div>

          <p className="mt-10 border-t border-navy-900/10 pt-6 text-xs leading-relaxed text-navy-900/60">
            Directly Listed is a technology and advisory platform operated by
            Adamson Brothers Corp. Adamson Brothers Corp is not a registered
            broker-dealer, investment adviser, or funding portal, and does not
            offer or sell securities. Legal matters involving U.S. securities
            law are handled in co-counsel with U.S.-admitted securities
            attorneys. Nothing on this page is an offer to sell or a
            solicitation of an offer to buy any security.
          </p>
        </div>
      </section>

      {/* ============ PLATFORM PITCH ============ */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white">
        <div
          aria-hidden
          className="absolute left-0 top-0 h-full w-1/3 bg-mintish"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2">
          <div className="text-5xl font-bold leading-tight text-navy-900 md:text-6xl">
            <span className="text-accent">Capital</span>
            <br />
            <span className="text-navy-700">Redefined</span>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              directlylisted platform
            </div>
            <h2 className="mb-5 text-4xl font-bold leading-tight">
              Listing Ambition.
              <br />
              Powering Growth.
            </h2>
            <p className="mb-8 max-w-lg text-white/70">
              Directly Listed is the future of going public. One end-to-end
              platform to attract investors, process funds, and manage your
              raise — from a private Reg D round to ringing the bell on NASDAQ
              or NYSE.
            </p>
            <Link href="/get-started" className="btn-primary">Start Now</Link>
            <div className="mt-10 max-w-xl">
              <PromoVideo settingKey="promo_default" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE NEW CAPITAL STACK GUIDE ============ */}
      <section className="bg-mintish/40 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Free Guide
            </div>
            <h2 className="mb-4 text-4xl font-bold">The New Capital Stack</h2>
            <p className="mb-6 max-w-lg text-navy-900/75">
              The funding landscape is shifting, and forward-thinking companies
              are adding retail capital to their stack. Our guide covers where
              conventional funding falls short, how customer-shareholders
              change buying and referral behavior, and a practical blueprint
              for planning and launching a retail raise.
            </p>
            <Link href="/guides/new-capital-stack" className="btn-dark">Download Now</Link>
          </div>
          <div className="card !p-8">
            <ul className="space-y-4 text-sm text-navy-900/80">
              <li className="flex gap-3"><span className="text-accent">✓</span> Why the traditional capital stack is falling short</li>
              <li className="flex gap-3"><span className="text-accent">✓</span> How to turn customers into loyal shareholders</li>
              <li className="flex gap-3"><span className="text-accent">✓</span> A step-by-step blueprint for modernizing your capital stack</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ HOW TO RAISE — 5 STEPS ============ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-3 text-center text-4xl font-bold">
            How To Raise Capital On Directly Listed
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center text-navy-900/70">
            Five steps from first call to funds received.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {RAISE_STEPS.map((s) => (
              <div key={s.n} className="card relative overflow-hidden">
                <div className="absolute -right-1 -top-5 select-none text-[5rem] font-black text-brand-100">
                  {s.n}
                </div>
                <h3 className="relative mb-2 font-bold">{s.title}</h3>
                <p className="relative text-xs leading-relaxed text-navy-900/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES / HEAVY LIFTING ============ */}
      <section className="bg-navy-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-3 text-center text-4xl font-bold">
            We Handle The Heavy Lifting
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-white/70">
            One platform for staging your raise, attracting investors,
            processing funds, and managing shareholder communications — with
            SEC-licensed attorneys, consultants, and listing advisors paid out
            of one flat fee.
          </p>
          <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <li key={s} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm">
                <span className="text-accent">✓</span> {s}
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/60">
              Accept Payments Via
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["Visa", "Mastercard", "Amex", "ACH", "Wire"].map((p) => (
                <span key={p} className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold">
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/60">
              Funds are handled directly from investors to the issuer — by card
              for amounts under $5,000, or by ACH or wire transfer straight to the
              issuer&apos;s bank account.
            </p>
          </div>
        </div>
      </section>

      {/* ============ RAISE LIMITS ============ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="mb-3 text-4xl font-bold">Capital Raising, Revolutionized</h2>
          <p className="mx-auto mb-14 max-w-xl text-navy-900/70">
            Craft the perfect offering with control over raise amount,
            valuation, voting rights, and beyond. With us, your strategy takes
            center stage.
          </p>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { via: "Via Reg A+", amount: "$75M", note: "Anyone can invest" },
              { via: "Via Reg D", amount: "∞", note: "Accredited investors only" },
              { via: "Via Listing + ELOC", amount: "$350M", note: "Committed capital after listing" },
            ].map((c) => (
              <div
                key={c.via}
                className="mx-auto flex aspect-square w-full max-w-[280px] flex-col items-center justify-center rounded-full border border-navy-900/10 bg-gradient-to-b from-white to-brand-50 shadow-lg"
              >
                <div className="text-sm font-bold">{c.via}</div>
                <div className="text-xs text-navy-900/70">Raise up to</div>
                <div className="my-2 text-5xl font-black text-navy-900">{c.amount}</div>
                <div className="text-xs text-navy-900/70">{c.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRODUCT LINE ============ */}
      <section className="bg-navy-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Ten Ways To Raise. One Platform.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-accent/60 hover:bg-white/10"
              >
                <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                  {p.raiseLimit}
                </div>
                <h3 className="mb-2 text-xl font-bold group-hover:text-accent">
                  {p.label}
                </h3>
                <p className="text-sm text-white/60">{p.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DIRECT LISTING FAQ ============ */}
      {/* Real text in the HTML (no JS-only accordions) — matches the FAQPage
          JSON-LD word for word via the shared lib/faq.home.ts source. */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Direct listing FAQ</h2>
          <p className="mb-10 max-w-2xl text-[15px] leading-relaxed text-navy-900/70">
            Straight answers to the questions companies ask most about direct
            listings, NASDAQ and NYSE requirements, timelines, and costs.
          </p>
          <div className="space-y-12">
            {HOME_FAQ_SECTIONS.map((section) => (
              <div key={section.heading}>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
                  {section.heading}
                </p>
                <div className="space-y-7">
                  {section.items.map((item) => (
                    <div key={item.q}>
                      <h3 className="mb-2 text-lg font-bold">{item.q}</h3>
                      <p className="text-[15px] leading-relaxed text-navy-900/80">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VISION CTA ============ */}
      <section className="bg-mintish py-20 text-center">
        <h2 className="mb-4 text-4xl font-bold">Your Vision. Your Terms.</h2>
        <p className="mx-auto mb-8 max-w-xl text-navy-900/70">
          Every deal gets its own quotation — a flat platform fee plus equity
          grant at signing. Tell us about your company and we&apos;ll scope your
          raise.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/get-started" className="btn-dark">Get Started</Link>
          <Link href="/case-studies" className="btn-outline">See Case Studies</Link>
        </div>
      </section>

      {/* ============ DISCLAIMER (small print) ============ */}
      <section aria-label="Disclaimer" className="border-t border-navy-900/10 bg-white py-10">
        <div className="mx-auto max-w-7xl space-y-3 px-6 text-[11px] leading-relaxed text-navy-900/60">
          <h2 className="text-xs font-bold uppercase tracking-wide text-navy-900/70">
            {disclaimer.title}
          </h2>
          {disclaimer.blocks.map((b, i) => (
            <p key={i}>{b.text}</p>
          ))}
        </div>
      </section>
    </>
  );
}
