type FaqItem = {
  id?: string;
  question: string;
  answerText: string;
};

type FaqCategory = {
  id: string;
  title: string;
  intro?: string;
  items: FaqItem[];
};

export function FaqPage({
  title,
  subtitle,
  faqs,
  categories,
}: {
  title: string;
  subtitle: string;
  // Legacy flat form: [question, answer] pairs.
  faqs?: ReadonlyArray<readonly [string, string]>;
  // Richer form: grouped categories with anchors (AI-friendly, SEO-ready).
  categories?: ReadonlyArray<FaqCategory>;
}) {
  // Normalise both input shapes into a flat list for the FAQPage JSON-LD.
  const flat: Array<{ id?: string; q: string; a: string }> = categories
    ? categories.flatMap((c) =>
        c.items.map((i) => ({ id: i.id, q: i.question, a: i.answerText })),
      )
    : (faqs ?? []).map(([q, a]) => ({ q, a }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: flat.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const renderItem = (id: string | undefined, q: string, a: string) => (
    <details key={q} id={id} className="card group !p-0 scroll-mt-28">
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
  );

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

      {categories ? (
        <section className="mx-auto max-w-3xl px-6 py-16">
          {/* Anchor nav across categories. */}
          <nav aria-label="FAQ categories" className="mb-12 flex flex-wrap gap-2">
            {categories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-navy-900/15 px-4 py-1.5 text-xs font-medium text-navy-900/70 hover:border-brand-600 hover:text-brand-600"
              >
                {c.title}
              </a>
            ))}
          </nav>
          <div className="space-y-14">
            {categories.map((c) => (
              <div key={c.id} id={c.id} className="scroll-mt-28">
                <h2 className="mb-2 text-2xl font-bold">{c.title}</h2>
                {c.intro && (
                  <p className="mb-5 max-w-2xl text-sm text-navy-900/65">{c.intro}</p>
                )}
                <div className="space-y-4">
                  {c.items.map((i) => renderItem(i.id, i.question, i.answerText))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="space-y-4">
            {flat.map(({ id, q, a }) => renderItem(id, q, a))}
          </div>
        </section>
      )}
    </>
  );
}
