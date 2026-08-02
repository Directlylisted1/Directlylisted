// lib/faq.hub.hedge-funds.ts
// -----------------------------------------------------------------------------
// Hedge Funds topic for the /faq hub page. Hand-written (no source Word
// document exists for this topic) — written to match the platform's framing:
// hedge funds appear on Directly Listed primarily as the institutional
// investors funding issuer clients through PIPEs, equity lines, and Reg D
// placements; funds themselves raise through Reg D, not Reg A+.
// Same shape as the generated topics in faq.hub.ts.
// -----------------------------------------------------------------------------

import type { HubTopic } from "@/lib/faq.hub";

export const HEDGE_FUNDS_TOPIC: HubTopic = {
  id: "hedge-funds",
  title: "Hedge Funds",
  blurb:
    "How hedge funds fit the platform — as the institutional capital behind PIPEs and equity lines, and as Reg D issuers themselves.",
  introHtml:
    'How hedge funds interact with companies raising and listing on Directly Listed — as the institutional investors behind <a href="/products/pipe">PIPE placements</a> and <a href="/products/eloc">equity line facilities</a>, as buyers in <a href="/products/reg-d-506b">Regulation D</a> rounds, and as issuers raising fund capital of their own. Companies raising capital should see the <a href="/faq/issuer">Issuer FAQ</a>; investors, the <a href="/faq/investor">Investor FAQ</a>.',
  sections: [
    {
      title: "",
      items: [
        {
          id: "how-do-hedge-funds-participate-on-directly-listed",
          question: "How do hedge funds participate on Directly Listed?",
          answerHtml:
            '<p>Primarily as the institutional capital funding issuer clients. Hedge funds appear on the platform alongside <a href="/strategic-investors">family offices, venture capital, and private equity</a> as the investors behind <a href="/products/pipe">PIPE placements</a> into newly listed and established public companies, as the committed counterparties standing behind <a href="/products/eloc">equity line of credit (ELOC)</a> facilities, and as buyers in <a href="/products/reg-d-506b">Regulation D</a> private placements and <a href="/products/reg-s">Regulation S</a> tranches ahead of a listing. Many also trade restricted securities among themselves as Qualified Institutional Buyers under Rule 144A. For an issuer, that means hedge funds are most often the other side of the table in a negotiated, post-listing or pre-listing institutional raise — capital that closes quickly, at a negotiated price, with sophisticated diligence.</p>',
          related: [
            { label: "Family Offices, VC, PE & Hedge Funds", href: "/strategic-investors" },
            { label: "PIPE (Post-Listing)", href: "/products/pipe" },
            { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
            { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
          ],
        },
        {
          id: "what-is-a-hedge-fund-vs-private-equity",
          question: "What is a hedge fund, and how is it different from private equity?",
          answerHtml:
            "<p>Both are private pooled investment vehicles for sophisticated investors, but they operate differently. A hedge fund typically invests in liquid or semi-liquid instruments — public equities, credit, derivatives, and negotiated placements such as <a href=\"/products/pipe\">PIPEs</a> — with flexible mandates, the ability to go long or short, and periodic (not permanent) investor capital. A private equity fund typically buys control or significant minority stakes in whole companies, holds them for years inside a closed-end fund, and exits through a sale or listing. The distinction matters to issuers because it predicts behavior: hedge funds are structured for negotiated entry into <em>public</em> or soon-to-be-public securities — which is why they dominate PIPE and <a href=\"/products/eloc\">equity line</a> investing — while private equity firms are more often the sellers bringing a portfolio company to market. See the <a href=\"#private-equity\">Private Equity</a> topic on this page for that side of the table.</p>",
          related: [
            { label: "Family Offices, VC, PE & Hedge Funds", href: "/strategic-investors" },
            { label: "PIPE (Post-Listing)", href: "/products/pipe" },
            { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
          ],
        },
        {
          id: "can-a-hedge-fund-raise-capital-using-reg-a-plus",
          question: "Can a hedge fund raise capital using Regulation A+?",
          answerHtml:
            '<p>Generally no. <a href="/products/reg-a-plus">Regulation A+</a> is not available to registered investment companies or business development companies, and that exclusion reaches the typical pooled investment fund — hedge funds included. Funds raise instead through <a href="/products/reg-d-506b">Regulation D</a> private placements, which allow an unlimited amount of capital from accredited investors: quietly under <a href="/products/reg-d-506b">Rule 506(b)</a>, or with public marketing under <a href="/products/reg-d-506c">Rule 506(c)</a> provided every investor\'s accredited status is verified. Operating vehicles structured outside the Investment Company Act — REIT-style real estate structures, for example — can and do use Reg A+, which is a structuring question for securities counsel rather than a label question.</p>',
          related: [
            { label: "Regulation A+", href: "/products/reg-a-plus" },
            { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
            { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
          ],
        },
        {
          id: "how-do-hedge-funds-raise-under-reg-d",
          question: "How do hedge funds raise their own capital under Regulation D?",
          answerHtml:
            '<p>The standard structure is a <a href="/products/reg-d-506b">Rule 506(b)</a> or <a href="/products/reg-d-506c">Rule 506(c)</a> private placement of limited partnership or LLC interests, paired with an exclusion from Investment Company Act registration — most commonly Section 3(c)(1) (no more than 100 beneficial owners) or Section 3(c)(7) (owners limited to "qualified purchasers," generally individuals with $5 million or more in investments). A 506(b) fund raise relies on pre-existing relationships and self-certified accreditation with no general solicitation; a 506(c) raise may be marketed publicly but requires verification of every investor\'s accredited status. Either way the fund files a simple Form D within 15 days of first sale, interests are restricted securities, and non-U.S. investors can be added through a parallel <a href="/products/reg-s">Regulation S</a> tranche — the same architecture operating companies use on the platform, applied to a fund wrapper.</p>',
          related: [
            { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
            { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
            { label: "Regulation S", href: "/products/reg-s" },
          ],
        },
        {
          id: "what-does-a-hedge-fund-look-for-in-a-pipe",
          question: "What does a hedge fund look for in a PIPE — and what will it negotiate?",
          answerHtml:
            '<p>A hedge fund evaluating a <a href="/products/pipe">PIPE</a> underwrites three things: the business (can it execute), the liquidity path (how and when the restricted shares become sellable), and the price (typically a negotiated discount to the market). Expect negotiation over structure — straight common stock is cleanest for the issuer; convertible preferred, convertible notes, or common-plus-warrants shift more protection to the investor — and over registration rights, because the fund\'s exit depends on the issuer filing and maintaining an effective resale registration statement. Sophisticated issuers also watch for terms that can compound dilution, such as price resets or variable-rate conversion features. The negotiation is normal and healthy; the discipline is knowing which terms are market and which are expensive. Structuring and negotiating these placements alongside issuers — with capital from <a href="/strategic-investors">hedge funds, family offices, and PE firms</a> — is exactly what the <a href="/products/pipe">PIPE product</a> covers.</p>',
          related: [
            { label: "PIPE (Post-Listing)", href: "/products/pipe" },
            { label: "Family Offices, VC, PE & Hedge Funds", href: "/strategic-investors" },
            { label: "Issuer FAQ", href: "/faq/issuer" },
          ],
        },
        {
          id: "how-do-elocs-involve-hedge-funds",
          question: "How do equity lines (ELOCs) involve hedge funds?",
          answerHtml:
            '<p>The committed purchaser standing behind an <a href="/products/eloc">Equity Line of Credit</a> is almost always an institutional investor — frequently a hedge fund or a dedicated structured-finance affiliate of one. The fund commits to buy newly issued shares, up to a fixed dollar amount over a set period, whenever the issuer elects to draw; it earns the spread between the contractual purchase discount and the market price at resale. For the issuer the appeal is control — you draw when you choose, or not at all — while the fund\'s appeal is a repeatable, priced commitment. The practical diligence point for issuers: the facility only works as intended when the resale registration stays effective and the stock has enough trading volume to absorb draws, so the counterparty\'s track record with facilities of your size matters as much as the headline commitment number.</p>',
          related: [
            { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
            { label: "PIPE (Post-Listing)", href: "/products/pipe" },
          ],
        },
        {
          id: "what-should-my-company-know-before-taking-hedge-fund-capital",
          question: "What should my company know before taking hedge fund capital?",
          answerHtml:
            '<p>Three things. <strong>Know the instrument:</strong> straight common at a modest discount behaves very differently from a convertible with reset features — model the dilution under downside scenarios, not just at today\'s price. <strong>Know the counterparty:</strong> funds differ enormously in how they handle their positions after closing; reference-check how the fund behaved in its last several placements of your size. <strong>Know your obligations:</strong> most institutional placements carry registration-rights deadlines, information covenants, and sometimes participation rights in future rounds — obligations that outlive the wire. None of this argues against hedge fund capital; it is often the fastest, most reliable institutional money available to a newly listed company. It argues for negotiating with experienced counsel and an advisor who has seen the terms before — which is part of every <a href="/products/pipe">PIPE</a> and <a href="/products/eloc">ELOC</a> engagement we run. <a href="/get-started">Tell us about your situation</a> and we will scope it with you.</p>',
          related: [
            { label: "PIPE (Post-Listing)", href: "/products/pipe" },
            { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
            { label: "Issuer FAQ", href: "/faq/issuer" },
          ],
        },
        {
          id: "do-hedge-funds-invest-before-a-listing",
          question: "Do hedge funds invest before a listing — or only after?",
          answerHtml:
            '<p>Both. Ahead of a listing, crossover and event-driven funds participate in <a href="/products/reg-d-506b">Reg D 506(b)</a> and <a href="/products/reg-d-506c">506(c)</a> placements — often anchoring the pre-listing round that funds the balance sheet the exchange will evaluate — and offshore funds join through a parallel <a href="/products/reg-s">Regulation S</a> tranche. After a <a href="/products/nasdaq-direct-listing">NASDAQ</a> or <a href="/products/nyse-direct-listing">NYSE</a> listing, the same institutions provide follow-on capital through <a href="/products/pipe">PIPEs</a> and <a href="/products/eloc">equity lines</a>. Many successful engagements sequence all three: an institutional private round pre-listing, the listing itself, then committed follow-on capital — with the fund relationships built once and used across the whole arc.</p>',
          related: [
            { label: "Regulation D 506(c)", href: "/products/reg-d-506c" },
            { label: "Regulation S", href: "/products/reg-s" },
            { label: "NASDAQ Direct Listing", href: "/products/nasdaq-direct-listing" },
            { label: "PIPE (Post-Listing)", href: "/products/pipe" },
          ],
        },
        {
          id: "what-is-a-qib-and-rule-144a-trading",
          question: "What are QIBs and Rule 144A trading — and why do they matter to hedge funds?",
          answerHtml:
            '<p>Qualified Institutional Buyers (QIBs) are institutions that own or manage at least $100 million of securities — a category that includes most established hedge funds. Rule 144A lets restricted securities trade freely between QIBs without SEC registration, which gives hedge funds a liquidity channel for positions bought in <a href="/products/reg-d-506b">Reg D</a> placements and PIPEs before any public resale window opens. For issuers, the practical effect is that institutional placements are more liquid than they first appear: a fund that buys your restricted stock can manage its position within the QIB market, on Alternative Trading Systems, or offshore under <a href="/products/reg-s">Regulation S</a>, even before a resale registration is effective. That embedded liquidity is one reason institutional investors can move quickly on negotiated placements.</p>',
          related: [
            { label: "Family Offices, VC, PE & Hedge Funds", href: "/strategic-investors" },
            { label: "Regulation D 506(b)", href: "/products/reg-d-506b" },
            { label: "Regulation S", href: "/products/reg-s" },
            { label: "Investor FAQ", href: "/faq/investor" },
          ],
        },
        {
          id: "how-does-directly-listed-connect-issuers-with-hedge-funds",
          question: "How does Directly Listed connect my company with hedge funds and other institutional investors?",
          answerHtml:
            '<p>Institutional capital is one of the platform\'s pillars: we work with a network of <a href="/strategic-investors">hedge funds, family offices, venture capital, and private equity firms</a> that fund issuer clients through <a href="/products/pipe">PIPEs</a>, <a href="/products/eloc">equity lines</a>, and pre-listing <a href="/products/reg-d-506c">Reg D</a> rounds. During scoping we assess which structures fit your stage and listing plan, then run the placement end to end — materials, diligence, negotiation support with counsel, KYC/AML and accreditation workflows, eSignature, and closing mechanics — under the platform\'s flat-fee model. <a href="/book">Book a call</a> or <a href="/get-started">tell us about your raise</a> and we will map the institutional options against your timeline.</p>',
          related: [
            { label: "Family Offices, VC, PE & Hedge Funds", href: "/strategic-investors" },
            { label: "PIPE (Post-Listing)", href: "/products/pipe" },
            { label: "Equity Line of Credit (ELOC)", href: "/products/eloc" },
            { label: "Capital Raise Tech", href: "/products/capital-raise-tech" },
          ],
        },
      ],
    },
  ],
};
