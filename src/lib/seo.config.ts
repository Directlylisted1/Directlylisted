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
// The sameAs array links the founder's other properties so Google consolidates
// all of them into one Person entity (the same block, with the url adjusted
// per site, is embedded across the whole network).
export const AUTHOR = {
  name: "Andy Altahawi",
  jobTitle: "Investment Banker & International Attorney",
  sameAs: [
    "https://andyaltahawi.com/",
    "https://dpo.work/",
    "https://andyaltahawisec.com/",
    "https://andyaltahawiattorney.com/",
    "https://andyaltahawi-losangeles.com/",
    "https://andyaltahawilaw.com/",
    "https://andyaltahawi.org/",
    "https://andyaltahawifoundation.com/",
  ],
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
    title: "Direct NASDAQ & NYSE Listings | Go Public Without an IPO",
    description:
      "Directly Listed prepares companies for direct listings on NASDAQ and NYSE. Led by a 30-year Wall Street banker and international attorney. Talk to us today.",
    definition:
      "A direct listing lets a company list its shares on a national exchange without an underwritten offering — no syndicate, no roadshow priced by intermediaries, no mandatory lock-up.",
    keywords: [
      "how to go public without an IPO",
      "direct exchange listing platform",
      "going public advisor",
      "raise capital and go public",
      "direct NASDAQ listing",
      "direct NYSE listing",
    ],
  },

  "nasdaq-direct-listing": {
    path: "/products/nasdaq-direct-listing",
    title: "NASDAQ Direct Listing — Go Public Without an IPO",
    description:
      "List directly on NASDAQ without an IPO. Listing readiness, SEC registration, Edgarization and the exchange application, end to end. Get a flat-fee quote.",
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
    title: "NASDAQ Conventional Listing + Primary Offering",
    description:
      "A conventional NASDAQ listing with a registered primary offering — raise new capital as you go public, managed end to end. Get a flat-fee quote.",
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
      "NYSE Direct Listing — Big Board, No Underwriters",
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
    title: "NYSE Conventional Listing with Capital Raise",
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
      "Regulation A+ — Raise Up to $75M a Year (Mini-IPO)",
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
      "Regulation D 506(c) — Advertise, Raise Unlimited",
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
      "Regulation D 506(b) — Private Unlimited Raise",
    description:
      "Raise unlimited capital privately from investors you already know — no general solicitation, self-certified accreditation. Scope your raise today.",
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
    title: "Regulation S — Raise From International Investors",
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
      "PIPE Financing — Institutional Capital Post-Listing",
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
      "Equity Line of Credit (ELOC) — Standby Capital",
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

  "section-4a2": {
    path: "/products/section-4a2",
    title:
      "Section 4(a)(2) Private Offerings — Raise Unlimited",
    description:
      "Raise unlimited capital from sophisticated investors under Section 4(a)(2) — the statutory exemption beneath every Reg D round. Scope your deal today.",
    definition:
      "Section 4(a)(2) of the Securities Act of 1933 exempts transactions by an issuer not involving any public offering — the original private-placement exemption, with no dollar limit, on which the Rule 506(b) and 506(c) safe harbors are built.",
    keywords: [
      "Section 4(a)(2) private offering",
      "Section 4(a)(2) exemption",
      "statutory private placement",
      "private placement without registration",
      "sophisticated investor exemption",
      "Ralston Purina private offering",
    ],
  },

  "cayman-islands-structure": {
    path: "/products/cayman-islands-structure",
    title:
      "Cayman Islands Structure — List on NASDAQ or NYSE",
    description:
      "The cross-border route to a U.S. listing: a tax-neutral Cayman holding company with foreign private issuer status on NASDAQ or NYSE. Get a quote.",
    definition:
      "The Cayman Islands structure places a Cayman exempted holding company above the operating group so its shares — or American Depositary Shares — can list on NASDAQ or the NYSE with tax-neutral treatment, foreign private issuer status, and home-country governance.",
    keywords: [
      "Cayman Islands holding company listing",
      "Cayman structure NASDAQ NYSE",
      "foreign private issuer Form F-1",
      "Cayman exempted company",
      "cross-border U.S. listing structure",
      "offshore holding company IPO",
    ],
  },
};
