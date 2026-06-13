import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { PRODUCTS } from "@/lib/offering-types";

const SITE = "https://www.directlylisted.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/products",
    "/products/capital-raise-tech",
    "/products/investor-services",
    "/products/campaign-marketing",
    "/raise-capital",
    "/offerings",
    "/blog",
    "/about",
    "/guides",
    "/guides/new-capital-stack",
    "/case-studies",
    "/faq/issuer",
    "/faq/investor",
    "/get-started",
    "/contact",
    "/disclaimer",
    "/privacy-policy",
    "/terms-of-use",
  ].map((p) => ({ url: `${SITE}${p}`, changeFrequency: "weekly" as const }));

  const productPages = PRODUCTS.map((p) => ({
    url: `${SITE}/products/${p.slug}`,
    changeFrequency: "monthly" as const,
  }));

  const [offerings, posts] = await Promise.all([
    db.offering.findMany({ where: { status: { in: ["LIVE", "CLOSED"] } } }).catch(() => []),
    db.blogPost.findMany({ where: { published: true } }).catch(() => []),
  ]);

  return [
    ...staticPages,
    ...productPages,
    ...offerings.map((o) => ({
      url: `${SITE}/offerings/${o.slug}`,
      lastModified: o.updatedAt,
      changeFrequency: "daily" as const,
    })),
    ...posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
    })),
  ];
}
