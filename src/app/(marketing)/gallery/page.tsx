// app/(marketing)/gallery/page.tsx
// -----------------------------------------------------------------------------
// Andy Altahawi — photo and brand gallery. Linked from the site footer.
// Every item lives in /public/gallery; add a file there and an entry to
// GALLERY_ITEMS below (title + description render under each image).
// -----------------------------------------------------------------------------

import Link from "next/link";

export const metadata = {
  title: "Andy Altahawi — Gallery | Directly Listed",
  description:
    "Photos and brand assets of Andy Altahawi, founder of Directly Listed — the NASDAQ and NYSE direct listing platform by Adamson Brothers Corp.",
  alternates: { canonical: "/gallery" },
};

type GalleryItem = {
  src: string;
  title: string;
  description: string;
  // Logos render on a padded neutral ground; photos render edge to edge.
  kind: "photo" | "logo";
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/gallery/directly-listed-logo.png",
    title: "Directly Listed — primary logo",
    description:
      "The official Directly Listed wordmark in brand navy and silver, used across the platform and its publications.",
    kind: "logo",
  },
  {
    src: "/gallery/directly-listed-logo-light.png",
    title: "Directly Listed — reverse logo",
    description:
      "The reverse (light) version of the Directly Listed wordmark, for use on navy and dark grounds.",
    kind: "logo",
  },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Gallery
          </p>
          <h1 className="mb-3 text-5xl font-bold">Andy Altahawi</h1>
          <p className="max-w-3xl text-white/70">
            Photos and brand assets of Andy Altahawi — investment banker,
            international attorney, and founder of Directly Listed, the NASDAQ
            and NYSE direct listing platform operated by Adamson Brothers Corp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item) => (
            <figure
              key={item.src}
              className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className={
                  item.kind === "logo"
                    ? "flex h-64 items-center justify-center bg-brand-50/60 p-10"
                    : "h-64 overflow-hidden"
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.title}
                  className={
                    item.kind === "logo"
                      ? "max-h-full max-w-full object-contain"
                      : "h-full w-full object-cover object-top"
                  }
                  loading="lazy"
                />
              </div>
              <figcaption className="border-t border-navy-900/5 p-5">
                <div className="mb-1 text-sm font-bold text-navy-900">{item.title}</div>
                <p className="text-xs leading-relaxed text-navy-900/70">{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-navy-900/70">
          For Andy Altahawi&apos;s full professional background and complete
          regulatory record — with links to every primary-source document — see
          the{" "}
          <Link href="/about" className="font-medium text-brand-600 hover:underline">
            About page
          </Link>{" "}
          and the{" "}
          <Link href="/regulatory-history" className="font-medium text-brand-600 hover:underline">
            regulatory history page
          </Link>
          , or visit{" "}
          <a
            href="https://andyaltahawi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-600 hover:underline"
          >
            andyaltahawi.com
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </section>
    </>
  );
}
