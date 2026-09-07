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
    src: "/gallery/andy-altahawi-nyse-opening-bell.jpg",
    title: "Andy Altahawi — NYSE opening bell",
    description:
      "Andy Altahawi at the New York Stock Exchange opening bell — the moment every Directly Listed engagement works toward.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-boardroom-portrait.jpg",
    title: "Andy Altahawi — boardroom portrait",
    description:
      "Andy Altahawi, founder of Directly Listed, in the boardroom — three decades across investment banking and international law.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-conference-room.jpg",
    title: "Andy Altahawi — in conference",
    description:
      "Andy Altahawi leading a listing-readiness session — exchange qualification, governance, and timeline, planned deal by deal.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-wall-street.jpg",
    title: "Andy Altahawi — Wall Street",
    description:
      "Andy Altahawi on Wall Street outside the New York Stock Exchange, where his U.S. capital markets career began in 1994.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-nasdaq-marketsite.jpg",
    title: "Andy Altahawi — NASDAQ MarketSite",
    description:
      "Andy Altahawi at the NASDAQ MarketSite in Times Square — the destination for many Directly Listed issuer clients.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-nyse-office.jpg",
    title: "Andy Altahawi — above the Exchange",
    description:
      "Andy Altahawi in conference overlooking the New York Stock Exchange facade on Broad Street.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-exchange-wall.jpg",
    title: "Andy Altahawi — welcoming issuers",
    description:
      "Andy Altahawi in the NASDAQ boardroom above Times Square — welcoming founders exploring the path to a U.S. listing.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-nasdaq-office.jpg",
    title: "Andy Altahawi — at work above Times Square",
    description:
      "Andy Altahawi working above the NASDAQ MarketSite — filings, listing applications, and issuer files in motion.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-executive-desk.jpg",
    title: "Andy Altahawi — Manhattan evening",
    description:
      "Andy Altahawi at his desk against the Manhattan skyline — the working end of a listing practice that spans time zones.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-dubai-nasdaq.jpg",
    title: "Andy Altahawi — cross-border desk, Dubai",
    description:
      "Andy Altahawi at the Dubai desk — structuring international companies for NASDAQ and NYSE listings through the Cayman Islands and F-1 routes.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-dubai-office.jpg",
    title: "Andy Altahawi — Dubai office",
    description:
      "Andy Altahawi in Dubai, with the Burj Khalifa behind him — cross-border issuers are a particular focus of the practice.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-dubai-cafe.jpg",
    title: "Andy Altahawi — Downtown Dubai",
    description: "Andy Altahawi in Downtown Dubai, between meetings with Gulf-region issuers.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-nyc-cafe.jpg",
    title: "Andy Altahawi — Times Square café",
    description:
      "Andy Altahawi across from the NASDAQ MarketSite — much of a listing advisor's work happens one conversation at a time.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-wall-street-walk.jpg",
    title: "Andy Altahawi — on Wall Street",
    description: "Andy Altahawi on Wall Street, a few steps from the Exchange.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-central-park.jpg",
    title: "Andy Altahawi — Central Park",
    description: "Andy Altahawi in Central Park, against the Midtown skyline.",
    kind: "photo",
  },
  {
    src: "/gallery/andy-altahawi-central-park-autumn.jpg",
    title: "Andy Altahawi — autumn in the park",
    description: "Andy Altahawi walking Central Park in autumn — New York, home base of the practice.",
    kind: "photo",
  },
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
