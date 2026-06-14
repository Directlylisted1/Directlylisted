// Exchange-listing page content (additive). Only the four exchange-listing
// product slugs have entries here; every other product page is unaffected.

export type ReqTable = {
  title: string;
  intro?: string;
  headers: string[];
  rows: string[][];
  note?: string;
};

export type ListingInfo = {
  exchange: "NASDAQ" | "NYSE";
  whatYouGet: { title: string; body: string }[];
  requirementsHeadline: string;
  requirementsIntro: string;
  requirements: ReqTable[];
  pdf: { href: string; label: string };
};

function whatYouGet(exchange: "NASDAQ" | "NYSE"): { title: string; body: string }[] {
  const governance =
    exchange === "NASDAQ"
      ? "U.S. securities laws and NASDAQ Rule 5605"
      : "U.S. securities laws and the NYSE American Company Guide corporate governance standards";
  return [
    {
      title: "Initial Due Diligence and Corporate Assessment",
      body: "Comprehensive review of the client's business, financials, and regulatory posture.",
    },
    {
      title: "U.S. Entity Formation and Corporate Restructuring",
      body: "Formation of a Delaware or Wyoming corporation; preparation of governance documentation and state filings.",
    },
    {
      title: "Corporate Governance and Documentation Advisory",
      body: `Drafting and structuring of corporate minutes, bylaws, board resolutions, and committee charters in compliance with ${governance}, handled by our attorneys.`,
    },
    {
      title: "Capital Structure Optimization",
      body: "Advisory on capitalization strategy to meet U.S. exchange listing requirements, including authorized share structure and shareholder distribution.",
    },
    {
      title: "Private Placement Structuring",
      body: "Strategic guidance on Regulation A, Regulation D, and Regulation S offerings, including preparation of Form D and related documentation.",
    },
    {
      title: "Bridge Financing Advisory (Optional)",
      body: "Structuring of pre-listing interim capital facilities to support operational readiness and regulatory compliance.",
    },
    {
      title: "Equity Line of Credit (ELOC) Structuring (Optional)",
      body: "Advisory on referring and structuring an equity line of credit facility of up to USD $350 million for post-listing liquidity and growth capital.",
    },
    {
      title: "M&A and Intellectual Property Acquisition Support (Optional)",
      body: "Strategic advisory on business combinations, asset acquisitions, and IP roll-ups in support of listing readiness.",
    },
    {
      title: "SEC Registration Filings",
      body: "Preparation, review, and submission of Form 10 and/or Form S-1 registration statements, including all exhibits, financials, and governance disclosures.",
    },
    {
      title: `${exchange} Application and Market Maker Coordination`,
      body: `Submission of the ${exchange} listing application; coordination with qualified market makers to secure sponsorship and ensure orderly trading.`,
    },
    {
      title: "Exchange Listing Execution",
      body: "Finalization of the listing application with NASDAQ or NYSE; coordination with transfer agents, DTC, and broker-dealers to ensure operational readiness.",
    },
  ];
}

const NASDAQ_PDF = {
  href: "/guides/nasdaq-listing-requirements.pdf",
  label: "NASDAQ Initial Listing Guide (full PDF)",
};
const NYSE_PDF = {
  href: "/guides/nyse-american-initial-listing-standards.pdf",
  label: "NYSE American Initial Listing Standards (full PDF)",
};

const SUMMARY_NOTE =
  "Summary of key thresholds. A company must meet all criteria under at least one standard plus the applicable liquidity requirements. See the complete official guide attached below for all standards, liquidity criteria, and footnotes.";

// ---- NASDAQ conventional (page 11, then 8, then 6) ----
const NASDAQ_CAPITAL: ReqTable = {
  title: "Nasdaq Capital Market — Financial & Liquidity Requirements",
  headers: ["Requirement", "Equity Standard", "Market Value of Listed Securities", "Net Income Standard"],
  rows: [
    ["Stockholders' Equity", "$5M", "$4M", "$4M"],
    ["Market Value of Listed Securities", "—", "$50M", "—"],
    ["Net Income (latest FY or 2 of last 3)", "—", "—", "$750K"],
    ["Market Value of Unrestricted Publicly Held Shares", "$15M", "$15M", "$5M"],
    ["Unrestricted Publicly Held Shares", "1M", "1M", "1M"],
    ["Unrestricted Round Lot Shareholders", "300", "300", "300"],
    ["Market Makers", "3", "3", "3"],
    ["Operating History", "2 years", "—", "—"],
    ["Bid Price", "$4", "$4", "$4"],
  ],
  note: SUMMARY_NOTE,
};

const NASDAQ_GLOBAL: ReqTable = {
  title: "Nasdaq Global Market — Financial & Liquidity Requirements",
  headers: ["Requirement", "Income", "Equity", "Market Value", "Total Assets / Total Revenue"],
  rows: [
    ["Pre-tax income from continuing operations (latest FY or 2 of last 3)", "$1M", "—", "—", "—"],
    ["Stockholders' Equity", "$15M", "$30M", "—", "—"],
    ["Market Value of Listed Securities", "—", "—", "$75M", "—"],
    ["Total Assets and Total Revenue (latest FY or 2 of last 3)", "—", "—", "—", "$75M & $75M"],
    ["Market Value of Unrestricted Publicly Held Shares", "$15M", "$18M", "$20M", "$20M"],
    ["Unrestricted Publicly Held Shares", "1.1M", "1.1M", "1.1M", "1.1M"],
    ["Unrestricted Round Lot Shareholders", "400", "400", "400", "400"],
    ["Market Makers", "3", "3", "4", "4"],
    ["Operating History", "—", "2 years", "—", "—"],
    ["Bid Price", "$4", "$4", "$4", "$4"],
  ],
  note: SUMMARY_NOTE,
};

const NASDAQ_GLOBAL_SELECT: ReqTable = {
  title: "Nasdaq Global Select Market — Financial Requirements",
  headers: ["Requirement", "Earnings", "Capitalization w/ Cash Flow", "Capitalization w/ Revenue", "Assets w/ Equity"],
  rows: [
    ["Aggregate pre-tax earnings (prior 3 FY)", "> $11M", "—", "—", "—"],
    ["Pre-tax earnings (each of 2 most recent FY)", "> $2.2M", "—", "—", "—"],
    ["Aggregate cash flow (prior 3 FY)", "—", "> $27.5M", "—", "—"],
    ["Average market capitalization (prior 12 months)", "—", "> $550M", "> $850M", "$160M"],
    ["Revenue (previous fiscal year)", "—", "> $110M", "> $90M", "—"],
    ["Total Assets", "—", "—", "—", "$80M"],
    ["Stockholders' Equity", "—", "—", "—", "$55M"],
    ["Bid Price", "$4", "$4", "$4", "$4"],
  ],
  note: SUMMARY_NOTE,
};

// ---- NASDAQ direct listing (page 12, then 9) ----
const NASDAQ_CAPITAL_DIRECT: ReqTable = {
  title: "Nasdaq Capital Market — Direct Listing Financial & Liquidity Requirements",
  intro:
    "For a direct listing, Nasdaq relies on a valuation provided by an independent third party with significant experience, or certain compelling evidence.",
  headers: ["Requirement", "Equity Standard", "Market Value of Listed Securities", "Net Income Standard"],
  rows: [
    ["Stockholders' Equity", "$5M", "$4M", "$4M"],
    ["MV of Unrestricted Publicly Held Shares (valuation / compelling evidence)", "$30M / $37.5M", "$30M / $37.5M", "$30M / $37.5M"],
    ["MV of Listed Securities (valuation / compelling evidence)", "—", "$100M / $125M", "—"],
    ["Net Income (latest FY or 2 of last 3)", "—", "—", "$750K"],
    ["Unrestricted Publicly Held Shares", "1M", "1M", "1M"],
    ["Unrestricted Round Lot Shareholders", "300", "300", "300"],
    ["Market Makers", "3", "3", "3"],
    ["Operating History", "2 years", "—", "—"],
    ["Bid Price (valuation / compelling evidence)", "$8 / $10", "$8 / $10", "$8 / $10"],
  ],
  note: SUMMARY_NOTE,
};

const NASDAQ_GLOBAL_DIRECT: ReqTable = {
  title: "Nasdaq Global Market — Direct Listing Financial & Liquidity Requirements",
  intro:
    "For a direct listing, Nasdaq relies on a valuation provided by an independent third party with significant experience, or certain compelling evidence.",
  headers: ["Requirement", "Income", "Equity", "Market Value", "Total Assets / Total Revenue"],
  rows: [
    ["Pre-tax income from continuing operations (latest FY or 2 of last 3)", "$1M", "—", "—", "—"],
    ["Stockholders' Equity", "$15M", "$30M", "—", "—"],
    ["MV of Listed Securities (valuation / compelling evidence)", "—", "—", "$150M / $187.5M", "—"],
    ["Total Assets and Total Revenue (latest FY or 2 of last 3)", "—", "—", "—", "$75M & $75M"],
    ["Unrestricted Publicly Held Shares", "1.1M", "1.1M", "1.1M", "1.1M"],
    ["Unrestricted Round Lot Shareholders", "400", "400", "400", "400"],
    ["Market Makers", "3", "3", "4", "4"],
    ["Operating History", "—", "2 years", "—", "—"],
    ["Bid Price (valuation / compelling evidence)", "$8 / $10", "$8 / $10", "$8 / $10", "$8 / $10"],
  ],
  note: SUMMARY_NOTE,
};

// ---- NYSE American ----
const NYSE_FINANCIAL: ReqTable = {
  title: "NYSE American — Quantitative Initial Listing Standards (Financial)",
  intro: "A company must meet one of the financial standards below.",
  headers: ["Requirement", "Standard 1", "Standard 2", "Standard 3", "Standard 4a", "Standard 4b"],
  rows: [
    ["Pre-tax income (most recent FY, or 2 of last 3 FY)", "$750K", "—", "—", "—", "—"],
    ["Stockholders' Equity", "$4M", "$5M", "$4M", "—", "—"],
    ["Global Market Capitalization", "—", "—", "$50M", "$75M", "—"],
    ["Total Assets and Total Revenue (most recent FY, or 2 of last 3)", "—", "—", "—", "—", "$75M each"],
    ["Aggregate MV of Unrestricted Publicly-Held Shares", "$15M", "$15M", "$15M", "$20M", "$20M"],
    ["Minimum Price", "$4", "$4", "$4", "$4", "$4"],
    ["Operating History", "—", "2 years", "—", "—", "—"],
  ],
  note: SUMMARY_NOTE,
};

const NYSE_DISTRIBUTION: ReqTable = {
  title: "NYSE American — Distribution Standards",
  intro: "A company must meet one of the distribution options below.",
  headers: ["Requirement", "Option 1", "Option 2", "Option 3"],
  rows: [
    ["Public Shareholders (North America)", "800", "400", "400"],
    ["Public Float (shares)", "500,000", "1,000,000", "500,000"],
    ["Daily Trading Volume (6 months prior)", "—", "—", "2,000 shares"],
  ],
};

export const LISTING_INFO: Record<string, ListingInfo> = {
  "nasdaq-conventional-listing": {
    exchange: "NASDAQ",
    whatYouGet: whatYouGet("NASDAQ"),
    requirementsHeadline: "NASDAQ Listing Requirements",
    requirementsIntro:
      "Conventional NASDAQ listings must satisfy one financial standard plus the applicable liquidity requirements on the chosen market tier.",
    requirements: [NASDAQ_CAPITAL, NASDAQ_GLOBAL, NASDAQ_GLOBAL_SELECT],
    pdf: NASDAQ_PDF,
  },
  "nasdaq-direct-listing": {
    exchange: "NASDAQ",
    whatYouGet: whatYouGet("NASDAQ"),
    requirementsHeadline: "NASDAQ Direct Listing Requirements",
    requirementsIntro:
      "Direct listings on NASDAQ rely on an independent third-party valuation (or compelling evidence) to establish price-based requirements.",
    requirements: [NASDAQ_CAPITAL_DIRECT, NASDAQ_GLOBAL_DIRECT],
    pdf: NASDAQ_PDF,
  },
  "nyse-conventional-listing": {
    exchange: "NYSE",
    whatYouGet: whatYouGet("NYSE"),
    requirementsHeadline: "NYSE Listing Requirements",
    requirementsIntro:
      "NYSE American initial listings must satisfy one financial standard and one distribution standard.",
    requirements: [NYSE_FINANCIAL, NYSE_DISTRIBUTION],
    pdf: NYSE_PDF,
  },
  "nyse-direct-listing": {
    exchange: "NYSE",
    whatYouGet: whatYouGet("NYSE"),
    requirementsHeadline: "NYSE Direct Listing Requirements",
    requirementsIntro:
      "NYSE American listing standards apply. For a direct listing without recent trading history, the exchange relies on an independent third-party valuation to establish market-value-based requirements.",
    requirements: [NYSE_FINANCIAL, NYSE_DISTRIBUTION],
    pdf: NYSE_PDF,
  },
};

export const listingInfo = (slug: string): ListingInfo | undefined => LISTING_INFO[slug];
