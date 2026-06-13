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
];

async function main() {
  for (const p of posts) {
    await db.blogPost.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, published: true, publishedAt: new Date() },
    });
  }
  console.log(`Seeded ${posts.length} blog posts.`);
}

main().finally(() => db.$disconnect());
