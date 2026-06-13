import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { fmtMoney, productByType } from "@/lib/offering-types";
import { getCurrentUser } from "@/lib/session";
import { toEmbedUrl } from "@/lib/video";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offering = await db.offering.findUnique({ where: { slug } });
  if (!offering || offering.status === "DRAFT") return {};
  const title = `${offering.name} — Live Offering`;
  const description =
    offering.tagline ?? offering.description?.slice(0, 160) ?? undefined;
  return {
    title: `${title} — Directly Listed`,
    description,
    alternates: { canonical: `/offerings/${offering.slug}` },
    openGraph: { title, description, url: `/offerings/${offering.slug}` },
  };
}

export default async function OfferingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offering = await db.offering.findUnique({
    where: { slug },
    include: {
      issuer: true,
      documents: true,
      assets: { orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] },
    },
  });
  if (!offering || offering.status === "DRAFT") notFound();
  const gallery = offering.assets.filter((a) => a.kind === "IMAGE");
  const videos = offering.assets.filter((a) => a.kind === "VIDEO_LINK");
  const materials = offering.assets.filter((a) =>
    ["DOCUMENT", "PRESENTATION", "OTHER"].includes(a.kind),
  );
  const user = await getCurrentUser();
  const product = productByType(offering.type);
  const pct =
    offering.targetAmount > 0
      ? Math.min(100, (offering.raisedAmount / offering.targetAmount) * 100)
      : 0;

  return (
    <>
      <section
        className="px-6 pb-20 pt-40 text-white"
        style={{ background: `linear-gradient(160deg, ${offering.heroColor} 0%, #061629 90%)` }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_380px]">
          <div>
            <span className="mb-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
              {product.label}
            </span>
            <h1 className="mb-3 text-5xl font-bold">{offering.name}</h1>
            <p className="mb-6 text-xl text-white/80">{offering.tagline}</p>
            <p className="max-w-xl text-sm leading-relaxed text-white/65">
              {offering.description}
            </p>
            {offering.exemptionNote && (
              <p className="mt-6 max-w-xl rounded-lg bg-white/10 p-4 text-xs text-white/70">
                <strong>Exemption:</strong> {offering.exemptionNote}
              </p>
            )}
          </div>

          <div className="card h-fit !bg-white text-navy-900">
            {offering.targetAmount > 0 ? (
              <>
                <div className="mb-1 text-3xl font-bold">{fmtMoney(offering.raisedAmount)}</div>
                <div className="mb-4 text-sm text-navy-900/60">
                  raised of {fmtMoney(offering.targetAmount)} target
                </div>
                <div aria-hidden="true" className="mb-4 h-2.5 overflow-hidden rounded-full bg-brand-100">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                </div>
                <dl className="mb-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-navy-900/60">Investors</dt>
                    <dd className="font-semibold">{offering.investorCount.toLocaleString()}</dd>
                  </div>
                  {offering.pricePerUnit > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-navy-900/60">Price per {offering.unitName}</dt>
                      <dd className="font-semibold">${offering.pricePerUnit.toFixed(2)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-navy-900/60">Minimum investment</dt>
                    <dd className="font-semibold">${offering.minInvestment.toLocaleString()}</dd>
                  </div>
                </dl>
                {offering.status === "LIVE" ? (
                  <Link
                    href={user ? `/portal/invest/${offering.slug}` : `/signup?next=/portal/invest/${offering.slug}`}
                    className="btn-primary w-full"
                  >
                    Invest Now
                  </Link>
                ) : (
                  <span className="btn-outline w-full cursor-default">Offering Closed</span>
                )}
              </>
            ) : (
              <>
                <div className="mb-2 text-xl font-bold">Advisory Engagement</div>
                <p className="mb-6 text-sm text-navy-900/60">
                  This is a {product.label} engagement managed by Directly
                  Listed. Contact us to participate or learn more.
                </p>
                <Link href="/contact" className="btn-dark w-full">Contact Us</Link>
              </>
            )}
            <p className="mt-4 text-[11px] leading-snug text-navy-900/60">
              Card payments accepted for amounts under $5,000 via Braintree, a
              PayPal service. Larger amounts fund by wire or ACH.
            </p>
          </div>
        </div>
      </section>

      {(videos.length > 0 || gallery.length > 0) && (
        <section className="bg-brand-50/60">
          <div className="mx-auto max-w-7xl px-6 py-16">
            {videos.length > 0 && (
              <>
                <h2 className="mb-6 text-2xl font-bold">Watch</h2>
                <div className={`grid gap-6 ${videos.length > 1 ? "md:grid-cols-2" : "md:max-w-3xl"}`}>
                  {videos.map((v) => {
                    const embed = toEmbedUrl(v.url);
                    return embed ? (
                      <figure key={v.id}>
                        <iframe
                          src={embed}
                          title={v.title}
                          className="aspect-video w-full rounded-2xl"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <figcaption className="mt-2 text-sm font-medium text-navy-900/80">
                          {v.title}
                        </figcaption>
                      </figure>
                    ) : null;
                  })}
                </div>
              </>
            )}
            {gallery.length > 0 && (
              <>
                <h2 className={`mb-6 text-2xl font-bold ${videos.length > 0 ? "mt-14" : ""}`}>Gallery</h2>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {gallery.map((g) => (
                    <li key={g.id}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={g.url}
                        alt={g.title}
                        loading="lazy"
                        className="aspect-video w-full rounded-2xl object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-16">
        {materials.length > 0 && (
          <>
            <h2 className="mb-6 text-2xl font-bold">Campaign Materials</h2>
            <ul className="mb-12 grid max-w-4xl gap-3 sm:grid-cols-2">
              {materials.map((m) => (
                <li key={m.id}>
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card flex items-center justify-between gap-3 !p-4 text-sm hover:border-brand-400"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-brand-700">{m.title}</span>
                      <span className="text-xs text-navy-900/60">{m.kind.replaceAll("_", " ")}</span>
                    </span>
                    <span aria-hidden="true" className="text-brand-600">↓</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
        <h2 className="mb-6 text-2xl font-bold">Issuer</h2>
        <div className="card max-w-2xl">
          <div className="font-bold">{offering.issuer.companyName}</div>
          <div className="text-sm text-navy-900/60">
            {offering.issuer.entityType} · {offering.industry}
          </div>
          {offering.issuer.description && (
            <p className="mt-3 text-sm text-navy-900/70">{offering.issuer.description}</p>
          )}
          <a
            href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=${encodeURIComponent(offering.issuer.companyName)}&type=&dateb=&owner=include&count=40`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline"
          >
            Search this issuer on SEC EDGAR ↗
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        {offering.documents.length > 0 && (
          <>
            <h2 className="mb-6 mt-12 text-2xl font-bold">Offering Documents</h2>
            <ul className="max-w-2xl space-y-3">
              {offering.documents.map((d) => (
                <li key={d.id} className="card flex items-center justify-between !p-4 text-sm">
                  <span className="font-medium">{d.title}</span>
                  <span className="text-xs text-navy-900/70">{d.kind.replaceAll("_", " ")}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
