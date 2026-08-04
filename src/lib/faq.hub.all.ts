// lib/faq.hub.all.ts
// -----------------------------------------------------------------------------
// The final, ordered FAQ hub topic list: generated topics (faq.hub.ts) merged
// with hand-written extras (faq.hub.extras.ts) plus the hand-written Hedge
// Funds topic. Single source of truth for the /faq page and the homepage
// "Browse the complete FAQ" directory, so question counts always agree.
// -----------------------------------------------------------------------------

import { HUB_TOPICS, type HubTopic } from "@/lib/faq.hub";
import { HEDGE_FUNDS_TOPIC } from "@/lib/faq.hub.hedge-funds";
import { DIRECT_LISTING_EXTRAS } from "@/lib/faq.hub.extras";

// Page order per the site's "Twelve Ways To Raise" framing: listings first, then
// exempt offerings, then registration statements, then post-listing capital,
// then the institutional-investor topics.
const TOPIC_ORDER = [
  "direct-listings",
  "reg-a-plus",
  "reg-d-506b",
  "reg-d-506c",
  "reg-s",
  "section-4a2",
  "s-1",
  "form-f1",
  "pipe",
  "eloc",
  "private-equity",
] as const;

// Merge hand-written extras (preserved homepage questions) into the generated
// direct-listings topic, appending to the matching section.
function withExtras(topic: HubTopic): HubTopic {
  if (topic.id !== "direct-listings") return topic;
  return {
    ...topic,
    sections: topic.sections.map((s) => {
      const extra = DIRECT_LISTING_EXTRAS.find((e) => e.sectionTitle === s.title);
      return extra ? { ...s, items: [...s.items, ...extra.items] } : s;
    }),
  };
}

export const ALL_FAQ_TOPICS: HubTopic[] = [
  ...TOPIC_ORDER.map((id) => {
    const t = HUB_TOPICS.find((x) => x.id === id);
    if (!t) throw new Error(`FAQ hub topic missing from generated data: ${id}`);
    return withExtras(t);
  }),
  HEDGE_FUNDS_TOPIC,
];

export const topicQuestionCount = (t: HubTopic): number =>
  t.sections.reduce((m, s) => m + s.items.length, 0);

export const FAQ_TOTAL_QUESTIONS: number = ALL_FAQ_TOPICS.reduce(
  (n, t) => n + topicQuestionCount(t),
  0,
);
