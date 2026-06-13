import Link from "next/link";
import { PromoVideo } from "@/components/PromoVideo";

export const metadata = {
  title: "Investor Services — Directly Listed",
  description:
    "Shareholder services for issuers: investor relations, communications, accreditation verification, and transfer agent coordination.",
  alternates: { canonical: "/products/investor-services" },
};

const FEATURES = [
  ["Accreditation verification", "Questionnaires plus 506(c)-grade verification review, tracked per investor in the back office."],
  ["Investor relations", "Keep subscribers informed from first commitment through closing and beyond."],
  ["Shareholder services", "Cap-table-ready records of every subscription, countersignature, and payment."],
  ["Transfer agent & DTC coordination", "We coordinate with your transfer agent and DTC so settlement is ready when you list."],
  ["Investor support", "A clear portal for investors to track documents, payments, and closing status — fewer support emails for you."],
  ["Compliance workflows", "Eligibility gating, investment limits, and KYC/AML checks matched to your exemption."],
];

export default function InvestorServicesPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-24 pt-40 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Products
          </div>
          <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-tight">Investor Services</h1>
          <p className="max-w-2xl text-lg text-white/70">
            Win investors once, keep them for every raise — onboarding,
            verification, and shareholder care handled on platform.
          </p>
          <div className="mt-10">
            <Link href="/get-started" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto mb-16 max-w-3xl">
          <PromoVideo settingKey="promo_products" title="Investor Services — Directly Listed" />
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
