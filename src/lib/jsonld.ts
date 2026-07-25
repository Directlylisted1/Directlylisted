// lib/jsonld.ts
// -----------------------------------------------------------------------------
// JSON-LD graph builders. Each returns a plain object you stringify into a
// <script type="application/ld+json"> tag (see components/seo/JsonLd.tsx).
// -----------------------------------------------------------------------------

import { SITE, AUTHOR, ROUTES, type RouteMeta } from "./seo.config";
import { EXTENDED_SEO_KEYWORDS } from "./seo-keywords";
import { HOME_FAQ } from "./faq.home";

const ORG_ID = `${SITE.url}/#org`;
const PERSON_ID = `${SITE.url}/#andy-altahawi`;
const WEBSITE_ID = `${SITE.url}/#website`;

// The ten products, in the site's "Ten Ways To Raise" order.
const OFFER_CATALOG = [
  { key: "reg-d-506b", name: "Regulation D 506(b)" },
  { key: "reg-d-506c", name: "Regulation D 506(c)" },
  { key: "reg-a-plus", name: "Regulation A+ (up to $75M/year)" },
  { key: "reg-s", name: "Regulation S" },
  { key: "pipe", name: "PIPE (Post-Listing)" },
  { key: "nasdaq-conventional-listing", name: "NASDAQ Conventional Listing" },
  { key: "nasdaq-direct-listing", name: "NASDAQ Direct Listing" },
  { key: "nyse-conventional-listing", name: "NYSE Conventional Listing" },
  { key: "nyse-direct-listing", name: "NYSE Direct Listing" },
  { key: "eloc", name: "Equity Line of Credit (ELOC)" },
] as const;

// ---- Reusable node fragments -------------------------------------------------

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: SITE.logo,
    email: SITE.email,
    telephone: SITE.telephone,
    description:
      "An end-to-end institutional platform for direct exchange listings and capital raising — NASDAQ and NYSE direct and conventional listings, Regulation A+, Regulation D 506(b)/506(c), Regulation S, PIPE, and equity lines of credit.",
    founder: { "@id": PERSON_ID },
    sameAs: SITE.sameAs,
  };
}

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    worksFor: { "@id": ORG_ID },
    knowsAbout: AUTHOR.knowsAbout,
    url: SITE.url,
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": ORG_ID },
    // Background keyword taxonomy for traditional + AI search discovery.
    keywords: EXTENDED_SEO_KEYWORDS.join(", "),
  };
}

export function serviceCatalogNode() {
  return {
    "@type": "Service",
    name: "Direct Exchange Listing & Capital Raising",
    provider: { "@id": ORG_ID },
    serviceType: "Going public, direct listing, and securities offering advisory",
    areaServed: "US",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ten Ways to Raise Capital",
      itemListElement: OFFER_CATALOG.map((o) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: o.name,
          url: `${SITE.url}${ROUTES[o.key].path}`,
        },
      })),
    },
  };
}

// ---- Top-level graphs --------------------------------------------------------

// Site-wide graph — render once in the root layout.
export function rootGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      personNode(),
      websiteNode(),
      serviceCatalogNode(),
    ],
  };
}

// Per-product graph — render in each product page.
export function productGraph(routeKey: keyof typeof ROUTES) {
  const r: RouteMeta = ROUTES[routeKey];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: r.title.split(" — ")[0].split(" | ")[0].trim(),
    description: r.definition,
    url: `${SITE.url}${r.path}`,
    provider: { "@id": ORG_ID },
    areaServed: "US",
    serviceType: "Securities offering and exchange listing advisory",
    author: { "@id": PERSON_ID },
  };
}

// FAQ graph — render on the homepage. Sourced from lib/faq.home.ts so the
// schema matches the visible on-page FAQ word for word.
export function faqGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// BreadcrumbList graph — render in product pages for richer SERP/AI context.
export function breadcrumbGraph(routeKey: keyof typeof ROUTES) {
  const r = ROUTES[routeKey];
  const productName = r.title.split(" — ")[0].split(" | ")[0].trim();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE.url}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: productName,
        item: `${SITE.url}${r.path}`,
      },
    ],
  };
}
