// components/FaqPage.tsx
// -----------------------------------------------------------------------------
// Category-driven FAQ page renderer, shared by /faq/issuer and /faq/investor.
// Content comes from lib/faq.issuer.ts / lib/faq.investor.ts — the same data
// feeds the visible copy and the FAQPage JSON-LD, so schema matches the page
// word for word. Answers render as real text (no JS-only accordions).
// -----------------------------------------------------------------------------

import Link from "next/link";
import type { FaqCategory, FaqItem } from "@/lib/faq.issuer";

const EXPLORE_LINKS: Array<[string, string]> = [
  ["NASDAQ Conventional Listing", "/products/nasdaq-conventional-listing"],
  ["NASDAQ Direct Listing", "/products/nasdaq-direct-listing"],
  ["NYSE Conventional Listing", "/products/nyse-conventional-listing"],
  ["NYSE Direct Listing", "/products/nyse-direct-listing"],
  ["Regulation A+", "/products/reg-a-plus"],
  ["Regulation D 506(c)", "/products/reg-d-506c"],
  ["Regulation D 506(b)", "/products/reg-d-506b"],
  ["Regulation S", "/products/reg-s"],
  ["PIPE (Post-Listing)", "/products/pipe"],
  ["Family Offices, VC, PE & Hedge Funds", "/strategic-investors"],
  ["Equity Line of Credit (ELOC)", "/products/eloc"],
  ["Our Product Line", "/products"],
  ["Capital Raise Tech", "/products/capital-raise-tech"],
  ["Investor Services", "/products/investor-services"],
  ["Campaign Marketing", "/products/campaign-marketing"],
  ["About Directly Listed", "/about"],
  ["Guides", "/guides"],
  ["Current Deals & Case Studies", "/case-studies"],
];

function faqJsonLd(categories: FaqCategory[]) {
  const items = categories.flatMap((c) => c.items);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answerText },
    })),
  };
}

function AnswerBody({ item }: { item: FaqItem }) {
  if (item.answerHtml) {
    return (
      <div
        className="space-y-3 text-[15px] leading-relaxed text-navy-900/80 [&_a]:font-medium [&_a]:text-brand-600 [&_a:hover]:underline [&_li]:leading-relaxed [&_table]:w-full [&_table]:text-sm [&_td]:border-b [&_td]:border-navy-900/5 [&_td]:px-3 [&_td]:py-2 [&_th]:border-b [&_th]:border-navy-900/10 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5"
        dangerouslySetInnerHTML={{ __html: item.answerHtml }}
      />
    );
  }
  return (
    <p className="text-[15px] leading-relaxed text-navy-900/80">{item.answerText}</p>
  );
}

export function FaqPage({
  title,
  subtitle,
  categories,
  crossLink,
  closingHeading,
  closingBody,
  disclaimer,
}: {
  title: string;
  subtitle: string;
  categories: FaqCategory[];
  crossLink: { label: string; href: string };
  closingHeading: string;
  closingBody: React.ReactNode;
  disclaimer: string;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(categories)) }}
      />

      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-3 text-5xl font-bold">{title}</h1>
          <p className="max-w-3xl text-white/70">{subtitle}</p>
          <p className="mt-4 text-sm text-white/60">
            Looking at this from the other side of the table?{" "}
            <Link href={crossLink.href} className="font-semibold text-accent hover:underline">
              {crossLink.label} →
            </Link>
          </p>
        </div>
      </section>

      {/* Jump navigation */}
      <nav aria-label="FAQ sections" className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-6 py-4">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full border border-navy-900/15 px-4 py-1.5 text-xs font-semibold text-navy-900/70 hover:border-brand-500 hover:text-brand-600"
            >
              {c.title}
            </a>
          ))}
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <h2 className="mb-2 text-3xl font-bold">{category.title}</h2>
              {category.intro && (
                <p className="mb-8 text-[15px] leading-relaxed text-navy-900/60">
                  {category.intro}
                </p>
              )}
              <div className="space-y-10">
                {category.items.map((item) => (
                  <div key={item.id} id={item.id} className="scroll-mt-24">
                    <h3 className="mb-2 text-xl font-bold">{item.question}</h3>
                    <AnswerBody item={item} />
                    {item.related && item.related.length > 0 && (
                      <p className="mt-3 text-xs text-navy-900/60">
                        <span className="font-semibold uppercase tracking-wide">Related: </span>
                        {item.related.map((r, i) => (
                          <span key={r.href + r.label}>
                            {i > 0 && " · "}
                            <Link href={r.href} className="font-medium text-brand-600 hover:underline">
                              {r.label}
                            </Link>
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-16 rounded-2xl border border-navy-900/10 bg-brand-50 p-8">
          <h2 className="mb-3 text-2xl font-bold">{closingHeading}</h2>
          <div className="text-[15px] leading-relaxed text-navy-900/80">{closingBody}</div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/book" className="btn-dark">Book a listing consultation</Link>
            <Link href="/get-started" className="btn-outline">Tell us about your raise</Link>
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
          {disclaimer}
        </p>
      </section>
    </>
  );
}
