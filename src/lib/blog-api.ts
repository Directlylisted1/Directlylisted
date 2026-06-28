import "server-only";
import crypto from "crypto";
import { db } from "./db";

// The inbound blog-publishing API token. Stored in site settings (generated from
// the admin back office) with an optional env fallback. Used to authenticate
// external publishers like RankChat that POST articles to /api/blog/ingest.
export const BLOG_API_TOKEN_KEY = "blog_api_token";

export async function getBlogApiToken(): Promise<string | null> {
  const row = await db.siteSetting
    .findUnique({ where: { key: BLOG_API_TOKEN_KEY } })
    .catch(() => null);
  return row?.value || process.env.BLOG_API_TOKEN || null;
}

/** Constant-time comparison of the presented token against the configured one. */
export function tokenMatches(presented: string, configured: string): boolean {
  const a = crypto.createHash("sha256").update(presented).digest();
  const b = crypto.createHash("sha256").update(configured).digest();
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Pull a bearer token from the Authorization header or x-api-key header. */
export function readToken(req: Request): string | null {
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (m) return m[1].trim();
  const k = req.headers.get("x-api-key");
  return k ? k.trim() : null;
}
