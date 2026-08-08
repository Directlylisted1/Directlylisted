// app/(marketing)/faq/page.tsx
// -----------------------------------------------------------------------------
// FAQ hub — "Twelve Ways To Raise. One Platform."
// A single page organizing every FAQ topic into columns of expandable
// questions: Direct Exchange Listings, Reg A+, Reg D 506(b)/(c), Reg S,
// Section 4(a)(2), S-1, Form F-1, PIPE, ELOC, Private Equity, and Hedge Funds —
// plus cards linking to the dedicated Investor FAQ and Issuer FAQ pages.
// Content comes from lib/faq.hub.ts (generated from the source Word documents,
// hyperlinks preserved) and lib/faq.hub.hedge-funds.ts. The same data feeds the
// visible copy and the FAQPage JSON-LD. Answers render inside native
// <details> disclosures — expandable without any client JS.
// -----------------------------------------------------------------------------

import Link from "next/link";
import { type HubTopic } from "@/lib/faq.hub";
import { ALL_FAQ_TOPICS, topicQuestionCount } from "@/lib/faq.hub.all";

export const metadata = {
  title: "FAQ — Twelve Ways To Raise. One Platform. | Directly Listed",
  description:
    "460+ expandable answers on direct listings, Reg A+, Reg D, Reg S, S-1 and F-1 registration, PIPEs, ELOCs, and more. Browse every structure in one FAQ.",
  alternates: { canonical: "/faq" },
};

// Ordered, merged topic list — shared with the homepage directory so counts
// always agree (see lib/faq.hub.all.ts).
const ALL_TOPICS: HubTopic[] = ALL_FAQ_TOPICS;

const AUDIENCE_CARDS = [
  {
    href: "/faq/investor",
    title: "Investor FAQ",
    body: "Investing on the platform — who can invest, accreditation, payments, liquidity, and risk.",
  },
  {
    href: "/faq/issuer",
    title: "Issuer FAQ",
    body: "Raising capital and going public — structures, costs, timelines, audits, and marketing rules.",
  },
];

const stripHtml = (html: string): string =>
  html
    .replace(/<\/li>\s*/g, "; ")
    .replace(/<\/(p|ul|ol|h\d)>\s*/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();

function hubJsonLd(topics: HubTopic[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topics.flatMap((t) =>
      t.sections.flatMap((s) =>
        s.items.map((i) => ({
          "@type": "Question",
          name: i.question,
          acceptedAnswer: { "@type": "Answer", text: stripHtml(i.answerHtml) },
        })),
      ),
    ),
  };
}

const ANSWER_CLASSES =
  "space-y-3 text-[15px] leading-relaxed text-navy-900/80 [&_a]:font-medium [&_a]:text-brand-600 [&_a:hover]:underline [&_li]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:mb-3 [&_p:last-child]:mb-0";

const EXPLORE_LINKS: Array<[string, string]> = [
  ["NASDAQ Conventional Listing", "/products/nasdaq-conventional-listing"],
  ["NASDAQ Direct Listing", "/products/nasdaq-direct-listing"],
  ["NYSE Conventional Listing", "/products/nyse-conventional-listing"],
  ["NYSE Direct Listing", "/products/nyse-direct-listing"],
  ["Regulation A+", "/products/reg-a-plus"],
  ["Regulation D 506(c)", "/products/reg-d-506c"],
  ["Regulation D 506(b)", "/products/reg-d-506b"],
  ["Regulation S", "/products/reg-s"],
  ["Section 4(a)(2) Private Offerings", "/products/section-4a2"],
  ["PIPE (Post-Listing)", "/products/pipe"],
  ["Family Offices, VC, PE & Hedge Funds", "/strategic-investors"],
  ["Equity Line of Credit (ELOC)", "/products/eloc"],
  ["Cayman Islands Structure", "/products/cayman-islands-structure"],
  ["Our Product Line", "/products"],
  ["Capital Raise Tech", "/products/capital-raise-tech"],
  ["Investor Services", "/products/investor-services"],
  ["Campaign Marketing", "/products/campaign-marketing"],
  ["About Directly Listed", "/about"],
  ["Guides", "/guides"],
  ["Current Deals & Case Studies", "/case-studies"],
];

export default function FaqHubPage() {
  const questionCount = ALL_TOPICS.reduce(
    (n, t) => n + t.sections.reduce((m, s) => m + s.items.length, 0),
    0,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd(ALL_TOPICS)) }}
      />

      {/* Hero */}
      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Twelve Ways To Raise. One Platform.
          </p>
          <h1 className="mb-3 text-5xl font-bold">Frequently Asked Questions</h1>
          <p className="max-w-3xl text-white/70">
            {questionCount}+ answers across every way to raise capital and go public on Directly
            Listed — direct exchange listings, Regulation A+, Regulation D 506(b) and 506(c),
            Regulation S, Section 4(a)(2), S-1 and F-1 registration statements, PIPE investments,
            equity lines of credit, private equity, and hedge funds. Every question expands in
            place; every answer links to the product pages behind it.
          </p>
        </div>
      </section>

      {/* Audience cards: Investor FAQ / Issuer FAQ */}
      <section className="border-b border-navy-900/10 bg-white px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2">
          {AUDIENCE_CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-2xl border border-navy-900/10 bg-brand-50 p-6 transition hover:border-brand-500"
            >
              <h2 className="mb-1 text-xl font-bold text-navy-900 group-hover:text-brand-600">
                {c.title} →
              </h2>
              <p className="text-sm text-navy-900/70">{c.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Topic directory — the "few columns" of categories */}
      <nav aria-label="FAQ topics" className="border-b border-navy-900/10 bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-5 text-2xl font-bold">Browse by topic</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_TOPICS.map((t) => {
              const count = topicQuestionCount(t);
              return (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="group rounded-xl border border-navy-900/10 p-4 transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-md"
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-navy-900 group-hover:text-brand-600">
                      {t.title}
                    </span>
                    <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-600">
                      {count} Q&amp;As
                    </span>
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-navy-900/60">
                    {t.blurb}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Topics */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="space-y-20">
          {ALL_TOPICS.map((topic) => (
            <div key={topic.id} id={topic.id} className="scroll-mt-24">
              <h2 className="mb-3 text-3xl font-bold">{topic.title}</h2>
              <div
                className="mb-8 max-w-4xl text-[15px] leading-relaxed text-navy-900/60 [&_a]:font-medium [&_a]:text-brand-600 [&_a:hover]:underline"
                dangerouslySetInnerHTML={{ __html: topic.introHtml }}
              />
              {topic.sections.map((section, si) => (
                <div key={topic.id + si} className="mb-8">
                  {section.title && (
                    <h3 className="mb-4 text-xl font-bold text-navy-900/80">{section.title}</h3>
                  )}
                  <div className="gap-8 lg:columns-2">
                    {section.items.map((item) => (
                      <details
                        key={item.id}
                        id={item.id}
                        className="group mb-4 break-inside-avoid rounded-xl border border-navy-900/10 bg-white p-5 transition hover:border-brand-500/50 open:border-l-4 open:border-brand-500 open:bg-brand-50/30 open:shadow-md"
                      >
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-extrabold leading-snug text-navy-950 transition-colors hover:text-brand-600 group-open:text-brand-700 [&::-webkit-details-marker]:hidden">
                          <span>{item.question}</span>
                          <span
                            aria-hidden
                            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-base font-bold text-brand-600 transition-transform group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <div className="mt-3 border-t border-navy-900/5 pt-3">
                          <div
                            className={ANSWER_CLASSES}
                            dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                          />
                          {item.related.length > 0 && (
                            <p className="mt-3 text-xs text-navy-900/60">
                              <span className="font-semibold uppercase tracking-wide">
                                Related:{" "}
                              </span>
                              {item.related.map((r, i) => (
                                <span key={r.href + r.label}>
                                  {i > 0 && " · "}
                                  <Link
                                    href={r.href}
                                    className="font-medium text-brand-600 hover:underline"
                                  >
                                    {r.label}
                                  </Link>
                                </span>
                              ))}
                            </p>
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-16 rounded-2xl border border-navy-900/10 bg-brand-50 p-8">
          <h2 className="mb-3 text-2xl font-bold">Ready to plan your raise?</h2>
          <p className="text-[15px] leading-relaxed text-navy-900/80">
            Tell us about your planned offering — a{" "}
            <Link href="/products/nasdaq-direct-listing" className="font-medium text-brand-600 hover:underline">
              direct listing
            </Link>
            ,{" "}
            <Link href="/products/reg-a-plus" className="font-medium text-brand-600 hover:underline">
              Reg A+
            </Link>
            ,{" "}
            <Link href="/products/reg-d-506c" className="font-medium text-brand-600 hover:underline">
              Reg D
            </Link>
            ,{" "}
            <Link href="/products/reg-s" className="font-medium text-brand-600 hover:underline">
              Reg S
            </Link>
            , or a full{" "}
            <Link href="/products/nyse-conventional-listing" className="font-medium text-brand-600 hover:underline">
              conventional IPO
            </Link>
            . Every deal gets its own flat-fee quotation, and we scope the exemption, exchange, and
            timeline before any money is spent.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/book" className="btn-dark">
              Book a listing consultation
            </Link>
            <Link href="/get-started" className="btn-outline">
              Tell us about your raise
            </Link>
          </div>
        </div>

        {/* Explore the platform */}
        <div className="mt-14">
          <h2 className="mb-4 text-2xl font-bold">Explore Directly Listed</h2>
          <p className="mb-5 text-sm text-navy-900/60">Everything on the platform, in one place:</p>
          <ul className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 md:grid-cols-3">
            {EXPLORE_LINKS.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="font-medium text-brand-600 hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 border-t border-navy-900/10 pt-6 text-xs leading-relaxed text-navy-900/60">
          Directly Listed is a technology platform operated by Adamson Brothers Corp. and is not a
          registered broker-dealer, investment adviser, funding portal, or law firm. Offerings are
          conducted by issuers in reliance on their own securities exemptions; U.S. securities law
          matters are handled in co-counsel with U.S.-admitted securities attorneys. Third-party and
          exchange fees cited are approximate and change over time. Nothing on this page is legal,
          investment, or tax advice, or an offer to sell or a solicitation of an offer to buy any
          security. Investing involves risk, including loss of principal. Consult your own
          professional advisors.
        </p>
      </section>
    </>
  );
}
