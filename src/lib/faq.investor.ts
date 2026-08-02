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
//  - Answers with `answerHtml` carry the canonical inline hyperlinks; the plain
//    `answerText` used for JSON-LD is derived automatically by stripping markup.
//  - Figures current as of 2026:
//      • Accredited investor: $200k individual / $300k joint income (two years),
//        OR $1M net worth excluding primary residence, OR certain professional
//        credentials (Series 7/65/82).
//      • Reg A+ Tier 2 non-accredited cap: 10% of the GREATER of annual income or
//        net worth — and this cap does NOT apply if the securities will be listed
//        on a national securities exchange upon qualification.
//      • Reg A+ Tier 2 cap $75M/yr; Reg D 506(c) accredited only, verification
//        required; 506(b) up to 35 sophisticated non-accredited, no general
//        solicitation.
//      • The "90-day" verification validity is an industry convention, not an SEC rule.
//  - Nothing here is legal or investment advice; the disclaimer block carries that.
//  - This is INVESTOR-facing: it explains process and risk; it never recommends
//    any specific offering or implies suitability.
// -----------------------------------------------------------------------------

export type FaqItem = {
  id: string;
  question: string;
  answerText: string; // plain text used for JSON-LD
  answerHtml?: string; // optional richer render markup (inline links, lists)
  related?: Array<{ label: string; href: string }>;
};

export type FaqCategory = {
  id: string;
  title: string;
  intro?: string;
  items: FaqItem[];
};

// Internal definition type: answerText may be omitted when answerHtml is present;
// it is derived by stripping markup so JSON-LD always matches the page.
type FaqItemDef = Omit<FaqItem, "answerText"> & { answerText?: string };
type FaqCategoryDef = Omit<FaqCategory, "items"> & { items: FaqItemDef[] };

const stripHtml = (html: string): string =>
  html
    .replace(/<\/li>\s*/g, "; ")
    .replace(/<\/(p|ul|ol|h\d)>\s*/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();

// Shared related-topic link targets (site-internal routes).
const R = {
  regA: { label: "Regulation A+", href: "/products/reg-a-plus" },
  regD506b: { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
  regD506c: { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
  regS: { label: "Regulation S", href: "/products/reg-s" },
  pipe: { label: "PIPE (Post-Listing)", href: "/products/pipe" },
  eloc: { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
  nasdaqDirect: { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
  nasdaqConv: { label: "NASDAQ Conventional Listing", href: "/products/nasdaq-conventional-listing" },
  nyseDirect: { label: "NYSE Direct Listing", href: "/products/nyse-direct-listing" },
  nyseConv: { label: "NYSE Conventional Listing", href: "/products/nyse-conventional-listing" },
  offerings: { label: "Live Offerings", href: "/offerings" },
  caseStudies: { label: "Current Deals & Case Studies", href: "/case-studies" },
  guides: { label: "Guides", href: "/guides" },
  products: { label: "Our Product Line", href: "/products" },
  capitalRaise: { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
  investorServices: { label: "Investor Services", href: "/products/investor-services" },
  campaignMarketing: { label: "Campaign Marketing", href: "/products/campaign-marketing" },
  strategic: { label: "Family Offices, VC, PE & Hedge Funds", href: "/strategic-investors" },
  about: { label: "About Directly Listed", href: "/about" },
  issuerFaq: { label: "Issuer FAQ", href: "/faq/issuer" },
} as const;

const INVESTOR_FAQ_DEFS: FaqCategoryDef[] = [
  // ---------------------------------------------------------------------------
  {
    id: "getting-started",
    title: "Getting started",
    intro:
      "What Directly Listed is from an investor's point of view, what it is not, and what it costs you.",
    items: [
      {
        id: "what-is-directly-listed-investor",
        question: "What is Directly Listed, and what is its role for me as an investor?",
        answerHtml:
          '<p>Directly Listed is a technology platform where companies (issuers) host their own securities offerings, and where you can browse those offerings on the <a href="/offerings">Live Offerings</a> page, complete onboarding, sign documents, and fund an investment. Directly Listed itself is not the seller of the securities — each offering is conducted by its issuer under that issuer\'s own SEC exemption, such as <a href="/products/reg-a-plus">Regulation A+</a> or <a href="/products/reg-d-506c">Regulation D</a>. The platform provides the software around the offering: investor onboarding, identity and accreditation checks, eSignature, payment processing, and the <a href="/products/investor-services">investor services</a> that follow your investment.</p>',
        related: [R.offerings, R.products, R.investorServices, R.about],
      },
      {
        id: "is-directly-listed-my-broker",
        question: "Is Directly Listed my broker, advisor, or the seller of the investment?",
        answerHtml:
          '<p>No. <a href="/about">Directly Listed</a> is a technology platform — not a registered broker-dealer, investment advisor, or funding portal — and it is not the seller of any security. It does not provide investment advice, does not recommend or endorse any offering, and does not assess whether an investment is suitable for you. Each offering is conducted by its issuer under the issuer\'s own exemption, and any decision to invest is yours alone. For guidance specific to your situation, consult your own financial, legal, and tax advisors.</p>',
        related: [R.about, R.offerings],
      },
      {
        id: "how-do-i-create-an-account",
        question: "How do I create an investor account and start?",
        answerHtml:
          '<p>You <a href="/signin">sign in</a> to create an investor profile, then browse <a href="/offerings">live offerings</a>; when you choose one, you complete that offering\'s onboarding flow. Onboarding typically includes identity verification (KYC/AML), an eligibility or accreditation questionnaire matched to the offering\'s exemption, review of the offering materials, eSignature of the subscription agreement, and funding. You can review offering documents in full before committing any money.</p>',
        related: [R.offerings, R.investorServices],
      },
      {
        id: "does-it-cost-to-invest",
        question: "Is there any cost to investing on Directly Listed?",
        answerHtml:
          '<p>Offerings on <a href="/offerings">Directly Listed</a> are free for investors — the companies raising capital pay the costs of the investment process, on a flat-fee basis, in almost all cases. Occasionally a company may ask investors to cover the card-processing fee on their investment; most companies pay that fee for you, and it is made very clear during the investment process if you are being asked to pay it. Beyond that, your cost is simply the amount you choose to invest: the price per share, minimum investment, and any offering-specific fees are disclosed in each offering\'s materials before you commit.</p>',
        related: [R.products, R.capitalRaise, R.investorServices, R.about],
      },
      {
        id: "what-is-the-live-offerings-page",
        question: "What is the Live Offerings page?",
        answerHtml:
          '<p>The <a href="/offerings">Live Offerings</a> page is where companies raising capital on Directly Listed present their offerings and engage with prospective investors. During a company\'s pre-offering, "testing the waters" stage, no investing is done: companies gauge interest by inviting non-binding indications from prospective investors, refine their offering, and decide whether to move forward with an SEC filing. As a prospective investor you can ask questions, offer insights, and make non-binding reservations so the company — and Directly Listed — can assess investor interest. Live and completed raises, with their structures and outcomes, are also profiled in our <a href="/case-studies">Current Deals &amp; Case Studies</a>.</p>',
        related: [R.caseStudies, R.regA, R.campaignMarketing, R.capitalRaise],
      },
      {
        id: "what-does-it-mean-to-reserve",
        question: "What does it mean to reserve my investment?",
        answerHtml:
          '<p>When you like the look of a company in its informal, testing-the-waters stage, you can make a non-binding reservation — "Reserve my Investment." If the company later completes its raise, you will have booked space in the offering at the offering price per share. If the shares are in short supply after the offering, and the company lists on a market such as <a href="/products/nasdaq-direct-listing">NASDAQ</a> or the <a href="/products/nyse-direct-listing">NYSE</a>, you may be able to sell later at a profit — or you may lose your entire investment. Reserving also gives you better access than a traditional IPO, where most investors never get to buy at the offering price, and it helps the company and Directly Listed confirm there is enough investor interest to complete the process. A reservation is not a commitment to invest, and you can decline to proceed when the offering goes live.</p>',
        related: [R.regA, R.nasdaqDirect, R.nyseDirect, R.caseStudies],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: "making-an-investment",
    title: "Making an investment",
    intro:
      "From choosing an offering to a countersigned subscription and issued securities.",
    items: [
      {
        id: "how-long-does-my-investment-take",
        question: "How long does it take for my investment to complete?",
        answerHtml:
          '<p>Making an investment on Directly Listed usually takes no longer than 6–10 minutes. After you complete the investment form on the company\'s offering page, you choose a payment method — card (for amounts under $5,000), ACH, or wire transfer — and send the funds directly to the company you are investing in. Directly Listed never holds investor funds. Once the funds are received you will be notified that your investment has arrived.</p>' +
          '<p>In most cases the issuer will process your investment quickly. If the offering requires that <a href="/products/reg-d-506c">investors be accredited</a> — as in a <a href="/products/reg-d-506c">Regulation D 506(c)</a> offering, where accreditation must be verified — processing will wait on you providing the required information. Soon after you complete your subscription agreement, the company will accept your investment and issue your securities. If the offering has a minimum amount that must be raised before the company can close (this is unusual), there may be a delay while sufficient investments come in. At any time you can contact the company through its offering page with questions.</p>',
        related: [R.regA, R.regD506c, R.regD506b, R.offerings, R.investorServices],
      },
      {
        id: "how-do-i-invest-step-by-step",
        question: "How do I actually make an investment, step by step?",
        answerHtml:
          '<p>After selecting an offering on the <a href="/offerings">Live Offerings</a> page you: 1) review the offering materials, including the risk factors; 2) confirm your eligibility through the questionnaire and any required accreditation verification; 3) choose your investment amount, at or above the stated minimum; 4) electronically sign the subscription agreement; and 5) fund the investment by card, wire, or ACH. Your subscription is not final until the issuer accepts and closes it; you receive a countersigned copy at that point.</p>',
        related: [R.offerings, R.investorServices],
      },
      {
        id: "minimum-investment",
        question: "Is there a minimum investment?",
        answerText:
          "Minimums are set per offering by the issuer, not by the platform, so they vary from deal to deal. The minimum investment amount is shown on the offering page and in the offering materials before you commit. Some offerings set low minimums — a few hundred dollars — to widen access for customers and community; others set higher minimums aimed at larger or institutional investors.",
        related: [R.offerings],
      },
      {
        id: "how-do-documents-get-signed",
        question: "How are the investment documents signed?",
        answerText:
          "Subscription agreements are executed electronically through Adobe Acrobat Sign with a complete audit trail. After you sign, the issuer reviews and, if it accepts your subscription, countersigns and closes it — at which point you receive the fully executed copy for your records.",
      },
      {
        id: "how-can-i-view-status",
        question: "How can I view the status of my investment?",
        answerHtml:
          "<p>To view your investment status:</p>" +
          '<ol><li>Log in to your <a href="/signin">Directly Listed account</a>.</li>' +
          "<li>Click the Profile icon in the top right-hand corner.</li>" +
          "<li>Select “Investment Dashboard.”</li></ol>" +
          "<p>Your investment moves through these stages:</p>" +
          "<ul>" +
          "<li><strong>Pending</strong> — you started an investment but have not completed it. Click “Continue,” finish the form, and submit.</li>" +
          "<li><strong>Not received</strong> — you submitted your investment but the funds have not arrived yet. Depending on the payment method this can take up to a week or more.</li>" +
          "<li><strong>Received</strong> — your funds have been received in the issuer's designated account (or escrow, where the offering uses one). At the company's next closing, the issuance of your securities begins.</li>" +
          "<li><strong>Securities issuance started</strong> — you have signed the subscription agreement and the company has accepted your investment. You will receive a communication when your securities are issued, with instructions on how to access them.</li>" +
          "</ul>",
        related: [R.investorServices, R.offerings, R.caseStudies],
      },
      {
        id: "when-will-i-receive-my-shares",
        question: "When will I receive my shares?",
        answerHtml:
          '<p>After the next "closing" of the offering. Every investor whose investment has cleared by the time of a closing is included in that disbursement, and a company can conduct a series of closings throughout its campaign — often weekly once the minimum is met. If a company has set a minimum amount it must raise before its first closing, there may be a wait — check the Offering Circular (for a <a href="/products/reg-a-plus">Reg A+</a> offering) or the PPM (for a <a href="/products/reg-d-506b">Reg D</a> offering). After the closing, issuance of your securities begins and the company will email you when they are issued, with instructions on how to access them directly — typically through the issuer\'s transfer agent.</p>',
        related: [R.regA, R.regD506b, R.regD506c, R.investorServices],
      },
      {
        id: "can-i-cancel",
        question: "Can I cancel or change my investment after I commit?",
        answerText:
          "Cancellation rights depend on the offering's exemption and its specific terms. Some offering types and stages allow you to cancel before the issuer closes your subscription, while others become binding when signed. The offering materials state the cancellation and refund terms that apply, so review them before funding and contact the offering if you need to change a pending subscription.",
      },
      {
        id: "aml-policy",
        question: "What is the AML policy on Directly Listed?",
        answerHtml:
          '<p>All investors who initiate investments on the Directly Listed platform are required to pass KYC/AML (anti-money-laundering) screening before they complete their investment. No investor is accepted without first passing AML. Industry-leading KYC/AML checks are built into the investment flow itself, so screening happens automatically as part of onboarding rather than as a separate step you must arrange.</p>',
        related: [R.investorServices, R.capitalRaise, R.about],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: "payments",
    title: "Payments & funding",
    intro: "How you pay, how wires work, and how transfers are matched to your subscription.",
    items: [
      {
        id: "how-do-i-pay",
        question: "How can I pay for my investment?",
        answerHtml:
          '<p>Companies on the Directly Listed platform accept Visa, Mastercard, and American Express for amounts under $5,000, plus ACH and wire transfer for any amount. Funds are handled directly from investors to the issuer — by card or straight to the issuer\'s bank account — and Directly Listed never holds the funds. Some companies choose not to accept cards; the available options are shown during checkout on the offering page. Bank transfers use a unique reference code per subscription, so your payment is automatically matched to your signed agreement.</p>',
        related: [R.offerings, R.investorServices, R.capitalRaise],
      },
      {
        id: "international-wire",
        question: "How do I send an international wire / bank transfer?",
        answerHtml:
          "<ul>" +
          "<li><strong>Find the wire transfer page.</strong> Log in to your online banking and locate the wire transfer section — usually in the top toolbar. If you cannot find it, contact your bank's customer service.</li>" +
          "<li><strong>Check your online transfer limit.</strong> Banks often set a daily online limit (commonly $5,000). If your investment exceeds it, call the bank to raise the limit; expect additional security verification.</li>" +
          "<li><strong>Provide the recipient's bank details.</strong> For a SWIFT transfer you will need the name and address of the recipient bank, the recipient's name, address, and account type, the account number or IBAN, and the bank's BIC/SWIFT code — all shown on your investment confirmation page.</li>" +
          "<li><strong>Enter the amount and currency.</strong> Double-check that you are sending in the required currency (usually U.S. dollars); a transfer in the wrong currency may be rejected.</li>" +
          "<li><strong>Pay the processing fee.</strong> Your bank will quote its transfer fee and exchange rate, usually drawn directly from your account.</li>" +
          "</ul>",
        related: [R.investorServices, R.offerings],
      },
      {
        id: "is-my-money-held-safely",
        question: "What happens to my money before the offering closes?",
        answerText:
          "Funds are handled directly from you to the issuer — card payments to the issuer's processor and ACH or wire transfers straight to the issuer's bank account; Directly Listed never takes custody of the money. Your subscription only becomes final when the issuer accepts and closes it, and until then your signed subscription and funded amount are tracked together by the unique reference code assigned to you. Any escrow or holding arrangements that apply to a specific offering are described in that offering's materials.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: "eligibility",
    title: "Who can invest & accreditation",
    intro:
      "Eligibility depends on each offering's exemption. These answers explain the categories and how status is checked.",
    items: [
      {
        id: "who-can-invest",
        question: "Who can invest in an offering?",
        answerHtml:
          '<p>It depends on the offering\'s exemption, which is stated on each offering page. <a href="/products/reg-a-plus">Regulation A+</a> offerings are open to everyone, with investment limits for non-accredited investors. <a href="/products/reg-d-506c">Regulation D 506(c)</a> offerings are limited to verified accredited investors. <a href="/products/reg-d-506b">Regulation D 506(b)</a> offerings allow unlimited accredited investors plus up to 35 sophisticated non-accredited investors. <a href="/products/reg-s">Regulation S</a> tranches are for non-U.S. (offshore) investors. Always check the specific eligibility requirements on the offering page before you begin.</p>',
        related: [R.regA, R.regD506b, R.regD506c, R.regS],
      },
      {
        id: "what-is-an-accredited-investor",
        question: "How do I know if I'm an accredited investor?",
        answerHtml:
          "<p>Under SEC rules (Rule 501 of Regulation D), an accredited investor includes a natural person who meets any of the following:</p>" +
          "<ul>" +
          "<li>Income exceeding $200,000 in each of the two most recent years — or joint income with a spouse or spousal equivalent exceeding $300,000 for those years — with a reasonable expectation of the same income level in the current year;</li>" +
          "<li>Individual net worth, or joint net worth with a spouse, exceeding $1 million at the time of investment, excluding the value of your primary residence; or</li>" +
          "<li>Certain professional securities licenses held in good standing (Series 7, 65, or 82), under the SEC's 2020 expansion of the definition.</li>" +
          "</ul>" +
          '<p>Entities can also qualify, based on assets or by being owned entirely by accredited investors. Accredited status matters most for <a href="/products/reg-d-506b">Regulation D offerings</a>: a <a href="/products/reg-d-506c">506(c)</a> offering may be advertised publicly but is open only to verified accredited investors, while a <a href="/products/reg-d-506b">506(b)</a> offering relies on self-certification and no general solicitation.</p>',
        related: [R.regD506b, R.regD506c, R.regA, R.strategic],
      },
      {
        id: "how-do-i-prove-accredited",
        question: "How do I prove I'm accredited?",
        answerText:
          "You complete the accreditation questionnaire in your investor portal, and for Rule 506(c) offerings, third-party verification is also required before your investment closes. Acceptable evidence commonly includes recent tax returns or W-2s for the income test, brokerage or bank statements for the net worth test, or a written verification letter from your CPA, attorney, or a registered broker-dealer. For Reg D 506(b), accreditation is self-certified rather than independently verified.",
        related: [R.regD506c, R.regD506b],
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
        answerHtml:
          '<p>Yes, in certain offering types. <a href="/products/reg-a-plus">Regulation A+</a> offerings are open to non-accredited investors (subject to the investment limits below), and <a href="/products/reg-d-506b">Regulation D 506(b)</a> offerings may include up to 35 non-accredited investors who meet a sophistication standard determined by the issuer. <a href="/products/reg-d-506c">Regulation D 506(c)</a> and <a href="/products/reg-s">Regulation S</a> offerings are not available to U.S. non-accredited retail investors. The offering page states which category applies.</p>',
        related: [R.regA, R.regD506b, R.regD506c],
      },
      {
        id: "how-much-can-i-invest",
        question: "How much can I invest?",
        answerHtml:
          '<p>In a <a href="/products/reg-a-plus">Reg A+</a> Tier 2 offering, non-accredited investors can invest up to 10% of the greater of their annual income or net worth per year (excluding their home). This is a per-company limit and applies only to Tier 2 offerings; investors self-state their income and net worth, and issuers are not required to independently confirm. Importantly, the 10% limit does not apply if the securities will be listed on a national securities exchange upon qualification. There are no regulatory limits on how much accredited investors can invest in a <a href="/products/reg-a-plus">Reg A+</a> or a <a href="/products/reg-d-506b">Reg D</a> offering.</p>',
        related: [R.regA, R.regD506b, R.regD506c],
      },
      {
        id: "who-can-invest-reg-a",
        question: "Who can invest in a Reg A+ offering?",
        answerHtml:
          '<p>Almost anyone, worldwide. "Main Street" investors do not have to be wealthy to invest in a <a href="/products/reg-a-plus">Regulation A+</a> offering once it has been qualified by the SEC. The only limitation is that non-accredited investors cannot invest more than 10% of their annual income or 10% of their net worth (excluding their home) per company, and only in Tier 2 offerings; investors self-verify, and issuers are not required to independently confirm. Accredited investors are not limited in how much they can invest. Investors from outside the U.S. are welcome, subject to the rules of their own country — for example, following Canadian regulatory limitations, most Reg A+ offerings do not accept Canadian Main Street investors unless the issuer has obtained approval from the relevant Canadian provinces.</p>',
        related: [R.regA, R.regS, R.offerings],
      },
      {
        id: "who-can-invest-reg-d",
        question: "Who can invest in Reg D offerings?",
        answerHtml:
          '<p>While <a href="/products/reg-a-plus">Reg A+</a> offerings may accept investors of any income level, <a href="/products/reg-d-506b">Regulation D</a> offerings are open only to accredited investors (with a narrow exception in <a href="/products/reg-d-506b">506(b)</a> for a limited number of sophisticated non-accredited investors known to the company). In a <a href="/products/reg-d-506c">506(c)</a> offering, which may be advertised publicly, the company must take reasonable steps to verify that every investor is accredited before accepting the investment.</p>',
        related: [R.regD506b, R.regD506c, R.strategic, R.pipe],
      },
      {
        id: "main-street-vs-accredited",
        question: "What is the difference between a Main Street investor and an accredited investor?",
        answerHtml:
          '<p>"Main Street" investors are ordinary members of the public who do not meet the SEC\'s accredited-investor thresholds. Before <a href="/products/reg-a-plus">Regulation A+</a> became effective in 2015, only wealthy, accredited investors were generally allowed to invest in private companies. Reg A+ changed that: any investor, worldwide, can invest in a qualified Reg A+ offering, subject to the 10% Tier 2 limit for non-accredited investors. Accredited investors — those meeting the income, net-worth, or professional-license tests — can additionally participate in <a href="/products/reg-d-506b">Regulation D</a> private placements and are not subject to the Reg A+ investment cap.</p>',
        related: [R.regA, R.regD506b, R.regD506c, R.about],
      },
      {
        id: "what-is-a-qib",
        question: "What is a Qualified Institutional Buyer (QIB)?",
        answerHtml:
          '<p>QIBs are institutional investors that own or manage at least $100 million of securities, or registered broker-dealers with at least $10 million invested in unrelated securities. QIBs are the institutions that buy and sell restricted securities among themselves under Rule 144A, and they are among the <a href="/strategic-investors">strategic and large investors</a> — alongside family offices, venture capital, private equity, and hedge funds — that participate in institutional placements such as <a href="/products/pipe">PIPE transactions</a> and <a href="/products/eloc">equity line facilities</a>.</p>',
        related: [R.strategic, R.pipe, R.eloc],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: "understanding-offerings",
    title: "Understanding the offerings",
    intro:
      "The offering frameworks you will see on the platform — what they are, where they came from, and what you actually buy.",
    items: [
      {
        id: "what-is-regulation-a-plus",
        question: "What is Regulation A+?",
        answerHtml:
          '<p><a href="/products/reg-a-plus">Regulation A+</a> ("Reg A+") is a way to raise capital created by the Securities and Exchange Commission under Title IV of the JOBS Act, signed into law in 2012 and effective March 25, 2015. Under the regulation, companies can raise up to $75 million per year (Tier 2) from individual "Main Street" investors — regardless of the investors\' assets or income — as well as from accredited investors and institutions worldwide. SEC rules also allow companies to "test the waters" first, gauging investor interest before committing to a filing.</p>' +
          '<p>Reg A+ dramatically improves funding prospects for companies that are too small for a conventional IPO, or that do not have access to a private placement or venture capital. Start-ups and growing businesses no longer need a single wealthy backer: they can raise from many smaller individual investors, who become shareholders — while angel and professional investors are welcome to invest too. Traditionally, investing in growth-stage companies was the privilege of accredited investors only; Reg A+ opened that door to everyone.</p>',
        related: [R.regA, R.products, R.capitalRaise, R.guides, R.caseStudies],
      },
      {
        id: "tier-1-vs-tier-2",
        question: "What is the difference between Tier 1 and Tier 2 Reg A+ offerings?",
        answerHtml:
          '<p><a href="/products/reg-a-plus">Regulation A+</a> allows two kinds of offerings. <strong>Tier 2</strong> allows companies to raise up to $75 million per year from Main Street investors, accredited investors, and institutions worldwide. Most companies choose Tier 2 because it preempts state "Blue Sky" registration (with limited exceptions), while Tier 1 requires state-by-state qualification, which is slow and expensive. Note that Tier 2 has no SEC minimum — a common misconception is that Tier 2 starts at $20 million, but many companies complete successful Tier 2 offerings well below that. Because of the time and cost involved, Reg A+ generally makes the most sense for raises above roughly $4 million.</p>' +
          "<p>Tier 2 is more demanding than Tier 1 in two ways:</p>" +
          "<ul>" +
          "<li>An upfront US-GAAP audit covering up to two years (or since inception for new startups) is required — though many states require audited financials for Tier 1 anyway, so this difference is often moot.</li>" +
          "<li>Ongoing reporting after the offering: management financial statements every six months and an annual US-GAAP audit.</li>" +
          "</ul>" +
          "<p><strong>Tier 1</strong> permits raises of up to $20 million per year and does not require an SEC audit before filing — but each U.S. state you accept investors from must qualify the offering under its Blue Sky rules, and some states are slow, unpredictable, or apply merit review. As a result, Tier 1 is generally used by banks and issuers with existing state exemptions and a local investor base.</p>",
        related: [R.regA, R.guides, R.issuerFaq],
      },
      {
        id: "is-reg-a-plus-an-ipo",
        question: "Is Regulation A+ an Initial Public Offering (IPO)?",
        answerHtml:
          '<p>It can be. <a href="/products/reg-a-plus">Reg A+</a> can be used to take a company public and list on the <a href="/products/nyse-conventional-listing">NYSE</a> or <a href="/products/nasdaq-conventional-listing">NASDAQ</a>, and since mid-2017 a significant number of companies have completed their IPOs or direct public offerings (DPOs) this way — see our <a href="/case-studies">Current Deals &amp; Case Studies</a>. Listing is not a requirement, though. One significant advantage of Reg A+ is that investors are liquid immediately, with no lock-up. Another is flexibility: a company can set a zero minimum for the Reg A+ itself, complete the raise even if it falls short of exchange listing thresholds, and keep the option to <a href="/products/nasdaq-direct-listing">uplist later</a>.</p>' +
          '<p>Reg A+ is also cost-effective: legal and audit costs run well below a conventional S-1 IPO, and SEC qualification of a Reg A+ typically takes around 90 days. A further route is to list first on the OTCQB or OTCQX — any company completing a Tier 2 offering qualifies for OTCQB and can readily qualify for OTCQX — with a plan to uplist to <a href="/products/nasdaq-conventional-listing">NASDAQ</a> or the <a href="/products/nyse-conventional-listing">NYSE</a> once established. Companies taking the OTC route keep lower-cost ongoing reporting (an annual US-GAAP audit being the largest expense) and can make a fresh Reg A+ offering each year. After a Reg A+ completes, its shares can be bought and sold by the general public through stockbrokers, and reporting requirements remain far simpler than after an S-1. Because Reg A+ offerings are capped at $75 million — far below the roughly $300 million average conventional IPO — they are sometimes called "simple public offerings." These liquidity options make Reg A+ a very attractive alternative to a reverse merger or a traditional IPO.</p>',
        related: [R.regA, R.nasdaqConv, R.nyseConv, R.nasdaqDirect, R.nyseDirect, R.caseStudies],
      },
      {
        id: "what-securities-can-i-buy",
        question: "What types of securities can I buy on Directly Listed?",
        answerHtml:
          '<p>Most offerings on <a href="/offerings">Directly Listed</a> are for shares of common or preferred stock. Some companies sell Limited Partnership or LLC units, and companies can also offer bonds, certain types of loans, or convertible notes. The security type, and its rights and terms, are described in each company\'s offering materials — always read them before investing, because two securities with similar names can carry very different rights.</p>',
        related: [R.offerings, R.products, R.caseStudies],
      },
      {
        id: "what-is-a-security-token-offering",
        question: "What is a Security Token Offering?",
        answerHtml:
          '<p>A security token is a token sold to investors under one of the SEC\'s offering frameworks — <a href="/products/reg-d-506b">Reg D</a>, <a href="/products/reg-s">Reg S</a>, <a href="/products/reg-a-plus">Reg A+</a>, and Reg CF are common examples, and a registered S-1 IPO is another route. Importantly, a token that is a security is not required to have the same characteristics as a share of stock: the issuer defines the rights assigned to the token, so ownership rights, profits, dividends, and preferences that usually attach to shares may or may not be part of a given token security. Read the offering documents to understand exactly what rights you are buying.</p>',
        related: [R.regD506b, R.regS, R.regA],
      },
      {
        id: "how-reg-a-helps-me-invest",
        question: "How does Regulation A+ help me invest in a company?",
        answerHtml:
          '<p>Until <a href="/products/reg-a-plus">Reg A+</a>, it was very difficult for regular investors to invest in startups or any privately held business — you generally had to be an accredited investor. Now just about anyone can invest in private companies; the only requirement is that non-accredited investors in a Tier 2 offering invest no more than 10% of their income or net worth per company. Be aware that investing in private companies is risky and you can lose your entire investment. Directly Listed does not recommend investments and is not an advisor — please seek guidance from a professional advisor.</p>',
        related: [R.regA, R.offerings, R.guides],
      },
      {
        id: "reg-a-vs-donation-platforms",
        question: "How is Regulation A+ different from donation platforms?",
        answerHtml:
          '<p>On donation platforms, individuals give money to help fund creative projects or pre-order products — but contributors receive no ownership. On Directly Listed, companies are selling securities: shares, units, or debt instruments with terms that vary between companies. When you invest through a <a href="/products/reg-a-plus">Reg A+</a> or other offering here, you become a shareholder or creditor of the company, with the rights described in the offering materials — including, where applicable, the right to any future dividends, distributions, or sale proceeds.</p>',
        related: [R.regA, R.offerings, R.about],
      },
      {
        id: "how-do-i-research-companies",
        question: "How do I get information about companies raising on Directly Listed?",
        answerHtml:
          '<p>Examine the company\'s page on <a href="/offerings">Live Offerings</a>, read its Offering Circular (for a <a href="/products/reg-a-plus">Reg A+</a>) or PPM (for a <a href="/products/reg-d-506b">Reg D</a>) in full, and review all the content available on the company\'s website and across the internet — including its filings on <a href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany" rel="noopener">SEC EDGAR</a>. You can also contact the company directly through its offering page. We encourage you to dig deeply using every resource available to you: for a Reg A+ offering, reading the Offering Circular is essential to understanding the details — the business, the terms of the security, the use of proceeds, and the risk factors.</p>',
        related: [R.offerings, R.caseStudies, R.guides],
      },
    ],
  },
  // ---------------------------------------------------------------------------
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
        related: [R.regD506b, R.regD506c, R.regS],
      },
      {
        id: "reg-d-506c-investor-deep",
        question: "Regulation D 506(c), in depth — what should an investor know?",
        answerText:
          "Regulation D 506(c) is a private placement open only to accredited investors, and unlike 506(b), the issuer can advertise it publicly — so you may discover these offerings through marketing, social media, or events. The trade-off for public solicitation is that you must prove your accredited status: self-certification is not enough, and you will provide verification such as income documents (W-2s, tax returns), net-worth statements (brokerage and bank records), or a written confirmation from a CPA, attorney, or broker-dealer before your investment closes. What you buy are restricted securities — illiquid, with limited or no resale market and a holding period before resale. Ongoing transparency depends on the issuer, since private companies are not required to file public reports. Key risks: illiquidity, concentration in a single early-stage company, limited ongoing information, and the risk of losing your entire investment.",
        related: [R.regD506c, R.regD506b],
      },
      {
        id: "reg-a-plus-investor-deep",
        question: "Regulation A+, in depth — what should an investor know?",
        answerText:
          "Regulation A+ is an exempt public offering open to the general public, so you can invest whether or not you are accredited. In a Tier 2 offering, if you are a non-accredited individual you are generally limited to investing no more than 10% of the greater of your annual income or net worth (excluding your primary residence) — but that cap does not apply if the securities will be listed on a national exchange upon qualification, and it never applies to accredited investors. A major investor advantage versus Reg D is liquidity: Reg A+ securities are generally freely tradable rather than restricted. You also get more transparency, because Tier 2 issuers file a qualified Form 1-A offering circular up front and ongoing annual (1-K) and semiannual (1-SA) reports you can read on EDGAR. Important: 'qualified' by the SEC means the staff completed its review — it is not approval or endorsement and does not mean the investment is safe. Key risks: early-stage business failure, possible thin trading even if technically tradable, and loss of your investment.",
        related: [R.regA, R.guides],
      },
      {
        id: "reg-s-investor-deep",
        question: "Regulation S, in depth — what should an investor know?",
        answerText:
          "Regulation S is an offshore offering available to non-U.S. (offshore) investors, and it is not open to U.S. retail investors — these tranches are designed for investors located outside the United States. The transaction must occur offshore with no selling efforts directed into the U.S. market. If you invest under Reg S, a 'distribution compliance period' typically applies, during which the securities cannot be resold to U.S. persons; the platform tracks this period. Reg S sleeves are often offered alongside a U.S. Regulation D round, so international and U.S. accredited investors participate in the same overall raise under different rules. What you buy is generally illiquid with resale restrictions, especially back into the U.S. Key risks mirror other private offerings: illiquidity, limited ongoing information, currency and cross-border considerations, and the potential for total loss.",
        related: [R.regS, R.regD506c],
      },
      {
        id: "pipe-investor-deep",
        question: "PIPE financing, in depth — what should an investor know?",
        answerText:
          "A PIPE — private investment in public equity — is a privately negotiated investment into a company that is already public, and participation is typically limited to institutional and accredited investors invited into the deal at a negotiated price (often a discount to market). What you buy are restricted securities at issuance — sometimes common stock, sometimes convertible preferred, notes, or stock with warrants — and the deal almost always comes with registration rights: the issuer files a resale registration statement (Form S-1 or S-3) so your shares become freely sellable once it is declared effective. Until that registration is effective, your position is illiquid. Because the company is already public, you have public-company transparency through its SEC filings on EDGAR. Key risks: the stock can fall below your entry price, the resale registration can be delayed, and convertible structures can be dilutive; PIPEs are generally suited to sophisticated investors who can evaluate public-company risk.",
        related: [R.pipe, R.strategic],
      },
      {
        id: "eloc-investor-deep",
        question: "Equity Line of Credit (ELOC), in depth — what should an investor know?",
        answerText:
          "An Equity Line of Credit (ELOC) is primarily an issuer financing tool rather than an offering most investors 'subscribe' to: it is a committed facility under which a single institutional investor agrees to buy newly issued shares from a public company over time, at the company's election. If you are a shareholder or are evaluating a company that has an ELOC in place, the key point is its effect on the stock: the issuer can draw capital by issuing new shares at a price referenced to the market (usually at a small discount), which is dilutive and can add selling pressure when draws occur — though the issuer controls the timing and size. ELOCs require an effective resale registration and work only for listed companies with enough trading liquidity. For the institutional counterparty providing the facility, it is a negotiated, sophisticated commitment. Key takeaway for ordinary investors: understand that drawdowns dilute existing holders, and read the company's filings to see the facility's size and terms.",
        related: [R.eloc, R.pipe],
      },
      {
        id: "nasdaq-direct-investor-deep",
        question: "NASDAQ Direct Listing, in depth — what should an investor know?",
        answerText:
          "A NASDAQ direct listing makes a company's existing shares tradable on the Nasdaq Stock Market without an underwritten IPO, so as an investor you generally buy shares in the open market once the stock begins trading, rather than subscribing in advance. Because no new underwritten shares are sold at listing, there is no IPO allocation process and price is set through Nasdaq's opening price-discovery rather than by underwriters. The main advantages for investors are liquidity and transparency: the company registers its shares with the SEC, files public reports you can follow on EDGAR, and trades under Nasdaq's listing standards and governance rules. Early trading can be volatile because there is no underwriter price stabilization, and some shares may be subject to lock-ups. Key risks: ordinary market and business risk, potential volatility around the open, and the fact that a listing is not a guarantee of performance.",
        related: [R.nasdaqDirect, R.nasdaqConv],
      },
      {
        id: "nasdaq-conventional-investor-deep",
        question: "NASDAQ Conventional Listing, in depth — what should an investor know?",
        answerText:
          "A NASDAQ conventional listing combines going public on Nasdaq with a registered primary offering, so the company sells newly issued shares as it lists. As an investor you may be able to participate in the registered offering if you are eligible and invited, or simply buy shares on Nasdaq once trading begins. Unlike a private placement, a registered offering means the shares are registered with the SEC and are generally freely tradable, and you get full public-company transparency through ongoing SEC filings on EDGAR. The primary issuance raises new capital for the company but also dilutes existing holders. Key risks are the usual public-market risks — price volatility, business execution, and the chance of loss — plus the reality that being newly listed does not by itself indicate the company will perform; review the prospectus and risk factors.",
        related: [R.nasdaqConv, R.nasdaqDirect],
      },
      {
        id: "nyse-direct-investor-deep",
        question: "NYSE Direct Listing, in depth — what should an investor know?",
        answerText:
          "An NYSE direct listing makes a company's existing shares tradable on the New York Stock Exchange — the 'Big Board' — without an underwritten IPO, so you typically buy shares on the exchange once trading opens rather than subscribing beforehand. Opening price is established through the exchange's price-discovery process overseen by a Designated Market Maker (DMM). For investors the benefits are liquidity and disclosure: the company registers its shares with the SEC, reports publicly on EDGAR, and is subject to NYSE listing standards and governance requirements. As with any direct listing, the opening can be volatile because there is no underwriter stabilization, and some holders may be under lock-ups. Key risks: market volatility, business and execution risk, and the fact that a prestigious listing venue is not a measure of investment safety.",
        related: [R.nyseDirect, R.nyseConv],
      },
      {
        id: "nyse-conventional-investor-deep",
        question: "NYSE Conventional Listing, in depth — what should an investor know?",
        answerText:
          "An NYSE conventional listing pairs listing on the New York Stock Exchange with a registered primary offering, so the company raises new capital by issuing shares as it goes public on the Big Board. As an investor you may participate in the registered offering if eligible, or buy shares on the NYSE after trading starts. Because the offering is registered with the SEC, the shares are generally freely tradable and you receive full public-company transparency through ongoing filings on EDGAR. The new issuance funds the company but dilutes existing shareholders. Key risks are standard for public equities — price volatility, the company's ability to execute its plan, and the possibility of loss — and a listing on a major exchange is not an endorsement of the investment; always read the prospectus and risk factors before investing.",
        related: [R.nyseConv, R.nyseDirect],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: "liquidity",
    title: "Liquidity & the aftermarket",
    intro:
      "How and when you can sell — by offering type, holding period, and trading venue.",
    items: [
      {
        id: "reg-a-liquidity",
        question: "How liquid are Reg A+ shares? (For investors and insiders)",
        answerHtml:
          '<p>For investors, actual liquidity depends on where the issuer\'s shares trade. If the company lists on <a href="/products/nasdaq-conventional-listing">NASDAQ</a> or the <a href="/products/nyse-conventional-listing">NYSE</a>, liquidity can be excellent; on the OTCQB or OTCQX, good to very good. Where a company does not list on those markets, liquidity is limited to specialized aftermarket venues and broker-dealers that support <a href="/products/reg-a-plus">Reg A+</a> share trading — these are small today and growing. An issuer may also choose to offer direct, regulated liquidity to its investors by defining a valuation method and restrictions in its Offering Circular.</p>' +
          '<p>Company affiliates (management, founders, and 10%+ holders) resell publicly in reliance on Rule 144: no holding period applies to their Reg A+ shares, but they are limited in the volume they can sell at any one time, must sell through a broker or market maker, must file Form 144 with the SEC, and "adequate current public information" must be available — meaning the company is current in its Regulation A ongoing reports. A pleasant surprise for founders and long-term holders: once a Tier 2 issuer publishes its six-month reports and annual US-GAAP audit, insiders who have passed their Rule 144 holding period (usually 12 months) may sell for two weeks after results are announced, subject to the 1%-of-float daily limit for insiders and 10%+ holders. Non-insiders who have passed their holding period may sell their non-Reg A+ securities as well, and issuers that file quarterly management financials open insider trading windows four times per year.</p>',
        related: [R.regA, R.nasdaqConv, R.nyseConv, R.eloc, R.pipe],
      },
      {
        id: "reg-d-liquidity",
        question: "What liquidity do Reg D investors have?",
        answerHtml:
          '<p>Securities sold in a <a href="/products/reg-d-506b">Reg D</a> offering are "restricted" under U.S. securities law. They can be resold to other accredited investors through Alternative Trading Systems (ATS) but cannot be resold to the public for one year after purchase. After one year, non-affiliate investors (holders of less than 10% who are not employees, executives, or founders) may sell publicly without restriction. Before the year is up, non-affiliates of non-reporting companies may still resell:</p>' +
          "<ul>" +
          '<li>Privately at any time under the so-called "Section 4(1½)" exemption, typically to accredited investors, on an attorney\'s opinion;</li>' +
          "<li>Privately at any time under Section 4(a)(7) of the Securities Act to accredited investors;</li>" +
          "<li>Privately at any time to Qualified Institutional Buyers under Rule 144A;</li>" +
          '<li>Outside the United States at any time in reliance on <a href="/products/reg-s">Regulation S</a>; or</li>' +
          "<li>To the public under Rule 144, one year after the securities were issued.</li>" +
          "</ul>" +
          '<p>Each private-resale exemption has conditions, the securities remain restricted, and contractual, bylaw, or state-law restrictions may also apply. Affiliates — officers, directors, and 10%+ holders — hold securities that are both "restricted" and "control": they must wait a year from issuance before public resale, are limited in the volume they can sell at one time, must sell through a broker or market maker, must file Form 144, and adequate current public information about the company must be available (the company must be current in its ongoing reports). Once resold publicly, securities are no longer restricted, and warrants are treated the same as other Reg D securities. Note that the one-year Reg D holding period applies even if the company later completes a <a href="/products/reg-a-plus">Reg A+</a> offering — although the Reg A+ makes the company\'s other securities tradable once their Rule 144 holding period has passed, Rule 144 does not apply to shares purchased through the Reg A+ itself.</p>',
        related: [R.regD506b, R.regD506c, R.regS, R.regA],
      },
      {
        id: "ats-trading",
        question: "Can Reg D, Reg A+, or Rule 144A securities trade on an Alternative Trading System (ATS)?",
        answerHtml:
          '<p>Yes. An ATS is an SEC-regulated aftermarket venue where holders of securities can buy and sell. Because all <a href="/products/reg-a-plus">Reg A+</a> offerings are public offerings, listing Reg A+ securities on an ATS — during and after the offering — is a useful way for a company to provide liquidity to its investors. <a href="/products/reg-d-506b">Reg D securities</a> are more liquid than many people realize and can be quoted and traded on ATS venues (to accredited investors during the first year, and publicly by non-affiliates thereafter), and Rule 144A securities trade between Qualified Institutional Buyers on ATS platforms as well. One structural feature investors should know: short selling is not available on ATS venues, unlike on the major exchanges. Listing fees are approximately $10,000–$20,000 depending on the specific ATS, plus the cost of state secondary-market Blue Sky filings.</p>',
        related: [R.regA, R.regD506b, R.regD506c, R.regS],
      },
      {
        id: "what-is-the-greenshoe",
        question: "What is the greenshoe used in IPOs?",
        answerHtml:
          '<p>The "greenshoe" — legally, an overallotment option — is named for Green Shoe Manufacturing Company, the first company to use one in an IPO. It sets aside additional shares (up to 15% more than the base offering) for the underwriters, and it is the only SEC-sanctioned method for an underwriter to stabilize a new issue after pricing. It is allowed only in firm-commitment underwritten IPOs — generally larger deals. Smaller S-1 IPOs and <a href="/products/reg-a-plus">Reg A+</a> offerings are usually sold on a best-efforts basis, where the greenshoe is not permitted.</p>' +
          '<p>Mechanically: underwriters oversell up to 15% beyond the base deal. If the stock trades below the offering price (a "broken issue"), they buy shares back at the offering price to support it, covering their short. If the stock trades up, they exercise the option and buy the extra shares from the issuer at the offering price, covering the short without loss. The option can be exercised for 30 days after the offering, in full or in part. The greenshoe reduces risk for the issuer and steadies early trading — which benefits issuers and investors alike. Note that <a href="/products/nasdaq-direct-listing">direct listings</a> use no underwriters at all: the opening price is set by market orders in the opening auction, with no greenshoe and no stabilization — one of the key structural differences between a <a href="/products/nyse-direct-listing">direct listing and a conventional IPO</a>.</p>',
        related: [R.nasdaqConv, R.nyseConv, R.nasdaqDirect, R.nyseDirect],
      },
    ],
  },
  // ---------------------------------------------------------------------------
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
        related: [R.investorServices],
      },
      {
        id: "will-i-get-updates",
        question: "Will I receive updates or reports after investing?",
        answerText:
          "It depends on the offering type. Regulation A+ Tier 2 issuers file ongoing annual and semiannual reports with the SEC, and exchange-listed companies provide full public-company reporting, so you can follow those filings on EDGAR. Private Regulation D issuers have lighter ongoing obligations and communicate at their own discretion. Investor relations and shareholder communications tooling on the platform may also relay issuer updates where the issuer chooses to send them.",
        related: [R.regA, R.investorServices],
      },
      {
        id: "when-can-i-sell",
        question: "When can I sell, and are these securities liquid?",
        answerHtml:
          '<p>Most securities sold in exempt offerings are illiquid and may have little or no resale market, so you should be prepared to hold for an indefinite period. Securities from private <a href="/products/reg-d-506b">Regulation D</a> offerings are typically restricted and subject to holding-period limits before resale, while <a href="/products/reg-a-plus">Reg A+</a> securities are generally freely tradable — see the liquidity section above for the details of each path. Securities tied to a <a href="/products/nasdaq-direct-listing">NASDAQ</a> or <a href="/products/nyse-direct-listing">NYSE</a> listing may be tradable on that exchange, subject to any applicable lock-ups. Always assume limited liquidity unless the offering materials state otherwise.</p>',
        related: [R.regA, R.regD506b, R.nasdaqDirect, R.nyseDirect],
      },
      {
        id: "tax-documents",
        question: "What about taxes on my investment?",
        answerText:
          "Tax treatment depends on the security, the issuer's structure, and your own circumstances, and you may receive tax forms from the issuer or its transfer agent for distributions or other taxable events. Directly Listed does not provide tax advice. Consult your own tax advisor about how a specific investment affects your situation before and after you invest.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: "risk-and-protection",
    title: "Understanding the risks",
    intro:
      "What to read, how to verify an offering, and the risks you accept when you invest.",
    items: [
      {
        id: "risks-of-early-stage-investing",
        question: "What are the risks of investing in early-stage companies?",
        answerHtml:
          '<p>You must consider risk carefully before investing in a startup or early-stage company on <a href="/offerings">Directly Listed</a>. Investing in startups is very risky and speculative, and investments should not be made by anyone who cannot afford to lose their entire investment. Carefully consider the risks associated with the type of investment, the security, and the business before making any decision.</p>' +
          "<p><strong>Investment risks</strong></p>" +
          "<ul>" +
          "<li><strong>Principal risk:</strong> your entire investment is at risk. The company may fail, or you may be unable to sell your stock; for startup investments, total loss of capital is a highly likely outcome.</li>" +
          "<li><strong>Returns risk:</strong> returns, if any, are highly variable and not guaranteed. Do not invest funds from which you require a regular, predictable, or stable return.</li>" +
          "<li><strong>Returns delay:</strong> most startups take five to seven years to generate any return, if at all. Do not invest funds you need back within a specific timeframe.</li>" +
          "<li><strong>Liquidity risk:</strong> startup securities are privately held, are not traded on a public exchange, currently have no ready secondary market, and may carry resale and transfer restrictions. Do not invest funds you may need to withdraw or cash out within a certain period.</li>" +
          "</ul>" +
          "<p><strong>Security risks</strong></p>" +
          "<ul>" +
          "<li><strong>Instrument risk:</strong> preferred equity, common equity, and convertible notes each carry different structural risks — take time to understand the instrument you are buying.</li>" +
          "<li><strong>Dilution:</strong> future fundraising rounds may issue new securities that dilute your percentage ownership.</li>" +
          "<li><strong>Minority stake:</strong> as a small shareholder you may have limited voting rights or influence, and your securities may be treated less preferentially than larger holders'.</li>" +
          "<li><strong>Valuation risk:</strong> private-company valuations are difficult to assess; the issuer sets the share price, and you risk overpaying, which may materially affect your eventual return.</li>" +
          "</ul>" +
          "<p><strong>Business risks</strong></p>" +
          "<ul>" +
          "<li><strong>Failure risk:</strong> startups often fail; success frequently depends on a new product or service finding a market.</li>" +
          "<li><strong>Revenue and funding risk:</strong> early-stage companies may never operate profitably and may be unable to raise additional funding when needed, or only on unfavorable, dilutive terms — potentially forcing them to delay plans or cease operations.</li>" +
          "<li><strong>Disclosure risk:</strong> early-stage companies can provide only limited information about their business plan and operations, and are only obligated to provide limited ongoing information.</li>" +
          "<li><strong>Personnel and fraud risk:</strong> an investment in a startup is an investment in its management — review the team's experience, the use of proceeds (including compensation), and all disclosures, and make your own assessment of any potential for fraud or misleading conduct.</li>" +
          '<li><strong>Lack of professional guidance:</strong> a company financed mainly by smaller investors may lack the resources, contacts, and discipline that professional investors such as <a href="/strategic-investors">VCs, PE firms, and family offices</a> often provide — consider whether professional investors are participating in the round.</li>' +
          "<li><strong>Growth, competition, and market-demand risk:</strong> expansion strains management and systems, competitors may undercut pricing, and there is no assurance of broad market acceptance of the company's offerings.</li>" +
          "<li><strong>Control risk:</strong> founders, directors, and executives may control a significant percentage of the company, exert significant influence over stockholder votes, and potentially discourage acquisition offers that would otherwise deliver you a premium.</li>" +
          "</ul>",
        related: [R.offerings, R.guides, R.caseStudies, R.about],
      },
      {
        id: "does-sec-approve-offerings",
        question: "Does the SEC approve or endorse these offerings?",
        answerText:
          "No. The SEC does not approve, endorse, or pass on the merits of any securities offering, and for Regulation A+ a 'qualified' offering only means the staff completed its review — it is not an approval or a judgment that the investment is safe or sound. Be cautious of anyone who characterizes an SEC qualification, filing, or action as a government endorsement; that is a common misrepresentation.",
        related: [R.regA],
      },
      {
        id: "how-do-i-verify-an-offering",
        question: "How can I research or verify an offering before investing?",
        answerHtml:
          '<p>Start with the offering materials, then independently verify the issuer through public SEC resources. You can search the issuer and its filings on <a href="https://efts.sec.gov/LATEST/search-index?q=" rel="noopener">EDGAR Full-Text Search</a> and <a href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany" rel="noopener">EDGAR Company Search</a>, review investor education at <a href="https://www.investor.gov" rel="noopener">Investor.gov</a>, and check with your state securities regulator. Confirm the exemption being claimed, who is selling the securities, the use of proceeds, and the risk factors before committing.</p>',
        related: [R.offerings, R.guides],
      },
      {
        id: "what-if-i-suspect-fraud",
        question: "What should I do if I have concerns or suspect fraud?",
        answerHtml:
          '<p>Stop, do not send additional funds, and verify independently through SEC resources before acting. You can review guidance and report concerns through <a href="https://www.investor.gov" rel="noopener">Investor.gov</a> and the SEC, and consult your own attorney or financial advisor. Legitimate offerings will direct you to formal offering documents and will not pressure you with urgency, guaranteed returns, or claims of SEC endorsement — all of which are warning signs.</p>',
      },
      {
        id: "data-and-privacy",
        question: "How is my personal and financial information handled?",
        answerHtml:
          '<p>Information you provide for identity verification, accreditation, and payments is processed to onboard you into an offering and to meet KYC/AML and securities-law requirements, and its handling is governed by the platform\'s <a href="/privacy-policy">Privacy Policy</a>. Sensitive verification and payment data is collected through secure flows rather than by ad hoc email. Review the <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms-of-use">Terms of Use</a> for the specifics on how your data is used and protected.</p>',
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    id: "track-record",
    title: "Track record: Reg A+ IPOs & direct public offerings",
    intro:
      "Reg A+ is a proven route to the major exchanges. These examples show what completed offerings have looked like — outcomes vary, and past raises are not a prediction of any future offering's performance.",
    items: [
      {
        id: "completed-reg-a-ipos",
        question: "Which companies have completed Reg A+ IPOs and DPOs on the NYSE or NASDAQ?",
        answerHtml:
          '<p>A growing list of companies has used <a href="/products/reg-a-plus">Regulation A+</a> to complete an IPO or direct public offering (DPO) and list on the <a href="/products/nyse-conventional-listing">NYSE</a> or <a href="/products/nasdaq-conventional-listing">NASDAQ</a>. Two instructive examples:</p>' +
          '<p><strong>NewsMax (NMAX)</strong> raised $75 million without underwriters on March 31, 2025. Its DPO priced at $10 per share — a $750 million pre-money valuation — and closed at $83 on listing day as a shortage of available shares drove the price up; by early May 2025, as supply caught up with demand, the stock traded near $23. It is an excellent example of using Reg A+ as a cost-effective, rapid vehicle to list on a major exchange: no underwriters were involved, saving substantial cost, and the approach works especially well for companies with a large following they can invite to invest.</p>' +
          '<p><strong>Atlis Motor Vehicles (AMV)</strong> made the first Reg A+ DPO onto <a href="/products/nasdaq-direct-listing">NASDAQ</a> at $27.50 per share, raising $33.5 million, again with no underwriters. A share shortage drove the price up sharply in the first two days; the company later took on a large convertible note that weighed on its share price in the months after listing — a reminder that post-listing capital structure matters.</p>' +
          "<p>Other completed Reg A+ listings include:</p>" +
          "<ul>" +
          "<li><strong>Knightscope</strong> — NASDAQ, $22.36M raised (security robotics).</li>" +
          "<li><strong>Soliton, Inc.</strong> — NASDAQ, $10.8M raised (medical technology).</li>" +
          "<li><strong>Level Brands, Inc.</strong> — NYSE, $12M raised (lifestyle and branding).</li>" +
          "<li><strong>FAT Brands Inc.</strong> — NASDAQ, $24M raised (restaurant franchising).</li>" +
          "<li><strong>Arcimoto, Inc.</strong> — NASDAQ, $19M raised (electric vehicles).</li>" +
          "<li><strong>Chicken Soup for the Soul Entertainment</strong> — NASDAQ, $30M raised (media and entertainment).</li>" +
          "<li><strong>Xspand Products Lab (Edison Nation)</strong> — NASDAQ, $6.5M raised (consumer products).</li>" +
          "<li><strong>ShiftPixy, Inc.</strong> — NASDAQ, $12M raised (workforce management).</li>" +
          "<li><strong>Adomani, Inc.</strong> — NASDAQ, $14.3M raised (electric buses and vehicles).</li>" +
          "<li><strong>Myomo, Inc.</strong> — NYSE, $5M raised (medical robotics).</li>" +
          "</ul>" +
          '<p>For live and recent raises on our platform — including the structure, strategy, and outcome behind each — see <a href="/case-studies">Current Deals &amp; Case Studies</a>.</p>',
        related: [R.caseStudies, R.regA, R.nasdaqConv, R.nyseConv, R.nasdaqDirect, R.nyseDirect],
      },
    ],
  },
];

export const INVESTOR_FAQ: FaqCategory[] = INVESTOR_FAQ_DEFS.map((c) => ({
  ...c,
  items: c.items.map((i) => ({
    ...i,
    answerText: i.answerText ?? stripHtml(i.answerHtml ?? ""),
  })),
}));

// Flat list helper — used by the JSON-LD builder.
export const INVESTOR_FAQ_FLAT: FaqItem[] = INVESTOR_FAQ.flatMap((c) => c.items);
