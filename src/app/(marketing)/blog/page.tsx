import Link from "next/link";
import { db } from "@/lib/db";

export const metadata = {
  title: "Blog — Directly Listed",
  description:
    "Insights on direct listings, Reg A+, Reg D, ELOCs, and going public without an IPO — with primary-source links to SEC rules and EDGAR filings.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-3 text-5xl font-bold">Blog</h1>
          <p className="max-w-2xl text-white/70">
            Going public, demystified — direct listings, exemptions, and capital
            strategy, sourced straight from SEC rules and EDGAR.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-navy-900/70">No posts yet — check back soon.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p.id}>
                <Link href={`/blog/${p.slug}`} className="card block h-full hover:border-brand-300">
                  <time
                    dateTime={p.publishedAt?.toISOString()}
                    className="text-xs uppercase tracking-wide text-navy-900/60"
                  >
                    {p.publishedAt?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                  <h2 className="mb-2 mt-1 text-xl font-bold">{p.title}</h2>
                  {p.excerpt && <p className="mb-3 text-sm text-navy-900/70">{p.excerpt}</p>}
                  {p.tags && (
                    <div className="flex flex-wrap gap-2">
                      {p.tags.split(",").map((t) => (
                        <span key={t} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand-700">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
