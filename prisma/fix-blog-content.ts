// prisma/fix-blog-content.ts
// -----------------------------------------------------------------------------
// Idempotent content corrections for blog posts that live only in the database
// (ingested via the RankChat/WordPress API rather than seeded from the repo).
// Runs as part of `npm run db:seed:all`, which scripts/start.mjs executes on
// every production boot — so pushing this file corrects the live posts on the
// next deploy without manual database access.
//
// Current fixes:
//  1. Factual error: several ingested posts cite "Spotify's direct listing on
//     the NASDAQ" — Spotify listed on the NYSE (April 2018).
//  2. Vendor attribution: the "cost in NY" post carries a RankChat.AI footer
//     ("Article created using Rankchat.AI") that should not appear on the site.
//
// Each fix is a pure string transform applied to every post's content and
// excerpt; posts are only written back when something actually changed, so
// re-running is a no-op.
// -----------------------------------------------------------------------------

import fs from "node:fs";
import path from "node:path";
import { db } from "../src/lib/db";

const FIXES: Array<{ name: string; apply: (s: string) => string }> = [
  {
    name: "spotify-listed-on-nyse",
    apply: (s) =>
      s
        .replace(/Spotify(&#8217;s|'s|’s)? direct listing on the NASDAQ/g, "Spotify$1 direct listing on the NYSE")
        .replace(/Spotify(&#8217;s|'s|’s)? debut on the NASDAQ/g, "Spotify$1 debut on the NYSE")
        // NASDAQ-vs-NYSE post: Spotify and Palantir both listed on the NYSE;
        // Coinbase is the flagship NASDAQ direct listing.
        .replace(
          /Companies like Spotify and Palantir have successfully navigated NASDAQ(&#8217;|'|’)s direct listing process/g,
          "Companies like Coinbase have successfully navigated NASDAQ$1s direct listing process",
        ),
  },
  {
    name: "strip-rankchat-footer",
    apply: (s) =>
      s
        // The injected footer block: <div data-rankchat-footer ...> ... </div>
        .replace(/<div[^>]*data-rankchat-footer[^>]*>[\s\S]*?<\/div>/gi, "")
        // Any stray attribution paragraph or link that survives outside the div.
        .replace(/<p[^>]*>\s*Article created using[\s\S]*?rankchat[\s\S]*?<\/p>/gi, "")
        .replace(/<a[^>]*href="https?:\/\/(www\.)?rankchat\.ai[^"]*"[^>]*>[\s\S]*?<\/a>/gi, "")
        // Trailing empty paragraph the footer leaves behind.
        .replace(/(<p><br\s*\/?><\/p>\s*)+$/gi, ""),
  },
  {
    // SE Ranking audit fix #7: internal links written in the non-www form 301
    // to www — one extra hop for every click and for link equity. Rewrite them
    // to the canonical host.
    name: "canonical-www-internal-links",
    apply: (s) =>
      s.replace(/https?:\/\/directlylisted\.com(\/|")/g, "https://www.directlylisted.com$1"),
  },
];

// SE Ranking audit fix #10: post titles that exceed the ~60-character SERP
// display limit, rewritten concisely. Applied only while the title still
// matches the long original, so the rewrite is idempotent and never clobbers
// a later manual retitle.
const TITLE_REWRITES: Array<{ slug: string; from: string; to: string }> = [
  {
    slug: "the-cayman-islands-structure-how-international-companies-list-on-nasdaq-and-the-",
    from: "The Cayman Islands Structure: How International Companies List on NASDAQ and the NYSE",
    to: "The Cayman Islands Structure: Listing on NASDAQ & NYSE",
  },
  {
    slug: "spacex-ipo-nasdaq",
    from: "SpaceX IPO: Inside the NASDAQ Listing and What It Means for Investors",
    to: "SpaceX IPO: Inside the NASDAQ Listing",
  },
  {
    slug: "nasdaq-direct-listing-requirements",
    from: "NASDAQ Direct Listing: Requirements, Process, and Timeline (2026)",
    to: "NASDAQ Direct Listing Requirements & Timeline (2026)",
  },
  {
    slug: "nyse-direct-listing-guide",
    from: "NYSE Direct Listing: Process, Requirements, and Costs Explained",
    to: "NYSE Direct Listing: Process, Requirements, Costs",
  },
  {
    slug: "what-is-a-direct-listing",
    from: "What Is a Direct Listing? A 2026 Guide to Going Public Without an IPO",
    to: "What Is a Direct Listing? Going Public Without an IPO",
  },
  {
    slug: "biggest-direct-listings-history",
    from: "The Biggest Direct Listings in History: Spotify, Coinbase, Palantir and More",
    to: "The Biggest Direct Listings in History",
  },
  {
    slug: "equity-line-of-credit-eloc",
    from: "Equity Line of Credit (ELOC): How to Fund Your Company After Going Public",
    to: "Equity Line of Credit (ELOC): Post-Listing Funding",
  },
  {
    slug: "direct-listing-vs-ipo",
    from: "Direct Listing vs. IPO: What Founders Should Actually Compare",
    to: "Direct Listing vs. IPO: What Founders Should Compare",
  },
];

async function main() {
  const posts = await db.blogPost.findMany();
  let changed = 0;
  for (const post of posts) {
    let content = post.content ?? "";
    let excerpt = post.excerpt ?? "";
    for (const fix of FIXES) {
      content = fix.apply(content);
      excerpt = fix.apply(excerpt);
    }
    // Title shortening (fix #10) — only while the long original is in place.
    const rewrite = TITLE_REWRITES.find((r) => r.slug === post.slug);
    const title = rewrite && post.title === rewrite.from ? rewrite.to : post.title;
    // Cover image hygiene (fix #5): 19 posts referenced /uploads/blog/* files
    // that no longer exist on the server, leaving broken hero images and 4XX
    // image errors. If the file is missing from the serving directory, clear
    // the reference — the template renders cleanly without a cover.
    let coverImage = post.coverImage;
    if (coverImage?.startsWith("/uploads/")) {
      const onDisk = path.join(process.cwd(), "public", ...coverImage.split("/").filter(Boolean));
      if (!fs.existsSync(onDisk)) coverImage = null;
    }
    if (
      content !== post.content ||
      excerpt !== post.excerpt ||
      title !== post.title ||
      coverImage !== post.coverImage
    ) {
      await db.blogPost.update({
        where: { id: post.id },
        data: { content, excerpt, title, coverImage },
      });
      changed++;
      console.log(`[fix-blog-content] patched: ${post.slug}`);
    }
  }
  console.log(`[fix-blog-content] ${changed} of ${posts.length} posts patched.`);
}

main().finally(() => db.$disconnect());
