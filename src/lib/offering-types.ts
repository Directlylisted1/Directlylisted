import type { OfferingType } from "@prisma/client";

export type ProductInfo = {
  type: OfferingType;
  slug: string;
  label: string;
  shortLabel: string;
  raiseLimit: string;
  audience: string;
  blurb: string;
  highlights: string[];
};

export const PRODUCTS: ProductInfo[] = [
  {
    type: "REG_D_506B",
    slug: "reg-d-506b",
    label: "Regulation D 506(b)",
    shortLabel: "Reg D 506(b)",
    raiseLimit: "Unlimited",
    audience: "Accredited investors + up to 35 sophisticated non-accredited",
    blurb:
      "Raise unlimited capital privately from investors you already know — no general solicitation, self-certified accreditation.",
    highlights: [
      "No cap on the raise amount",
      "Self-certification of accredited status",
      "Up to 35 sophisticated non-accredited investors",
      "No general solicitation or advertising",
    ],
  },
  {
    type: "REG_D_506C",
    slug: "reg-d-506c",
    label: "Regulation D 506(c)",
    shortLabel: "Reg D 506(c)",
    raiseLimit: "Unlimited",
    audience: "Verified accredited investors only",
    blurb:
      "Advertise your raise publicly and accept unlimited capital from accredited investors with verification built into the flow.",
    highlights: [
      "General solicitation permitted — market the deal anywhere",
      "Unlimited raise amount",
      "Accreditation verification workflow built in",
      "Faster close with integrated eSign and payments",
    ],
  },
  {
    type: "REG_A_PLUS",
    slug: "reg-a-plus",
    label: "Regulation A+",
    shortLabel: "Reg A+",
    raiseLimit: "$75M / yr",
    audience: "Everyone — retail and accredited investors",
    blurb:
      "A mini-IPO open to the public. Raise up to $75M per year from your customers, community, and the crowd.",
    highlights: [
      "Raise up to $75M every 12 months (Tier 2)",
      "Open to non-accredited investors with limits",
      "Freely tradable securities for investors",
      "Test-the-waters marketing before qualification",
    ],
  },
  {
    type: "REG_S",
    slug: "reg-s",
    label: "Regulation S",
    shortLabel: "Reg S",
    raiseLimit: "Unlimited",
    audience: "Non-U.S. investors in offshore transactions",
    blurb:
      "Raise capital from international investors through offshore transactions outside U.S. registration — often run alongside a Reg D round.",
    highlights: [
      "Unlimited raise from non-U.S. investors",
      "Runs in parallel with a Reg D 506(c) tranche",
      "Offshore transaction compliance workflows built in",
      "Distribution compliance period tracking",
    ],
  },
  {
    type: "PIPE",
    slug: "pipe",
    label: "PIPE (Post-Listing)",
    shortLabel: "PIPE",
    raiseLimit: "Negotiated",
    audience: "Institutional investors in listed companies",
    blurb:
      "Private investment in public equity — institutional capital placed directly into your company after it lists, at a negotiated price.",
    highlights: [
      "Institutional capital after your listing",
      "Negotiated pricing and registration rights",
      "Faster than a follow-on public offering",
      "Pairs with resale registration on Form S-1/S-3",
    ],
  },
  {
    type: "NASDAQ_LISTING",
    slug: "nasdaq-conventional-listing",
    label: "NASDAQ Conventional Listing",
    shortLabel: "NASDAQ IPO",
    raiseLimit: "Exchange listed",
    audience: "Companies raising new capital at listing",
    blurb:
      "A conventional NASDAQ listing with a registered primary offering — raise new capital as you go public, managed end to end.",
    highlights: [
      "Primary capital raised at listing",
      "Listing-standards readiness assessment",
      "S-1 registration and Edgarization in-house",
      "Exchange application managed end to end",
    ],
  },
  {
    type: "NASDAQ_DIRECT_LISTING",
    slug: "nasdaq-direct-listing",
    label: "NASDAQ Direct Listing",
    shortLabel: "NASDAQ Listing",
    raiseLimit: "Exchange listed",
    audience: "Companies ready for the public markets",
    blurb:
      "Go public on NASDAQ without an IPO. We manage listing readiness, SEC registration, Edgarization, and the exchange application end to end.",
    highlights: [
      "No underwriter discount or IPO roadshow",
      "Existing shares registered for resale",
      "SEC filing and Edgarization handled in-house",
      "Listing-standards readiness assessment",
    ],
  },
  {
    type: "NYSE_LISTING",
    slug: "nyse-conventional-listing",
    label: "NYSE Conventional Listing",
    shortLabel: "NYSE IPO",
    raiseLimit: "Exchange listed",
    audience: "Companies raising new capital on the Big Board",
    blurb:
      "A conventional New York Stock Exchange listing with a registered primary offering — the Big Board, with new capital raised at the bell.",
    highlights: [
      "Primary capital raised at listing",
      "Full NYSE listing-standards guidance",
      "Registration statement through effectiveness",
      "DMM and market-maker coordination",
    ],
  },
  {
    type: "NYSE_DIRECT_LISTING",
    slug: "nyse-direct-listing",
    label: "NYSE Direct Listing",
    shortLabel: "NYSE Listing",
    raiseLimit: "Exchange listed",
    audience: "Companies ready for the Big Board",
    blurb:
      "List directly on the New York Stock Exchange — the prestige of the Big Board without dilutive underwriting.",
    highlights: [
      "Direct float of existing shareholder stock",
      "Full NYSE listing-standards guidance",
      "Registration statement through effectiveness",
      "Market-maker and DMM coordination",
    ],
  },
  {
    type: "ELOC",
    slug: "eloc",
    label: "Equity Line of Credit (ELOC)",
    shortLabel: "ELOC",
    raiseLimit: "Committed facility",
    audience: "Listed and listing-track issuers",
    blurb:
      "A committed standby equity facility from institutional investors — draw capital when you need it, on your timeline.",
    highlights: [
      "Capital on demand after listing",
      "Issuer controls timing and draw size",
      "Institutional counterparties arranged by us",
      "Pairs naturally with a direct listing",
    ],
  },
];

export const productByType = (type: OfferingType) =>
  PRODUCTS.find((p) => p.type === type)!;

export const productBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const fmtMoney = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
    : `$${n.toLocaleString()}`;
