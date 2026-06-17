import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { MarkdownLite } from "@/components/Markdown";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } }).catch(() => null);
  if (!post || !post.published) return { title: "Blog — Directly Listed" };
  return {
    title: `${post.title} — Directly Listed`,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } }).catch(() => null);
  if (!post || !post.published) notFound();

  // Article structured data so search and AI engines can attribute the post.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Directly Listed",
      url: "https://www.directlylisted.com",
    },
    mainEntityOfPage: `https://www.directlylisted.com/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-navy-950 px-6 pb-14 pt-36 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="text-sm text-accent">← All posts</Link>
          <h1 className="mt-3 text-4xl font-bold leading-tight">{post.title}</h1>
          <p className="mt-4 text-sm text-white/70">
            {post.author} ·{" "}
            <time dateTime={post.publishedAt?.toISOString()}>
              {post.publishedAt?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </p>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-6 py-14">
        <MarkdownLite content={post.content} />
        <hr className="my-10 border-navy-900/10" />
        <p className="text-xs leading-relaxed text-navy-900/60">
          This post is provided for informational purposes only and is not
          investment advice or a solicitation. See our{" "}
          <Link href="/disclaimer" className="font-semibold text-brand-600">Disclaimer</Link>,{" "}
          <Link href="/terms-of-use" className="font-semibold text-brand-600">Terms of Use</Link>, and{" "}
          <Link href="/privacy-policy" className="font-semibold text-brand-600">Privacy Policy</Link>.
        </p>
      </article>
    </>
  );
}
