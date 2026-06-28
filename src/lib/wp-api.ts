import "server-only";
import crypto from "crypto";
import { db } from "./db";
import type { BlogPost } from "@prisma/client";
import { sanitizeHtml, looksLikeHtml } from "./sanitize-html";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

/** WordPress fields can be a string or an object like { raw, rendered }. */
export function wpText(v: unknown): string {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") {
    const o = v as { raw?: string; rendered?: string };
    return o.raw ?? o.rendered ?? "";
  }
  return "";
}

// WordPress REST API compatibility layer. External tools (RankChat's WordPress
// connector) authenticate with an "Application Password" over HTTP Basic auth:
//   Authorization: Basic base64("username:application password")
// Credentials are generated/managed from the admin back office.

export const WP_USERNAME_KEY = "wp_username";
export const WP_APP_PASSWORD_KEY = "wp_app_password";
export const SITE_URL = "https://www.directlylisted.com";

export async function getWpCreds(): Promise<{ username: string; appPassword: string | null }> {
  const rows = await db.siteSetting
    .findMany({ where: { key: { in: [WP_USERNAME_KEY, WP_APP_PASSWORD_KEY] } } })
    .catch(() => [] as { key: string; value: string }[]);
  const get = (k: string) => rows.find((r) => r.key === k)?.value;
  return {
    username: get(WP_USERNAME_KEY) || process.env.WP_API_USERNAME || "directlylisted",
    appPassword: get(WP_APP_PASSWORD_KEY) || process.env.WP_API_APP_PASSWORD || null,
  };
}

// WordPress application passwords are shown grouped with spaces; clients may send
// them with or without the spaces — normalize before comparing.
const norm = (s: string) => s.replace(/\s+/g, "");

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return ha.length === hb.length && crypto.timingSafeEqual(ha, hb);
}

/** Validate HTTP Basic auth against the configured WP application password. */
export async function checkWpAuth(req: Request): Promise<boolean> {
  const { username, appPassword } = await getWpCreds();
  if (!appPassword) return false;
  const header = req.headers.get("authorization") || "";
  const m = header.match(/^Basic\s+(.+)$/i);
  if (!m) return false;
  let decoded = "";
  try {
    decoded = Buffer.from(m[1], "base64").toString("utf8");
  } catch {
    return false;
  }
  const idx = decoded.indexOf(":");
  if (idx === -1) return false;
  const user = decoded.slice(0, idx);
  const pass = decoded.slice(idx + 1);
  return (
    user.toLowerCase() === username.toLowerCase() &&
    safeEqual(norm(pass), norm(appPassword))
  );
}

export function wpUnauthorized() {
  return new Response(
    JSON.stringify({ code: "rest_not_logged_in", message: "Invalid authentication credentials.", data: { status: 401 } }),
    { status: 401, headers: { "Content-Type": "application/json", "WWW-Authenticate": 'Basic realm="WordPress"' } },
  );
}

/** Get (or lazily create) the WordPress-style integer id for a blog post. */
export async function refIdForPost(postId: string): Promise<number> {
  const existing = await db.wpPostRef.findUnique({ where: { postId } });
  if (existing) return existing.id;
  const created = await db.wpPostRef.create({ data: { postId } });
  return created.id;
}

/** Create or update a blog post from a WordPress REST payload. */
export async function savePostFromWp(
  body: Record<string, unknown>,
  opts: { postId?: string } = {},
): Promise<BlogPost> {
  const title = wpText(body.title).trim();
  const rawContent = wpText(body.content);
  const content = looksLikeHtml(rawContent) ? sanitizeHtml(rawContent) : rawContent;
  const excerpt = wpText(body.excerpt).trim() || null;

  // featured_media id → resolved upload URL (cover image).
  let coverImage: string | null | undefined = undefined;
  const fm = Number(body.featured_media);
  if (Number.isInteger(fm) && fm > 0) {
    const media = await db.wpMedia.findUnique({ where: { id: fm } });
    if (media) coverImage = media.url;
  }

  const status = String(body.status ?? "publish");
  const published = !["draft", "pending", "future", "private", "trash"].includes(status);

  const data: Record<string, unknown> = { title, content, excerpt };
  if (coverImage !== undefined) data.coverImage = coverImage;

  if (opts.postId) {
    const current = await db.blogPost.findUnique({ where: { id: opts.postId } });
    return db.blogPost.update({
      where: { id: opts.postId },
      data: {
        ...data,
        published,
        publishedAt: published ? (current?.publishedAt ?? new Date()) : current?.publishedAt ?? null,
      },
    });
  }

  // Slug: explicit, else from title.
  let slug = (typeof body.slug === "string" && body.slug.trim()) || slugify(title);
  if (!slug) slug = `post-${Date.now().toString(36)}`;
  const clash = await db.blogPost.findUnique({ where: { slug } });
  if (clash) {
    // Same slug → update it (idempotent re-posts); else uniquify.
    return db.blogPost.update({
      where: { slug },
      data: { ...data, published, publishedAt: published ? (clash.publishedAt ?? new Date()) : clash.publishedAt },
    });
  }
  return db.blogPost.create({
    data: {
      slug,
      title,
      content,
      excerpt,
      coverImage: (coverImage as string | null) ?? null,
      author: "Directly Listed",
      published,
      publishedAt: published ? new Date() : null,
    },
  });
}

/** Shape a BlogPost into a WordPress REST API post object. */
export async function toWpPost(post: BlogPost) {
  const id = await refIdForPost(post.id);
  const date = (post.publishedAt ?? post.createdAt).toISOString().replace("Z", "");
  return {
    id,
    date,
    date_gmt: date,
    guid: { rendered: `${SITE_URL}/blog/${post.slug}` },
    modified: post.updatedAt.toISOString().replace("Z", ""),
    modified_gmt: post.updatedAt.toISOString().replace("Z", ""),
    slug: post.slug,
    status: post.published ? "publish" : "draft",
    type: "post",
    link: `${SITE_URL}/blog/${post.slug}`,
    title: { rendered: post.title, raw: post.title },
    content: { rendered: post.content, raw: post.content, protected: false },
    excerpt: { rendered: post.excerpt ?? "", raw: post.excerpt ?? "", protected: false },
    author: 1,
    featured_media: 0,
    categories: [] as number[],
    tags: [] as number[],
  };
}
