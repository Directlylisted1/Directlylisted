// lib/jsonld.ts
// -----------------------------------------------------------------------------
// JSON-LD graph builders. Each returns a plain object you stringify into a
// <script type="application/ld+json"> tag (see components/seo/JsonLd.tsx).
// -----------------------------------------------------------------------------

import { SITE, AUTHOR, ROUTES, type RouteMeta } from "./seo.config";
import { EXTENDED_SEO_KEYWORDS } from "./seo-keywords";

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

// FAQ graph — render on the homepage and/or a dedicated FAQ route.
export function faqGraph() {
  const qa: Array<[string, string]> = [
    [
      "What is a direct listing and how is it different from an IPO?",
      "A direct listing lets a company go public on NASDAQ or the NYSE without a traditional underwritten IPO and without the dilution of new underwritten shares. Directly Listed manages listing readiness, SEC registration, Edgarization, and the exchange application end to end.",
    ],
    [
      "How much can I raise under Regulation A+?",
      "Under Regulation A+ Tier 2 you can raise up to $75 million per 12-month period from both accredited and non-accredited investors — a mini-IPO open to the public.",
    ],
    [
      "What is the difference between Reg D 506(b) and 506(c)?",
      "Reg D 506(b) allows an unlimited private raise from investors you already know with no general solicitation and self-certified accreditation. Reg D 506(c) lets you advertise publicly and accept unlimited capital from accredited investors whose status is verified.",
    ],
    [
      "What is an Equity Line of Credit (ELOC)?",
      "An ELOC is a committed standby equity facility from institutional investors that lets a public company draw capital when it needs it, on its own timeline — up to $350M in committed capital after listing.",
    ],
    [
      "Can I list on NASDAQ or NYSE without an IPO?",
      "Yes. Directly Listed offers both NASDAQ and NYSE direct listings (no underwriters) and conventional listings with a registered primary offering, so you can raise new capital as you go public.",
    ],
    [
      "Who can invest in a Regulation D 506(c) offering?",
      "Only verified accredited investors can invest in a Reg D 506(c) offering, but you may advertise the raise publicly and accept an unlimited amount of capital.",
    ],
    [
      "What is a PIPE and when is it used?",
      "A PIPE (private investment in public equity) is institutional capital placed directly into a company after it lists, at a negotiated price — commonly used for post-listing growth capital.",
    ],
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(([q, a]) => ({
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
