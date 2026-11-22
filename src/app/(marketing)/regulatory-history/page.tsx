import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Record and Regulatory History — Directly Listed",
  description:
    "The professional and regulatory record of Andy Altahawi is maintained, with primary sources, on his official website andyaltahawi.com.",
  alternates: { canonical: "/regulatory-history" },
};

type Block =
  | { t: "h2"; text: string }
  | { t: "p"; text: string }
  | { t: "pLink"; before: string; label: string; href: string; after: string }
  | { t: "ul"; items: string[] };

const BLOCKS: Block[] = [
  {
    t: "p",
    text: "Andy Altahawi is an international attorney and capital markets consultant, and the founder and CEO of Adamson Brothers Corp., which operates Directly Listed. He served as Senior Vice President of Investment Banking at Prudential Securities (1994–1998) and founded Adamson Brothers Inc., a FINRA-registered broker-dealer from 1998 to 2007 (CRD #46684). His legal practice dates to 1988.",
  },
  { t: "h2", text: "Professional and Regulatory Record" },
  {
    t: "pLink",
    before: "The professional and regulatory record of Andy Altahawi, including primary-source government records and his statement concerning the Longfin matter, is maintained on his official website. ",
    label: "View the record at andyaltahawi.com",
    href: "https://andyaltahawi.com/record/",
    after: "",
  },
  { t: "h2", text: "Primary sources" },
  {
    t: "pLink",
    before: "Adamson Brothers Inc. registration history: ",
    label: "FINRA BrokerCheck, CRD #46684",
    href: "https://brokercheck.finra.org/firm/summary/46684",
    after: "",
  },
];

export default function RegulatoryHistoryPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-14 pt-36 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">Record and Regulatory History</h1>
          <p className="mt-3 text-sm text-white/70">Andy Altahawi</p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="space-y-5 text-sm leading-relaxed text-navy-900/85">
          {BLOCKS.map((b, i) => {
            switch (b.t) {
              case "h2":
                return (
                  <h2 key={i} className="pt-6 text-xl font-bold text-navy-900">
                    {b.text}
                  </h2>
                );
              case "p":
                return <p key={i}>{b.text}</p>;
              case "pLink":
                return (
                  <p key={i}>
                    {b.before}
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand-600 underline-offset-2 hover:underline"
                    >
                      {b.label}
                    </a>
                    {b.after}
                  </p>
                );
              case "ul":
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6">
                    {b.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
            }
          })}

          {/* Signature */}
          <div className="mt-10 border-t border-navy-900/10 pt-6 text-sm text-navy-900/70">
            <p>Updated November 23, 2026</p>
            <p>
              <a href="mailto:info@directlylisted.com" className="font-semibold text-brand-600 hover:underline">
                Info@directlylisted.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
