import Link from "next/link";

export const metadata = {
  title: "Guides — Directly Listed",
  description:
    "Free guides on retail capital, direct listings, and going public without an IPO.",
  alternates: { canonical: "/guides" },
};

const GUIDES = [
  {
    slug: "new-capital-stack",
    title: "The New Capital Stack",
    blurb:
      "Why forward-thinking companies are adding retail capital to their funding strategy — and a practical blueprint for launching a retail raise.",
  },
];

export default function GuidesPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-3 text-5xl font-bold">Guides</h1>
          <p className="max-w-2xl text-white/70">
            Practical, plain-English playbooks for raising capital and going
            public — free to download.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="card !p-8 hover:border-brand-300">
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-600">
                Free Guide
              </div>
              <h2 className="mb-2 text-2xl font-bold">{g.title}</h2>
              <p className="mb-4 text-sm text-navy-900/70">{g.blurb}</p>
              <span className="font-semibold text-brand-600">Download Now →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
