// lib/faq.investor.ts
// -----------------------------------------------------------------------------
// Investor FAQ — single source of truth.
// Drives the rendered page, the FAQPage JSON-LD, the on-page anchor nav, and the
// route metadata. Edit copy here only. Mirrors the structure of lib/faq.issuer.ts.
//
// Writing rules baked into these answers (for AI search / GEO):
//  - Each answer opens with a one-sentence, self-contained direct answer an LLM
//    can lift verbatim, then adds depth.
//  - Product/exemption names are spelled exactly as elsewhere on the site.
//  - Figures current as of 2026:
//      • Accredited investor: $200k individual / $300k joint income (two years),
//        OR $1M net worth excluding primary residence, OR certain professional
//        credentials (Series 7/65/82).
//      • Reg A+ Tier 2 non-accredited cap: 10% of the GREATER of annual income or
//        net worth — and this cap does NOT apply if the securities will be listed
//        on a national securities exchange upon qualification.
//      • Reg D 506(c): accredited only, verification required.
//        Reg D 506(b): up to 35 sophisticated non-accredited + unlimited accredited,
//        no general solicitation.
//      • The "90-day" verification validity is an industry convention, not an SEC rule.
//  - Nothing here is legal or investment advice; the disclaimer block carries that.
//  - This is INVESTOR-facing: it explains process and risk; it never recommends
//    any specific offering or implies suitability.
// -----------------------------------------------------------------------------

export type FaqItem = {
  id: string;
  question: string;
  answerText: string; // plain text used for JSON-LD
  answerHtml?: string; // optional richer render markup
};

export type FaqCategory = {
  id: string;
  title: string;
  intro?: string;
  items: FaqItem[];
};

export const INVESTOR_FAQ: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting started",
    intro:
      "What Directly Listed is from an investor's point of view, and what it is not.",
    items: [
      {
        id: "what-is-directly-listed-investor",
        question: "What is Directly Listed, and what is its role for me as an investor?",
        answerText:
          "Directly Listed is a technology platform where companies (issuers) host their own securities offerings, and where you can browse those offerings, complete onboarding, sign documents, and fund an investment. Directly Listed itself is not the seller of the securities — each offering is conducted by its issuer under that issuer's own SEC exemption. The platform provides the software, investor onboarding, identity and accreditation checks, eSignature, and payment processing that sit around the offering.",
      },
      {
        id: "is-directly-listed-my-broker",
        question: "Is Directly Listed my broker, advisor, or the seller of the investment?",
        answerText:
          "No. Directly Listed is a technology platform — not a registered broker-dealer, investment advisor, or funding portal — and it is not the seller of any security. It does not provide investment advice, does not recommend or endorse any offering, and does not assess whether an investment is suitable for you. Each offering is conducted by its issuer under the issuer's own exemption, and any decision to invest is yours alone.",
      },
      {
        id: "how-do-i-create-an-account",
        question: "How do I create an investor account and start?",
        answerText:
          "You sign in to create an investor profile, then browse live offerings; when you choose one, you complete that offering's onboarding flow. Onboarding typically includes identity verification (KYC/AML), an eligibility or accreditation questionnaire matched to the offering's exemption, review of the offering materials, eSignature of the subscription agreement, and funding. You can review offering documents before committing any money.",
      },
      {
        id: "does-it-cost-to-invest",
        question: "Does it cost anything to browse or invest?",
        answerText:
          "Browsing offerings and creating an investor account do not carry a platform fee to you. Your cost is the amount you choose to invest, plus any payment-related costs disclosed at checkout (for example, card processing applies only to smaller amounts). The economics of each offering — price per share, minimum investment, and any fees — are disclosed in that offering's materials before you commit.",
      },
    ],
  },
  {
    id: "eligibility",
    title: "Who can invest & accreditation",
    intro:
      "Eligibility depends on each offering's exemption. These answers explain the categories and how status is checked.",
    items: [
      {
        id: "who-can-invest",
        question: "Who can invest in an offering?",
        answerText:
          "It depends on the offering's exemption, which is stated on each offering page. Regulation A+ offerings are open to everyone, with investment limits for non-accredited investors. Regulation D 506(c) offerings are limited to verified accredited investors. Regulation D 506(b) offerings allow unlimited accredited investors plus up to 35 sophisticated non-accredited investors. Regulation S tranches are for non-U.S. (offshore) investors. Always check the specific eligibility requirements on the offering page before you begin.",
      },
      {
        id: "what-is-an-accredited-investor",
        question: "What is an accredited investor, and do I qualify?",
        answerText:
          "An accredited investor is an individual or entity that meets SEC thresholds under Rule 501 of Regulation D. As of 2026, an individual generally qualifies with annual income over $200,000 (or $300,000 jointly with a spouse or spousal equivalent) in each of the past two years with the same expected this year, OR a net worth over $1 million excluding the value of your primary residence. Certain professional credentials — such as holding a Series 7, Series 65, or Series 82 license in good standing — also qualify. Entities can qualify based on assets or by being made up entirely of accredited owners.",
      },
      {
        id: "how-do-i-prove-accredited",
        question: "How do I prove I'm accredited?",
        answerText:
          "You complete the accreditation questionnaire in your investor portal, and for Rule 506(c) offerings, third-party verification is also required before your investment closes. Acceptable evidence commonly includes recent tax returns or W-2s for the income test, brokerage or bank statements for the net worth test, or a written verification letter from your CPA, attorney, or a registered broker-dealer. For Reg D 506(b), accreditation is self-certified rather than independently verified.",
      },
      {
        id: "verification-validity-period",
        question: "How long is an accreditation verification good for?",
        answerText:
          "There is no fixed SEC expiration date for a verification; the commonly cited 90-day window is an industry convention, not a regulatory rule. The validity accepted for any given investment is set by that offering's requirements, so confirm the documentation and timing directly with the offering before you rely on an older verification letter.",
      },
      {
        id: "can-non-accredited-invest",
        question: "Can I invest if I'm not accredited?",
        answerText:
          "Yes, in certain offering types. Regulation A+ offerings are open to non-accredited investors (subject to the investment limits below), and Regulation D 506(b) offerings may include up to 35 non-accredited investors who meet a sophistication standard determined by the issuer. Regulation D 506(c) and Regulation S offerings are not available to U.S. non-accredited retail investors. The offering page states which category applies.",
      },
      {
        id: "non-accredited-investment-limits",
        question: "Are there limits on how much a non-accredited investor can invest?",
        answerText:
          "Yes, for Regulation A+ Tier 2. A non-accredited individual is generally limited to investing no more than 10% of the greater of their annual income or net worth (excluding primary residence) per offering. Importantly, that 10% limit does not apply if the securities will be listed on a national securities exchange upon qualification. Accredited investors are not subject to the Reg A+ percentage limit. Each offering page and offering circular spells out the applicable limits.",
      },
    ],
  },
  {
    id: "offering-types-in-depth",
    title: "Every offering type, in depth — for investors",
    intro:
      "What each structure means from your side of the table: whether you can invest, any limits, what you actually own, how liquid it is, what transparency you get, and the risks to weigh. Eligibility and terms are set by each offering and stated in its materials; none of this is investment advice or a recommendation of any offering.",
    items: [
      {
        id: "reg-d-506b-investor-deep",
        question: "Regulation D 506(b), in depth — what should an investor know?",
        answerText:
          "Regulation D 506(b) is a private placement you can invest in if you are an accredited investor, or one of up to 35 non-accredited investors the issuer deems financially sophisticated. Because 506(b) prohibits general solicitation, issuers can only accept investors with whom they have a pre-existing, substantive relationship — these deals are not publicly advertised. Your accreditation is self-certified rather than independently verified. What you buy are 'restricted securities': they are illiquid, generally have no resale market, and cannot be freely resold until you satisfy a holding period and an exemption such as Rule 144. If you are non-accredited, the issuer must give you enhanced disclosure, including audited financials. Transparency after closing is at the issuer's discretion — private companies are not required to file public reports. Key risks: illiquidity, limited information over time, and the possibility of total loss; review the offering materials and risk factors before committing.",
      },
      {
        id: "reg-d-506c-investor-deep",
        question: "Regulation D 506(c), in depth — what should an investor know?",
        answerText:
          "Regulation D 506(c) is a private placement open only to accredited investors, and unlike 506(b), the issuer can advertise it publicly — so you may discover these offerings through marketing, social media, or events. The trade-off for public solicitation is that you must prove your accredited status: self-certification is not enough, and you will provide verification such as income documents (W-2s, tax returns), net-worth statements (brokerage and bank records), or a written confirmation from a CPA, attorney, or broker-dealer before your investment closes. What you buy are restricted securities — illiquid, with limited or no resale market and a holding period before resale. Ongoing transparency depends on the issuer, since private companies are not required to file public reports. Key risks: illiquidity, concentration in a single early-stage company, limited ongoing information, and the risk of losing your entire investment.",
      },
      {
        id: "reg-a-plus-investor-deep",
        question: "Regulation A+, in depth — what should an investor know?",
        answerText:
          "Regulation A+ is a 'mini-IPO' open to the general public, so you can invest whether or not you are accredited. In a Tier 2 offering, if you are a non-accredited individual you are generally limited to investing no more than 10% of the greater of your annual income or net worth (excluding your primary residence) — but that cap does not apply if the securities will be listed on a national exchange upon qualification, and it never applies to accredited investors. A major investor advantage versus Reg D is liquidity: Reg A+ securities are generally freely tradable rather than restricted. You also get more transparency, because Tier 2 issuers file a qualified Form 1-A offering circular up front and ongoing annual (1-K) and semiannual (1-SA) reports you can read on EDGAR. Important: 'qualified' by the SEC means the staff completed its review — it is not approval or endorsement and does not mean the investment is safe. Key risks: early-stage business failure, possible thin trading even if technically tradable, and loss of your investment.",
      },
      {
        id: "reg-s-investor-deep",
        question: "Regulation S, in depth — what should an investor know?",
        answerText:
          "Regulation S is an offshore offering available to non-U.S. (offshore) investors, and it is not open to U.S. retail investors — these tranches are designed for investors located outside the United States. The transaction must occur offshore with no selling efforts directed into the U.S. market. If you invest under Reg S, a 'distribution compliance period' typically applies, during which the securities cannot be resold to U.S. persons; the platform tracks this period. Reg S sleeves are often offered alongside a U.S. Regulation D round, so international and U.S. accredited investors participate in the same overall raise under different rules. What you buy is generally illiquid with resale restrictions, especially back into the U.S. Key risks mirror other private offerings: illiquidity, limited ongoing information, currency and cross-border considerations, and the potential for total loss.",
      },
      {
        id: "pipe-investor-deep",
        question: "PIPE financing, in depth — what should an investor know?",
        answerText:
          "A PIPE — private investment in public equity — is a privately negotiated investment into a company that is already public, and participation is typically limited to institutional and accredited investors invited into the deal at a negotiated price (often a discount to market). What you buy are restricted securities at issuance — sometimes common stock, sometimes convertible preferred, notes, or stock with warrants — and the deal almost always comes with registration rights: the issuer files a resale registration statement (Form S-1 or S-3) so your shares become freely sellable once it is declared effective. Until that registration is effective, your position is illiquid. Because the company is already public, you have public-company transparency through its SEC filings on EDGAR. Key risks: the stock can fall below your entry price, the resale registration can be delayed, and convertible structures can be dilutive; PIPEs are generally suited to sophisticated investors who can evaluate public-company risk.",
      },
      {
        id: "eloc-investor-deep",
        question: "Equity Line of Credit (ELOC), in depth — what should an investor know?",
        answerText:
          "An Equity Line of Credit (ELOC) is primarily an issuer financing tool rather than an offering most investors 'subscribe' to: it is a committed facility under which a single institutional investor agrees to buy newly issued shares from a public company over time, at the company's election. If you are a shareholder or are evaluating a company that has an ELOC in place, the key point is its effect on the stock: the issuer can draw capital by issuing new shares at a price referenced to the market (usually at a small discount), which is dilutive and can add selling pressure when draws occur — though the issuer controls the timing and size. ELOCs require an effective resale registration and work only for listed companies with enough trading liquidity. For the institutional counterparty providing the facility, it is a negotiated, sophisticated commitment. Key takeaway for ordinary investors: understand that drawdowns dilute existing holders, and read the company's filings to see the facility's size and terms.",
      },
      {
        id: "nasdaq-direct-investor-deep",
        question: "NASDAQ Direct Listing, in depth — what should an investor know?",
        answerText:
          "A NASDAQ direct listing makes a company's existing shares tradable on the Nasdaq Stock Market without an underwritten IPO, so as an investor you generally buy shares in the open market once the stock begins trading, rather than subscribing in advance. Because no new underwritten shares are sold at listing, there is no IPO allocation process and price is set through Nasdaq's opening price-discovery rather than by underwriters. The main advantages for investors are liquidity and transparency: the company registers its shares with the SEC, files public reports you can follow on EDGAR, and trades under Nasdaq's listing standards and governance rules. Early trading can be volatile because there is no underwriter price stabilization, and some shares may be subject to lock-ups. Key risks: ordinary market and business risk, potential volatility around the open, and the fact that a listing is not a guarantee of performance.",
      },
      {
        id: "nasdaq-conventional-investor-deep",
        question: "NASDAQ Conventional Listing, in depth — what should an investor know?",
        answerText:
          "A NASDAQ conventional listing combines going public on Nasdaq with a registered primary offering, so the company sells newly issued shares as it lists. As an investor you may be able to participate in the registered offering if you are eligible and invited, or simply buy shares on Nasdaq once trading begins. Unlike a private placement, a registered offering means the shares are registered with the SEC and are generally freely tradable, and you get full public-company transparency through ongoing SEC filings on EDGAR. The primary issuance raises new capital for the company but also dilutes existing holders. Key risks are the usual public-market risks — price volatility, business execution, and the chance of loss — plus the reality that being newly listed does not by itself indicate the company will perform; review the prospectus and risk factors.",
      },
      {
        id: "nyse-direct-investor-deep",
        question: "NYSE Direct Listing, in depth — what should an investor know?",
        answerText:
          "An NYSE direct listing makes a company's existing shares tradable on the New York Stock Exchange — the 'Big Board' — without an underwritten IPO, so you typically buy shares on the exchange once trading opens rather than subscribing beforehand. Opening price is established through the exchange's price-discovery process overseen by a Designated Market Maker (DMM). For investors the benefits are liquidity and disclosure: the company registers its shares with the SEC, reports publicly on EDGAR, and is subject to NYSE listing standards and governance requirements. As with any direct listing, the opening can be volatile because there is no underwriter stabilization, and some holders may be under lock-ups. Key risks: market volatility, business and execution risk, and the fact that a prestigious listing venue is not a measure of investment safety.",
      },
      {
        id: "nyse-conventional-investor-deep",
        question: "NYSE Conventional Listing, in depth — what should an investor know?",
        answerText:
          "An NYSE conventional listing pairs listing on the New York Stock Exchange with a registered primary offering, so the company raises new capital by issuing shares as it goes public on the Big Board. As an investor you may participate in the registered offering if eligible, or buy shares on the NYSE after trading starts. Because the offering is registered with the SEC, the shares are generally freely tradable and you receive full public-company transparency through ongoing filings on EDGAR. The new issuance funds the company but dilutes existing shareholders. Key risks are standard for public equities — price volatility, the company's ability to execute its plan, and the possibility of loss — and a listing on a major exchange is not an endorsement of the investment; always read the prospectus and risk factors before investing.",
      },
    ],
  },
  {
    id: "investing-process",
    title: "Making an investment",
    intro: "From choosing an offering to a countersigned subscription.",
    items: [
      {
        id: "how-do-i-invest-step-by-step",
        question: "How do I actually make an investment, step by step?",
        answerText:
          "After selecting an offering you: 1) review the offering materials, including the risk factors; 2) confirm your eligibility through the questionnaire and any required accreditation verification; 3) choose your investment amount, at or above the stated minimum; 4) electronically sign the subscription agreement; and 5) fund the investment by card, wire, or ACH. Your subscription is not final until the issuer accepts and closes it; you receive a countersigned copy at that point.",
      },
      {
        id: "minimum-investment",
        question: "Is there a minimum investment?",
        answerText:
          "Minimums are set per offering by the issuer, not by the platform, so they vary from deal to deal. The minimum investment amount is shown on the offering page and in the offering materials before you commit. Some offerings set low minimums to widen access; others set higher minimums aimed at larger or institutional investors.",
      },
      {
        id: "how-do-documents-get-signed",
        question: "How are the investment documents signed?",
        answerText:
          "Subscription agreements are executed electronically through Adobe Acrobat Sign with a complete audit trail. After you sign, the issuer reviews and, if it accepts your subscription, countersigns and closes it — at which point you receive the fully executed copy for your records.",
      },
      {
        id: "can-i-cancel",
        question: "Can I cancel or change my investment after I commit?",
        answerText:
          "Cancellation rights depend on the offering's exemption and its specific terms. Some offering types and stages allow you to cancel before the issuer closes your subscription, while others become binding when signed. The offering materials state the cancellation and refund terms that apply, so review them before funding and contact the offering if you need to change a pending subscription.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & funding",
    intro: "How you pay, and how transfers are matched to your subscription.",
    items: [
      {
        id: "how-do-i-pay",
        question: "How do I pay for my investment?",
        answerText:
          "Funds are handled directly from you to the issuer — amounts under $5,000 can be paid by card, and larger amounts are funded by ACH or wire transfer straight to the issuer's bank account. Directly Listed never holds the funds. Bank transfers use the instructions provided for that specific offering, with a unique reference code so your transfer is automatically matched to your subscription. Using the exact reference code on a wire or ACH is what links your payment to your signed agreement.",
      },
      {
        id: "what-payment-methods",
        question: "What payment methods are accepted?",
        answerText:
          "Card payments (Visa, Mastercard, American Express) for amounts under $5,000, and bank ACH or wire transfers straight to the issuer's bank account for larger amounts. Funds are handled directly from you to the issuer — Directly Listed never holds the money. The accepted methods and any thresholds are shown during the funding step of each offering.",
      },
      {
        id: "is-my-money-held-safely",
        question: "What happens to my money before the offering closes?",
        answerText:
          "Funds are handled directly from you to the issuer — card payments to the issuer's processor and ACH or wire transfers straight to the issuer's bank account; Directly Listed never takes custody of the money. Your subscription only becomes final when the issuer accepts and closes it, and until then your signed subscription and funded amount are tracked together by the unique reference code assigned to you. Any escrow or holding arrangements that apply to a specific offering are described in that offering's materials.",
      },
    ],
  },
  {
    id: "after-investing",
    title: "After you invest",
    intro: "Ownership records, updates, liquidity, and taxes.",
    items: [
      {
        id: "how-is-ownership-recorded",
        question: "How is my ownership recorded after I invest?",
        answerText:
          "Once the issuer closes your subscription, your ownership is recorded on the issuer's books, typically through its transfer agent, and you receive your countersigned subscription agreement as proof of the transaction. Depending on the offering, your position may be reflected in your investor portal. The offering materials describe the form of the securities and how ownership and any certificates or book entries are maintained.",
      },
      {
        id: "will-i-get-updates",
        question: "Will I receive updates or reports after investing?",
        answerText:
          "It depends on the offering type. Regulation A+ Tier 2 issuers file ongoing annual and semiannual reports with the SEC, and exchange-listed companies provide full public-company reporting, so you can follow those filings on EDGAR. Private Regulation D issuers have lighter ongoing obligations and communicate at their own discretion. Investor relations and shareholder communications tooling on the platform may also relay issuer updates where the issuer chooses to send them.",
      },
      {
        id: "when-can-i-sell",
        question: "When can I sell, and are these securities liquid?",
        answerText:
          "Most securities sold in exempt offerings are illiquid and may have little or no resale market, so you should be prepared to hold for an indefinite period. Securities from private Regulation D offerings are typically restricted and subject to holding-period limits before resale. Securities tied to a NASDAQ or NYSE listing may be tradable on that exchange, subject to any applicable lock-ups. Always assume limited liquidity unless the offering materials state otherwise.",
      },
      {
        id: "tax-documents",
        question: "What about taxes on my investment?",
        answerText:
          "Tax treatment depends on the security, the issuer's structure, and your own circumstances, and you may receive tax forms from the issuer or its transfer agent for distributions or other taxable events. Directly Listed does not provide tax advice. Consult your own tax advisor about how a specific investment affects your situation before and after you invest.",
      },
    ],
  },
  {
    id: "risk-and-protection",
    title: "Risk, fraud & investor protection",
    intro:
      "What to read, how to verify an offering, and the risks you accept when you invest.",
    items: [
      {
        id: "what-are-the-risks",
        question: "What are the risks of investing in these offerings?",
        answerText:
          "Investments offered on the platform are generally in small or early-stage companies and are speculative, illiquid, and capable of losing your entire investment. Companies may fail to meet their business plans, securities may have no resale market, and you should only invest money you can afford to lose without changing your lifestyle. Read the full offering materials — especially the risk factors — and consult your own advisors before investing.",
      },
      {
        id: "does-sec-approve-offerings",
        question: "Does the SEC approve or endorse these offerings?",
        answerText:
          "No. The SEC does not approve, endorse, or pass on the merits of any securities offering, and for Regulation A+ a 'qualified' offering only means the staff completed its review — it is not an approval or a judgment that the investment is safe or sound. Be cautious of anyone who characterizes an SEC qualification, filing, or action as a government endorsement; that is a common misrepresentation.",
      },
      {
        id: "how-do-i-verify-an-offering",
        question: "How can I research or verify an offering before investing?",
        answerText:
          "Start with the offering materials, then independently verify the issuer through public SEC resources. You can search the issuer and its filings on EDGAR (EDGAR Company Search and EDGAR Full-Text Search), review investor education at Investor.gov, and check with your state securities regulator. Confirm the exemption being claimed, who is selling the securities, the use of proceeds, and the risk factors before committing.",
      },
      {
        id: "what-if-i-suspect-fraud",
        question: "What should I do if I have concerns or suspect fraud?",
        answerText:
          "Stop, do not send additional funds, and verify independently through SEC resources before acting. You can review guidance and report concerns through Investor.gov and the SEC, and consult your own attorney or financial advisor. Legitimate offerings will direct you to formal offering documents and will not pressure you with urgency, guaranteed returns, or claims of SEC endorsement — all of which are warning signs.",
      },
      {
        id: "data-and-privacy",
        question: "How is my personal and financial information handled?",
        answerText:
          "Information you provide for identity verification, accreditation, and payments is processed to onboard you into an offering and to meet KYC/AML and securities-law requirements, and its handling is governed by the platform's Privacy Policy. Sensitive verification and payment data is collected through secure flows rather than by ad hoc email. Review the Privacy Policy and Terms of Use for the specifics on how your data is used and protected.",
      },
    ],
  },
];

// Flat list helper — used by the JSON-LD builder.
export const INVESTOR_FAQ_FLAT: FaqItem[] = INVESTOR_FAQ.flatMap((c) => c.items);
