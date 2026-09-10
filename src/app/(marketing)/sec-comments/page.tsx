// app/(marketing)/sec-comments/page.tsx
// -----------------------------------------------------------------------------
// Andy Altahawi — public SEC comment letters. Each letter links directly to
// the PDF as published in the SEC's permanent public comment file; the page
// deliberately carries no "submit your own comment" call to action.
// -----------------------------------------------------------------------------

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Andy Altahawi — Public SEC Comments | Directly Listed",
  description:
    "Andy Altahawi's public comment letters to the U.S. Securities and Exchange Commission — Regulation NMS, 24-hour trading, electronic delivery, and crypto assets.",
  alternates: { canonical: "/sec-comments" },
};

type CommentLetter = {
  fileNo: string;
  title: string;
  description: string;
  pdf: string;
};

const LETTERS: CommentLetter[] = [
  {
    fileNo: "File No. S7-2026-20",
    title:
      "The Trade-Through Rule and Locked and Crossed Markets Provisions of Regulation NMS",
    description:
      "The Commission is revisiting two pillars of Regulation NMS, the 2005 framework that governs how the U.S. national market system routes and prices orders: the trade-through rule (Rule 611), which requires trading centers to honor better-priced displayed quotations on other exchanges, and the provisions restricting locked and crossed markets. The review asks whether rules written for a slower, less consolidated market still serve investors in today's high-speed, multi-venue structure. Mr. Altahawi's comment letter is part of the public file for this rulemaking.",
    pdf: "https://www.sec.gov/comments/S7-2026-20/s7202620-996359-3131006.pdf",
  },
  {
    fileNo: "File No. 4-913",
    title: "Roundtable on Preparations for 24-Hour Trading",
    description:
      "As exchanges and trading platforms move toward round-the-clock securities trading, the Commission convened a public roundtable on what a 24-hour market would demand of the national market system — market infrastructure and resilience, liquidity and price discovery outside traditional hours, investor protection, and the operational readiness of issuers, brokers, and clearing systems. Mr. Altahawi's submission is part of the public record for this roundtable.",
    pdf: "https://www.sec.gov/comments/4-913/4913-997699-3142926.pdf",
  },
  {
    fileNo: "File No. S7-2026-25",
    title: "Electronic Delivery of Information Under the Federal Securities Laws",
    description:
      "This rulemaking considers making electronic delivery the default for the information investors receive under the federal securities laws — prospectuses, reports, and shareholder communications — modernizing a paper-first framework that predates the internet, while addressing access and protections for investors who still rely on paper. Mr. Altahawi's comment letter is part of the public file for this rulemaking.",
    pdf: "https://www.sec.gov/comments/S7-2026-25/s7202625-997759-3143107.pdf",
  },
  {
    fileNo: "File No. S7-2026-27",
    title: "Regulation Crypto Assets",
    description:
      "Among the most debated questions in today's public discourse: how crypto assets should be regulated under the federal securities laws. This rulemaking takes up the framework for crypto asset offerings, trading, and custody — where the securities laws apply, how registration and disclosure should work for digital assets, and how investor protection is maintained as the market matures. Mr. Altahawi's comment letter is part of the public file for this rulemaking.",
    pdf: "https://www.sec.gov/comments/S7-2026-27/s7202627-1034939-3439347.pdf",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Andy Altahawi Public SEC Comments on Certain Regulations in the Public Discourse",
  url: "https://www.directlylisted.com/sec-comments",
  about: {
    "@type": "Person",
    name: "Andy Altahawi",
    jobTitle: "Investment Banker & International Attorney",
    url: "https://andyaltahawi.com/",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: LETTERS.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "DigitalDocument",
        name: l.title,
        description: l.description,
        url: l.pdf,
        author: { "@type": "Person", name: "Andy Altahawi" },
        publisher: {
          "@type": "Organization",
          name: "U.S. Securities and Exchange Commission",
        },
      },
    })),
  },
};

export default function SecCommentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Public comment letters · U.S. Securities and Exchange Commission
          </p>
          <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
            Andy Altahawi Public SEC Comments on Certain Regulations in the
            Public Discourse
          </h1>
          <p className="max-w-3xl text-white/70">
            Rulemaking at the U.S. Securities and Exchange Commission is a
            public process: proposed rules and roundtables are opened for
            comment, and every letter received becomes part of the permanent
            public file. Andy Altahawi — investment banker and international
            attorney, admitted to the bar in 1988 — participates in that
            process on regulations now under discussion in the public
            discourse. His comment letters are published below; each one is a
            hyperlink to the full letter as a PDF, so any reader can click
            through and read it in its entirety on sec.gov.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          {LETTERS.map((letter) => (
            <article
              key={letter.pdf}
              className="flex flex-col rounded-2xl border border-navy-900/10 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="mb-3 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                {letter.fileNo}
              </span>
              <h2 className="mb-3 text-xl font-bold leading-snug text-navy-900">
                {letter.title}
              </h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-navy-900/70">
                {letter.description}
              </p>
              <a
                href={letter.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-950"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                Read the comment letter (PDF)
                <span className="sr-only"> — opens sec.gov in a new tab</span>
              </a>
            </article>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-navy-900/70">
          All letters are published by the SEC as received and remain
          permanently available on sec.gov. Questions about any of these
          submissions:{" "}
          <a
            href="mailto:info@directlylisted.com"
            className="font-medium text-brand-600 hover:underline"
          >
            info@directlylisted.com
          </a>
          .
        </p>
      </section>
    </>
  );
}
