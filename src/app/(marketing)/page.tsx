import Link from "next/link";
import { db } from "@/lib/db";
import { PRODUCTS, fmtMoney, productByType } from "@/lib/offering-types";
import { loadLegalDoc } from "@/lib/legal";
import { HeroBackground } from "@/components/HeroBackground";
import { PromoVideo } from "@/components/PromoVideo";
import { CountUpStat } from "@/components/CountUpStat";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqGraph } from "@/lib/jsonld";

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
          className="pointer-events-none absolute bottom-[-4rem] left-0 right-0 select-none text-center font-black tracking-tighter text-white/5"
          style={{ fontSize: "clamp(6rem, 18vw, 16rem)", lineHeight: 1 }}
        >
          directlylisted
        </div>
        <div className="relative z-10 w-full px-4 pt-28 sm:px-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Strategic &amp; Elevated
          </div>
          <div className="mb-10 max-w-md border-t border-white/30 pt-4 text-sm text-white/80">
            The Future of Retail Capital.{" "}
            <span className="font-semibold text-accent">Empower Your Raise.</span>
          </div>
          <div className="space-y-8">
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
            <Link href="/get-started" className="btn-primary">Get Started</Link>
            <Link href="/offerings" className="btn-light">View Live Offerings</Link>
          </div>
        </div>
      </section>

      {/* ============ FEATURED DEALS (three flagship cards, stacked on mobile) ============ */}
      {featured.length > 0 && (
        <section className="grid bg-navy-950 md:grid-cols-3">
          {slots.map((o, i) =>
            o ? (
              <div
                key={o.id}
                className="relative flex min-h-[460px] flex-col justify-end p-10 text-white"
                style={{
                  background: `linear-gradient(180deg, ${o.heroColor}cc 0%, #061629 100%)`,
                }}
              >
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold leading-tight">{o.headline || o.name}</div>
                    <div className="mt-1 text-sm text-white/70">{o.subheadline || o.tagline}</div>
                  </div>
                  <div className="flex gap-8">
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
                  <Link href={`/offerings/${o.slug}`} className="btn-primary !py-2.5">
                    Learn More
                  </Link>
                </div>
                <span className="absolute right-10 top-10 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                  {productByType(o.type).shortLabel}
                </span>
              </div>
            ) : (
              // Branded placeholder keeps the row full when a slot is empty —
              // no white gap when an offering's status changes.
              <div
                key={`slot-${i}`}
                className="relative flex min-h-[460px] flex-col items-center justify-center gap-4 p-10 text-center text-white"
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
        </section>
      )}

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
