import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const posts = [
  {
    slug: "direct-listing-vs-ipo",
    title: "Direct Listing vs. IPO: What Founders Should Actually Compare",
    excerpt:
      "Underwriting discounts, lockups, and dilution — a plain-English look at how a direct exchange listing differs from a traditional IPO, with links to the SEC's own resources.",
    tags: "Direct Listing, NASDAQ, NYSE",
    content: `Going public does not have to mean a traditional IPO. In a direct listing, a company registers existing shares for resale and lists them on an exchange — no underwriting syndicate, no roadshow pricing, and no new dilutive issuance unless you choose one.

## What actually differs

- Underwriting cost: a traditional IPO typically pays an underwriting discount on the money raised; a direct listing has no underwriter discount.
- Dilution: a direct listing floats existing shareholder stock, so the cap table is untouched unless paired with a capital raise such as an equity line of credit.
- Lockups: IPO lockups commonly restrict insiders for months; direct listings generally do not require them.
- Price discovery: the opening price is set by market supply and demand on the exchange rather than negotiated the night before.

## Where the rules come from

The registration statement at the heart of the process is the Form S-1, governed by [Regulation S-K](https://www.sec.gov/rules-regulations) for non-financial disclosure and Regulation S-X for financial statements. Smaller reporting companies can use streamlined disclosure rules — the SEC publishes plain-English guidance for small businesses at [SEC.gov](https://www.sec.gov/education/smallbusiness).

Every public filing is freely searchable on [EDGAR full-text search](https://efts.sec.gov/LATEST/search-index?q=%22direct%20listing%22&dateRange=custom&startdt=2024-01-01&enddt=2026-01-01), and investor-facing basics live at [Investor.gov](https://www.investor.gov).

## Pairing a listing with capital

Because a pure direct listing raises no new money, many issuers pair it with an institutional equity line of credit — a committed standby facility that lets the company draw capital after listing, on its own timeline. That is the model Directly Listed was built around: list first, fund on demand.

This post is for information only and is not investment, legal, or tax advice.`,
  },
  {
    slug: "reg-a-plus-vs-reg-d-506c",
    title: "Reg A+ or Reg D 506(c)? Choosing Your Exemption",
    excerpt:
      "One lets you raise up to $75M a year from anyone; the other lets you raise unlimited capital from verified accredited investors. Here's how to think about the choice.",
    tags: "Reg A+, Reg D, Compliance",
    content: `Two of the most-used paths to raising capital without a full registered offering are Regulation A+ and Rule 506(c) of Regulation D. They solve different problems.

## Regulation A+ in brief

Often called a mini-IPO, [Regulation A](https://www.sec.gov/resources-small-businesses/exempt-offerings/regulation) (as amended by Title IV of the JOBS Act) lets an issuer raise up to $75 million in a 12-month period under Tier 2, from both accredited and non-accredited investors. Issuers may "test the waters" publicly before the offering circular is qualified, and the securities investors receive are generally freely tradable.

The trade-off is process: an offering circular reviewed and qualified by the SEC, ongoing reporting, and audited financials for Tier 2.

## Rule 506(c) in brief

[Rule 506 of Regulation D](https://www.sec.gov/resources-small-businesses/exempt-offerings/private-placements-rule-506b) is the safe harbor for private offerings under Section 4(a)(2) of the Securities Act. Under 506(c), a company may advertise the offering publicly and raise an unlimited amount — provided every purchaser is an accredited investor and the issuer takes reasonable steps to verify that status (tax returns, brokerage statements, or third-party verification letters, for example).

## How to choose

- Want your customers and community on the cap table? Reg A+ reaches non-accredited investors; 506(c) cannot.
- Need more than $75M or a faster launch? 506(c) has no cap and no qualification wait.
- Audience matters: 506(c) suits institutional and high-net-worth demand; Reg A+ suits consumer brands with large communities.

Whichever exemption fits, the offering is conducted by the issuer in reliance on its own exemption — and verification, investor limits, eSignature, and escrow mechanics should be built into the raise from day one. Always confirm current rules directly at [SEC.gov](https://www.sec.gov) and consult your own counsel.

This post is for information only and is not investment, legal, or tax advice.`,
  },
  {
    slug: "spacex-ipo-nasdaq",
    title: "SpaceX IPO: Inside the NASDAQ Listing and What It Means for Investors",
    excerpt:
      "SpaceX (NASDAQ: SPCX) went public on June 12, 2026 in the largest IPO ever — priced at $135, closing near $161 on day one before sliding. Here's the SpaceX IPO breakdown.",
    tags: "SpaceX, SPCX, NASDAQ, IPO, Going Public",
    author: "Andy Altahawi",
    content: `SpaceX is now a publicly traded company. Elon Musk's rocket maker debuted on the Nasdaq Stock Market on June 12, 2026 under the ticker SPCX, in what was reported as the largest IPO in history. After years of speculation, the SpaceX IPO is a landmark moment for how large, late-stage private companies reach the public markets.

## SpaceX IPO details at a glance

- Ticker: SPCX (Nasdaq)
- IPO date: June 12, 2026
- IPO price: $135 per share
- Amount raised: roughly $75 billion — reported as the largest IPO ever
- First-day trading: opened around $150 and closed near $161, up about 19%
- Implied market capitalization: approximately $1.77 trillion

Figures are from public reports of the offering; always confirm against SpaceX's official filings on [EDGAR](https://www.sec.gov/cgi-bin/browse-edgar).

## A strong debut, then a pullback

SpaceX's first day was a blockbuster, with SPCX jumping roughly 19% above its $135 offer price. In the sessions that followed, however, the stock gave back ground — a reminder that a hot first-day "pop" does not guarantee where a newly public stock settles, and that investors who buy after the open can see very different results than those allocated shares at the IPO price.

## How SpaceX went public: a traditional IPO

SpaceX listed via a traditional initial public offering, not a direct listing. In an IPO, underwriters help issue and price new shares ahead of the first trade, raising fresh capital for the company. In a [direct listing](/blog/what-is-a-direct-listing), a company instead floats existing shares with no underwriters and no new dilution — and raises no new money by itself.

For a company of SpaceX's scale and capital needs, an underwritten IPO delivered a marketed, priced offering and a deep base of institutional buyers — at the cost of underwriting fees and the usual insider lockups.

## What the SpaceX IPO means for other companies

- It validates public-market appetite for capital-intensive "hard tech" and space companies.
- It gives early employees and investors a path to liquidity.
- It sets a reference point that other large private companies — and their boards — will study when weighing an IPO versus a direct listing.

## IPO vs. direct listing: the founder's takeaway

Not every company should follow the SpaceX playbook. An IPO fits when you need to raise substantial new capital through a marketed offering. A direct listing can be better when your priority is liquidity and market-set pricing without underwriter discounts or dilution. To go public *and* keep raising on your own timeline, many issuers pair a listing with an [equity line of credit](/blog/equity-line-of-credit-eloc). See how the routes compare in [Direct Listing vs. IPO](/blog/direct-listing-vs-ipo).

Curious which path fits your company? Explore our [NASDAQ and NYSE listing services](/products) or [get started](/get-started) with a readiness review.

This post is for information only and is not investment, legal, or tax advice, and is not a recommendation to buy or sell any security. Confirm current prices and details with SpaceX's official filings on [EDGAR](https://www.sec.gov/cgi-bin/browse-edgar).`,
  },
  {
    slug: "what-is-a-direct-listing",
    title: "What Is a Direct Listing? A 2026 Guide to Going Public Without an IPO",
    excerpt:
      "A direct listing lets your company go public on NASDAQ or NYSE without underwriters or new dilution. Here's how direct listings work in 2026, step by step.",
    tags: "Direct Listing, Going Public, NASDAQ, NYSE",
    author: "Andy Altahawi",
    content: `A direct listing is a way to take a company public by listing its existing shares on a stock exchange — without the underwriting syndicate, roadshow, or newly issued stock of a traditional IPO. It has become one of the most talked-about routes to the public markets, used by companies from Spotify to Coinbase.

## How a direct listing works

In a direct listing, current shareholders' existing shares are registered for resale and begin trading on NASDAQ or the NYSE. There is no underwritten offering setting the price the night before; instead, the opening price is discovered by market supply and demand on the first trading day.

The core steps are:

- File a registration statement (typically Form S-1) with the SEC.
- Clear SEC review and respond to comments.
- Meet the chosen exchange's listing standards.
- Set a reference price and begin trading.

## Direct listing vs. IPO

The key differences come down to three things: cost, dilution, and control. A direct listing avoids underwriter discounts, does not dilute existing shareholders (no new shares are issued by default), and generally has no insider lockup. For a side-by-side breakdown, see [Direct Listing vs. IPO](/blog/direct-listing-vs-ipo).

## Is a direct listing right for your company?

Direct listings tend to favor companies with strong brand recognition and shareholders who want liquidity, rather than companies whose main goal is raising new cash. Because a pure direct listing raises no capital, many issuers pair it with an [equity line of credit](/blog/equity-line-of-credit-eloc) to fund the business after listing.

Want to explore the path? Learn about our [direct listing services](/products) or [raise capital](/raise-capital) with Directly Listed.

This post is for information only and is not investment, legal, or tax advice.`,
  },
  {
    slug: "nasdaq-direct-listing-requirements",
    title: "NASDAQ Direct Listing: Requirements, Process, and Timeline (2026)",
    excerpt:
      "Thinking about a NASDAQ direct listing? Here are the listing requirements, the SEC registration process, and a realistic timeline for going public without an IPO.",
    tags: "NASDAQ, Direct Listing, Listing Requirements",
    author: "Andy Altahawi",
    content: `A NASDAQ direct listing lets a company list its existing shares on the Nasdaq Stock Market without an underwritten IPO. If you are weighing this path, here is what to know about requirements, process, and timing.

## NASDAQ direct listing requirements

To list on NASDAQ, a company must meet the exchange's quantitative and qualitative standards — covering factors such as shareholders' equity or market value, public float, share price, and corporate governance. The exact thresholds depend on which Nasdaq tier (Global Select, Global, or Capital Market) the company qualifies for. Always confirm current standards directly with [NASDAQ](https://listingcenter.nasdaq.com) and the [SEC](https://www.sec.gov).

## The process, step by step

- Prepare and file a registration statement (Form S-1) with the SEC.
- Respond to SEC staff comments until the filing is declared effective.
- Apply to NASDAQ and satisfy its listing standards.
- Work with a financial adviser and the exchange to set a reference price.
- Begin trading as shares change hands on the open market.

## A realistic timeline

Most companies should plan for several months from kickoff to first trade, driven largely by SEC review and audit readiness. Clean, audited financials and strong governance shorten the path.

## How Directly Listed helps

We manage NASDAQ direct listing readiness end to end — SEC registration support, exchange application, and the option to pair your listing with an [equity line of credit](/blog/equity-line-of-credit-eloc). See our [NASDAQ listing services](/products) or [get started](/get-started).

This post is for information only and is not investment, legal, or tax advice.`,
  },
  {
    slug: "nyse-direct-listing-guide",
    title: "NYSE Direct Listing: Process, Requirements, and Costs Explained",
    excerpt:
      "How to take your company public through an NYSE direct listing — eligibility, the reference price process, costs versus an IPO, and what to prepare.",
    tags: "NYSE, Direct Listing, Going Public",
    author: "Andy Altahawi",
    content: `The New York Stock Exchange was the venue for the first wave of high-profile direct listings, including Spotify and Slack. Here is how an NYSE direct listing works and what it costs compared with a traditional IPO.

## NYSE direct listing eligibility

A company must meet the NYSE's listing standards — including distribution, public float, and financial criteria — and clear SEC registration. Confirm the current thresholds with the [NYSE](https://www.nyse.com) and the [SEC](https://www.sec.gov), since standards are updated over time.

## The reference price and opening trade

Rather than an underwriter-set IPO price, an NYSE direct listing uses a reference price as a starting point, with the actual opening price determined by buy and sell orders at the open. A designated market maker facilitates that first trade.

## Costs vs. a traditional IPO

- No underwriting discount on capital, which in an IPO can be a meaningful percentage of proceeds.
- Advisory and legal/accounting fees still apply.
- No standard insider lockup, giving shareholders earlier liquidity.

## Listing now, funding later

Because a direct listing raises no new capital by itself, companies that also need funding often add an [equity line of credit](/blog/equity-line-of-credit-eloc). Compare the routes in [Direct Listing vs. IPO](/blog/direct-listing-vs-ipo), or explore our [NYSE listing services](/products).

This post is for information only and is not investment, legal, or tax advice.`,
  },
  {
    slug: "biggest-direct-listings-history",
    title: "The Biggest Direct Listings in History: Spotify, Coinbase, Palantir and More",
    excerpt:
      "From Spotify's 2018 NYSE debut to Coinbase on NASDAQ, these landmark direct listings show how top companies went public without a traditional IPO.",
    tags: "Direct Listing, Spotify, Coinbase, Case Studies",
    author: "Andy Altahawi",
    content: `Direct listings moved from novelty to mainstream over the past several years, used by some of the most recognizable names in tech. Here are the landmark direct listings every founder should know — all documented in public filings on [EDGAR](https://www.sec.gov/cgi-bin/browse-edgar).

## Spotify — NYSE, 2018

The first high-profile technology direct listing. Spotify floated existing shares on the NYSE rather than issuing new stock, proving a large, well-known company could let the market set its opening price without underwriters.

## Slack — NYSE, 2019

Slack followed Spotify's template, reinforcing the direct listing as a repeatable structure for software companies with strong brand recognition.

## Palantir and Asana — NYSE, 2020

Listing on the same day, these two showed direct listings could happen in clusters and were no longer one-off events.

## Roblox — NYSE, 2021

A consumer-facing platform whose listing drew enormous retail attention to the direct-listing structure.

## Coinbase — NASDAQ, 2021

One of the most prominent NASDAQ direct listings, and a key reference for how a heavily watched company opens for trading through market-driven price discovery.

## Amplitude — NASDAQ, 2021

A product-analytics company whose NASDAQ listing showed the structure was viable for mid-cap software issuers, not just the largest names.

## What these listings have in common

Each company had brand recognition and shareholders who valued liquidity over raising new cash. For founders who need both a public listing *and* capital, pairing a listing with an [equity line of credit](/blog/equity-line-of-credit-eloc) bridges the gap. Learn more about [going public with Directly Listed](/products).

This post is for information only and is not investment, legal, or tax advice. Company facts are summarized from public filings; confirm details on EDGAR.`,
  },
  {
    slug: "equity-line-of-credit-eloc",
    title: "Equity Line of Credit (ELOC): How to Fund Your Company After Going Public",
    excerpt:
      "An equity line of credit (ELOC) lets a newly public company raise capital on demand. Here's how an ELOC works, when to use one, and how it pairs with a direct listing.",
    tags: "ELOC, Equity Line of Credit, Capital Raising",
    author: "Andy Altahawi",
    content: `An equity line of credit (ELOC) is a committed standby facility that lets a public company sell shares to an institutional investor over time, drawing capital when it chooses. For companies that go public through a direct listing — which raises no new money by itself — an ELOC is a natural way to fund the business afterward.

## How an ELOC works

Under an ELOC, an institutional investor commits to purchase up to a set dollar amount of the company's stock over a defined period. The company controls the timing and size of each draw (subject to the agreement's terms), selling newly issued shares at a price tied to the market.

- The company decides when to draw — capital on demand, not all at once.
- Pricing is generally based on prevailing market prices around each draw.
- It complements, rather than replaces, a listing or other raise.

## When an ELOC makes sense

An ELOC suits a newly public company that wants flexible, non-dilutive-until-drawn access to capital — for example, after a [direct listing](/blog/what-is-a-direct-listing) where no primary capital was raised. It is less suited to companies that need a single large lump sum immediately, where an IPO or private placement may fit better.

## Pairing a listing with an ELOC

This "list first, fund on demand" model is the core of the Directly Listed platform: go public through a NASDAQ or NYSE direct listing, then draw capital through a committed institutional facility on your own timeline. Explore our [capital-raising services](/products) or [get started](/get-started).

This post is for information only and is not investment, legal, or tax advice.`,
  },
];

async function main() {
  for (const p of posts) {
    const { published = true, ...rest } = p;
    const existing = await db.blogPost.findUnique({ where: { slug: p.slug } });
    if (!existing) {
      await db.blogPost.create({
        data: { ...rest, published, publishedAt: published ? new Date() : null },
      });
    } else if (published && !existing.published) {
      // Publish a post that was previously seeded as a draft; set publishedAt
      // once (keep any existing value) so the date doesn't churn on reboots.
      await db.blogPost.update({
        where: { slug: p.slug },
        data: { published: true, publishedAt: existing.publishedAt ?? new Date() },
      });
    }
    // Already-published (or intentionally unpublished) posts are left untouched.
  }
  console.log(`Seeded ${posts.length} blog posts.`);
}

main().finally(() => db.$disconnect());
