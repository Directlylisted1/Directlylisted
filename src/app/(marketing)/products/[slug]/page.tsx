import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, productBySlug } from "@/lib/offering-types";
import { FeeDisclosure } from "@/components/FeeDisclosure";
import { PromoVideo } from "@/components/PromoVideo";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  const title = `${product.label} — Directly Listed`;
  return {
    title,
    description: product.blurb,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title, description: product.blurb, url: `/products/${product.slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: product.label,
        description: product.blurb,
        serviceType: "Capital raising and exchange listing services",
        provider: {
          "@type": "Organization",
          name: "Directly Listed",
          url: "https://www.directlylisted.com",
        },
        areaServed: "US",
        url: `https://www.directlylisted.com/products/${product.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Products", item: "https://www.directlylisted.com/products" },
          { "@type": "ListItem", position: 2, name: product.label, item: `https://www.directlylisted.com/products/${product.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-navy-950 px-6 pb-24 pt-40 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {product.audience}
          </div>
          <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-tight">
            {product.label}
          </h1>
          <p className="max-w-2xl text-lg text-white/70">{product.blurb}</p>
          <div className="mt-10 flex gap-4">
            <Link href={`/get-started?product=${product.slug}`} className="btn-primary">
              Request a Quote
            </Link>
            <Link href="/offerings" className="btn-light">See Live Offerings</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto mb-16 max-w-3xl">
          <PromoVideo settingKey="promo_products" title={`${product.label} — Directly Listed`} />
        </div>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">What You Get</h2>
            <ul className="space-y-4">
              {product.highlights.map((h) => (
                <li key={h} className="card flex items-center gap-4 !p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">✓</span>
                  <span className="text-sm font-medium">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-bold">Built Into Every Deal</h2>
            <div className="space-y-4 text-sm leading-relaxed text-navy-900/75">
              <p>
                <strong>Flat-fee engagement.</strong> Directly Listed charges a
                flat platform fee plus an equity grant at signing — quoted
                individually for every deal. No percentage-of-raise surprises.
              </p>
              <p>
                <strong>eSignature execution.</strong> Subscription agreements
                and engagement letters are executed through Adobe Acrobat Sign
                with full audit trails.
              </p>
              <p>
                <strong>Escrow payments.</strong> Investors fund by card for
                amounts under $5,000 (processed by Braintree, a PayPal service)
                and by wire or ACH above that.
              </p>
              <p>
                <strong>Issuer-exemption model.</strong> Directly Listed is a
                technology platform; offerings are conducted by issuers in
                reliance on their own exemptions, with compliance workflows —
                accreditation, investor limits, KYC — built into the software.
              </p>
            </div>
            <div className="mt-6">
              <FeeDisclosure />
            </div>
            <Link href={`/get-started?product=${product.slug}`} className="btn-dark mt-8">
              Scope My Deal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
