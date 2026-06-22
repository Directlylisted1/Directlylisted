// lib/seo.config.ts
// -----------------------------------------------------------------------------
// Central SEO configuration for Directly Listed.
// Single source of truth for site constants, the founder/author entity,
// global keyword taxonomy, and per-route metadata.
// -----------------------------------------------------------------------------

export const SITE = {
  name: "Directly Listed",
  legalName: "Adamson Brothers Corp. d/b/a Directly Listed",
  url: "https://www.directlylisted.com",
  logo: "https://www.directlylisted.com/brand/logo-light.png",
  ogImage: "https://www.directlylisted.com/opengraph-image",
  email: "info@directlylisted.com",
  telephone: "+1-949-529-2500",
  twitter: "@directlylisted",
  sameAs: [
    "https://www.linkedin.com/company/directly-listed",
    "https://x.com/directlylisted",
  ],
  locale: "en_US",
} as const;

// The founder/advisor entity — bound across Organization, Person, and author meta
// to build E-E-A-T and brand<->name association for AI search engines.
export const AUTHOR = {
  name: "Andy Altahawi",
  jobTitle: "Direct Exchange Listing Advisor",
  knowsAbout: [
    "NASDAQ direct listing",
    "NYSE direct listing",
    "Regulation A+",
    "Regulation D 506(c)",
    "Regulation D 506(b)",
    "Regulation S",
    "PIPE financing",
    "Equity Line of Credit",
    "going public without an IPO",
  ],
} as const;

// Global keyword taxonomy — reused by routes and injected into the legacy
// keywords tag + internal tagging.
export const GLOBAL_KEYWORDS: string[] = [
  "direct listing",
  "direct exchange listing",
  "direct New York exchange listing",
  "NASDAQ listing",
  "NASDAQ direct listing",
  "NASDAQ conventional listing",
  "NYSE listing",
  "New York Stock Exchange listing",
  "NYSE direct listing",
  "NYSE conventional listing",
  "IPO alternative",
  "go public without an IPO",
  "going public",
  "mini-IPO",
  "raise capital on your terms",
  "capital raising platform",
  "Regulation A+",
  "Reg A+",
  "Reg A Tier 2",
  "Regulation D",
  "Reg D 506(b)",
  "Reg D 506(c)",
  "Regulation S",
  "Reg S offshore offering",
  "PIPE",
  "post-listing PIPE",
  "private investment in public equity",
  "equity line of credit",
  "ELOC",
  "committed standby equity facility",
  "accredited investors",
  "retail capital",
  "family offices",
  "venture capital",
  "VC",
  "private equity",
  "PE",
  "hedge funds",
  "institutional investors",
  "SEC registration",
  "EDGAR",
  "Edgarization",
  "transfer agent",
  "DTC coordination",
  "KYC AML",
  "investor relations",
  "shareholder services",
  "Andy Altahawi",
  "Directly Listed",
  "directlylisted",
];

// -----------------------------------------------------------------------------
// Per-route metadata.
// `keywords` here are route-specific long-tail; GLOBAL_KEYWORDS get appended.
// `definition` is the one-sentence answer LLMs extract — render it as the lede.
// -----------------------------------------------------------------------------

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  definition: string; // first declarative sentence for the page body (GEO)
};

export const ROUTES: Record<string, RouteMeta> = {
  home: {
    path: "/",
    title:
      "Directly Listed | NASDAQ & NYSE Direct Listings, Reg A+, Reg D & ELOC",
    description:
      "Go public on your terms. NASDAQ & NYSE direct and conventional listings, Reg A+, Reg D 506(b)/(c), Reg S, PIPE & ELOC — one end-to-end platform. By Andy Altahawi.",
    definition:
      "Directly Listed is an end-to-end platform for going public and raising capital — NASDAQ and NYSE direct and conventional listings, Regulation A+, Regulation D 506(b)/506(c), Regulation S, PIPE, and equity lines of credit.",
    keywords: [
      "how to go public without an IPO",
      "direct exchange listing platform",
      "going public advisor",
      "raise capital and go public",
    ],
  },

  "nasdaq-direct-listing": {
    path: "/products/nasdaq-direct-listing",
    title: "NASDAQ Direct Listing — Go Public Without an IPO | Directly Listed",
    description:
      "List directly on NASDAQ without an IPO. We manage listing readiness, SEC registration, Edgarization & the exchange application end to end. Advisory by Andy Altahawi.",
    definition:
      "A NASDAQ direct listing lets a company go public on NASDAQ without a traditional underwritten IPO and without dilutive underwriting, while Directly Listed manages listing readiness, SEC registration, Edgarization, and the exchange application end to end.",
    keywords: [
      "how to list on NASDAQ without an IPO",
      "NASDAQ direct listing advisor",
      "NASDAQ listing requirements",
      "list directly on NASDAQ",
      "NASDAQ direct listing process",
    ],
  },

  "nasdaq-conventional-listing": {
    path: "/products/nasdaq-conventional-listing",
    title: "NASDAQ Conventional Listing + Primary Offering | Directly Listed",
    description:
      "A conventional NASDAQ listing with a registered primary offering — raise new capital as you go public, managed end to end by Directly Listed and Andy Altahawi.",
    definition:
      "A NASDAQ conventional listing is a registered primary offering that lists a company on NASDAQ while raising new capital at the same time, managed end to end by Directly Listed.",
    keywords: [
      "NASDAQ conventional listing",
      "NASDAQ IPO with primary offering",
      "raise capital going public NASDAQ",
      "conventional vs direct listing NASDAQ",
    ],
  },

  "nyse-direct-listing": {
    path: "/products/nyse-direct-listing",
    title:
      "NYSE Direct Listing — List on the Big Board Without Underwriters | Directly Listed",
    description:
      "List directly on the NYSE Big Board without dilutive underwriting. End-to-end direct exchange listing advisory from Directly Listed and Andy Altahawi.",
    definition:
      "An NYSE direct listing lets a company list on the New York Stock Exchange — the Big Board — without an IPO or dilutive underwriting, with Directly Listed handling SEC registration and the exchange application end to end.",
    keywords: [
      "NYSE direct listing advisor",
      "list on the NYSE without an IPO",
      "New York Stock Exchange direct listing",
      "Big Board direct listing",
      "direct New York exchange listing",
    ],
  },

  "nyse-conventional-listing": {
    path: "/products/nyse-conventional-listing",
    title: "NYSE Conventional Listing with Capital Raise | Directly Listed",
    description:
      "A conventional New York Stock Exchange listing with a registered primary offering — the Big Board, with new capital raised at the bell. By Directly Listed.",
    definition:
      "An NYSE conventional listing is a registered primary offering that lists a company on the New York Stock Exchange while raising new capital at the bell, managed end to end by Directly Listed.",
    keywords: [
      "NYSE conventional listing",
      "New York Stock Exchange listing with offering",
      "raise capital going public NYSE",
      "primary offering at the bell",
    ],
  },

  "reg-a-plus": {
    path: "/products/reg-a-plus",
    title:
      "Regulation A+ Offering — Raise Up to $75M/Year (Mini-IPO) | Directly Listed",
    description:
      "Raise up to $75M per year from accredited and non-accredited investors. A mini-IPO open to the public, managed end to end. Directly Listed / Andy Altahawi.",
    definition:
      "Regulation A+ is a mini-IPO that lets a company raise up to $75 million per 12-month period (Tier 2) from both accredited and non-accredited investors — open to your customers, community, and the crowd.",
    keywords: [
      "Regulation A+ Tier 2 $75M raise",
      "Reg A+ mini-IPO platform",
      "raise capital from non-accredited investors",
      "Reg A Tier 2 offering",
      "Regulation A plus offering",
    ],
  },

  "reg-d-506c": {
    path: "/products/reg-d-506c",
    title:
      "Regulation D 506(c) — Raise Unlimited Capital, Advertise Publicly | Directly Listed",
    description:
      "Advertise your raise publicly and accept unlimited capital from verified accredited investors. Compliant general solicitation built into the flow.",
    definition:
      "Regulation D 506(c) lets a company advertise its raise publicly and accept unlimited capital from accredited investors whose status is verified, with general solicitation built into the flow.",
    keywords: [
      "Reg D 506(c) general solicitation",
      "advertise a securities offering legally",
      "506(c) accredited investor verification",
      "raise unlimited capital accredited investors",
    ],
  },

  "reg-d-506b": {
    path: "/products/reg-d-506b",
    title:
      "Regulation D 506(b) — Private Unlimited Raise From Your Network | Directly Listed",
    description:
      "Raise unlimited capital privately from investors you already know — no general solicitation, self-certified accreditation. By Directly Listed and Andy Altahawi.",
    definition:
      "Regulation D 506(b) lets a company raise unlimited capital privately from investors it already knows, with no general solicitation and self-certified accreditation.",
    keywords: [
      "Reg D 506(b) private placement",
      "raise capital privately no advertising",
      "506(b) self-certified accreditation",
      "private placement platform",
    ],
  },

  "reg-s": {
    path: "/products/reg-s",
    title: "Regulation S — Raise Capital From International Investors | Directly Listed",
    description:
      "Raise capital from international investors through offshore transactions outside U.S. registration — often run alongside a Reg D round. By Directly Listed.",
    definition:
      "Regulation S lets a company raise capital from international investors through offshore transactions outside U.S. registration, often run alongside a Regulation D round.",
    keywords: [
      "Regulation S offshore offering",
      "raise capital from international investors",
      "Reg S offshore transaction",
      "Reg S and Reg D combined raise",
    ],
  },

  pipe: {
    path: "/products/pipe",
    title:
      "PIPE Financing (Post-Listing) — Institutional Capital After You List | Directly Listed",
    description:
      "Private investment in public equity — institutional capital placed directly into your company after it lists, at a negotiated price. By Directly Listed.",
    definition:
      "A PIPE (private investment in public equity) is institutional capital placed directly into a company after it lists, at a negotiated price.",
    keywords: [
      "post-listing PIPE financing",
      "private investment in public equity",
      "PIPE deal institutional investors",
      "negotiated PIPE placement",
    ],
  },

  eloc: {
    path: "/products/eloc",
    title:
      "Equity Line of Credit (ELOC) — Committed Standby Equity Facility | Directly Listed",
    description:
      "A committed standby equity facility from institutional investors — draw capital when you need it, on your timeline. Equity Line of Credit by Directly Listed.",
    definition:
      "An Equity Line of Credit (ELOC) is a committed standby equity facility from institutional investors that lets a public company draw capital when it needs it, on its own timeline — up to $350M in committed capital after listing.",
    keywords: [
      "equity line of credit ELOC",
      "committed standby equity facility",
      "draw-down equity financing",
      "standby equity distribution agreement",
      "ELOC for public companies",
    ],
  },
};
