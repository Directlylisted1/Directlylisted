import Link from "next/link";
import { PRODUCTS } from "@/lib/offering-types";
import { FeeDisclosure } from "@/components/FeeDisclosure";

export const metadata = { title: "Raise Capital — Directly Listed" };

export default function RaiseCapitalPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-20 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 max-w-3xl text-5xl font-bold leading-tight">
            Raise Capital On Your Terms
          </h1>
          <p className="max-w-2xl text-white/70">
            Whether you&apos;re raising your first private round or listing on a
            national exchange, your deal gets a dedicated strategy, a flat-fee
            quotation, and a platform that runs the whole raise.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-3xl font-bold">How An Engagement Works</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Tell us about your deal", "Share your company, capital target, and timeline through our intake form."],
            ["Receive your quotation", "A flat platform fee + equity grant at signing, quoted per deal. Sign via Acrobat Sign."],
            ["Launch on the platform", "Your offering page goes live with investor onboarding, eSign, and integrated payments."],
            ["Close and beyond", "Countersign subscriptions, reconcile funds, and pair with an ELOC for capital on demand."],
          ].map(([t, b], i) => (
            <div key={t} className="card">
              <div className="mb-3 text-4xl font-black text-brand-200">0{i + 1}</div>
              <h3 className="mb-2 font-bold">{t}</h3>
              <p className="text-sm text-navy-900/70">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-3xl">
          <FeeDisclosure />
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="rounded-full border border-navy-900/15 px-4 py-2 text-sm font-medium hover:border-brand-500 hover:text-brand-600"
            >
              {p.shortLabel}
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <Link href="/get-started" className="btn-dark">Request Your Quote</Link>
        </div>
      </section>
    </>
  );
}
