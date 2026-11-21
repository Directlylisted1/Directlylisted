// lib/metadata.ts
// -----------------------------------------------------------------------------
// buildMetadata(routeKey) -> Next.js Metadata object.
// Use inside each route's generateMetadata() / exported `metadata`.
// Requires Next.js 13.2+ App Router (Metadata API).
// -----------------------------------------------------------------------------

import type { Metadata } from "next";
import { SITE, AUTHOR, GLOBAL_KEYWORDS, ROUTES, type RouteMeta } from "./seo.config";
import { EXTENDED_SEO_KEYWORDS } from "./seo-keywords";

export function getRoute(routeKey: keyof typeof ROUTES): RouteMeta {
  const r = ROUTES[routeKey];
  if (!r) throw new Error(`Unknown SEO route key: ${String(routeKey)}`);
  return r;
}

// Shared social-card block for pages that build their own metadata (blog
// posts, offerings, non-route products). Every page must carry an image or
// X/Facebook/LinkedIn render a blank card — the blue Directly Listed logo
// card at /opengraph-image is the sitewide default.
export function socialCard(opts: {
  title: string;
  description?: string;
  url: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: opts.type ?? "website",
      siteName: SITE.name,
      title: opts.title,
      description: opts.description,
      url: opts.url,
      locale: SITE.locale,
      ...(opts.type === "article"
        ? { publishedTime: opts.publishedTime, authors: opts.authors }
        : {}),
      images: [
        {
          url: SITE.ogImage,
          width: 1200,
          height: 630,
          alt: opts.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title: opts.title,
      description: opts.description,
      images: [SITE.ogImage],
    },
  };
}

export function buildMetadata(routeKey: keyof typeof ROUTES): Metadata {
  const r = getRoute(routeKey);
  const canonical = `${SITE.url}${r.path === "/" ? "" : r.path}`;

  // Route-specific long-tail first, then global taxonomy, then the extended
  // background keyword set — all deduped (case-insensitively).
  const seen = new Set<string>();
  const keywords: string[] = [];
  for (const k of [...r.keywords, ...GLOBAL_KEYWORDS, ...EXTENDED_SEO_KEYWORDS]) {
    const key = k.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    keywords.push(k);
  }

  return {
    metadataBase: new URL(SITE.url),
    title: r.title,
    description: r.description,
    keywords,
    authors: [{ name: AUTHOR.name }],
    creator: AUTHOR.name,
    publisher: SITE.name,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE.name,
      title: r.title,
      description: r.description,
      locale: SITE.locale,
      images: [
        {
          url: SITE.ogImage,
          width: 1200,
          height: 630,
          alt: r.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title: r.title,
      description: r.description,
      images: [SITE.ogImage],
    },
    other: {
      // Legacy keywords tag + explicit author for crawlers that still read them.
      "article:author": AUTHOR.name,
    },
  };
}
