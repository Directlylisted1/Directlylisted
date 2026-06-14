// Educational content for the Raise Capital exemption pages (additive).
// Only the five raise-capital slugs have entries; other product pages are
// unaffected. Sourced from issuer-provided briefs, cleaned and lightly expanded.

export type RaiseInfo = {
  headline: string;
  overview: string;
  keyPoints: string[];
  sections: { title: string; body: string }[];
  checklist?: { title: string; items: string[] };
};

export const RAISE_CAPITAL_INFO: Record<string, RaiseInfo> = {
  "reg-a-plus": {
    headline: "Understanding Regulation A+",
    overview:
      "Regulation A+ is a scaled public-offering exemption — effectively a “mini-IPO” — that lets eligible companies raise capital from both accredited and non-accredited investors after the SEC qualifies the offering. The issuer files an offering statement on Form 1-A and, once qualified, may broadly solicit and sell securities to the public subject to tiered rules.",
    keyPoints: [
      "Raise up to $75M per 12 months under Tier 2 (up to $20M under Tier 1)",
      "Open to the general public — no accredited-investor requirement",
      "General solicitation and community-based marketing permitted",
      "Tier 2 preempts state blue-sky registration; Tier 1 requires state review",
      "Potential for liquidity once listed on an exchange",
      "File Form 1-A and obtain SEC qualification before sales begin",
    ],
    sections: [
      {
        title: "Two tiers of compliance",
        body: "Tier 1 permits raises of up to $20 million in a 12-month period and generally requires state securities (blue-sky) review with reviewed — not audited — financial statements. Tier 2 permits up to $75 million, preempts state registration to reduce multi-state filing burdens, but requires audited financials and ongoing reporting (annual, semiannual, and current-event reports) similar to a public company.",
      },
      {
        title: "Investor access and limits",
        body: "Reg A+ allows sales to retail investors with no SEC-imposed per-investor minimums. In Tier 2 offerings, non-accredited investors are generally limited to investing no more than 10% of the greater of their annual income or net worth, unless the issuer elects otherwise.",
      },
      {
        title: "What it takes",
        body: "Issuers prepare a comprehensive offering circular disclosing business operations, risk factors, management discussion, and financial statements. Tier 2 issuers should budget for audited financials, SEC review time and fees, and the ongoing reporting and investor-relations compliance that follow qualification — costs that also enhance investor confidence and secondary-market access.",
      },
    ],
    checklist: {
      title: "Preparing for a Reg A+ raise",
      items: [
        "Confirm eligibility — investment companies and blank-check companies are ineligible",
        "Assemble audited financial statements if pursuing Tier 2",
        "Budget for SEC review, fees, and ongoing reporting",
        "Design investor communications and distribution channels",
        "Evaluate whether Tier 1 or Tier 2 best balances goals against compliance cost",
      ],
    },
  },

  "reg-d-506c": {
    headline: "Understanding Rule 506(c)",
    overview:
      "Rule 506(c) is a Regulation D safe harbor that lets issuers publicly solicit and advertise a private placement and raise an unlimited amount — provided every purchaser is an accredited investor and the issuer takes reasonable steps to verify that status. Purchasers receive restricted securities, and the issuer files Form D within 15 days after the first sale.",
    keyPoints: [
      "General solicitation and advertising permitted",
      "Unlimited raise amount",
      "All purchasers must be accredited — with verification",
      "Securities are restricted under Rule 144",
      "Bad-actor checks and state notice filings required",
      "File Form D within 15 days of the first sale",
    ],
    sections: [
      {
        title: "What “reasonable steps to verify” means",
        body: "The standard is principles-based. The SEC lists non-exclusive methods — reviewing tax returns or bank and brokerage statements, or obtaining written confirmation from attorneys, CPAs, or registered investment advisers — but issuers may adopt other procedures suited to the offering. Recent SEC guidance (a March 12, 2025 no-action letter and updated C&DIs) confirms that pairing investor self-certification with meaningful objective indicators — such as a high minimum investment plus corroborating documentation — can satisfy verification, easing the administrative burden.",
      },
      {
        title: "Key legal and practical implications",
        body: "Accredited-investor thresholds (individual income and net worth, and certain institutional criteria) remain central. Securities are typically restricted and cannot be freely resold without registration or an exemption. Bad-actor disqualification is mandatory and can void the exemption. And while Rule 506(c) preempts state registration, many states still require notice filings and fees.",
      },
    ],
    checklist: {
      title: "Practical checklist for issuers",
      items: [
        "Design a verification policy matched to offering size and minimum investment",
        "Collect and retain documentation and contemporaneous records of verification",
        "Run bad-actor due diligence on principals and placement agents",
        "File Form D within 15 days of first sale and complete required state notices",
        "Consider third-party verification providers or counsel to reduce risk",
      ],
    },
  },

  "reg-d-506b": {
    headline: "Understanding Rule 506(b)",
    overview:
      "Rule 506(b) is a Regulation D safe harbor under Section 4(a)(2) that lets issuers raise unlimited capital privately — without general solicitation — from an unlimited number of accredited investors and up to 35 sophisticated non-accredited investors.",
    keyPoints: [
      "Unlimited raise amount",
      "No general solicitation or advertising",
      "Unlimited accredited investors + up to 35 sophisticated non-accredited",
      "Lower bar — a reasonable belief of accredited status",
      "Securities are restricted; bad-actor rules apply",
      "File Form D within 15 days of the first sale",
    ],
    sections: [
      {
        title: "Non-accredited participants",
        body: "Any non-accredited purchaser must be financially sophisticated — possessing the knowledge and experience to evaluate the investment, or represented by a purchaser representative who does. When non-accredited investors participate, the issuer must provide disclosure documents comparable to those in a registered or Regulation A offering, including specified financial statements that in some cases must be audited, and must be available to answer questions.",
      },
      {
        title: "Verifying investors",
        body: "For accredited investors, the issuer needs only a reasonable belief that the purchaser is accredited — a lighter burden than Rule 506(c). Issuers commonly document that belief through investor questionnaires, representations, and supporting documentation where appropriate.",
      },
      {
        title: "Practical posture",
        body: "Securities sold under 506(b) are typically restricted (subject to Rule 144 resale limits), and the offering remains subject to Regulation D bad-actor disqualification. Prudent issuers rely on robust onboarding, clear documentation of sophistication or accredited status, careful disclosure packages for any non-accredited participants, and thorough bad-actor due diligence.",
      },
    ],
  },

  "reg-s": {
    headline: "Understanding Regulation S",
    overview:
      "Regulation S provides a safe harbor from U.S. Securities Act registration for offers and sales of securities that occur outside the United States. It imposes strict offshore-transaction and distribution-compliance conditions and does not relieve issuers of antifraud or other U.S. securities-law obligations — and is often run in parallel with a U.S. Reg D tranche.",
    keyPoints: [
      "For offers and sales made outside the United States",
      "Frequently paired with a domestic Reg D 506(c) round",
      "Requires a genuine “offshore transaction”",
      "Distribution compliance period restricts resales into the U.S.",
      "Antifraud provisions still apply in full",
      "KYC and geographic-location controls required",
    ],
    sections: [
      {
        title: "The offshore-transaction test",
        body: "The gateway to the safe harbor is that the offer is not made to a person in the United States and the purchaser is located outside the U.S. (or the offeror reasonably believes so), or the transaction is executed on an established foreign securities exchange. Securities fall into categories that determine the applicable distribution compliance period and resale restrictions, with different tests for U.S. versus non-U.S. issuers.",
      },
      {
        title: "What it does not do",
        body: "Regulation S is not a blanket exemption from U.S. securities laws. Antifraud provisions remain fully applicable, and subsequent offers or sales into the United States during the distribution compliance period can jeopardize the safe harbor unless conducted under registration or another valid exemption. The courts and the SEC look beyond form to substance when assessing whether an offering truly occurred offshore.",
      },
      {
        title: "Operational controls",
        body: "Issuers should target offers only to non-U.S. persons, retain contemporaneous evidence of investors' offshore status, coordinate with foreign intermediaries and exchanges to confirm execution venues, and plan for the distribution compliance period and potential resale limitations. Because Regulation S interacts with other exemptions and with state and foreign law, issuers commonly engage counsel to map the structure and confirm the applicable category and compliance period.",
      },
    ],
  },

  pipe: {
    headline: "Understanding PIPE Offerings",
    overview:
      "A PIPE (Private Investment in Public Equity) is a private placement in which a public company sells equity or equity-linked securities directly to accredited or institutional investors to raise capital quickly — typically at a negotiated discount and with contractual registration rights for resale.",
    keyPoints: [
      "For companies already public (post-listing)",
      "Speed and certainty of execution vs. a public follow-on",
      "Sold to institutional/accredited investors under Reg D or Rule 144",
      "Negotiated pricing — often a 10–20% discount for straight equity",
      "Investors receive restricted securities plus registration rights",
      "Resale registration (Form S-3 or S-1) filed within an agreed period",
    ],
    sections: [
      {
        title: "Structure",
        body: "Issuers commonly sell common stock, preferred stock, convertible debt, or structured hybrids to a limited group of investors, often with warrants or conversion features and bespoke protective covenants. PIPEs rely on private-placement safe harbors to avoid immediate SEC registration while preserving a path to liquidity through a subsequent resale registration — creating a characteristic “overhang” between the private sale and registration effectiveness that boards must manage carefully.",
      },
      {
        title: "Process",
        body: "PIPEs are typically arranged by placement agents who run a targeted marketing process that avoids general solicitation, uses confidentiality and “wall-crossing” procedures for prospective investors, and coordinates diligence and subscription documentation. Investor diligence focuses on issuer disclosures, capitalization mechanics, anti-dilution protections, and the timetable and form of the resale registration.",
      },
      {
        title: "Trade-offs",
        body: "For issuers, PIPEs offer immediate capital and speed against dilution, potential market signaling, and contractual registration obligations that can constrain future corporate actions. For investors, they offer negotiated entry into public companies at preferential terms with downside protections, but carry liquidity and execution risk until the resale registration is effective.",
      },
    ],
  },
};

export const raiseInfo = (slug: string): RaiseInfo | undefined => RAISE_CAPITAL_INFO[slug];
