export function FaqPage({
  title,
  subtitle,
  faqs,
}: {
  title: string;
  subtitle: string;
  faqs: ReadonlyArray<readonly [string, string]>;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-3 text-5xl font-bold">{title}</h1>
          <p className="max-w-2xl text-white/70">{subtitle}</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-4">
          {faqs.map(([q, a]) => (
            <details key={q} className="card group !p-0">
              <summary className="cursor-pointer list-none px-6 py-5 font-bold">
                <span className="flex items-center justify-between gap-4">
                  {q}
                  <span aria-hidden className="text-brand-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="border-t border-navy-900/10 px-6 py-5 text-sm leading-relaxed text-navy-900/75">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
