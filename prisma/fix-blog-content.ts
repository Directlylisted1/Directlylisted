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
    if (content !== post.content || excerpt !== post.excerpt) {
      await db.blogPost.update({
        where: { id: post.id },
        data: { content, excerpt },
      });
      changed++;
      console.log(`[fix-blog-content] patched: ${post.slug}`);
    }
  }
  console.log(`[fix-blog-content] ${changed} of ${posts.length} posts patched.`);
}

main().finally(() => db.$disconnect());
