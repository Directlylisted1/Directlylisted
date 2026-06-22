// lib/metadata.ts
// -----------------------------------------------------------------------------
// buildMetadata(routeKey) -> Next.js Metadata object.
// Use inside each route's generateMetadata() / exported `metadata`.
// Requires Next.js 13.2+ App Router (Metadata API).
// -----------------------------------------------------------------------------

import type { Metadata } from "next";
import { SITE, AUTHOR, GLOBAL_KEYWORDS, ROUTES, type RouteMeta } from "./seo.config";

export function getRoute(routeKey: keyof typeof ROUTES): RouteMeta {
  const r = ROUTES[routeKey];
  if (!r) throw new Error(`Unknown SEO route key: ${String(routeKey)}`);
  return r;
}

export function buildMetadata(routeKey: keyof typeof ROUTES): Metadata {
  const r = getRoute(routeKey);
  const canonical = `${SITE.url}${r.path === "/" ? "" : r.path}`;

  // Route-specific long-tail first, then global taxonomy (deduped).
  const keywords = Array.from(new Set([...r.keywords, ...GLOBAL_KEYWORDS]));

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
