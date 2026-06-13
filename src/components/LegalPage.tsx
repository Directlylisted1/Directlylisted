import { loadLegalDoc } from "@/lib/legal";

export function LegalPage({ slug }: { slug: string }) {
  const { title, blocks } = loadLegalDoc(slug);
  return (
    <>
      <section className="bg-navy-950 px-6 pb-14 pt-36 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="space-y-5 text-sm leading-relaxed text-navy-900/85">
          {blocks.map((b, i) =>
            b.type === "heading" ? (
              <h2 key={i} className="pt-4 text-xl font-bold text-navy-900">{b.text}</h2>
            ) : (
              <p key={i}>{b.text}</p>
            ),
          )}
        </div>
      </section>
    </>
  );
}
