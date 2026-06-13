import Link from "next/link";
import { PromoVideo } from "@/components/PromoVideo";

export const metadata = {
  title: "Campaign Marketing — Directly Listed",
  description:
    "Investor acquisition for your raise: campaign media, funnel analytics, and community-first marketing strategy.",
  alternates: { canonical: "/products/campaign-marketing" },
};

const FEATURES = [
  ["Campaign media manager", "Photos, videos, decks, and documents on your offering page — managed by your team, updated any time."],
  ["Community-first launch", "Activate your customers and earliest supporters before widening the funnel to paid channels."],
  ["Funnel analytics", "See where investors come from, where they drop off, and what converts."],
  ["Compliant promotion", "Marketing aligned to your exemption — general solicitation where permitted, quiet where required."],
  ["Email & retargeting", "Nurture interested investors from first visit to signed subscription."],
  ["Promo video placement", "Featured video slots across the platform to tell your story where investors decide."],
];

export default function CampaignMarketingPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-24 pt-40 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Products
          </div>
          <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-tight">Campaign Marketing</h1>
          <p className="max-w-2xl text-lg text-white/70">
            Your earliest supporters become your loudest advocates — then
            strategic marketing widens the horizon.
          </p>
          <div className="mt-10">
            <Link href="/get-started" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto mb-16 max-w-3xl">
          <PromoVideo settingKey="promo_products" title="Campaign Marketing — Directly Listed" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map(([t, b]) => (
            <div key={t} className="card !p-7">
              <h2 className="mb-2 text-lg font-bold">{t}</h2>
              <p className="text-sm text-navy-900/75">{b}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
