import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulatory History — Directly Listed",
  description:
    "Regulatory and professional history of Andy Altahawi — international attorney, veteran investment banker, and capital markets consultant.",
  alternates: { canonical: "/regulatory-history" },
};

type Block =
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ulLead"; items: { lead: string; text: string }[] };

const BLOCKS: Block[] = [
  { t: "h2", text: "Executive Summary" },
  {
    t: "p",
    text: "Andy Altahawi is a dual-discipline professional whose career uniquely combines more than three decades of senior-level U.S. investment banking with an equally long-standing international legal practice. Few advisors in the global capital markets bring both qualifications in equal measure — and fewer still can apply them, in tandem, to the structuring, listing, and post-listing oversight of cross-border issuers seeking access to the world's most demanding exchanges.",
  },
  {
    t: "p",
    text: "Mr. Altahawi has spent his career operating at the intersection of three disciplines: U.S. securities law and SEC compliance, exchange qualification on NYSE and NASDAQ, and international corporate structuring. He has been involved — directly and through advisory mandates — in hundreds of public offerings, billions of dollars of capital raised, and a series of landmark transactions that span multiple decades, market cycles, and regulatory regimes.",
  },

  { t: "h2", text: "Career Pillars" },
  { t: "h3", text: "Prudential Securities — Senior Investment Banker (1994–1999)" },
  {
    t: "p",
    text: "Mr. Altahawi began his U.S. investment banking career at Prudential Securities, one of the most prominent full-service investment banks of its era and a recognized force in U.S. equity and debt underwriting throughout the 1990s. He held the title of Senior Vice President in the Investment Banking division, where he led and supported high-profile public offerings, private placements, mergers and acquisitions, road shows, and structured corporate finance assignments.",
  },
  {
    t: "p",
    text: "During that period, Prudential Securities was led by Wick Simons, the former Chairman of NASDAQ, who served as Chairman and Chief Executive Officer of Prudential Securities. Mr. Altahawi worked under Mr. Simons' leadership during this transformative chapter in the firm's history, gaining direct exposure to the highest standards of capital markets execution from one of the most respected figures in U.S. exchange history.",
  },
  {
    t: "p",
    text: "His work at Prudential placed him at the center of a number of headline equity offerings of the 1990s, including the Cali Realty IPO and follow-on transactions, along with a wide range of REIT, technology, and growth-company financings. The combination of underwriting discipline, road-show execution, and institutional investor coverage that defined Prudential Securities in that era continues to inform Mr. Altahawi's advisory approach today.",
  },
  { t: "h3", text: "Adamson Brothers — Founder & CEO (1998 – Present)" },
  {
    t: "p",
    text: "In 1998, Mr. Altahawi founded Adamson Brothers, a full-service U.S. broker-dealer and investment banking firm registered with FINRA (CRD #46684). Under his leadership, Adamson Brothers grew into a multi-office firm engaged in equity and bond trading, options, mutual funds, market making, and a robust corporate finance practice covering IPOs, follow-on offerings, private placements, SPACs, reverse mergers, and structured financings.",
  },
  {
    t: "p",
    text: "Through Adamson Brothers, Mr. Altahawi took hundreds of companies public on U.S. exchanges and the OTC markets, and the firm was credited with raising billions of dollars in IPO and follow-on financings on behalf of issuer clients across technology, life sciences, real estate, financial services, energy, and industrial sectors. Adamson Brothers maintained an unblemished compliance record throughout its broker-dealer operations — neither the firm nor Mr. Altahawi personally were ever the subject of a customer complaint or a regulatory citation from FINRA, the SEC, or the NASD.",
  },
  {
    t: "p",
    text: "Following the 2008 global financial crisis and the subsequent restructuring of the U.S. broker-dealer landscape, Adamson Brothers transitioned from a registered broker-dealer into a specialized capital markets advisory firm. In its advisory capacity, Adamson Brothers has continued to work with private and public issuers preparing for U.S. exchange listings, and has provided advisory input in connection with a number of widely-followed listings and direct listings on NYSE and NASDAQ — including transactions associated with companies such as Spotify and Coinbase, among others.",
  },
  { t: "h3", text: "International Legal Practice (1986 – Present)" },
  {
    t: "p",
    text: "In parallel with his U.S. capital markets career, Mr. Altahawi has maintained an active international legal practice spanning more than 33 years. He holds a Bachelor of Civil Law from Cairo University Law School (1986) and a Doctor of Philosophy in Finance from Chelsea University (2000). He is admitted as a Supreme Court attorney in his home jurisdiction and has been a member of the relevant Bar Association since 1986, with reciprocal practice rights in additional jurisdictions.",
  },
  {
    t: "p",
    text: "His legal work focuses on cross-border corporate structuring, international commercial contracts, mergers and acquisitions, joint ventures, commercial arbitration (including Bermuda-form insurance and reinsurance disputes), and corporate governance counsel for boards of directors of publicly traded companies. He has served as General Counsel to large multinational enterprises and has negotiated and arbitrated dozens of international commercial disputes through to final award.",
  },
  {
    t: "p",
    text: "This dual qualification — as both a senior U.S. investment banker and an internationally-admitted attorney — allows Mr. Altahawi to advise issuers from a holistic standpoint that very few advisors in the market can offer: combining the financial discipline of a Wall Street banker with the legal precision of an international corporate attorney.",
  },

  { t: "h2", text: "Areas of Expertise" },
  { t: "h3", text: "U.S. Capital Markets & Exchange Listings" },
  {
    t: "ul",
    items: [
      "End-to-end NYSE and NASDAQ listing preparation, qualification, and uplisting strategy",
      "Initial public offerings (IPOs), direct listings, and follow-on equity offerings",
      "Special Purpose Acquisition Companies (SPACs) — formation, business combinations, and post-merger compliance",
      "Reverse mergers and alternative public market entry strategies",
      "Regulation A+ (Tier 1 and Tier 2), Regulation D (Rule 506(b) and 506(c)), Regulation S, and Regulation Crowdfunding offerings",
      "S-1, F-1, S-3, S-4, S-8, Form 10, and Form 8-A registration statements",
      "Shelf registrations and structured shelf take-downs",
      "Private placements, PIPE transactions, and security token offerings",
      "Fairness and solvency opinions",
    ],
  },
  { t: "h3", text: "SEC Compliance & Public Company Reporting" },
  {
    t: "ul",
    items: [
      "Securities Act of 1933 — offer, sale, registration, and exemption framework",
      "Securities Exchange Act of 1934 — periodic reporting (Forms 10-K, 10-Q, 8-K)",
      "Section 13 beneficial ownership filings (Schedules 13D and 13G) and Section 16 filings (Forms 3, 4, 5)",
      "Sarbanes-Oxley and Dodd-Frank corporate governance compliance",
      "Proxy rules and information statements (14A and 14C)",
      "Tender and exchange offer rules under Section 14(d)",
      "Regulation FD compliance and insider trading frameworks",
      "Rule 144 and Rule 144A safe harbor opinion letters",
      "FINRA and DTC corporate action processing — name changes, reverse and forward splits, transfer agent and DTC clearance",
    ],
  },
  { t: "h3", text: "International Legal & Cross-Border Advisory" },
  {
    t: "ul",
    items: [
      "Cross-border M&A — asset purchases, stock purchases, mergers, and leveraged buyouts",
      "International joint ventures, partnerships, and strategic alliances",
      "Drafting and negotiation of complex commercial, distribution, manufacturing, and licensing agreements",
      "International commercial arbitration — domestic, international, insurance, and reinsurance (including Bermuda-form disputes)",
      "Structuring of foreign issuers for compliant entry into U.S. capital markets",
      "Corporate governance frameworks aligned with U.S. exchange and international standards",
    ],
  },

  { t: "h2", text: "U.S. Securities Industry Credentials" },
  {
    t: "p",
    text: "Mr. Altahawi has held an extensive set of FINRA registrations spanning supervisory, principal, and investment banking qualifications since 1994. His credentials reflect more than three decades of active, fully-licensed engagement with the U.S. securities industry and remain among the most comprehensive licensure profiles held by any independent capital markets consultant operating today.",
  },
  { t: "h3", text: "FINRA Examinations Held" },
  {
    t: "ul",
    items: [
      "Series 3 — National Commodity Futures Examination",
      "Series 4 — Registered Options Principal",
      "Series 6 — Investment Company and Variable Contracts Products Representative",
      "Series 7 — General Securities Representative",
      "Series 24 — General Securities Principal",
      "Series 55 — Equity Trader",
      "Series 63 — Uniform Securities Agent State Law",
      "Series 65 — Uniform Investment Adviser Law",
      "Series 79 — Investment Banking Representative",
    ],
  },

  { t: "h2", text: "Education & Bar Admissions" },
  {
    t: "ul",
    items: [
      "Doctor of Philosophy (Ph.D.) in Finance — Chelsea University, 2000",
      "Bachelor of Civil Law — Cairo University Law School, 1986",
      "Supreme Court Attorney and member of the Egyptian Bar Association since 1986, with reciprocal admissions in additional jurisdictions",
    ],
  },

  { t: "h2", text: "Distinguishing Strengths" },
  {
    t: "ulLead",
    items: [
      {
        lead: "Dual qualification.",
        text: "A senior U.S. investment banker and an internationally-admitted attorney — a combination that allows clients to receive financial structuring advice and legal counsel from a single source, without the friction of coordinating between separate banking and legal teams.",
      },
      {
        lead: "Pedigree.",
        text: "Trained inside one of the leading U.S. investment banks of the 1990s, Prudential Securities, under the leadership of former NASDAQ Chairman Wick Simons. That foundation continues to inform every aspect of his execution discipline.",
      },
      {
        lead: "Track record.",
        text: "Hundreds of issuer engagements, billions raised across IPOs and follow-on offerings, and advisory exposure to high-profile direct listings on NYSE and NASDAQ.",
      },
      {
        lead: "Compliance integrity.",
        text: "Adamson Brothers operated for nearly a decade as a multi-office FINRA-registered broker-dealer without a single customer complaint or regulatory citation — a record that distinguishes Mr. Altahawi from virtually every comparable market participant.",
      },
      {
        lead: "Global perspective.",
        text: "More than 33 years of international legal practice covering cross-border M&A, joint ventures, commercial arbitration, and the structuring of foreign issuers for compliant entry into U.S. capital markets.",
      },
      {
        lead: "Investor-focused, results-driven advisory.",
        text: "Each engagement is structured around the client's commercial objectives, the realistic standards of the target U.S. exchange, and the long-term sustainability of the issuer's public market presence.",
      },
    ],
  },

  { t: "h2", text: "Current Practice" },
  {
    t: "p",
    text: "Through Adamson Brothers Corp., Mr. Altahawi continues to consult with emerging companies, mid-cap issuers, and international corporate clients on the full spectrum of U.S. capital markets activity. His current practice emphasizes:",
  },
  {
    t: "ul",
    items: [
      "NYSE and NASDAQ listing readiness, qualification, and uplisting",
      "Preparation of SEC-style documentation for S-1, F-1, Reg A+, Reg D, and shelf registrations",
      "SPAC structuring, execution, and post-business-combination integration",
      "Capital formation strategy, investor-grade documentation, and road-show preparation",
      "Cross-border advisory for international issuers entering U.S. markets",
      "Corporate governance counsel — boards, bylaws, and reporting frameworks aligned with public market expectations",
    ],
  },
  {
    t: "p",
    text: "Mr. Altahawi's clients range from high-growth private companies preparing for their first public listing to established international corporations seeking access to U.S. capital markets through IPOs, direct listings, SPACs, or alternative routes. His approach is methodical, investor-focused, and results-driven — designed to position each client not merely for a successful listing, but for sustainable long-term performance on the world's most competitive exchanges.",
  },
];

export default function RegulatoryHistoryPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-14 pt-36 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">Regulatory History</h1>
          <p className="mt-3 text-sm text-white/70">
            Professional and regulatory history of the firm&apos;s founding advisor.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-14">
        {/* Document header */}
        <header className="mb-10 border-b border-navy-900/10 pb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy-900">ANDY ALTAHAWI</h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-navy-900/70">
            International Attorney &nbsp;|&nbsp; Veteran Investment Banker &nbsp;|&nbsp; Capital Markets Consultant
          </p>
          <p className="mt-2 text-sm text-navy-900/60">
            andyaltahawi.com &nbsp;&nbsp;|&nbsp;&nbsp; directlylisted.com &nbsp;&nbsp;|&nbsp;&nbsp; andy@andyaltahawi.com
          </p>
        </header>

        <div className="space-y-5 text-sm leading-relaxed text-navy-900/85">
          {BLOCKS.map((b, i) => {
            switch (b.t) {
              case "h2":
                return (
                  <h2 key={i} className="pt-6 text-xl font-bold text-navy-900">
                    {b.text}
                  </h2>
                );
              case "h3":
                return (
                  <h3 key={i} className="pt-3 text-base font-bold text-navy-900">
                    {b.text}
                  </h3>
                );
              case "p":
                return <p key={i}>{b.text}</p>;
              case "ul":
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6">
                    {b.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              case "ulLead":
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6">
                    {b.items.map((it, j) => (
                      <li key={j}>
                        <strong className="font-semibold text-navy-900">{it.lead}</strong> {it.text}
                      </li>
                    ))}
                  </ul>
                );
            }
          })}
        </div>
      </section>
    </>
  );
}
