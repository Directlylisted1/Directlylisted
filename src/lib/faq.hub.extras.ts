// lib/faq.hub.extras.ts
// -----------------------------------------------------------------------------
// Hand-written additions merged into the generated /faq hub topics at render
// time (see app/(marketing)/faq/page.tsx). These preserve the uniquely-phrased
// questions from the old homepage "Direct listing FAQ" section (lib/faq.home.ts,
// now retired) whose exact wordings are strong search targets, with answers
// enhanced with inline links. Broader versions of these answers also exist in
// the generated topic; these entries keep the specific phrasings alive.
// -----------------------------------------------------------------------------

import type { HubFaqItem } from "@/lib/faq.hub";

// Items appended to the named section of the "direct-listings" topic.
export const DIRECT_LISTING_EXTRAS: Array<{ sectionTitle: string; items: HubFaqItem[] }> = [
  {
    sectionTitle: "Requirements: NASDAQ and NYSE",
    items: [
      {
        id: "what-are-the-nasdaq-listing-tiers",
        question: "What are the NASDAQ listing tiers?",
        answerHtml:
          '<p>NASDAQ operates three tiers: the <strong>Capital Market</strong> for earlier-stage companies, the <strong>Global Market</strong>, and the <strong>Global Select Market</strong> with the most demanding financial standards. Each tier publishes its own initial and continued listing standards, and <a href="/products/nasdaq-direct-listing">direct listings</a> are permitted on each subject to the applicable rules. Most Reg A+ and growth-stage issuers target the Capital Market first and step up tiers as they scale.</p>',
        related: [
          { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
          { label: "NASDAQ Conventional Listing", href: "/products/nasdaq-conventional-listing" },
          { label: "Guides", href: "/guides" },
        ],
      },
      {
        id: "minimum-share-price-to-list-on-nasdaq",
        question: "What is the minimum share price to list on NASDAQ?",
        answerHtml:
          '<p>The standard initial listing tests require a <strong>$4 minimum bid price</strong>. The Capital Market tier offers closing-price alternatives at $3 or $2 when a company meets additional financial conditions, and <a href="/products/nasdaq-direct-listing">direct listings</a> use a valuation-based price under NASDAQ\'s direct-listing rules. NASDAQ has been tightening several standards — we confirm the live rulebook in every qualification review.</p>',
        related: [
          { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
          { label: "Issuer FAQ", href: "/faq/issuer" },
        ],
      },
      {
        id: "how-many-shareholders-does-nasdaq-require",
        question: "How many shareholders does NASDAQ require?",
        answerHtml:
          '<p>Initial listing on the Capital Market requires at least <strong>300 round-lot shareholders</strong>; the Global and Global Select tiers require 400. At least half of the minimum round-lot holders must each hold unrestricted shares worth $2,500 or more, with limited exceptions. A pre-listing <a href="/products/reg-a-plus">Reg A+</a> or <a href="/products/reg-d-506c">Reg D 506(c)</a> raise is the standard way to build that distribution while funding the balance sheet.</p>',
        related: [
          { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
        ],
      },
      {
        id: "does-nasdaq-require-market-makers",
        question: "Does NASDAQ require market makers?",
        answerHtml:
          '<p>Yes. Initial listing requires registered market makers — generally three on the Capital Market and three to four on the higher tiers depending on the standard used. We coordinate market-maker sponsorship as part of the <a href="/products/nasdaq-direct-listing">exchange application</a>, alongside the transfer agent and DTC work.</p>',
        related: [
          { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
          { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
        ],
      },
      {
        id: "does-the-nyse-allow-direct-listings",
        question: "Does the New York Stock Exchange allow direct listings?",
        answerHtml:
          '<p>Yes. The <a href="/products/nyse-direct-listing">NYSE</a> pioneered the modern direct listing — Spotify used it in 2018 — and its rules also permit primary direct listings in which the company raises new capital in the opening auction, subject to conditions. Directly Listed manages the NYSE application, the registration statement, and the opening-day mechanics end to end.</p>',
        related: [
          { label: "NYSE Direct Listing", href: "/products/nyse-direct-listing" },
          { label: "NYSE Conventional Listing", href: "/products/nyse-conventional-listing" },
        ],
      },
      {
        id: "what-are-the-nyse-american-listing-standards",
        question: "What are the NYSE American listing standards?",
        answerHtml:
          '<p>NYSE American publishes alternative financial standards based on pre-tax income, market capitalization, or total assets and revenue, each paired with minimums for stockholders\' equity and the market value of publicly held shares. A company must also meet one of the shareholder-distribution options and a minimum share price, plus the exchange\'s corporate governance rules. Note that NYSE American materially tightened its initial standards effective 2026 — including a $4.00 minimum price across all standards — so older summaries understate the bar. We qualify companies against the current rulebook for whichever <a href="/products/nyse-direct-listing">NYSE venue</a> fits their numbers.</p>',
        related: [
          { label: "NYSE Direct Listing", href: "/products/nyse-direct-listing" },
          { label: "NYSE Conventional Listing", href: "/products/nyse-conventional-listing" },
          { label: "Guides", href: "/guides" },
        ],
      },
    ],
  },
  {
    sectionTitle: "Process and Timeline",
    items: [
      {
        id: "can-a-foreign-company-do-a-us-direct-listing",
        question: "Can a foreign company do a direct listing on a U.S. exchange?",
        answerHtml:
          '<p>Yes. A foreign private issuer registers on <strong>Form F-1</strong> rather than Form S-1 and can qualify for either exchange, with accommodations that include IFRS financial statements and certain home-country governance practices. Structuring, governance, and home-jurisdiction questions need to be settled early — cross-border work is a particular focus of <a href="/about">our practice</a>. See the full <a href="#form-f1">Form F-1 &amp; Foreign Private Issuers</a> topic on this page for forty more answers.</p>',
        related: [
          { label: "NYSE Direct Listing", href: "/products/nyse-direct-listing" },
          { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
          { label: "About Directly Listed", href: "/about" },
        ],
      },
    ],
  },
];
