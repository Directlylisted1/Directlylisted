import Link from "next/link";
import { PromoVideo } from "@/components/PromoVideo";

export const metadata = {
  title: "Capital Raise Tech — Directly Listed",
  description:
    "The technology stack behind every raise: branded offering pages, investor onboarding, eSignature, payments, and real-time dashboards.",
  alternates: { canonical: "/products/capital-raise-tech" },
};

const FEATURES = [
  ["Branded offering pages", "A conversion-focused page for your deal with its own Invest Now flow — embeddable on your existing website."],
  ["Investor onboarding", "Accreditation questionnaires, eligibility gating per exemption, and KYC workflows built into the funnel."],
  ["eSignature", "Subscription agreements executed through Adobe Acrobat Sign with complete audit trails and countersignature at closing."],
  ["Payments", "Card payments under $5,000 via Braintree (a PayPal service); wire and ACH with per-subscription reference codes above."],
  ["Real-time dashboards", "Raise progress, subscription status, document status, and payment reconciliation in one back office."],
  ["SEC filings & Edgarization", "S-1, Reg A+ circulars, and exemption filings prepared and EDGARized by specialists paid from your flat fee."],
];

export default function CapitalRaiseTechPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-24 pt-40 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Products
          </div>
          <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-tight">Capital Raise Tech</h1>
          <p className="max-w-2xl text-lg text-white/70">
            Everything your raise runs on — from the first page view to funds
            received — in one platform.
          </p>
          <div className="mt-10">
            <Link href="/get-started" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto mb-16 max-w-3xl">
          <PromoVideo settingKey="promo_products" title="Capital Raise Tech — Directly Listed" />
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
