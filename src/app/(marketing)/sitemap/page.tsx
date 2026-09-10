// app/(marketing)/sitemap/page.tsx
// -----------------------------------------------------------------------------
// Human-readable HTML site map at /sitemap (the machine-readable XML version
// lives at /sitemap.xml via app/sitemap.ts). Lists every section of the site
// with real links — useful for visitors, and one more layer of internal
// linking for crawlers. Blog posts are read from the database at request time
// so the page stays current without edits.
// -----------------------------------------------------------------------------

import Link from "next/link";
import { db } from "@/lib/db";
import { PRODUCTS } from "@/lib/offering-types";
import { ALL_FAQ_TOPICS } from "@/lib/faq.hub.all";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Site Map — Directly Listed",
  description:
    "Every page on Directly Listed in one place — the twelve ways to raise, FAQs, guides, blog, offerings, and company pages.",
  alternates: { canonical: "/sitemap" },
};

const CORE_PAGES: Array<[string, string]> = [
  ["Home", "/"],
  ["About Directly Listed", "/about"],
  ["Raise Capital", "/raise-capital"],
  ["Live Offerings", "/offerings"],
  ["Current Deals & Case Studies", "/case-studies"],
  ["Guides", "/guides"],
  ["The New Capital Stack (guide)", "/guides/new-capital-stack"],
  ["Blog/Vlog", "/blog"],
  ["Andy Altahawi — Gallery", "/gallery"],
  ["Regulatory History", "/regulatory-history"],
  ["Andy Altahawi — Public SEC Comments", "/sec-comments"],
  ["Book a Call", "/book"],
  ["Get Started", "/get-started"],
  ["Contact Us", "/contact"],
];

const PLATFORM_PAGES: Array<[string, string]> = [
  ["Capital Raise Tech", "/products/capital-raise-tech"],
  ["Investor Services", "/products/investor-services"],
  ["Campaign Marketing", "/products/campaign-marketing"],
  ["Family Offices, VC, PE & Hedge Funds", "/strategic-investors"],
];

const LEGAL_PAGES: Array<[string, string]> = [
  ["Terms of Use", "/terms-of-use"],
  ["Privacy Policy", "/privacy-policy"],
  ["Disclaimer", "/disclaimer"],
];

const LANGUAGES: Array<[string, string]> = [
  ["Español", "https://es.directlylisted.com/"],
  ["العربية", "https://ar.directlylisted.com/"],
  ["Français", "https://fr.directlylisted.com/"],
  ["Português (BR)", "https://pt-br.directlylisted.com/"],
  ["中文", "https://zh.directlylisted.com/"],
];

function LinkList({ items }: { items: Array<[string, string]> }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map(([label, href]) =>
        href.startsWith("http") ? (
          <li key={href}>
            <a href={href} className="font-medium text-brand-600 hover:underline">
              {label}
            </a>
          </li>
        ) : (
          <li key={href}>
            <Link href={href} className="font-medium text-brand-600 hover:underline">
              {label}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}

export default async function HtmlSitemapPage() {
  const posts = await db.blogPost
    .findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: { slug: true, title: true },
    })
    .catch(() => []);

  return (
    <>
      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-3 text-5xl font-bold">Site Map</h1>
          <p className="max-w-3xl text-white/70">
            Every page on Directly Listed, in one place. The machine-readable
            version for search engines is at{" "}
            <a href="/sitemap.xml" className="font-semibold text-accent hover:underline">
              /sitemap.xml
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="mb-4 text-xl font-bold">Company & Core Pages</h2>
            <LinkList items={CORE_PAGES} />
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">Twelve Ways To Raise</h2>
            <LinkList
              items={PRODUCTS.map((p) => [p.label, `/products/${p.slug}`] as [string, string])}
            />
            <h2 className="mb-4 mt-10 text-xl font-bold">Platform</h2>
            <LinkList items={[["Our Product Line", "/products"], ...PLATFORM_PAGES]} />
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">FAQs</h2>
            <LinkList
              items={[
                ["Complete FAQ — All Topics", "/faq"],
                ["Issuer FAQ", "/faq/issuer"],
                ["Investor FAQ", "/faq/investor"],
                ...ALL_FAQ_TOPICS.map(
                  (t) => [`FAQ: ${t.title}`, `/faq#${t.id}`] as [string, string],
                ),
              ]}
            />
            <h2 className="mb-4 mt-10 text-xl font-bold">Legal</h2>
            <LinkList items={LEGAL_PAGES} />
            <h2 className="mb-4 mt-10 text-xl font-bold">Languages</h2>
            <LinkList items={LANGUAGES} />
          </div>
        </div>

        {posts.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-4 text-xl font-bold">Blog Articles ({posts.length})</h2>
            <ul className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="font-medium text-brand-600 hover:underline"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
