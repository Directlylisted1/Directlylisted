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
  // related: cross-links rendered under the answer ("Related Topics").
  related?: Array<{ label: string; href: string }>;
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
          "There are five steps. 1) Book a call so our team can match the right exemption, exchange, and timeline to your business. 2) Stage your offering — after due diligence we configure the deal, prepare and file your SEC forms, and build your branded investment page. 3) Launch — your offering page goes live with its own Invest Now button, embeddable on your existing website. 4) Market — we help turn your earliest supporters into advocates, then widen the funnel with campaign marketing. 5) Receive funds — close subscriptions and access capital in tranches or as a lump sum on your timeline. For Reg A+ specifically, companies typically raise $4 million to $75 million per year: there is no legal minimum, but the fixed costs of a Reg A+ mean it is rarely efficient below roughly $4 million.",
        answerHtml:
          '<p>There are five steps: (1) <a href="/book">book a call</a> to find the capital solution that fits — exemption, exchange, and timeline; (2) after due diligence we stage your offering, prepare and file your SEC forms, and build your branded investment page; (3) your offering goes live with its own Invest Now button, embeddable on your existing website; (4) you market the offering, turning early supporters into advocates and widening the funnel with <a href="/products/campaign-marketing">strategic campaign marketing</a>; and (5) you close subscriptions and receive your funds — in tranches or as a lump sum, on your timing. For <a href="/products/reg-a-plus">Reg A+</a> specifically, companies typically raise $4 million to $75 million per year: there is no legal minimum, but the fixed costs of a Reg A+ mean it is rarely efficient below roughly $4 million.</p>',
        related: [
          { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
          { label: "Our Product Line", href: "/products" },
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
          { label: "Campaign Marketing", href: "/products/campaign-marketing" },
          { label: "Current Deals & Case Studies", href: "/case-studies" },
        ],
      },
      {
        id: "what-directly-listed-handles",
        question: "What does Directly Listed handle versus what I handle?",
        answerText:
          "Directly Listed handles the heavy lifting: SEC filings and forms, investor relations, shareholder services, transfer agent and DTC coordination, real-time data dashboards, digital payment processing, KYC/AML, campaign marketing and investor acquisition, funnel analytics, and eSignature with a full audit trail. You provide accurate company information, the underlying business and financials, audit cooperation, and final decisions on deal terms such as valuation, raise amount, and voting rights.",
        answerHtml:
          "<p>One platform handles the heavy lifting of your raise:</p>" +
          "<ul>" +
          "<li>SEC filings and forms — prepared to EDGAR standards, including Inline XBRL tagging, with <strong>SEC-licensed attorneys, consultants, and listing advisors all paid out of one flat fee</strong>;</li>" +
          "<li>Automated compliance — KYC collection, AML checks, and accredited-investor verification built into the investment flow, with proprietary investor quality checks;</li>" +
          '<li><a href="/products/campaign-marketing">Campaign marketing</a> and investor acquisition, with funnel analytics and referrals to practiced, competitively priced agencies we help you direct and manage;</li>' +
          "<li>Digital payment processing — card for amounts under $5,000, ACH, and wire, with funds flowing directly from investors to your bank account (Directly Listed never holds the funds);</li>" +
          '<li><a href="/products/investor-services">Investor relations and shareholder services</a>, transfer agent and DTC coordination, real-time data dashboards, and eSignature execution with full audit trails;</li>' +
          '<li>Exchange work — <a href="/products/nasdaq-direct-listing">NASDAQ</a> and <a href="/products/nyse-direct-listing">NYSE</a> listing readiness, applications, and post-listing compliance.</li>' +
          "</ul>" +
          '<p>Deep expertise in <a href="/products/reg-a-plus">Reg A+</a>, <a href="/products/reg-d-506b">Reg D</a>, and <a href="/products/reg-s">Reg S</a> runs through every engagement, from structuring to the close of your raise. You provide accurate company information, the underlying business and financials, audit cooperation, and final decisions on deal terms such as valuation, raise amount, and voting rights.</p>',
        related: [
          { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
          { label: "Investor Services", href: "/products/investor-services" },
          { label: "Campaign Marketing", href: "/products/campaign-marketing" },
          { label: "About Directly Listed", href: "/about" },
        ],
      },
      {
        id: "do-i-need-to-be-us-based",
        question: "Do I need to be a U.S. company to use Directly Listed?",
        answerText:
          "Not necessarily. U.S. and many non-U.S. companies can use the platform, and Regulation S specifically supports raising capital from international investors through offshore transactions, often run alongside a Regulation D round. Eligibility depends on your structure, jurisdiction, and the exemption or listing path you choose, which we scope during your initial call.",
      },
      {
        id: "what-is-directly-listed-aml-policy",
        question: "What is Directly Listed's AML policy?",
        answerText:
          "All investors who initiate investments on the Directly Listed platform must pass KYC/AML screening before completing their investment — no investor is accepted without it. Accreditation verification for Reg D 506(c) offerings is likewise handled automatically as part of the investment process, so compliance is built into your raise rather than bolted on. For you as an issuer, that means the investor file behind every subscription is clean, documented, and ready for diligence, closing, and any later exchange or regulatory review.",
        related: [
          { label: "Investor Services", href: "/products/investor-services" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
          { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
        ],
      },
      {
        id: "what-is-the-live-offerings-page",
        question: "What is the Live Offerings page?",
        answerText:
          "The Live Offerings page is where your company markets its offering and engages prospective investors. During the pre-offering, testing-the-waters stage no investing is done: you solicit non-binding indications of interest, learn how compelling investors find your company and terms, refine the offering, and decide whether to move forward with an SEC filing. Prospective investors can ask questions and make non-binding reservations so you — and Directly Listed — can assess real demand before you spend on the formal process. Once your offering is qualified or your exemption is live, the page carries your Invest Now flow. Completed and live raises are also profiled in Current Deals & Case Studies.",
        related: [
          { label: "Live Offerings", href: "/offerings" },
          { label: "Current Deals & Case Studies", href: "/case-studies" },
          { label: "Campaign Marketing", href: "/products/campaign-marketing" },
        ],
      },
      {
        id: "what-is-testing-the-waters",
        question: "What is “Testing the Waters”?",
        answerText:
          "Testing the waters (TTW) is the SEC-permitted practice of marketing your potential Reg A+ offering before filing, to gauge investor interest with few restrictions. Run well, a TTW campaign of a couple of months tells you clearly whether your offering will attract sufficient demand — before you commit to audit, legal, and filing costs. Two cautions: all TTW materials must carry the required SEC legends and follow the communication rules (see the marketing words to avoid below), and do not stay in test mode too long — companies that stretch TTW for six months while the audit or filing lags risk losing their earliest, most enthusiastic would-be investors. Plan the timing of audit, filing, and marketing before you start creating enthusiasm; it is always easier to create excitement once.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Campaign Marketing", href: "/products/campaign-marketing" },
          { label: "Guides", href: "/guides" },
        ],
      },
    ],
  },
  {
    id: "choosing-a-raise",
    title: "Choosing a raise structure",
    intro:
      "Directly Listed supports twelve ways to raise. These answers explain how to pick among them and what each one allows.",
    items: [
      {
        id: "which-structures-supported",
        question: "Which raise structures does Directly Listed support?",
        answerText:
          "Twelve: Regulation D 506(b), Regulation D 506(c), Regulation A+, Regulation S, Section 4(a)(2) Private Offerings, PIPE (post-listing), NASDAQ Conventional Listing, NASDAQ Direct Listing, NYSE Conventional Listing, NYSE Direct Listing, Equity Line of Credit (ELOC), and the Cayman Islands Structure for cross-border issuers. They can be combined — for example, a private Reg D round now, an exchange listing later, and an ELOC for committed capital after you list.",
        answerHtml:
          '<p>Twelve: <a href="/products/reg-d-506b">Regulation D 506(b)</a>, <a href="/products/reg-d-506c">Regulation D 506(c)</a>, <a href="/products/reg-a-plus">Regulation A+</a>, <a href="/products/reg-s">Regulation S</a>, <a href="/products/section-4a2">Section 4(a)(2) Private Offerings</a>, <a href="/products/pipe">PIPE (post-listing)</a>, <a href="/products/nasdaq-conventional-listing">NASDAQ Conventional Listing</a>, <a href="/products/nasdaq-direct-listing">NASDAQ Direct Listing</a>, <a href="/products/nyse-conventional-listing">NYSE Conventional Listing</a>, <a href="/products/nyse-direct-listing">NYSE Direct Listing</a>, <a href="/products/eloc">Equity Line of Credit (ELOC)</a>, and the <a href="/products/cayman-islands-structure">Cayman Islands Structure</a> for cross-border issuers. They can be combined — for example, a private Reg D round now, an exchange listing later, and an ELOC for committed capital after you list.</p>',
        related: [{ label: "Our Product Line", href: "/products" }],
      },
      {
        id: "reg-d-506b-vs-506c",
        question: "What is the difference between Regulation D 506(b) and 506(c)?",
        answerText:
          "Both let you raise an unlimited amount, but the marketing rules differ. Reg D 506(b) is a private, quiet raise: no general solicitation or advertising, an unlimited number of accredited investors, up to 35 non-accredited but sophisticated investors, and self-certified accreditation. Reg D 506(c) lets you advertise publicly and generally solicit, but every investor must be an accredited investor whose status you take reasonable steps to verify. A practical rule of thumb: choose 506(b) when you are raising from people you already know, and 506(c) when you want to market the raise openly. Either way, the company files a simple Form D with the SEC, the securities sold are restricted for one year, and Reg D pairs naturally with Regulation S for non-U.S. investors — it is the workhorse for pre-listing rounds.",
        answerHtml:
          '<p>Both let you raise an unlimited amount, but the marketing rules differ. Under <a href="/products/reg-d-506b">Rule 506(b)</a>, you raise privately from investors you already know — no general solicitation, accreditation self-certified, and up to 35 sophisticated non-accredited investors permitted. Under <a href="/products/reg-d-506c">Rule 506(c)</a>, you may advertise the raise publicly, but every investor must be accredited and you must take reasonable steps to verify it — verification Directly Listed handles automatically in the investment flow. A practical rule of thumb: choose 506(b) when you are raising from people you already know, and 506(c) when you want to market the raise openly. Either way, the company files a simple Form D with the SEC, and the securities sold are restricted for one year. Reg D pairs naturally with <a href="/products/reg-s">Regulation S</a> for non-U.S. investors and is the workhorse for pre-listing rounds.</p>',
        related: [
          { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
          { label: "Regulation S", href: "/products/reg-s" },
          { label: "Family Offices, VC, PE & Hedge Funds", href: "/strategic-investors" },
        ],
      },
      {
        id: "can-i-do-506c-on-directly-listed",
        question: "Can I do a Reg D 506(c) offering on Directly Listed?",
        answerText:
          "Yes. Rule 506(c) offerings are a core product: you can advertise your raise publicly and accept unlimited capital from accredited investors, with accreditation verification, KYC, and AML built into the platform's investment flow. Your offering gets a branded page with an embeddable Invest Now button, and funds move directly from investors to your bank account. Many issuers run a 506(c) alongside a Reg S tranche for international investors, or as the pre-listing round before a NASDAQ or NYSE listing.",
        answerHtml:
          '<p>Yes. <a href="/products/reg-d-506c">Rule 506(c)</a> offerings are a core product: you can advertise your raise publicly and accept unlimited capital from accredited investors, with accreditation verification, KYC, and AML built into the platform\'s investment flow. Your offering gets a branded page with an embeddable Invest Now button, and funds move directly from investors to your bank account. Many issuers run a 506(c) alongside a <a href="/products/reg-s">Reg S</a> tranche for international investors, or as the pre-listing round before a <a href="/products/nasdaq-direct-listing">NASDAQ</a> or <a href="/products/nyse-direct-listing">NYSE</a> listing.</p>',
        related: [
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
          { label: "Regulation S", href: "/products/reg-s" },
          { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
          { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
        ],
      },
      {
        id: "what-is-reg-a-plus",
        question: "What is Regulation A+ and how much can I raise?",
        answerText:
          "Regulation A+ is a capital-raising framework created by the SEC under Title IV of the JOBS Act, effective 2015. It allows companies to raise up to $75 million per year (Tier 2) from individual “Main Street” investors worldwide — regardless of wealth — as well as from accredited investors and institutions. Companies may test the waters first, and a completed Tier 2 offering qualifies the company for public quotation on the OTCQB (and readily the OTCQX) or, where exchange standards are met, a NASDAQ or NYSE listing. Reg A+ dramatically improves funding prospects for companies too small for a conventional IPO or without access to a private placement or venture capital: start-ups and growth companies can raise from many smaller investors who become shareholders — customers included.",
        answerHtml:
          '<p><a href="/products/reg-a-plus">Regulation A+</a> is a capital-raising framework created by the SEC under Title IV of the JOBS Act, effective 2015. It allows companies to raise up to $75 million per year (Tier 2) from individual "Main Street" investors worldwide — regardless of wealth — as well as from accredited investors and institutions. Companies may test the waters first, and a completed Tier 2 offering qualifies the company for public quotation on the OTCQB (and readily the OTCQX) or, where exchange standards are met, a <a href="/products/nasdaq-conventional-listing">NASDAQ</a> or <a href="/products/nyse-conventional-listing">NYSE</a> listing. Reg A+ dramatically improves funding prospects for companies too small for a conventional IPO or without access to a private placement or venture capital: start-ups and growth companies can raise from many smaller investors who become shareholders — customers included.</p>',
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "NASDAQ Conventional Listing", href: "/products/nasdaq-conventional-listing" },
          { label: "NYSE Conventional Listing", href: "/products/nyse-conventional-listing" },
          { label: "Guides", href: "/guides" },
          { label: "Current Deals & Case Studies", href: "/case-studies" },
        ],
      },
      {
        id: "what-is-reg-s",
        question: "What is Reg S or Regulation S?",
        answerText:
          "Regulation S allows companies to raise capital from investors outside the United States through offshore transactions, without U.S. registration. Non-U.S. investors are not required to be accredited, and Reg S is a natural complement to Reg D: U.S. accredited investors invest through the Reg D while international investors invest through the Reg S, run side by side. The SEC also permits non-U.S. companies to raise outside the U.S. under Reg S (or their home rules) while accessing U.S. accredited investors via Reg D — the standard structure for international issuers entering the U.S. market.",
        answerHtml:
          '<p><a href="/products/reg-s">Regulation S</a> allows companies to raise capital from investors <strong>outside the United States</strong> through offshore transactions, without U.S. registration. Non-U.S. investors are not required to be accredited, and Reg S is a natural complement to <a href="/products/reg-d-506c">Reg D</a>: U.S. accredited investors invest through the Reg D while international investors invest through the Reg S, run side by side. The SEC also permits non-U.S. companies to raise outside the U.S. under Reg S (or their home rules) while accessing U.S. accredited investors via Reg D — the standard structure for international issuers entering the U.S. market.</p>',
        related: [
          { label: "Regulation S", href: "/products/reg-s" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
          { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
        ],
      },
      {
        id: "what-is-a-pipe",
        question: "What is a PIPE, and when does it happen?",
        answerText:
          "A PIPE — private investment in public equity — is institutional capital placed directly into your company after it lists, at a negotiated price. It is a post-listing tool, used to bring in committed institutional money once you are public rather than during the private phase.",
        related: [
          { label: "PIPE (Post-Listing)", href: "/products/pipe" },
          { label: "Family Offices, VC, PE & Hedge Funds", href: "/strategic-investors" },
        ],
      },
      {
        id: "what-is-eloc",
        question: "What is an Equity Line of Credit (ELOC)?",
        answerText:
          "An Equity Line of Credit (ELOC) is a committed standby equity facility from institutional investors that lets a public company draw capital when it needs it, on its own timeline — up to $350M in committed capital after listing. Rather than raising a fixed amount at once, you draw down in tranches over time, which gives you control over dilution and timing.",
        related: [
          { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
          { label: "Family Offices, VC, PE & Hedge Funds", href: "/strategic-investors" },
        ],
      },
      {
        id: "can-i-combine-structures",
        question: "Can I combine multiple raise structures?",
        answerText:
          "Yes, and many issuers do. A common path is a private Regulation D 506(b) or 506(c) round to build momentum, a Regulation S sleeve to add offshore investors, then a NASDAQ or NYSE listing, with a PIPE or ELOC providing committed capital after you go public. We map the sequence during scoping so the structures are compliant and do not create integration problems.",
      },
      {
        id: "beyond-reg-a-and-reg-d",
        question: "Beyond Reg A+ and Reg D — how else can Directly Listed take my company public or fund it after listing?",
        answerText:
          "Exempt offerings are half the toolkit. Directly Listed also manages full exchange listings and post-listing capital: a NASDAQ Direct Listing or NYSE Direct Listing takes your company public without an IPO — no underwriting discount, no mandatory lockup, opening price set by the market; a NASDAQ Conventional Listing or NYSE Conventional Listing adds a registered primary offering so you raise new capital as you go public. After listing, an Equity Line of Credit (ELOC) gives you committed standby capital to draw on your own timeline, and a PIPE places institutional capital — from family offices, VCs, PE firms, and hedge funds — directly into your company at a negotiated price. Many clients sequence these: a Reg D or Reg A+ raise pre-listing, the listing itself, then an ELOC or PIPE for follow-on capital.",
        answerHtml:
          '<p>Exempt offerings are half the toolkit. Directly Listed also manages full exchange listings and post-listing capital: a <a href="/products/nasdaq-direct-listing">NASDAQ Direct Listing</a> or <a href="/products/nyse-direct-listing">NYSE Direct Listing</a> takes your company public without an IPO — no underwriting discount, no mandatory lockup, opening price set by the market; a <a href="/products/nasdaq-conventional-listing">NASDAQ Conventional Listing</a> or <a href="/products/nyse-conventional-listing">NYSE Conventional Listing</a> adds a registered primary offering so you raise new capital as you go public. After listing, an <a href="/products/eloc">Equity Line of Credit (ELOC)</a> gives you committed standby capital to draw on your own timeline, and a <a href="/products/pipe">PIPE</a> places institutional capital — from <a href="/strategic-investors">family offices, VCs, PE firms, and hedge funds</a> — directly into your company at a negotiated price. Many clients sequence these: a Reg D or Reg A+ raise pre-listing, the listing itself, then an ELOC or PIPE for follow-on capital.</p>',
        related: [
          { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
          { label: "NYSE Direct Listing", href: "/products/nyse-direct-listing" },
          { label: "NASDAQ Conventional Listing", href: "/products/nasdaq-conventional-listing" },
          { label: "NYSE Conventional Listing", href: "/products/nyse-conventional-listing" },
          { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
          { label: "PIPE (Post-Listing)", href: "/products/pipe" },
          { label: "Family Offices, VC, PE & Hedge Funds", href: "/strategic-investors" },
          { label: "Our Product Line", href: "/products" },
        ],
      },
      {
        id: "tier-1-vs-tier-2",
        question: "What is the difference between Tier 1 and Tier 2 Reg A+ offerings?",
        answerText:
          "Tier 2 allows up to $75 million per year and preempts state “Blue Sky” registration (with limited exceptions), which is why most companies choose it. There is no SEC minimum — the notion that Tier 2 “starts at $20 million” is a misconception; many successful Tier 2 offerings raise well below that, though the fixed costs make raises under roughly $4 million inefficient. Tier 2 requires an upfront US-GAAP audit covering up to two years (since inception for younger companies) and ongoing reporting after the offering: management financial statements every six months and an annual US-GAAP audit. Tier 1 permits up to $20 million per year and requires no SEC audit before filing — but you must qualify the offering under the Blue Sky rules of every state you accept investors from, which is slow, expensive, and in merit-review states unpredictable. Many states require audited financials for Tier 1 anyway. Tier 1 works best for banks and issuers with existing state exemptions and a concentrated local investor base; for nearly everyone else, Tier 2 is the practical choice.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Guides", href: "/guides" },
        ],
      },
      {
        id: "is-reg-a-plus-an-ipo",
        question: "Is Regulation A+ an IPO?",
        answerText:
          "Strictly, no — a Reg A+ offering is an exempt public offering, not a registered S-1 IPO — but it can be used to take your company public: companies have completed listings on the NYSE and NASDAQ via Reg A+ (see our case studies). Listing is optional. Advantages of the Reg A+ route: investors are liquid immediately with no lockup; you can set a zero minimum, complete the raise even if you miss exchange thresholds, and uplist later; SEC qualification typically takes around 90 days; and legal and audit costs run well below a conventional S-1 IPO. A cost-effective middle path is listing on the OTCQB or OTCQX first — any completed Tier 2 offering qualifies for OTCQB — keeping Reg A+-level reporting (an annual US-GAAP audit is the largest ongoing expense) with the option to uplist once established. After completion, Reg A+ shares can be bought and sold by the general public through stockbrokers whether or not you list.",
        answerHtml:
          '<p>Strictly, no — a Reg A+ offering is an exempt public offering, not a registered S-1 IPO — but it <strong>can be used to take your company public</strong>: since 2017, companies have completed listings on the <a href="/products/nyse-conventional-listing">NYSE</a> and <a href="/products/nasdaq-conventional-listing">NASDAQ</a> via Reg A+ (see our <a href="/case-studies">case studies</a>). Listing is optional. Advantages of the Reg A+ route: investors are liquid immediately with no lockup; you can set a zero minimum, complete the raise even if you miss exchange thresholds, and <a href="/products/nasdaq-direct-listing">uplist later</a>; SEC qualification typically takes around 90 days; and legal and audit costs run well below a conventional S-1 IPO. A cost-effective middle path is listing on the OTCQB or OTCQX first — any completed Tier 2 offering qualifies for OTCQB — keeping Reg A+-level reporting (an annual US-GAAP audit is the largest ongoing expense) with the option to uplist once established. After completion, Reg A+ shares can be bought and sold by the general public through stockbrokers whether or not you list.</p>',
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "NASDAQ Conventional Listing", href: "/products/nasdaq-conventional-listing" },
          { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
          { label: "Current Deals & Case Studies", href: "/case-studies" },
        ],
      },
      {
        id: "reg-a-plus-vs-reverse-merger",
        question: "How does Reg A+ compare with a reverse merger?",
        answerText:
          "Buying a public shell is one way mid-sized companies go public, but it is expensive, complex, and often burdened by the negative history of the failed company whose shell you are buying — we do not recommend it. A Reg A+ offering is simpler, less expensive, and gives you a clean, fresh public vehicle. The $75 million-per-year cap does mean companies raising larger amounts may need other routes — a conventional listing with a registered offering, or a direct listing paired with an equity line or PIPE for capital.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
          { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
          { label: "PIPE (Post-Listing)", href: "/products/pipe" },
        ],
      },
      {
        id: "reg-a-plus-vs-reg-cf",
        question: "What's the difference between Regulation A+ and Reg CF equity crowdfunding?",
        answerText:
          "Regulation Crowdfunding (Reg CF) is the JOBS Act's small-offering framework: raises are capped far below Reg A+ levels, must run through a registered funding portal or broker-dealer, and carry per-investor limits. Regulation A+ allows up to $75 million per year, worldwide marketing, testing the waters, and a path to OTC or exchange quotation — at the cost of an SEC qualification process and (for Tier 2) audited financials and ongoing reporting. As a rule of thumb: Reg CF suits very early community raises; Reg A+ suits companies raising roughly $4 million and up that want scale, liquidity options, and a public-market trajectory; and Reg D suits unlimited raises from accredited investors. We help you pick the exemption that fits before any money is spent.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
          { label: "Our Product Line", href: "/products" },
        ],
      },
      {
        id: "security-token-offerings",
        question: "Can I run a Security Token Offering (STO) through these exemptions?",
        answerText:
          "Yes — since the SEC made clear that most token offerings are securities transactions, the full body of securities regulation applies, and the same three frameworks carry STOs: Reg D 506(c), Reg S, and Reg A+. A token that is a security need not mirror a share of stock — the issuer defines the rights assigned. In practice: Reg A+ offers liquidity and no accreditation requirement but requires a U.S. or Canadian entity, so most non-U.S. token issuers use Reg D 506(c) paired with Reg S; convertible notes can be used to raise before tokens exist, converting later through the Reg D; the one-year Reg D restriction must be built into the tokens and smart contract; and Form D is a simple filing. STOs demand thorough compliance work with expert securities counsel — which the flat fee covers on our platform.",
        related: [
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
          { label: "Regulation S", href: "/products/reg-s" },
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
        ],
      },
    ],
  },
  {
    id: "structures-in-depth",
    title: "Every capital structure, in depth",
    intro:
      "A detailed breakdown of the ways to raise — limits, who can invest, solicitation and advertising rules, key filings, ongoing reporting, liquidity, and the situation each one fits best. Exact thresholds vary by facts and tier and are confirmed for your deal during scoping; none of this is legal or investment advice.",
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
    id: "which-companies-fit",
    title: "Which companies fit",
    intro:
      "Honest fit assessment is part of scoping — these answers explain which companies succeed with each structure, and which should choose another path.",
    items: [
      {
        id: "best-suited-companies",
        question: "What types of companies are best suited to Regulation A+?",
        answerText:
          "The companies that succeed with Reg A+ resonate strongly with consumer investors: recognizable consumer brands, companies with passionate customer bases or communities, mission-driven businesses, real estate vehicles, and mid-sized companies with a clear story ordinary investors can grasp quickly. For startups, the same test applies — a product or company that consumers love and want to own a piece of fits; a complex B2B story that requires study does not. Companies without inherent consumer appeal are the single biggest cause of underperforming offerings, so we assess fit honestly before you commit. Where Reg A+ is the wrong tool, a Reg D institutional raise or a direct listing may fit better — that assessment is part of scoping your deal.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Campaign Marketing", href: "/products/campaign-marketing" },
          { label: "Current Deals & Case Studies", href: "/case-studies" },
        ],
      },
      {
        id: "real-estate-reg-a",
        question: "How can I raise capital for my real estate company using Reg A+?",
        answerText:
          "Reg A+ has been especially successful in real estate: income-producing properties, development projects, and REIT-style vehicles appeal naturally to yield-seeking Main Street investors. Offerings funding a specific asset purchase must set the minimum high enough to complete the purchase, which front-loads the burden; diversified vehicles can use a low minimum and close weekly. For platforms with segmentable strategies, the SEC has qualified the multiple-entity model pioneered in real estate — standalone Reg A+ entities sharing one management service provider, each raising up to the annual cap — allowing simultaneous offerings. Real estate issuers should note that funds structured as registered investment companies cannot use Reg A+, so vehicles are structured outside the Investment Company Act with securities counsel.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
          { label: "Guides", href: "/guides" },
        ],
      },
      {
        id: "non-us-companies-reg-a",
        question: "Can I use Reg A+ if my company is not in the U.S.?",
        answerText:
          "Yes — by setting up a U.S. or Canadian entity (most choose a Delaware C-Corporation; an LLC or LP also works) that conducts the offering. The entity must have primarily U.S.-based executives and board members, a legitimate business role, and real rights to the underlying business — enough to satisfy the SEC and to be credible to investors. The operating business can remain outside the U.S. Alternatively, international companies can skip the entity requirement entirely by raising through Reg D 506(c) (U.S. accredited investors) paired with Reg S (everyone else), or pursue a full U.S. listing as a foreign private issuer on Form F-1 — cross-border structuring is a particular focus of our practice.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
          { label: "Regulation S", href: "/products/reg-s" },
          { label: "NYSE Direct Listing", href: "/products/nyse-direct-listing" },
        ],
      },
      {
        id: "who-can-invest-reg-a",
        question: "Who can invest in a Reg A+ offering?",
        answerText:
          "Almost anyone, worldwide. Main Street investors do not need to be wealthy to invest in a qualified Reg A+ offering; the only limit is that non-accredited investors may invest up to 10% of their annual income or net worth (excluding their home) per company, Tier 2 only, self-verified — issuers are not required to independently confirm. Accredited investors are unlimited. International investors are welcome subject to their own country's rules: following Canadian regulatory limitations, most Reg A+ offerings do not accept Canadian Main Street investors unless the issuer obtains approval from the relevant Canadian provinces. For issuers this breadth is the point — your customers, community, and the general public can all become shareholders.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Investor FAQ", href: "/faq/investor" },
          { label: "Campaign Marketing", href: "/products/campaign-marketing" },
        ],
      },
      {
        id: "how-many-investors-allowed",
        question: "How many investors am I allowed to have with Regulation A+?",
        answerText:
          "There is no cap on the number of investors in a Reg A+ offering — thousands of shareholders are normal and are part of the model's appeal. Reg A+ Tier 2 also provides a conditional exemption from mandatory Exchange Act registration under Section 12(g) even with a large shareholder count, provided the company uses an SEC-registered transfer agent, remains current in its Reg A+ reporting, and stays within the rule's size thresholds — one reason a registered transfer agent (which we coordinate) is standard practice. Our platform is built to process high investor volumes: payments, KYC/AML, subscription documents, and shareholder services at scale.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Investor Services", href: "/products/investor-services" },
          { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
        ],
      },
      {
        id: "pe-hedge-fund-reg-a",
        question: "Can a private equity or hedge fund raise capital using Reg A+?",
        answerText:
          "Generally no — Regulation A+ is not available to registered investment companies or business development companies, which excludes typical pooled investment funds. Real-estate and operating vehicles structured outside the Investment Company Act (REIT-style structures, for example) can and do use Reg A+. Funds themselves raise through Reg D private placements instead — and PE firms, hedge funds, VCs, and family offices appear on our platform primarily as the institutional investors funding issuer clients through PIPEs and equity lines.",
        related: [
          { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
          { label: "Family Offices, VC, PE & Hedge Funds", href: "/strategic-investors" },
          { label: "PIPE (Post-Listing)", href: "/products/pipe" },
          { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
        ],
      },
      {
        id: "already-public-reg-a",
        question: "Can my company use Reg A+ if it is already publicly held?",
        answerText:
          "Yes. Since Congress amended the rules in 2018, SEC-reporting companies may use Reg A+ — it has become a practical follow-on tool for OTC-quoted and smaller exchange-listed companies that want to raise from their shareholder base and the public without a full S-1. Reporting companies satisfy Reg A+ ongoing-report obligations through their existing Exchange Act filings. Listed companies can also compare a Reg A+ against a PIPE or an equity line of credit for follow-on capital — we help you weigh cost, dilution, and speed across all three.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "PIPE (Post-Listing)", href: "/products/pipe" },
          { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
        ],
      },
      {
        id: "must-i-go-public",
        question: "Do I have to take my company public to use Regulation A+?",
        answerText:
          "No. Listing is entirely optional: you may complete a Reg A+ raise and remain privately held, quote on the OTCQB/OTCQX, or proceed to a NASDAQ or NYSE listing — the choice is yours, and you can defer it. You may even restrict post-offering liquidity in your offering terms, though doing so usually reduces investor appeal. Most issuers provide at least an OTC quotation because investors value the liquidity.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "NASDAQ Conventional Listing", href: "/products/nasdaq-conventional-listing" },
          { label: "NYSE Conventional Listing", href: "/products/nyse-conventional-listing" },
        ],
      },
      {
        id: "mbo-spinout-acquisition",
        question: "Can I use Reg A+ for a management buyout, spin-out, or acquisition?",
        answerText:
          "Yes — Reg A+ proceeds can fund acquisitions, including management buyouts and spin-outs, and the offering can be structured around the transaction. Two cautions: the offering minimum must be sufficient to complete the purchase (a heavier upfront burden than a low-minimum raise), and where you are acquiring a business, the SEC will generally require audited financial statements of the target to be included in your offering statement — plan the target's audit into your timeline. Structure these with securities counsel early; the flat fee covers ours.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
          { label: "Guides", href: "/guides" },
        ],
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
      {
        id: "nasdaq-capital-market-requirements",
        question: "What are the listing requirements for NASDAQ?",
        answerText:
          "For most Reg A+ issuers the relevant tier is the NASDAQ Capital Market, and a company must satisfy one of three standards in full. The primary consideration is the market value of publicly held stock — stock in the hands of investors, not insiders. Example: if pure investors held shares worth $5 million at your offering valuation before the raise, NASDAQ requires you to raise at least $10 million in the offering ($5M + $10M = $15M publicly held). Key thresholds across the Equity, Market Value, and Net Income standards include: net income of $750,000 (Net Income standard only); market value of publicly held shares of $15 million ($5 million under the Net Income standard); market value of listed securities of $50 million (Market Value standard only); 1,000,000 publicly held shares; 300 round-lot shareholders; a $4.00 bid price (or $3.00 closing-price alternative); stockholders' equity of $4–5 million; three market makers; and, for the Equity standard, a two-year operating history. Governance requirements — an independent board majority and audit committee — apply alongside the quantitative tests. NASDAQ has been tightening several standards; confirm the live NASDAQ Initial Listing Guide before applying, and ask us for a free qualification review of your numbers.",
        answerHtml:
          "<p>For most Reg A+ issuers the relevant tier is the <strong>NASDAQ Capital Market</strong>. The primary consideration is the market value of <em>publicly held</em> stock — stock in the hands of investors, not insiders. Example: if pure investors held shares worth $5 million at your offering valuation before the raise, NASDAQ requires you to raise at least $10 million in the offering ($5M + $10M = $15M publicly held). A company must satisfy one of three standards in full:</p>" +
          "<table><thead><tr><th>Requirement</th><th>Equity Standard</th><th>Market Value Standard</th><th>Net Income Standard</th></tr></thead><tbody>" +
          "<tr><td>Net income (latest FY or 2 of 3)</td><td>N/A</td><td>N/A</td><td>$750,000</td></tr>" +
          "<tr><td>Market value, publicly held shares</td><td>$15,000,000</td><td>$15,000,000</td><td>$5,000,000</td></tr>" +
          "<tr><td>Market value of listed securities</td><td>N/A</td><td>$50,000,000</td><td>N/A</td></tr>" +
          "<tr><td>Publicly held shares</td><td>1,000,000</td><td>1,000,000</td><td>1,000,000</td></tr>" +
          "<tr><td>Round-lot shareholders</td><td>300</td><td>300</td><td>300</td></tr>" +
          "<tr><td>Bid / closing price</td><td>$4.00 / $3.00</td><td>$4.00 / $3.00</td><td>$4.00 / $3.00</td></tr>" +
          "<tr><td>Stockholders' equity</td><td>$5,000,000</td><td>$4,000,000</td><td>$4,000,000</td></tr>" +
          "<tr><td>Market makers</td><td>3</td><td>3</td><td>3</td></tr>" +
          "<tr><td>Operating history</td><td>Two years</td><td>N/A</td><td>N/A</td></tr>" +
          "</tbody></table>" +
          '<p>Source: <a href="https://listingcenter.nasdaq.com/assets/initialguide.pdf" rel="noopener">NASDAQ Initial Listing Guide</a> (listingcenter.nasdaq.com). NASDAQ has been tightening several standards — confirm the live guide before applying. Governance requirements (independent board majority, audit committee) apply alongside the quantitative tests. For the full picture — including direct-listing-specific requirements and the Global and Global Select tiers — see our NASDAQ Direct Listing and NASDAQ Conventional Listing pages, or ask for a free qualification review of your numbers.</p>',
        related: [
          { label: "NASDAQ Conventional Listing", href: "/products/nasdaq-conventional-listing" },
          { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
          { label: "NYSE Direct Listing", href: "/products/nyse-direct-listing" },
          { label: "Guides", href: "/guides" },
        ],
      },
    ],
  },
  {
    id: "costs-and-terms",
    title: "Cost, fees & terms",
    intro:
      "How pricing works and what is included versus billed separately. Directly Listed charges a flat platform fee plus an equity grant at signing, quoted individually for every deal — our attorneys, consultants, and listing advisors are paid out of that flat fee. Third-party and exchange figures below are given for planning purposes; they are approximate and change over time, so confirm current schedules when you scope your deal.",
    items: [
      {
        id: "what-does-directly-listed-charge",
        question: "What does Directly Listed charge?",
        answerText:
          "Every deal is quoted individually: a flat platform fee plus an equity grant at signing, both set by the scope of services and your company's stage. Our SEC-licensed attorneys, consultants, and listing advisors are paid out of that flat fee — there are no separate legal bills. You pay only third-party costs on top, such as audits, legal opinions, transfer agent and DTC fees, and exchange fees.",
        answerHtml:
          '<p>Every deal is quoted individually on a <strong>flat platform fee plus an equity grant at signing</strong> — no percentage-of-raise surprises. Our SEC-licensed attorneys, consultants, and listing advisors are all paid out of the flat fee; there are no separate legal bills. The only additional costs are third-party: legal opinions, valuation reports, audits, transfer agent and DTC fees, exchange application fees, and any annual exchange fees. The flat fee is determined by the scope of services and your company\'s stage, and the equity grant is likewise set according to your startup\'s stage and needs. <a href="/get-started">Tell us about your raise</a> and we\'ll scope your deal.</p>',
        related: [
          { label: "Our Product Line", href: "/products" },
          { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
          { label: "About Directly Listed", href: "/about" },
        ],
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
      {
        id: "reg-a-plus-cost",
        question: "How much does a Regulation A+ offering cost?",
        answerText:
          "Total cash cost: a reasonable flat fee plus equity to Directly Listed, with third-party fees paid directly to each provider. The primary pre-launch expenses are marketing content creation, the Form 1-A legal filing, and the Tier 2 audit. We recommend having roughly $175,000 available before you begin — the largest items being marketing creative, the audit (for complex businesses), and legal — because although the SEC permits offering expenses to be paid from proceeds in most well-prepared offerings, starting with enough cash gives you runway if the early weeks are tougher than expected. It is possible to start with less, and it can work; but start with enough and spend carefully (we help with this) so you can adjust and succeed. Typical component costs: specialized SEC legal, around $50,000; a Tier 2 audit, roughly $20,000 for a simple company and more for complex ones; marketing, commonly the equivalent of 4% of the raise for an easy-to-sell offering and 6–9% more typically (paid as budgeted spend, not charged as a percentage).",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Campaign Marketing", href: "/products/campaign-marketing" },
          { label: "Guides", href: "/guides" },
        ],
      },
      {
        id: "cost-of-going-public-reg-a",
        question: "What is the cost of taking my company public using Reg A+?",
        answerText:
          "On top of the offering costs: registering for a ticker on the OTCQB runs about $2,500 with an annual renewal fee (currently five figures — confirm OTC Markets' live schedule), and OTCQX costs more with quarterly reporting and executive background checks. Ongoing OTCQB reporting — an annual US-GAAP audit plus six-month financial reports — typically lands between $60,000 and $100,000 per year depending on your scale and providers. If your company meets NASDAQ or NYSE standards, exchange annual fees are materially higher (on the order of $85,000 on NASDAQ and $50,000-plus on NYSE), legal costs for an exchange IPO start around $100,000 and rise when a broker-dealer is involved, and the full burden of S-1-level reporting applies after listing — far heavier than OTCQB reporting, which matches Reg A+ Tier 2. Many companies therefore list on the QB first and uplist when established.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "NASDAQ Conventional Listing", href: "/products/nasdaq-conventional-listing" },
          { label: "NYSE Conventional Listing", href: "/products/nyse-conventional-listing" },
        ],
      },
      {
        id: "reg-d-cost",
        question: "How much does a Reg D offering cost?",
        answerText:
          "A reasonable flat fee — inclusive of the legal work — plus equity. There is no SEC qualification process for Reg D: Form D is a simple filing made within 15 days after the first sale, so Reg D is the fastest and lowest-cost route on the platform. 506(c) offerings add accredited-investor verification, which our platform automates.",
        related: [
          { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
        ],
      },
      {
        id: "reg-s-cost",
        question: "How much does a Regulation S offering cost?",
        answerText:
          "A flat fee inclusive of the legal work and some marketing, plus equity. Because Reg S is usually run in parallel with a Reg D raise, most of the structuring cost is shared across the combined offering.",
        related: [
          { label: "Regulation S", href: "/products/reg-s" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
        ],
      },
      {
        id: "minimum-capital-raise",
        question: "What is an appropriate minimum capital raise for my offering?",
        answerText:
          "The SEC qualifies offerings with no minimum, and a low minimum is usually the right choice: once you exceed it, the first closing can occur, your company can pay ongoing marketing from investment proceeds, and closings can then run weekly to move funds to your bank account. The exception is an offering funding a fixed-price asset purchase (a company or property), where the minimum must be sufficient to complete the purchase. A low minimum also makes early traction visible — which matters, because in the open forum of a Reg A+ offering, success in the first few weeks signals all interested parties that the offering is going well.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Current Deals & Case Studies", href: "/case-studies" },
        ],
      },
      {
        id: "what-audit-is-needed",
        question: "What kind of audit is needed for a Tier 2 Reg A+ offering? Do I need a PCAOB audit?",
        answerText:
          "Tier 2 requires audited financial statements for the prior two years (a one-year-old company files a one-year audit) in the offering statement and in annual reports, prepared under US GAAP with an unqualified audit opinion — filings with non-GAAP financial statements are bounced immediately without review. A PCAOB-registered audit is not required for the Reg A+ itself, and Tier 1 requires no SEC audit at all — but PCAOB-level audits are required to list on NASDAQ or the NYSE, so companies planning an exchange listing should engage a PCAOB-registered firm from the start. Choose an audit firm with a Reg A+ track record and no price or schedule surprises: the audit is the critical-path item, and delayed audits are the single biggest logistical reason offerings fail. High-quality mid-sized firms typically treat smaller issuers as a priority and hold their price better than big-name auditors.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "NASDAQ Conventional Listing", href: "/products/nasdaq-conventional-listing" },
          { label: "Guides", href: "/guides" },
        ],
      },
      {
        id: "raise-more-than-75m",
        question: "Can I raise more than $75 million in a year?",
        answerText:
          "Not through a single Reg A+ — the Tier 2 cap is $75 million per company per 12 months. Companies needing more can run a concurrent Reg D (unlimited, accredited investors) and Reg S (unlimited, non-U.S. investors) alongside the Reg A+, structured with counsel to respect integration rules; use the multiple-entity model where each standalone entity raises up to the cap (qualified by the SEC so far in real estate); or step up to a registered offering — a conventional NASDAQ or NYSE listing — or list and then draw committed capital through an equity line of credit or place a PIPE.",
        related: [
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
          { label: "Regulation S", href: "/products/reg-s" },
          { label: "NASDAQ Conventional Listing", href: "/products/nasdaq-conventional-listing" },
          { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
          { label: "PIPE (Post-Listing)", href: "/products/pipe" },
        ],
      },
    ],
  },
  {
    id: "timelines",
    title: "Timelines",
    intro:
      "How long each path takes, what runs in parallel, and the levers that actually move the schedule.",
    items: [
      {
        id: "reg-a-plus-timeline",
        question: "How long does a Regulation A+ offering take?",
        answerText:
          "Expect roughly 4 to 6 months end to end, including about a month of testing the waters. The fastest route runs marketing preparation and the Form 1-A SEC filing in parallel: with a low funding minimum, a first closing about 90 days after starting the filing and the marketing agency is achievable. SEC qualification of a completed filing currently takes roughly two to three months. Plan two to three months of marketing — refining the offering and building reservations — either in parallel with or before the SEC process, then one week to three months (sometimes longer) for the fundraising itself; the SEC permits extended selling periods, but marketing costs mount while you stay live. The single biggest timeline lever is how effective early marketing was: a large backlog of reservations converts quickly once you are qualified. The parallel approach carries some cost risk (you learn how appealing the offering is after committing roughly $50,000 to legal), but less risk of investor enthusiasm fading during a long test period.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Campaign Marketing", href: "/products/campaign-marketing" },
        ],
      },
      {
        id: "reg-a-ipo-timeline",
        question: "What is the timeline for a Reg A+ IPO to the NASDAQ or NYSE?",
        answerText:
          "Add the exchange workstream to the offering timeline: while the Form 1-A is in SEC review, the NASDAQ or NYSE listing application, symbol reservation, and qualification review run in parallel, with a Form 8-A registering the class under the Exchange Act at qualification so trading can begin promptly. A PCAOB audit (required for the exchanges) and governance readiness — independent directors, audit committee — should be built from the start rather than retrofitted. Most engagements of this kind complete in the same four-to-nine-month window as our direct listings, driven mainly by audit readiness. See the case studies of completed Reg A+ exchange listings for real examples.",
        related: [
          { label: "NASDAQ Conventional Listing", href: "/products/nasdaq-conventional-listing" },
          { label: "NYSE Conventional Listing", href: "/products/nyse-conventional-listing" },
          { label: "Current Deals & Case Studies", href: "/case-studies" },
        ],
      },
      {
        id: "reg-d-timeline",
        question: "What is the timeline for a Reg D offering?",
        answerText:
          "Fast — the fastest on the platform. There is no SEC review: once your documents (PPM, subscription agreement) are prepared and your offering page is staged, a 506(b) or 506(c) raise can go live in weeks, and Form D is filed within 15 days after the first sale — a few days' work, not a lengthy process. The pacing item for 506(c) is investor accreditation verification, which the platform automates as investments come in.",
        related: [
          { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
        ],
      },
      {
        id: "reg-s-timeline",
        question: "What is the timeline for a Reg S offering — or a combined Reg D/Reg S raise?",
        answerText:
          "A Reg S tranche runs on the same fast track as Reg D and is typically launched simultaneously with the 506(c) so U.S. and international investors invest in parallel from day one. For token or convertible-note structures — where a note raise converts into the security later — add the instrument's own preparation time: the note offering can launch on the Reg D/Reg S timeline (weeks), with conversion mechanics and any Reg A+ follow-on layered on the standard Reg A+ schedule. Discount steps rewarding early note investors are permitted and commonly used.",
        related: [
          { label: "Regulation S", href: "/products/reg-s" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
          { label: "Regulation A+", href: "/products/reg-a-plus" },
        ],
      },
    ],
  },
  {
    id: "running-your-offering",
    title: "Running your offering",
    intro:
      "Amendments and supplements, the marketing rules that protect your exemption, what makes offerings succeed, and the mechanics issuers ask about mid-raise.",
    items: [
      {
        id: "amend-vs-supplement",
        question: "How do I make updates to my Reg A+ offering? Can I keep it open continuously?",
        answerText:
          "Know the difference between amending and supplementing. Both happen after the SEC qualifies your offering (qualification is when the SEC releases the offering and you can accept investor funds). An amendment is required for a major change and sends the offering back through SEC review; a supplement covers non-major updates and requires no review. This structure is what makes continuous offerings practical: you can reserve stock for later sale and offer at prices that track the market, filing pricing information after each sale as a supplement — no weeks-long wait for re-qualification each time the market moves. To sell continuously you must be current in your annual and semiannual Reg A+ reports at the time of sale. (Terminology: your Reg A+ sales document is the “offering circular,” contained in the “offering statement” — the exempt-offering counterparts of an IPO's prospectus and registration statement.) You cannot omit the volume of securities offered; when final pricing is known it is filed with the SEC in a supplement.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Guides", href: "/guides" },
        ],
      },
      {
        id: "marketing-words-to-avoid",
        question: "When marketing my offering, what words and phrases should I avoid?",
        answerText:
          "This guidance applies to all marketing materials, in testing the waters and after qualification alike — careless wording can jeopardize your exemption. Avoid: “approve” (the SEC does not approve Reg A offerings; it reviews and qualifies them); “commit” or “soft commitment” during TTW (use non-binding indications of interest); “invest” or “investor” during TTW (use “indicate interest” — prospects are “potential investors” until qualification); “get in on the ground floor” (promises shares no one is assured of); hype and urgency such as “amazing,” “golden,” “jackpot,” “once in a lifetime,” or “the next Facebook” (use “exciting,” “unique,” “interesting”); promising or implying profits or returns (projections only conditionally, with forward-looking qualifiers); and “mini-IPO” as a literal description (a Reg A offering is an exempt public offering, not an IPO). Our compliance review of your creative, landing pages, emails, and button copy is part of the campaign marketing workflow, so these rules are enforced before anything ships.",
        answerHtml:
          "<p>This guidance applies to all marketing materials, in testing the waters and after qualification alike. The rules protect you: careless wording can jeopardize your exemption.</p>" +
          "<ul>" +
          "<li><strong>“Approve”</strong> — the SEC does not approve Reg A offerings; it reviews and <em>qualifies</em> them, and your Offering Circular must say so. Avoid any wording implying the SEC has approved, signed off, or green-lit anything.</li>" +
          "<li><strong>“Commit” / “soft commitment”</strong> — in TTW, neither you nor the investor is committing to anything. Use language of non-binding indications of interest.</li>" +
          "<li><strong>“Invest” / “Investor” (during TTW)</strong> — no one is investing at the TTW stage. Never place “invest” on or near the indication-of-interest button; use “indicate interest,” “tell me more,” or “support.” Prospects are “potential investors” until the SEC qualifies the offering.</li>" +
          "<li><strong>“Get in on the ground floor”</strong> — problematic in TTW because it promises shares no one is assured of. Conditional phrasing (“you might have a chance…”) is safer, and the concern eases once you have actually filed.</li>" +
          "<li><strong>Hype and urgency</strong> — no “amazing,” “golden,” “jackpot,” “once in a lifetime,” “the next Facebook,” or urgency framing that suggests missing the boat. “Exciting,” “unique,” and “interesting” are acceptable substitutes.</li>" +
          "<li><strong>“Promising” / profits and returns</strong> — never promise or imply investor profits or returns. Company-level projections may be discussed only conditionally (“if the assumptions in the projections are correct…”) with appropriate forward-looking qualifiers.</li>" +
          "<li><strong>“Mini-IPO”</strong> — a Reg A offering is an exempt public offering, not an IPO: no full S-1 review, PCAOB audit, underwriter gatekeeping, or equivalent liability regime. Describe it accurately.</li>" +
          "</ul>" +
          "<p>Our compliance review of your marketing materials — creative, landing pages, emails, and the button copy itself — is part of the campaign marketing workflow, so these rules are enforced before anything ships.</p>",
        related: [
          { label: "Campaign Marketing", href: "/products/campaign-marketing" },
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Guides", href: "/guides" },
        ],
      },
      {
        id: "how-to-succeed",
        question: "How can I make my Reg A+ offering succeed — and what mistakes should I avoid?",
        answerText:
          "Success in a Reg A+ follows a consistent pattern: a company that resonates with consumer investors, first-rate marketing with front-loaded impact and budget, and visible traction in the first few weeks — because in an open public offering, early success is what convinces later investors (and broker-dealer syndicates, who engage only after consumer momentum is proven). Set a low funding minimum unless you are buying a fixed-price asset, so the first closing comes early and later marketing is paid from proceeds. The recurring mistakes: poor consumer fit (the single biggest cause of underperformance); do-it-yourself marketing (engage a proven agency and manage it hard); no broker-dealer syndicate option (syndicates must file with FINRA and be in your SEC filing from the start — you cannot retrofit one mid-offering); overlong testing the waters (enthusiasm goes cold while the audit or filing lags); audit surprises (the critical-path item); too little starting capital (a shoestring budget produces slow early traction that is very hard to recover from); U.S.-only investors (international investors are often cheaper to reach and in many offerings contribute more); and complex instruments (sell shares of common stock — notes, bonds, and preference structures confuse consumer investors deciding quickly at scale).",
        answerHtml:
          "<p>Success in a Reg A+ follows a consistent pattern: a company that resonates with consumer investors, first-rate marketing with front-loaded impact and budget, and visible traction in the first few weeks — because in an open public offering, early success is what convinces later investors (and broker-dealer syndicates, who engage only after consumer momentum is proven). Set a low funding minimum unless you are buying a fixed-price asset, so the first closing comes early and later marketing is paid from proceeds. The recurring mistakes:</p>" +
          "<ul>" +
          "<li><strong>Poor consumer fit</strong> — the single biggest cause of underperformance. Verify your company genuinely appeals to consumer investors before you leap.</li>" +
          "<li><strong>Do-it-yourself marketing</strong> — equity crowdfunding marketing is a specialized field; weak early traction sinks the later weeks. Engage a proven agency, agree a budget, and manage the project hard.</li>" +
          "<li><strong>No broker-dealer syndicate option</strong> — syndicates must file with FINRA and be included in your SEC filing from the start; you cannot retrofit one mid-offering. Keeping the option open lets brokers fill the offering once consumer traction shows.</li>" +
          "<li><strong>Overlong testing the waters</strong> — stretch the test phase past a few months while the audit or filing lags and your most enthusiastic would-be investors go cold.</li>" +
          "<li><strong>Audit surprises</strong> — the audit is the critical-path item; choose a firm with a Reg A+ track record and no price or schedule surprises.</li>" +
          "<li><strong>Too little starting capital</strong> — most issuers must fund the offering before it funds them; launching with a shoestring marketing budget produces slow early traction, which is very hard to recover from.</li>" +
          "<li><strong>U.S.-only investors</strong> — international investors have fewer options, are often cheaper to reach digitally, and in many successful offerings contribute more than U.S. investors.</li>" +
          "<li><strong>Complex instruments</strong> — convertible notes, bonds, and preference structures confuse consumer investors who must decide quickly at scale. Sell shares of common stock. Keep it simple.</li>" +
          "</ul>",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Campaign Marketing", href: "/products/campaign-marketing" },
          { label: "Current Deals & Case Studies", href: "/case-studies" },
        ],
      },
      {
        id: "three-biggest-risks",
        question: "What are the three biggest risks to my Reg A+ succeeding?",
        answerText:
          "(1) A delayed, over-budget audit — the single biggest logistical failure point; use a high-quality mid-sized firm that treats you as a priority and holds its price. (2) Insufficient consumer appeal — if ordinary investors don't connect with your company, no budget fixes it. (3) Weak or inefficient marketing — the agency must credibly believe it can deliver low-cost results at the outset. An agency expecting to spend $12 per $100 raised makes the offering uneconomic; one that can deliver on roughly $3 per $100 is far more likely to produce a cost-effective raise. We pressure-test all three risks before your offering launches.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Campaign Marketing", href: "/products/campaign-marketing" },
        ],
      },
      {
        id: "selling-shareholder-liquidity",
        question: "Which shareholders get liquid first in a Reg A+ offering?",
        answerText:
          "There is no special sequence and no preference: the company and any selling shareholders in the offering are made liquid pro rata throughout the offering. If an offering closes at 92% of its maximum, every selling shareholder will have sold 92% of the shares they intended to sell. Structure selling-shareholder participation into the offering statement from the start.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Investor FAQ", href: "/faq/investor" },
        ],
      },
      {
        id: "minimum-investment-per-investor",
        question: "What minimum investment amount should I set per investor?",
        answerText:
          "The issuer sets it, and the trade-off is simple: a lower minimum (a few hundred dollars) maximizes participation from your customers and community — the heart of a consumer raise — while a higher minimum (a few thousand dollars) reduces processing volume and skews toward larger checks. Most Reg A+ issuers on the platform choose an accessible minimum, because volume is the point of the exemption and our capital raise technology processes payments, KYC/AML, and subscriptions at scale either way.",
        related: [
          { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
          { label: "Investor Services", href: "/products/investor-services" },
        ],
      },
      {
        id: "what-is-sec-form-d",
        question: "What is SEC Form D?",
        answerText:
          "Form D is the notice filing for a Regulation D offering — a short document covering the company, its promoters, and basic offering information, filed with the SEC within 15 days after the first sale. It is a simple filing measured in days, not a review process, and it is part of the standard workflow on every 506(b) and 506(c) raise we stage.",
        related: [
          { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
          { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
        ],
      },
      {
        id: "early-reg-d-resales",
        question: "How can my Reg D investors resell before the one-year mark?",
        answerText:
          "Securities sold under Reg D are restricted for one year, but non-affiliates of non-reporting companies may resell earlier: privately under the judge-made “Section 4(1½)” exemption (typically to accredited investors, on counsel's opinion); privately under Section 4(a)(7) to accredited investors; to Qualified Institutional Buyers under Rule 144A; or outside the U.S. under Regulation S. Each path has conditions and the securities remain restricted; contractual, bylaw, and state-law limits may also apply. Affiliates face additional Rule 144 volume, manner-of-sale, and Form 144 requirements. Alternative Trading Systems provide venues for these accredited-investor resales — a growing liquidity channel for private securities. Issuers should address transfer mechanics in their subscription documents with counsel.",
        related: [
          { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
          { label: "Regulation S", href: "/products/reg-s" },
          { label: "Investor FAQ", href: "/faq/investor" },
        ],
      },
      {
        id: "blue-sky-laws",
        question: "What about Blue Sky laws — and Tier 1 issuer-dealer registration?",
        answerText:
          "Federal preemption is Tier 2's superpower: a Tier 2 Reg A+ preempts state registration of the offering, leaving states only notice filings and fees. Tier 1 offers no preemption — every state you accept investors from must qualify the offering, and some states additionally require the issuer itself (or its agents) to register as an issuer-dealer or salesperson before offering securities there, a trap that catches companies selling without broker-dealer involvement. Preemption does not, however, reach state anti-fraud authority or these dealer-registration regimes in all cases, so state-level compliance review is part of our filing workflow. If you must use Tier 1, it works best confined to a small number of friendly states where you have a concentrated investor base — the model community banks use.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Guides", href: "/guides" },
        ],
      },
      {
        id: "when-to-use-tier-1",
        question: "What is the best situation in which to use Tier 1?",
        answerText:
          "Tier 1 fits a narrow profile: an issuer raising up to $20 million from a concentrated, local investor base in one or a few cooperative states — classically a community bank with existing state exemptions and customers who know it. To make Tier 1 work: pick states with predictable, non-merit-review processes; confirm whether each state requires audited financials (many do, eroding Tier 1's no-audit advantage) and issuer-dealer registration; and budget real time for state review. If your investor base is national or international, use Tier 2 — the preemption is worth the audit.",
        related: [
          { label: "Regulation A+", href: "/products/reg-a-plus" },
          { label: "Guides", href: "/guides" },
        ],
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
