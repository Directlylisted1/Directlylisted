// lib/faq.issuer.ts
// -----------------------------------------------------------------------------
// Issuer FAQ — single source of truth.
// Drives the rendered page, the FAQPage JSON-LD, the on-page anchor nav, and the
// route metadata. Edit copy here only.
//
// Writing rules baked into these answers (for AI search / GEO):
//  - Each answer opens with a one-sentence, self-contained direct answer that an
//    LLM can lift verbatim, then adds depth.
//  - Entities and product names are spelled out exactly as they appear elsewhere
//    on the site so retrieval matches query phrasing.
//  - Figures are current as of 2026 (Reg A+ Tier 2 $75M/yr; Reg D 506(b) up to 35
//    non-accredited sophisticated investors, no general solicitation; 506(c)
//    accredited-only with verification; Reg CF $5M/yr).
//  - Nothing here is legal or investment advice; the disclaimer block carries that.
// -----------------------------------------------------------------------------

export type FaqItem = {
  id: string; // stable anchor slug, e.g. "what-does-directly-listed-charge"
  question: string;
  // answerText: plain-text version used for JSON-LD (no markup).
  answerText: string;
  // answerHtml: optional richer version for rendering (links, lists). Falls back
  // to answerText when absent.
  answerHtml?: string;
};

export type FaqCategory = {
  id: string; // anchor slug for the section, e.g. "platform-basics"
  title: string;
  intro?: string;
  items: FaqItem[];
};

export const ISSUER_FAQ: FaqCategory[] = [
  {
    id: "platform-basics",
    title: "Platform & how it works",
    intro:
      "What Directly Listed is, what it is not, and how an engagement runs from first call to funded.",
    items: [
      {
        id: "what-is-directly-listed",
        question: "What is Directly Listed?",
        answerText:
          "Directly Listed is an end-to-end institutional technology platform that helps companies raise capital and go public — covering Regulation D 506(b) and 506(c), Regulation A+, Regulation S, post-listing PIPE placements, NASDAQ and NYSE direct and conventional listings, and institutional equity lines of credit (ELOC). One platform stages your offering, attracts investors, processes funds, and manages shareholder communications, with SEC-licensed attorneys, consultants, and listing advisors coordinated under a single flat fee.",
      },
      {
        id: "is-directly-listed-a-broker-dealer",
        question: "Is Directly Listed a broker-dealer, investment advisor, or funding portal?",
        answerText:
          "No. Directly Listed is a B2B institutional technology platform — not a registered broker-dealer, investment advisor, or funding portal. Offerings are conducted by issuers in reliance on their own securities exemptions, with compliance workflows built into the software. Directly Listed does not offer investment advice, does not recommend investments, and does not assess the suitability of any investment for any investor.",
      },
      {
        id: "how-the-process-works",
        question: "How does the process work, step by step?",
        answerText:
          "There are five steps. 1) Book a call so our team can match the right exemption, exchange, and timeline to your business. 2) Stage your offering — after due diligence we configure the deal, prepare and file your SEC forms, and build your branded investment page. 3) Launch — your offering page goes live with its own Invest Now button, embeddable on your existing website. 4) Market — we help turn your earliest supporters into advocates, then widen the funnel with campaign marketing. 5) Receive funds — close subscriptions and access capital in tranches or as a lump sum on your timeline.",
      },
      {
        id: "what-directly-listed-handles",
        question: "What does Directly Listed handle versus what I handle?",
        answerText:
          "Directly Listed handles the heavy lifting: SEC filings and forms, investor relations, shareholder services, transfer agent and DTC coordination, real-time data dashboards, digital payment processing, KYC/AML, campaign marketing and investor acquisition, funnel analytics, and eSignature with a full audit trail. You provide accurate company information, the underlying business and financials, audit cooperation, and final decisions on deal terms such as valuation, raise amount, and voting rights.",
      },
      {
        id: "do-i-need-to-be-us-based",
        question: "Do I need to be a U.S. company to use Directly Listed?",
        answerText:
          "Not necessarily. U.S. and many non-U.S. companies can use the platform, and Regulation S specifically supports raising capital from international investors through offshore transactions, often run alongside a Regulation D round. Eligibility depends on your structure, jurisdiction, and the exemption or listing path you choose, which we scope during your initial call.",
      },
    ],
  },
  {
    id: "choosing-a-raise",
    title: "Choosing a raise structure",
    intro:
      "Directly Listed supports ten ways to raise. These answers explain how to pick among them and what each one allows.",
    items: [
      {
        id: "which-structures-supported",
        question: "Which raise structures does Directly Listed support?",
        answerText:
          "Ten: Regulation D 506(b), Regulation D 506(c), Regulation A+, Regulation S, PIPE (post-listing), NASDAQ Conventional Listing, NASDAQ Direct Listing, NYSE Conventional Listing, NYSE Direct Listing, and Equity Line of Credit (ELOC). They can be combined — for example, a private Reg D round now, an exchange listing later, and an ELOC for committed capital after you list.",
      },
      {
        id: "reg-d-506b-vs-506c",
        question: "What is the difference between Regulation D 506(b) and 506(c)?",
        answerText:
          "Both let you raise an unlimited amount, but the marketing rules differ. Reg D 506(b) is a private, quiet raise: no general solicitation or advertising, an unlimited number of accredited investors, up to 35 non-accredited but sophisticated investors, and self-certified accreditation. Reg D 506(c) lets you advertise publicly and generally solicit, but every investor must be an accredited investor whose status you take reasonable steps to verify. A practical rule of thumb: choose 506(b) when you are raising from people you already know, and 506(c) when you want to market the raise openly.",
      },
      {
        id: "what-is-reg-a-plus",
        question: "What is Regulation A+ and how much can I raise?",
        answerText:
          "Regulation A+ is a mini-IPO that lets you raise up to $75 million per 12-month period under Tier 2 from both accredited and non-accredited investors — open to your customers, community, and the crowd. It requires a qualified Form 1-A offering statement and audited financials, and Tier 2 offerings carry ongoing reporting obligations but are exempt from state blue-sky registration. It is the most public-facing way to raise short of a full exchange offering.",
      },
      {
        id: "what-is-reg-s",
        question: "What is Regulation S?",
        answerText:
          "Regulation S lets you raise capital from international investors through offshore transactions that fall outside U.S. registration requirements. It is frequently run in parallel with a Regulation D round so a single capital raise can reach both U.S. accredited investors and offshore investors at the same time.",
      },
      {
        id: "what-is-a-pipe",
        question: "What is a PIPE, and when does it happen?",
        answerText:
          "A PIPE — private investment in public equity — is institutional capital placed directly into your company after it lists, at a negotiated price. It is a post-listing tool, used to bring in committed institutional money once you are public rather than during the private phase.",
      },
      {
        id: "what-is-eloc",
        question: "What is an Equity Line of Credit (ELOC)?",
        answerText:
          "An Equity Line of Credit (ELOC) is a committed standby equity facility from institutional investors that lets a public company draw capital when it needs it, on its own timeline — up to $350M in committed capital after listing. Rather than raising a fixed amount at once, you draw down in tranches over time, which gives you control over dilution and timing.",
      },
      {
        id: "can-i-combine-structures",
        question: "Can I combine multiple raise structures?",
        answerText:
          "Yes, and many issuers do. A common path is a private Regulation D 506(b) or 506(c) round to build momentum, a Regulation S sleeve to add offshore investors, then a NASDAQ or NYSE listing, with a PIPE or ELOC providing committed capital after you go public. We map the sequence during scoping so the structures are compliant and do not create integration problems.",
      },
    ],
  },
  {
    id: "structures-in-depth",
    title: "Every capital structure, in depth",
    intro:
      "A detailed breakdown of each of the ten ways to raise — limits, who can invest, solicitation and advertising rules, key filings, ongoing reporting, liquidity, and the situation each one fits best. Exact thresholds vary by facts and tier and are confirmed for your deal during scoping; none of this is legal or investment advice.",
    items: [
      {
        id: "reg-d-506b-deep",
        question: "Regulation D 506(b), in depth — how does it work?",
        answerText:
          "Regulation D 506(b) is a private placement that lets you raise an unlimited amount of capital from people you already know, without any general solicitation or advertising. You may sell to an unlimited number of accredited investors plus up to 35 non-accredited but financially sophisticated investors, and accreditation is self-certified rather than independently verified. Because you cannot publicly market a 506(b) round, it relies on a pre-existing, substantive relationship with each investor. If you include any non-accredited investors, you must provide them with disclosure comparable to a registered offering, including audited financial statements, which raises the cost and effort — so most 506(b) rounds stay accredited-only in practice. The securities are 'restricted' (resale is limited, typically under Rule 144), you file a Form D with the SEC within 15 days of the first sale, and the offering is a 'covered security' that preempts state blue-sky registration (state notice filings and fees still apply). Best fit: founders raising quietly from their own network, friends-and-family-plus, or existing investors, who do not want to advertise the deal.",
      },
      {
        id: "reg-d-506c-deep",
        question: "Regulation D 506(c), in depth — how does it work?",
        answerText:
          "Regulation D 506(c) is a private placement that lets you advertise your raise publicly and accept an unlimited amount of capital, on the condition that every purchaser is an accredited investor whose status you verify. Unlike 506(b), general solicitation and general advertising are expressly permitted — you can promote the offering on your website, social media, email, and at events — which is why it pairs naturally with campaign marketing. The trade-off is that self-certification is not enough: you must take 'reasonable steps to verify' each investor is accredited, through income or net-worth documentation (W-2s, tax returns, brokerage and bank statements) or a written confirmation from a CPA, attorney, registered broker-dealer, or investment adviser. Directly Listed builds this verification into the investment flow. The securities are restricted for resale, you file a Form D within 15 days of first sale, and the offering preempts state blue-sky registration. Best fit: issuers who want to market the raise openly and turn customers, audience, and the public into accredited investors.",
      },
      {
        id: "reg-a-plus-deep",
        question: "Regulation A+ (Tier 1 and Tier 2), in depth — how does it work?",
        answerText:
          "Regulation A+ is a 'mini-IPO' that lets you raise from the general public — both accredited and non-accredited investors — under a qualified offering. It has two tiers. Tier 1 allows up to $20 million in a 12-month period and has no ongoing SEC reporting, but it is subject to state blue-sky review (often via a coordinated review process). Tier 2 allows up to $75 million in a 12-month period, requires two years of audited financial statements, preempts state blue-sky registration, and carries ongoing reporting — an annual Form 1-K, semiannual Form 1-SA, and current Form 1-U. Non-accredited investors in a Tier 2 deal are subject to investment limits (generally no more than 10% of the greater of their annual income or net worth) unless the securities are listed on a national exchange at qualification. The core document is the Form 1-A offering statement, which the SEC must 'qualify' before sales close, and Reg A+ uniquely allows 'testing the waters' — gauging investor interest before you file. The securities are generally freely tradable, which is a key advantage over Reg D. Best fit: consumer or community brands that want to open a public, marketable raise and potentially build a path toward a listing.",
      },
      {
        id: "reg-s-deep",
        question: "Regulation S, in depth — how does it work?",
        answerText:
          "Regulation S is a safe harbor that lets you raise capital from non-U.S. investors in offshore transactions that fall outside U.S. registration requirements. Two conditions anchor it: the sale must occur in an 'offshore transaction,' and there must be no 'directed selling efforts' aimed into the United States. Depending on the issuer and the security, a 'distribution compliance period' applies, during which the securities cannot flow back to U.S. persons; the platform tracks this period as part of compliance. Reg S is most often run in parallel with a domestic Regulation D 506(b) or 506(c) round, so a single capital raise can reach U.S. accredited investors and offshore international investors simultaneously without integrating the two in a way that breaks either exemption. There is no dollar cap of its own — the limit comes from whatever you can raise offshore. Best fit: companies with meaningful international investor demand, family offices, or diaspora communities abroad who want to invest alongside a U.S. round.",
      },
      {
        id: "pipe-deep",
        question: "PIPE financing, in depth — how does it work?",
        answerText:
          "A PIPE — private investment in public equity — is a privately negotiated placement of securities by an already-public company to institutional or accredited investors, usually at a price referenced to the public market (often a modest discount). It is a post-listing tool: you use it after you are public to bring in committed institutional capital quickly, without the time and expense of a registered follow-on offering. PIPEs are typically structured under Regulation D, so the shares are restricted when issued; the deal almost always includes registration rights, and the issuer files a resale registration statement (Form S-1 or S-3) so the PIPE investors gain liquidity once it is declared effective. Structures range from straight common stock to convertible preferred, convertible notes, or common stock with warrants, depending on what the investors require. The advantages are speed, price certainty, and a known investor; the considerations are dilution and the discount. Best fit: newly listed or established public companies that need growth or balance-sheet capital and want a fast, negotiated raise from sophisticated investors.",
      },
      {
        id: "eloc-deep",
        question: "Equity Line of Credit (ELOC), in depth — how does it work?",
        answerText:
          "An Equity Line of Credit (ELOC) — also called a standby equity facility or standby equity distribution agreement — is a committed arrangement in which an institutional investor agrees to purchase, at the issuer's election, up to a fixed dollar amount of newly issued shares over a set period, with Directly Listed arranging facilities of up to $350 million in committed capital. Instead of raising a fixed amount at one price, the public-company issuer controls the timing and size of each 'draw' (or 'put'), selling shares at a price referenced to the prevailing market (typically at a small discount) when capital is needed. This puts dilution and timing under the issuer's control — you draw little or nothing when the stock is weak, and more when it is strong. An ELOC requires an effective resale registration statement covering the shares, and works only for listed or listing-track companies with enough trading liquidity to absorb the draws. Best fit: public companies that want flexible, on-demand capital as a financing backstop rather than a single large raise, and that want to manage dilution opportunistically.",
      },
      {
        id: "nasdaq-direct-deep",
        question: "NASDAQ Direct Listing, in depth — how does it work?",
        answerText:
          "A NASDAQ direct listing takes your company public on the Nasdaq Stock Market by registering existing shares for trading, without an underwritten IPO and without issuing new underwritten shares — so there is no underwriter discount, no traditional roadshow, and no dilution from a primary offering. Existing shareholders and the company gain a public market and liquidity; a reference price is established and the stock opens through Nasdaq's price-discovery process. You still must register the resale of shares with the SEC (typically a Form S-1, or Form 10 in some structures), complete Edgarization, and meet Nasdaq's quantitative and qualitative listing standards — which vary by tier (Nasdaq Global Select, Global Market, or Capital Market) and cover items such as shareholders' equity or market value, public float, a minimum bid price (commonly $4, with alternatives), a minimum number of round-lot holders, and corporate-governance requirements. Directly Listed assesses your company against the right standard, closes any gaps, and manages registration and the exchange application end to end. Best fit: companies that are already well-capitalized and want a public market and shareholder liquidity rather than to raise new primary capital at the moment of listing.",
      },
      {
        id: "nasdaq-conventional-deep",
        question: "NASDAQ Conventional Listing, in depth — how does it work?",
        answerText:
          "A NASDAQ conventional listing pairs going public on Nasdaq with a registered primary offering, so you raise new capital at the same time you list. You file a registration statement (typically a Form S-1) that the SEC must declare effective, complete Edgarization, and satisfy the same Nasdaq listing standards as a direct listing — shareholders' equity or market-value tests, public float, minimum bid price, round-lot holders, and governance — for the tier you target (Global Select, Global Market, or Capital Market). The difference from a direct listing is the simultaneous capital raise: you sell newly issued shares to investors as part of going public, which means dilution but also fresh primary capital on the balance sheet. Under the Directly Listed model this is handled on a flat-fee basis with SEC-licensed attorneys, listing advisors, and the platform's investor and payment infrastructure, rather than a percentage-of-raise underwriting spread. Best fit: companies that both want to be listed on Nasdaq and need to raise new growth capital at the moment they go public.",
      },
      {
        id: "nyse-direct-deep",
        question: "NYSE Direct Listing, in depth — how does it work?",
        answerText:
          "An NYSE direct listing lists your company on the New York Stock Exchange — the 'Big Board' — by registering existing shares for trading, without an underwritten IPO or new underwritten shares, giving existing holders liquidity without the dilution and underwriting spread of a conventional IPO. As with Nasdaq, you register the resale of shares with the SEC, complete Edgarization, and the stock opens via the exchange's price-discovery mechanism overseen by a Designated Market Maker (DMM). The NYSE applies its own listing standards — for example, minimum numbers of round-lot holders, a minimum quantity of publicly held shares, an aggregate market value of publicly held shares, and a minimum price — together with corporate-governance requirements; exact thresholds depend on the standard you qualify under. Directly Listed manages listing readiness, SEC registration, Edgarization, DMM coordination, and the exchange application end to end. Best fit: companies that want the prestige and liquidity of an NYSE listing and are focused on a public market for existing shares rather than raising new primary capital at listing.",
      },
      {
        id: "nyse-conventional-deep",
        question: "NYSE Conventional Listing, in depth — how does it work?",
        answerText:
          "An NYSE conventional listing combines listing on the New York Stock Exchange with a registered primary offering, so you raise new capital 'at the bell' as you go public on the Big Board. You file a registration statement (typically a Form S-1) through SEC effectiveness, complete Edgarization, and meet the NYSE's listing standards — round-lot holders, publicly held shares, aggregate market value of public shares, minimum price, and governance — for the relevant standard. The defining feature versus a direct listing is the concurrent sale of newly issued shares, which raises primary capital but is dilutive. The Directly Listed model runs this end to end on a flat platform fee plus an equity grant, with SEC-licensed attorneys, listing advisors, market-maker coordination, and the platform's investor onboarding, eSignature, and payments — instead of a conventional underwriting spread. Best fit: companies that want an NYSE listing and need to raise new capital at the same time they go public.",
      },
    ],
  },
  {
    id: "listings",
    title: "Going public: NASDAQ & NYSE",
    intro:
      "Direct versus conventional listings, what we manage, and how long it takes.",
    items: [
      {
        id: "direct-vs-conventional-listing",
        question: "What is the difference between a direct listing and a conventional listing?",
        answerText:
          "A direct listing takes your company public on NASDAQ or the NYSE without a traditional underwritten IPO and without the dilution of new underwritten shares. A conventional listing pairs the listing with a registered primary offering, so you raise new capital at the same time you go public. Directly Listed supports both on both exchanges: NASDAQ Direct, NASDAQ Conventional, NYSE Direct, and NYSE Conventional.",
      },
      {
        id: "go-public-without-ipo",
        question: "Can I go public on NASDAQ or the NYSE without an IPO?",
        answerText:
          "Yes. A direct listing lets you list on NASDAQ or the New York Stock Exchange — the Big Board — without an underwritten IPO. Directly Listed manages listing readiness, SEC registration, Edgarization, and the exchange application end to end.",
      },
      {
        id: "how-long-does-a-listing-take",
        question: "How long does a direct listing take?",
        answerText:
          "It depends primarily on audit readiness and SEC review cycles. Typical engagements run several months from kickoff through effectiveness and exchange approval. We scope a specific timeline during your quotation, and the biggest variable you control is how quickly audited financials and diligence materials are ready.",
      },
      {
        id: "listing-requirements",
        question: "What does my company need to qualify for a NASDAQ or NYSE listing?",
        answerText:
          "Each exchange sets quantitative and qualitative listing standards covering items such as shareholders' equity, public float, share price, number of round-lot holders, and corporate governance. The exact thresholds vary by exchange and listing tier. During scoping we assess your company against the relevant standard and flag any gaps to close before applying, so you do not file an application you are not ready to pass.",
      },
      {
        id: "what-is-edgarization",
        question: "What is Edgarization, and do you handle it?",
        answerText:
          "Edgarization is the process of converting and formatting your SEC filings into the format required by EDGAR, the SEC's electronic filing system, and submitting them. Directly Listed handles SEC registration, Edgarization, and the exchange application as part of an end-to-end listing engagement.",
      },
    ],
  },
  {
    id: "costs-and-terms",
    title: "Cost, fees & terms",
    intro: "How pricing works and what is included versus billed separately.",
    items: [
      {
        id: "what-does-directly-listed-charge",
        question: "What does Directly Listed charge?",
        answerText:
          "Every deal is quoted individually: a flat platform fee plus an equity grant at signing, both set by the scope of services and your company's stage. Our SEC-licensed attorneys, consultants, and listing advisors are paid out of that flat fee — there are no separate legal bills. You pay only third-party costs on top, such as audits, legal opinions, transfer agent and DTC fees, and exchange fees.",
      },
      {
        id: "whats-included-in-the-fee",
        question: "What is included in the flat fee, and what costs are separate?",
        answerText:
          "Included: SEC filings and forms, the work of SEC-licensed attorneys, consultants and listing advisors, your branded investment page, investor relations and shareholder services tooling, payment processing, KYC/AML, eSignature, and dashboards. Separate third-party costs typically include independent audits, outside legal opinions, transfer agent and DTC fees, and exchange listing fees. These are disclosed so you can budget the full picture before you sign.",
      },
      {
        id: "how-do-i-get-a-quote",
        question: "How do I get a quote?",
        answerText:
          "Tell us about your company and we scope your raise, then issue a deal-specific quotation — a flat platform fee plus an equity grant at signing. The fastest way to start is to book a call so we can match the exemption, exchange, and timeline to your goals before quoting.",
      },
    ],
  },
  {
    id: "investors-and-payments",
    title: "Investors, onboarding & payments",
    intro:
      "Who can invest, how they are verified, and how money moves.",
    items: [
      {
        id: "who-can-invest",
        question: "Who can invest in my offering?",
        answerText:
          "It depends on the structure. Regulation D 506(c) and most private rounds are limited to accredited investors; Regulation D 506(b) adds up to 35 sophisticated non-accredited investors; Regulation A+ is open to both accredited and non-accredited investors, including the general public; and Regulation S reaches offshore international investors. We configure the eligibility rules for your chosen exemption directly into the investment flow.",
      },
      {
        id: "how-is-accreditation-verified",
        question: "How is accredited investor status verified?",
        answerText:
          "For Regulation D 506(c), where verification is mandatory, the platform takes reasonable steps to verify each investor's accredited status — through documentation or third-party verification — before the investment is accepted. For 506(b), accreditation is self-certified. KYC/AML checks run on investors across structures as part of onboarding.",
      },
      {
        id: "how-do-investors-pay",
        question: "How do investors pay?",
        answerText:
          "Funds are handled directly from investors to the issuer — by card for amounts under $5,000, or by ACH or wire transfer straight to the issuer's bank account. Directly Listed never holds the funds. Wire and ACH transfers are reconciled with a unique reference code per subscription, so every payment maps cleanly to a signed subscription.",
      },
      {
        id: "embed-offering-on-my-site",
        question: "Can I embed my offering on my own website?",
        answerText:
          "Yes. Your offering page carries its own Invest Now flow, and you can link to it or embed it directly on your existing site while Directly Listed handles investor onboarding, eSignature, and payments behind it. Your earliest customers and supporters can invest without leaving your brand experience.",
      },
      {
        id: "when-do-i-receive-funds",
        question: "When and how do I receive the capital I raise?",
        answerText:
          "You close subscriptions and access capital in tranches or as a lump sum — the timing is in your hands. The right cadence depends on your structure: a one-time close for a fixed round, or ongoing draws for a facility like an ELOC.",
      },
    ],
  },
  {
    id: "compliance-and-risk",
    title: "Compliance, eligibility & risk",
    intro:
      "Regulatory obligations, ongoing reporting, and the standard disclaimers every issuer should read.",
    items: [
      {
        id: "ongoing-reporting-obligations",
        question: "What ongoing reporting obligations will my company have?",
        answerText:
          "It depends on the path. Regulation A+ Tier 2 carries ongoing SEC reporting, including annual and semiannual reports. Exchange-listed companies on NASDAQ or the NYSE take on full public-company reporting and corporate governance obligations. Private Regulation D rounds require a Form D filing with the SEC within 15 days of the first sale and applicable state notice filings, with lighter ongoing requirements. We outline the specific obligations for your structure during scoping.",
      },
      {
        id: "do-i-need-audited-financials",
        question: "Do I need audited financial statements?",
        answerText:
          "Usually, yes — for public-facing raises. Regulation A+ Tier 2 and exchange listings require audited financials, and audit readiness is typically the single biggest driver of your timeline. Some private Regulation D rounds to accredited investors have lighter requirements, though disclosure obligations rise sharply if you include non-accredited investors under 506(b). We confirm exactly what is required for your structure before you commit.",
      },
      {
        id: "is-this-legal-or-investment-advice",
        question: "Does Directly Listed give legal or investment advice?",
        answerText:
          "No. Directly Listed and its affiliates do not provide legal, tax, or investment advice, and do not endorse, recommend, or assess the suitability of any investment. The SEC-licensed attorneys coordinated through the platform act within defined engagement scopes. For decisions specific to your situation you should consult your own attorney, tax advisor, and financial advisor. Nothing on the site is a solicitation of an offer to buy or an offer to sell any security.",
      },
      {
        id: "what-are-the-risks",
        question: "What are the risks I should understand?",
        answerText:
          "All securities offerings involve risk, including the risk of total loss for investors and the risk that a raise does not reach its target. Securities sold in exempt offerings are often illiquid and may have limited or no resale market. Going public adds reporting, governance, and market-conduct obligations. These factors should be weighed against your goals; full risk factors live in the offering materials for each specific offering.",
      },
    ],
  },
];

// Flat list helper — used by the JSON-LD builder.
export const ISSUER_FAQ_FLAT: FaqItem[] = ISSUER_FAQ.flatMap((c) => c.items);
