import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, productBySlug } from "@/lib/offering-types";
import { FeeDisclosure } from "@/components/FeeDisclosure";
import { PromoVideo } from "@/components/PromoVideo";
import { listingInfo } from "@/lib/listing-info";
import { ElocTermSheet } from "@/components/ElocTermSheet";
import { raiseInfo } from "@/lib/raise-capital-info";

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

  const listing = listingInfo(slug);
  const raise = raiseInfo(slug);

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
            {listing ? (
              <ul className="space-y-4">
                {listing.whatYouGet.map((item) => (
                  <li key={item.title} className="card flex gap-4 !p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">✓</span>
                    <span>
                      <span className="block text-sm font-bold">{item.title}</span>
                      <span className="mt-0.5 block text-sm text-navy-900/70">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-4">
                {product.highlights.map((h) => (
                  <li key={h} className="card flex items-center gap-4 !p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">✓</span>
                    <span className="text-sm font-medium">{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-bold">Built Into Every Deal</h2>
            {listing ? (
              <>
                <div className="space-y-4 text-sm leading-relaxed text-navy-900/75">
                  <p>
                    <strong>Flat-fee engagement.</strong> Directly Listed charges
                    a flat platform fee plus an equity grant at signing — quoted
                    individually for every deal. No percentage-of-raise according
                    to the rules.
                  </p>
                  <p>
                    <strong>eSignature execution.</strong> Subscription agreements
                    and engagement letters are executed through Adobe Acrobat Sign
                    with full audit trails.
                  </p>
                  <p>
                    <strong>Payments.</strong> Investors&apos; funds are routed
                    directly to the issuer — by card for amounts under $5,000 and
                    by wire or ACH above that.
                  </p>
                  <p>
                    <strong>Issuer-exemption model.</strong> Directly Listed is a
                    technology platform; offerings are conducted by issuers in
                    reliance on their own exemptions, with compliance workflows —
                    accreditation, investor limits, KYC — built into the software.
                  </p>
                </div>
                <div className="mt-6 rounded-2xl border border-navy-900/10 bg-brand-50 p-6 text-sm leading-relaxed text-navy-900/80">
                  <h3 className="mb-2 text-base font-bold text-navy-900">Flat Fee Disclosure</h3>
                  <p className="mb-2">
                    Our SEC-licensed attorneys, listing consultants, and listing
                    advisors are all paid out of the flat fee we charge. There are
                    no separate legal bills—only third-party costs, such as legal
                    opinions, valuation reports, audits, transfer agent and DTC
                    fees, exchange application fees, and any annual exchange fees,
                    which are paid directly by the issuer.
                  </p>
                  <p>
                    The flat fee is determined by the scope of services provided
                    and your company&apos;s stage, along with an equity grant that
                    is likewise set according to your startup&apos;s stage and
                    needs. Every deal is quoted individually.
                  </p>
                </div>
              </>
            ) : (
              <>
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
                    <strong>Payments.</strong> Investors fund by card for
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
              </>
            )}
            <Link href={`/get-started?product=${product.slug}`} className="btn-dark mt-8">
              Scope My Deal
            </Link>
          </div>
        </div>
      </section>

      {raise && (
        <section className="bg-brand-50/40 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-4 text-3xl font-bold">{raise.headline}</h2>
            <p className="mb-8 max-w-3xl text-navy-900/80">{raise.overview}</p>

            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-navy-900/70">
              At a glance
            </h3>
            <ul className="mb-12 grid gap-3 sm:grid-cols-2">
              {raise.keyPoints.map((p) => (
                <li key={p} className="card flex items-center gap-3 !p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">✓</span>
                  <span className="text-sm font-medium">{p}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-8">
              {raise.sections.map((s) => (
                <div key={s.title}>
                  <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
                  <p className="max-w-3xl text-sm leading-relaxed text-navy-900/75">{s.body}</p>
                </div>
              ))}
            </div>

            {raise.checklist && (
              <div className="mt-10 rounded-2xl border border-navy-900/10 bg-white p-6">
                <h3 className="mb-3 text-xl font-bold">{raise.checklist.title}</h3>
                <ul className="space-y-2">
                  {raise.checklist.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-navy-900/80">
                      <span className="text-accent">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-8 text-xs leading-relaxed text-navy-900/60">
              This summary is provided for general information only and is not
              legal, tax, or investment advice. Offerings are conducted by issuers
              in reliance on their own exemptions; confirm current requirements
              with qualified counsel.
            </p>
          </div>
        </section>
      )}

      {slug === "eloc" && <ElocTermSheet />}

      {listing && (
        <section className="bg-brand-50/40 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-2 text-3xl font-bold">{listing.requirementsHeadline}</h2>
            <p className="mb-10 max-w-3xl text-sm text-navy-900/70">{listing.requirementsIntro}</p>

            <div className="space-y-10">
              {listing.requirements.map((t) => (
                <div key={t.title}>
                  <h3 className="mb-1 text-xl font-bold">{t.title}</h3>
                  {t.intro && <p className="mb-3 max-w-3xl text-sm text-navy-900/70">{t.intro}</p>}
                  <div className="card overflow-x-auto !p-0">
                    <table className="w-full text-sm">
                      <thead className="border-b border-navy-900/10 bg-white text-left text-xs uppercase text-navy-900/70">
                        <tr>
                          {t.headers.map((h) => (
                            <th key={h} scope="col" className="px-4 py-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {t.rows.map((row) => (
                          <tr key={row[0]} className="border-b border-navy-900/5">
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className={ci === 0 ? "px-4 py-3 font-medium" : "px-4 py-3 text-navy-900/80"}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {t.note && <p className="mt-2 text-xs text-navy-900/60">{t.note}</p>}
                </div>
              ))}
            </div>

            {/* Full official guide attached */}
            <div className="mt-14">
              <h3 className="mb-3 text-xl font-bold">Full Official Guide</h3>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <a href={listing.pdf.href} target="_blank" rel="noopener noreferrer" className="btn-dark !py-2.5 text-sm">
                  Open {listing.pdf.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a href={listing.pdf.href} download className="btn-outline !py-2.5 text-sm">
                  Download PDF
                </a>
              </div>
              <iframe
                src={listing.pdf.href}
                title={listing.pdf.label}
                className="h-[800px] w-full rounded-2xl border border-navy-900/10"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
