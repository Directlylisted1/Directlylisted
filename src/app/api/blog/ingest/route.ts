import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBlogApiToken, tokenMatches, readToken } from "@/lib/blog-api";
import { sanitizeHtml, looksLikeHtml } from "@/lib/sanitize-html";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

async function authorize(req: Request) {
  const configured = await getBlogApiToken();
  if (!configured) {
    return { error: NextResponse.json({ error: "Publishing API not configured. Generate a token in the admin back office." }, { status: 503 }) };
  }
  const presented = readToken(req);
  if (!presented || !tokenMatches(presented, configured)) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { ok: true as const };
}

// Connection test: GET with the token returns ok.
export async function GET(req: Request) {
  const auth = await authorize(req);
  if (auth.error) return auth.error;
  return NextResponse.json({ ok: true, service: "directlylisted-blog", endpoint: "/api/blog/ingest" });
}

// Publish (or update) a blog post. Field names are accepted flexibly so most
// SEO tools (RankChat, etc.) can post without custom mapping.
export async function POST(req: Request) {
  const auth = await authorize(req);
  if (auth.error) return auth.error;

  let body: Record<string, unknown> = {};
  try {
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      body = await req.json();
    } else {
      const form = await req.formData();
      body = Object.fromEntries([...form.entries()]);
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const pick = (...keys: string[]) => {
    for (const k of keys) {
      const v = body[k];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
    return "";
  };

  const title = pick("title", "name", "headline");
  if (!title) return NextResponse.json({ error: "title is required" }, { status: 400 });

  const rawContent = pick("content", "content_html", "html", "body", "post_body", "article");
  const content = looksLikeHtml(rawContent) ? sanitizeHtml(rawContent) : rawContent;
  const excerpt = pick("excerpt", "summary", "description", "meta_description") || null;
  const coverImage = pick("coverImage", "cover_image", "featuredImage", "featured_image", "image", "hero_image") || null;
  const author = pick("author", "byline") || "Directly Listed";

  const tagsRaw = body["tags"] ?? body["keywords"] ?? body["categories"];
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw.join(", ")
    : typeof tagsRaw === "string"
      ? tagsRaw.trim()
      : null;

  const publishedRaw = body["published"] ?? body["publish"] ?? body["status"];
  // Default to published (auto-posting intent); explicit draft/false keeps it hidden.
  const published =
    publishedRaw === false ||
    publishedRaw === "false" ||
    publishedRaw === "draft" ||
    publishedRaw === 0
      ? false
      : true;

  let slug = pick("slug", "permalink") || slugify(title);
  if (!slug) slug = `post-${Date.now().toString(36)}`;

  const data = {
    title,
    excerpt,
    content,
    coverImage,
    author,
    tags,
    published,
    publishedAt: published ? new Date() : null,
  };

  try {
    const existing = await db.blogPost.findUnique({ where: { slug } });
    const post = existing
      ? await db.blogPost.update({
          where: { slug },
          data: { ...data, publishedAt: published ? (existing.publishedAt ?? new Date()) : existing.publishedAt },
        })
      : await db.blogPost.create({ data: { ...data, slug } });

    return NextResponse.json({
      ok: true,
      id: post.id,
      slug: post.slug,
      url: `https://www.directlylisted.com/blog/${post.slug}`,
      updated: Boolean(existing),
      published: post.published,
    });
  } catch (e) {
    console.error("[blog/ingest]", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not save the post" }, { status: 500 });
  }
}
