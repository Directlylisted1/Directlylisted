import Link from "next/link";
import { PromoVideo } from "@/components/PromoVideo";

export const metadata = {
  title: "About Us — Directly Listed",
  description:
    "Directly Listed (Adamson Brothers Corp.) is a B2B institutional technology platform for going public without an IPO.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-20 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-5xl font-bold">About Directly Listed</h1>
          <p className="max-w-2xl text-white/70">
            Industry-leading exchange direct listing advisors. We built the
            platform we wished existed: one place to plan an exemption, execute
            documents, onboard investors, process funds, and take a company to
            NASDAQ or NYSE — without the IPO.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-16 max-w-3xl">
          <PromoVideo settingKey="promo_default" title="About Directly Listed" />
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="card !p-8">
            <h2 className="mb-3 text-xl font-bold">Who We Are</h2>
            <p className="text-sm leading-relaxed text-navy-900/75">
              Directly Listed is operated by Adamson Brothers Corp. We are a
              B2B institutional technology platform — not a registered
              broker-dealer, investment advisor, or funding portal. Offerings
              on the platform are conducted by issuers in reliance on their own
              securities exemptions.
            </p>
          </div>
          <div className="card !p-8">
            <h2 className="mb-3 text-xl font-bold">What We Do</h2>
            <p className="text-sm leading-relaxed text-navy-900/75">
              We manage listing readiness, SEC registration and Edgarization,
              exchange applications, and capital raises across Reg D, Reg A+,
              Reg S, PIPE, and institutional equity lines of credit — with
              SEC-licensed attorneys, consultants, and listing advisors paid
              out of one flat fee per deal.
            </p>
          </div>
          <div className="card !p-8">
            <h2 className="mb-3 text-xl font-bold">How We Charge</h2>
            <p className="text-sm leading-relaxed text-navy-900/75">
              Every deal is quoted individually: a flat platform fee plus an
              equity grant at signing, both set by the scope of services and
              your company&apos;s stage. No percentage-of-raise surprises.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/get-started" className="btn-dark">Get Started</Link>
        </div>
      </section>

      {/* ============ OUR STORY ============ */}
      <section className="bg-brand-50/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-6 text-4xl font-bold">Our Story</h2>
          <p className="mb-10 text-lg leading-relaxed text-navy-900/80">
            Directly Listed didn&apos;t begin as a website. It began as a career —
            more than three decades of taking companies public on America&apos;s
            exchanges, and learning, deal by deal, exactly where the old way
            breaks.
          </p>

          <h3 className="mb-3 text-xl font-bold">A regional investment bank, built from the ground up</h3>
          <p className="mb-4 text-sm leading-relaxed text-navy-900/80">
            In 1999, our founding principal established Adamson Brothers, Inc., a
            full-service, SEC- and FINRA-registered investment bank (CRD #46684 /
            SEC #8-51508). It was not a storefront. Over the years that followed,
            Adamson Brothers grew into a genuine regional powerhouse — a
            multi-office broker-dealer with operations across the United States,
            engaged in equity and bond trading, options, market making, and a
            deep corporate-finance practice spanning IPOs, follow-on offerings,
            private placements, reverse mergers, and structured financings.
          </p>
          <p className="mb-4 text-sm leading-relaxed text-navy-900/80">
            Through that firm, our principal helped take hundreds of companies
            public on U.S. exchanges and the OTC markets, across technology, life
            sciences, real estate, financial services, energy, and industrial
            sectors. The discipline of that era — underwriting rigor, exchange
            qualification, road-show execution, and investor coverage — became the
            foundation for everything we do today.
          </p>
          <p className="mb-10 text-sm leading-relaxed text-navy-900/80">
            You can review the firm&apos;s registration history directly on FINRA
            BrokerCheck:{" "}
            <a
              href="https://brokercheck.finra.org/firm/summary/46684"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-600 hover:underline"
            >
              Adamson Brothers, Inc. — FINRA BrokerCheck (CRD #46684)
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>

          <h3 className="mb-3 text-xl font-bold">2008 changed the landscape — but not the mission</h3>
          <p className="mb-4 text-sm leading-relaxed text-navy-900/80">
            When the 2008 financial crisis reshaped the U.S. broker-dealer
            industry, Adamson Brothers, like many regional banks of its
            generation, ultimately closed its broker-dealer doors. But the people
            behind it never left the work.
          </p>
          <p className="mb-10 text-sm leading-relaxed text-navy-900/80">
            In the years since, our principal and the team around him have
            continued — without interruption, to this day — as exchange listing
            consultants and capital-markets advisors, guiding private and public
            issuers through the path to NASDAQ and NYSE. That uninterrupted,
            hands-on advisory work is exactly what revealed the gap in the market
            — and what prompted us to build DirectlyListed.com.
          </p>

          <h3 className="mb-3 text-xl font-bold">The platform we wished existed</h3>
          <p className="mb-4 text-sm leading-relaxed text-navy-900/80">
            We had spent careers watching capable companies get worn down by a
            process that was fragmented, opaque, and priced as a percentage of
            their hard-won capital. Listing readiness lived with one firm,
            registration and Edgarization with another, exchange applications with
            a third, the capital raise with a fourth — each with its own clock,
            its own invoice, and its own version of the truth.
          </p>
          <p className="mb-4 text-sm leading-relaxed text-navy-900/80">
            So we built the platform we always wished we&apos;d had: one place to
            plan an exemption, execute documents, onboard investors, process
            funds, and take a company to NASDAQ or NYSE — without the IPO. Reg D
            506(b) and 506(c), Reg A+, Reg S, PIPE, and institutional equity lines
            of credit, supported by SEC-licensed attorneys, consultants, and
            listing advisors — paid out of one flat fee per deal, with no
            percentage-of-raise surprises.
          </p>
          <p className="mb-10 text-sm leading-relaxed text-navy-900/80">
            Directly Listed is operated by Adamson Brothers Corp. It is a B2B
            institutional technology platform — not a registered broker-dealer,
            investment advisor, or funding portal. Offerings on the platform are
            conducted by issuers in reliance on their own securities exemptions.
          </p>

          <h3 className="mb-3 text-xl font-bold">Why it matters</h3>
          <p className="mb-10 text-sm leading-relaxed text-navy-900/80">
            Decades of building a national broker-dealer, and decades more
            advising issuers through every market cycle since, taught us one thing
            above all: going public should be a disciplined, transparent,
            well-advised process — not a maze. That conviction is the reason
            Directly Listed exists.
          </p>

          <div className="rounded-2xl border border-navy-900/10 bg-white p-6 text-xs leading-relaxed text-navy-900/70">
            <h3 className="mb-2 text-sm font-bold text-navy-900">Important Disclosure</h3>
            <p>
              The principal behind Directly Listed, Andy Altahawi, previously
              resolved an allegation brought by the U.S. Securities and Exchange
              Commission by way of a settlement, entered into without admitting or
              denying the allegations. That matter did not, and does not, prevent
              him from acting as a listing advisor and consultant to
              emerging-growth companies seeking exchange listings, and he has
              continued to serve in that advisory and consulting capacity. Adamson
              Brothers Corp. operates Directly Listed as a technology platform and
              is not a registered broker-dealer, investment advisor, or funding
              portal. Investing involves risk, including loss of principal.
            </p>
          </div>

          <div className="mt-10">
            <Link href="/get-started" className="btn-dark">Get Started</Link>
          </div>
        </div>
      </section>
    </>
  );
}
