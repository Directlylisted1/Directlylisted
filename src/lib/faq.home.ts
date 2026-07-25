// lib/faq.home.ts
// -----------------------------------------------------------------------------
// Homepage "Direct listing FAQ" — single source of truth.
// Rendered as real HTML text on the homepage AND serialized into the FAQPage
// JSON-LD by lib/jsonld.ts, so the schema matches the visible copy word for
// word (a Google Rich Results requirement).
// Answers are written to be evergreen: no fee dollar figures or dates that go
// stale; exchange specifics defer to the official fee/standard schedules.
// -----------------------------------------------------------------------------

export type FaqItem = { q: string; a: string };
export type FaqSection = { heading: string; items: FaqItem[] };

export const HOME_FAQ_SECTIONS: FaqSection[] = [
  {
    heading: "Direct listing basics",
    items: [
      {
        q: "What is a direct listing?",
        a: "A direct listing is a way to take a company public by registering existing shares with the SEC and listing them on an exchange, without hiring underwriters to sell new stock. Shares begin trading at a price set by buy and sell orders on the opening day.",
      },
      {
        q: "How is a direct listing different from an IPO?",
        a: "An IPO sells new shares through underwriters, who set the price and charge a discount, typically around seven percent. A direct listing skips the underwriters: no discount, no allocation, and normally no lock-up period. Both routes require full SEC registration and full exchange qualification.",
      },
      {
        q: "Is a direct listing the same as a DPO?",
        a: "Yes. A direct listing is also called a direct public offering (DPO) or direct placement. All three terms describe the same mechanism: registering shares with the SEC and listing them on an exchange without an underwritten offering.",
      },
      {
        q: "Can my company raise new capital in a direct listing?",
        a: "Yes. Under exchange rules approved since 2020, both NYSE and NASDAQ permit primary direct listings, in which the company sells new shares in the opening auction. Conditions apply, and many companies instead raise capital before listing through a Reg D or Reg A+ offering.",
      },
      {
        q: "How is the opening price set in a direct listing?",
        a: "The exchange publishes a reference price based on recent private-market trades or an independent valuation, and the stock then opens through an auction that matches actual buy and sell orders. There is no underwriter allocation, so the first print reflects real market demand.",
      },
      {
        q: "Do employees and early investors face a lock-up in a direct listing?",
        a: "Normally no. A direct listing has no underwriter-imposed lock-up, so existing holders can sell from the first day of trading. Insiders remain subject to securities-law limits such as Rule 144, Section 16 reporting, and any company trading policies.",
      },
      {
        q: "How does a direct listing compare to a SPAC merger or reverse merger?",
        a: "A SPAC merger takes a company public by combining with a listed shell, and a reverse merger uses an existing public company; both add the counterparty's costs, dilution, and diligence. A direct listing keeps the company's own capital structure intact and lists it on its own registration statement, at the cost of not having a built-in raise.",
      },
    ],
  },
  {
    heading: "NASDAQ listings",
    items: [
      {
        q: "What are the requirements for a direct NASDAQ listing?",
        a: "NASDAQ applies the same quantitative standards as for any listing: tests based on stockholders' equity, market value of publicly held shares, share price, and shareholder counts, plus governance rules on board and committee independence. NASDAQ's Capital Market tier offers three alternative standards, and a company needs to satisfy one in full.",
      },
      {
        q: "What are the NASDAQ listing tiers?",
        a: "NASDAQ operates three tiers: the Capital Market for earlier-stage companies, the Global Market, and the Global Select Market with the most demanding financial standards. Each tier publishes its own initial and continued listing standards, and direct listings are permitted on each subject to the applicable rules.",
      },
      {
        q: "What is the minimum share price to list on NASDAQ?",
        a: "The standard initial listing tests require a $4 minimum bid price. The Capital Market tier offers closing-price alternatives at $3 or $2 when a company meets additional financial conditions, and direct listings use a valuation-based price under NASDAQ's direct listing rules.",
      },
      {
        q: "How many shareholders does NASDAQ require?",
        a: "Initial listing on the Capital Market requires at least 300 round-lot shareholders; the Global and Global Select tiers require 400. At least half of the minimum round-lot holders must each hold unrestricted shares worth $2,500 or more, with limited exceptions.",
      },
      {
        q: "Does NASDAQ require market makers?",
        a: "Yes. Initial listing requires registered market makers — generally three on the Capital Market and three to four on the higher tiers depending on the standard used. We coordinate market-maker sponsorship as part of the exchange application.",
      },
      {
        q: "What corporate governance does NASDAQ require?",
        a: "Listed companies need a majority-independent board, an audit committee of at least three independent directors who meet financial-literacy requirements, independent oversight of executive compensation and director nominations, a code of conduct, and annual shareholder meetings. Phase-in periods apply to newly listed companies, and foreign private issuers may follow certain home-country practices with disclosure.",
      },
      {
        q: "What happens if we fall below NASDAQ's standards after listing?",
        a: "NASDAQ issues a deficiency notice and typically grants a compliance period to cure the shortfall, with a possible hearing before a delisting decision. Continued-listing standards are lower than initial standards, and staying comfortably above them is part of our post-listing compliance work.",
      },
    ],
  },
  {
    heading: "NYSE listings",
    items: [
      {
        q: "Does the New York Stock Exchange allow direct listings?",
        a: "Yes. The NYSE pioneered the modern direct listing — Spotify used it in 2018 — and its rules also permit primary direct listings in which the company raises new capital in the opening auction, subject to conditions. Directly Listed manages the NYSE application, the registration statement, and the opening-day mechanics.",
      },
      {
        q: "What is the difference between NYSE and NYSE American?",
        a: "The NYSE is the main Big Board with the most demanding quantitative standards, while NYSE American serves earlier-stage and smaller companies with lower financial thresholds. Both are national securities exchanges under full SEC oversight, and both routes reach the same investing public.",
      },
      {
        q: "What are the NYSE American listing standards?",
        a: "NYSE American publishes alternative financial standards based on pre-tax income, market capitalization, or total assets and revenue, each paired with minimums for stockholders' equity and the market value of publicly held shares. A company must also meet one of the shareholder-distribution options and a minimum share price, plus the exchange's corporate governance rules.",
      },
      {
        q: "What is a Designated Market Maker (DMM) and why does it matter?",
        a: "A DMM is the NYSE member firm responsible for opening the stock and maintaining a fair and orderly market in it. In a direct listing the DMM sets the opening price from the order book, consulting the company's financial advisor, so selecting and coordinating the DMM is a key step we manage before the first trade.",
      },
      {
        q: "What are NYSE's shareholder distribution requirements?",
        a: "The NYSE requires a minimum number of round-lot holders and a minimum number and market value of publicly held shares, with the exact thresholds set by the listing standard used. Distribution is measured on shares not held by directors, officers, or concentrated owners, which is why cap-table planning is part of listing preparation.",
      },
    ],
  },
  {
    heading: "Process, cost, and timeline",
    items: [
      {
        q: "How long does a direct listing take?",
        a: "Most engagements run four to nine months from start to first trade. The largest variable is audit readiness: a company with current PCAOB-standard audits moves much faster than one starting its first audit.",
      },
      {
        q: "How much does a direct listing cost?",
        a: "Costs include the audit, legal and advisory fees, SEC filing costs, and the exchange's published entry and annual fees. The total is typically far below an underwritten IPO of similar size, because there is no underwriting discount on proceeds. We scope fees in writing before an engagement begins.",
      },
      {
        q: "Do we need audited financial statements?",
        a: "Yes. The registration statement must include financial statements audited by a PCAOB-registered firm — generally two fiscal years for an emerging growth company. Starting the audit early is the single best way to shorten the overall timeline.",
      },
      {
        q: "Can a foreign company do a direct listing on a U.S. exchange?",
        a: "Yes. A foreign private issuer registers on Form F-1 rather than Form S-1 and can qualify for either exchange. Structuring, governance, and home-jurisdiction questions need to be settled early, which is where our cross-border legal practice comes in.",
      },
      {
        q: "Can we move from the OTC markets to NASDAQ or NYSE?",
        a: "Yes. An uplisting takes an OTC-quoted company onto a national exchange once it meets the exchange's standards. The preparation resembles a direct listing: close the gaps, file, qualify, and list.",
      },
      {
        q: "Can we raise capital before the listing instead of during it?",
        a: "Yes, and many companies do. A Regulation D or Regulation A+ round before listing funds the balance sheet the exchange will evaluate, and an equity line of credit after listing provides committed follow-on capital. We design the sequencing case by case.",
      },
      {
        q: "What reporting obligations apply after we list?",
        a: "A listed company files annual 10-K, quarterly 10-Q, and current 8-K reports with the SEC, and its insiders file Section 16 ownership reports. It must also maintain the exchange's governance standards and pay annual listing fees — obligations we stay engaged on after the first trade.",
      },
    ],
  },
];

// Flat list — consumed by the FAQPage JSON-LD graph.
export const HOME_FAQ: FaqItem[] = HOME_FAQ_SECTIONS.flatMap((s) => s.items);
