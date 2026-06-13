import Link from "next/link";
import { PromoVideo } from "@/components/PromoVideo";

export const metadata = {
  title: "About Us — Directly Listed",
  description:
    "Directly Listed (Adamson Brothers Corp.) is a B2B institutional technology platform for going public without an IPO.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-20 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-5xl font-bold">About Directly Listed</h1>
          <p className="max-w-2xl text-white/70">
            Industry-leading exchange direct listing advisors. We built the
            platform we wished existed: one place to plan an exemption, execute
            documents, onboard investors, process funds, and take a company to
            NASDAQ or NYSE — without the IPO.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-16 max-w-3xl">
          <PromoVideo settingKey="promo_default" title="About Directly Listed" />
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="card !p-8">
            <h2 className="mb-3 text-xl font-bold">Who We Are</h2>
            <p className="text-sm leading-relaxed text-navy-900/75">
              Directly Listed is operated by Adamson Brothers Corp. We are a
              B2B institutional technology platform — not a registered
              broker-dealer, investment advisor, or funding portal. Offerings
              on the platform are conducted by issuers in reliance on their own
              securities exemptions.
            </p>
          </div>
          <div className="card !p-8">
            <h2 className="mb-3 text-xl font-bold">What We Do</h2>
            <p className="text-sm leading-relaxed text-navy-900/75">
              We manage listing readiness, SEC registration and Edgarization,
              exchange applications, and capital raises across Reg D, Reg A+,
              Reg S, PIPE, and institutional equity lines of credit — with
              SEC-licensed attorneys, consultants, and listing advisors paid
              out of one flat fee per deal.
            </p>
          </div>
          <div className="card !p-8">
            <h2 className="mb-3 text-xl font-bold">How We Charge</h2>
            <p className="text-sm leading-relaxed text-navy-900/75">
              Every deal is quoted individually: a flat platform fee plus an
              equity grant at signing, both set by the scope of services and
              your company&apos;s stage. No percentage-of-raise surprises.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/get-started" className="btn-dark">Get Started</Link>
        </div>
      </section>
    </>
  );
}
