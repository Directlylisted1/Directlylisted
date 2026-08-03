// app/(marketing)/faq/[topic]/page.tsx
// -----------------------------------------------------------------------------
// Topic-slug catcher for the FAQ hub. The hub's topics live as sections of
// /faq (single page, expandable questions), but people naturally link to
// /faq/direct-listings, /faq/reg-a-plus, /faq/eloc, and similar variants.
// This route permanently redirects every known slug (and its aliases) to the
// matching section anchor on /faq, so no plausible topic URL dead-ends.
// The static routes /faq/investor and /faq/issuer take precedence over this
// dynamic segment automatically. Unknown slugs return a genuine 404.
// -----------------------------------------------------------------------------

import { permanentRedirect } from "next/navigation";
import { notFound } from "next/navigation";

// alias → canonical section id on /faq
const TOPIC_ALIASES: Record<string, string> = {
  // Direct Exchange Listings
  "direct-listings": "direct-listings",
  "direct-listing": "direct-listings",
  "direct-exchange-listings": "direct-listings",
  "direct-exchange-listing": "direct-listings",
  dpo: "direct-listings",
  // Regulation A+
  "reg-a-plus": "reg-a-plus",
  "reg-a": "reg-a-plus",
  "regulation-a": "reg-a-plus",
  "regulation-a-plus": "reg-a-plus",
  // Regulation D
  "reg-d-506b": "reg-d-506b",
  "reg-d-506-b": "reg-d-506b",
  "regulation-d-506b": "reg-d-506b",
  "506b": "reg-d-506b",
  "reg-d": "reg-d-506b",
  "regulation-d": "reg-d-506b",
  "reg-d-506c": "reg-d-506c",
  "reg-d-506-c": "reg-d-506c",
  "regulation-d-506c": "reg-d-506c",
  "506c": "reg-d-506c",
  // Regulation S
  "reg-s": "reg-s",
  "regulation-s": "reg-s",
  // Section 4(a)(2)
  "section-4a2": "section-4a2",
  "section-4-a-2": "section-4a2",
  "4a2": "section-4a2",
  "section-4a2-private-offerings": "section-4a2",
  "private-offerings": "section-4a2",
  // S-1
  "s-1": "s-1",
  s1: "s-1",
  "s-1-registration-statement": "s-1",
  // Form F-1 / foreign private issuers
  "form-f1": "form-f1",
  "form-f-1": "form-f1",
  "f-1": "form-f1",
  f1: "form-f1",
  "foreign-private-issuers": "form-f1",
  // PIPE
  pipe: "pipe",
  pipes: "pipe",
  "pipe-investments": "pipe",
  // ELOC
  eloc: "eloc",
  "equity-line-of-credit": "eloc",
  "equity-line": "eloc",
  // Private Equity & Hedge Funds
  "private-equity": "private-equity",
  pe: "private-equity",
  "hedge-funds": "hedge-funds",
  "hedge-fund": "hedge-funds",
};

export default async function FaqTopicRedirect({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const canonical = TOPIC_ALIASES[topic.toLowerCase()];
  if (!canonical) notFound();
  permanentRedirect(`/faq#${canonical}`);
}
