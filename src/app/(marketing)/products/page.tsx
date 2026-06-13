import Link from "next/link";
import { PRODUCTS } from "@/lib/offering-types";

export const metadata = {
  title: "Products — Directly Listed",
  description:
    "Six regulated paths to capital: Reg D 506(b) and 506(c), Reg A+, NASDAQ and NYSE direct listings, and institutional equity lines of credit.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-20 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-5xl font-bold">Our Product Line</h1>
          <p className="max-w-2xl text-white/70">
            From a private 506(b) round to ringing the bell on NASDAQ or NYSE —
            ten regulated paths to capital, all executed on one platform with
            integrated eSignature, payment processing, and investor management.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-2">
        {PRODUCTS.map((p) => (
          <div key={p.slug} className="card !p-8">
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-600">
              Raise: {p.raiseLimit}
            </div>
            <h2 className="mb-2 text-2xl font-bold">{p.label}</h2>
            <p className="mb-4 text-sm text-navy-900/70">{p.blurb}</p>
            <ul className="mb-6 space-y-2 text-sm text-navy-900/80">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-accent">✓</span> {h}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <Link href={`/products/${p.slug}`} className="btn-dark !py-2.5">Learn More</Link>
              <Link href={`/get-started?product=${p.slug}`} className="btn-outline !py-2.5">
                Get a Quote
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
