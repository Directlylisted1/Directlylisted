import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Record and Regulatory History — Directly Listed",
  description:
    "The complete record and regulatory history of Andy Altahawi, from the primary sources — including the one regulatory matter in his career.",
  alternates: { canonical: "/regulatory-history" },
};

type Block =
  | { t: "h2"; text: string }
  | { t: "p"; text: string }
  | { t: "pLink"; before: string; label: string; href: string; after: string }
  | { t: "ul"; items: string[] };

const BLOCKS: Block[] = [
  { t: "h2", text: "A note on transparency" },
  {
    t: "p",
    text: "Andy Altahawi has spent four decades in two demanding professions: international law, which he has practiced since 1986, and the U.S. securities industry, where he held FINRA registrations from 1994. Anyone evaluating an advisor should be able to see the complete record, from the primary sources, in one place. This page provides exactly that, including the one regulatory matter in his career, with links to every official document so that nothing here has to be taken on anyone's word alone.",
  },

  { t: "h2", text: "Career record" },
  {
    t: "p",
    text: "Mr. Altahawi began his U.S. investment banking career in 1994 as a Senior Vice President in the Investment Banking division of Prudential Securities, then one of the country's leading full-service investment banks, working on public offerings, private placements, and structured corporate finance during the tenure of Chairman and CEO Wick Simons, the former Chairman of NASDAQ.",
  },
  {
    t: "p",
    text: "In 1998 he founded Adamson Brothers, Inc., an SEC- and FINRA-registered broker-dealer (CRD #46684), which grew into a multi-office firm active in equity and bond trading, market making, and corporate finance, raising capital for issuer clients across technology, life sciences, real estate, and other sectors. Following the post-2008 restructuring of the broker-dealer industry, Adamson Brothers transitioned into the capital markets advisory firm he leads today.",
  },
  {
    t: "p",
    text: "Over his registered career he held the Series 3, 4, 6, 7, 24, 55, 63, 65, and 79 examinations. His full registration history is public.",
  },
  {
    t: "p",
    text: "In parallel, Mr. Altahawi has maintained an international legal practice since earning his law degree from Cairo University Law School in 1986, focused on cross-border corporate structuring, commercial arbitration, and governance counsel, with reciprocal admissions in several jurisdictions and regular co-counsel work alongside U.S.-admitted attorneys.",
  },

  { t: "h2", text: "The Longfin matter (2018–2019): the facts" },
  {
    t: "p",
    text: "One matter in this record deserves a full and direct account, and readers will find it discussed elsewhere online, often inaccurately, maliciously, falsely and or without context. Here are the facts, with the source documents.",
  },
  {
    t: "p",
    text: "In 2017, Mr. Altahawi served as the outside listing advisor to Longfin Corp. in connection with its Regulation A+ offering and NASDAQ listing, an advisory role that the SEC's own pleadings acknowledge. In 2018, the SEC filed a civil enforcement action, SEC v. Longfin Corp., et al. (S.D.N.Y.), naming the company, its CEO, and several individuals including Mr. Altahawi, principally concerning sales of Longfin shares alleged to be unregistered; amended charges followed in 2019 relating to the listing process. The action was civil in nature and none of it was criminal.",
  },
  {
    t: "p",
    text: "In June 2019, he resolved the matter by consent, without admitting or denying the allegations. Under the final judgment and a related administrative order, he agreed to pay approximately $24 million, and the surrender of his Longfin shares, together with the two time-limited restrictions described below.",
  },

  { t: "h2", text: "The scope of the 2019 restrictions — precisely stated" },
  {
    t: "p",
    text: "Mr. Altahawi was never subject to a blanket ban from the securities industry or from professional life. The 2019 resolution imposed two specific, defined restrictions:",
  },
  {
    t: "ul",
    items: [
      "A five-year bar from serving as an officer or director of an SEC-reporting public company. That bar expired in June 2024.",
      "An associational bar limited to specific categories of SEC-regulated entities — broker-dealers, investment advisers, transfer agents, and certain related registrants — with the express right to reapply for association after five years. That five-year period ended in June 2024, at which point Mr. Altahawi became fully eligible to reapply to become a member again.",
    ],
  },
  {
    t: "p",
    text: "At no time did either restriction prevent Mr. Altahawi from practicing law, from providing capital markets consulting outside registered entities, or from leading Adamson Brothers in its advisory capacity — which is exactly what he has done, without interruption, since 2018.",
  },

  { t: "h2", text: "Mr. Altahawi's statement on why he settled" },
  {
    t: "p",
    text: "Mr. Altahawi has been consistent, from 2018 to today, about why the matter ended in settlement rather than trial. He was named in Longfin because he served as the listing advisor, a role the SEC's own pleading acknowledged. He did not settle because the allegations were correct. He settled because his bank and brokerage accounts had been frozen by the SEC pending the litigation, depriving him of the means to fund a multi-year defense against the federal government.",
  },
  {
    t: "p",
    text: "On the central allegation concerning his share sales, Mr. Altahawi's position has never changed: he had held his shares for over thirteen months, as confirmed by the transfer agent's compliance department and by a Rule 144 legal opinion issued by U.S. securities counsel before any sale took place. Mr. Altahawi denies the SEC's allegations against him in full and maintains that they were baseless, and that a process in which a defendant's assets are frozen so that he cannot afford to contest the very allegations against him is a travesty of justice.",
  },
  {
    t: "p",
    text: "He also notes what the record itself says: the judgment he consented to states that he neither admitted nor denied the allegations. Seven years of subsequent practice, without a single regulatory matter of any kind, speak to the standards he has kept before and since.",
  },

  { t: "h2", text: "Why Mr. Altahawi can now say this plainly" },
  {
    t: "p",
    text: "For more than fifty years, the SEC required every settling party to accept a “no-deny” provision under its policy at 17 C.F.R. § 202.5(e) — a term, widely criticized as the “gag rule,” that prohibited settling defendants from publicly denying the allegations against them, on pain of the settlement being reopened. For years, that policy is what prevented Mr. Altahawi from stating his position as directly as he does on this page.",
  },
  {
    t: "pLink",
    before:
      "That policy no longer exists. On May 18, 2026, the Commission formally rescinded it, and stated that it will not enforce no-deny provisions in existing settlements — it will not ask a district court to vacate a settlement or reopen a proceeding over a breach of a previously entered no-deny term. The Supreme Court subsequently declined to hear Powell v. SEC, the leading constitutional challenge to the rule, the rescission having effectively resolved the issue. See the SEC's announcement: ",
    label: "sec.gov/newsroom/press-releases/2026-45",
    href: "https://www.sec.gov/newsroom/press-releases/2026-45",
    after: ".",
  },
  {
    t: "p",
    text: "Mr. Altahawi's settlement stands, every term of it honored. What has changed is that he — like every American who settled with the agency under the old policy — may now exercise his First Amendment right to say what he has always maintained: the allegations were untrue, and he settled because the asset freeze left him no realistic means to fight them.",
  },

  { t: "h2", text: "Since 2019" },
  {
    t: "p",
    text: "In the seven years since the Longfin matter was resolved, Mr. Altahawi's work has continued through Adamson Brothers as a capital markets advisory practice — listing readiness, Regulation A+ and registered offering preparation, direct listing advisory, and cross-border structuring for issuers entering the U.S. markets — alongside his international legal practice. There have been no regulatory matters of any kind since.",
  },
  {
    t: "p",
    text: "The Longfin matter is part of his record and he treats it as such: openly, factually. A forty-year career should be judged in whole — the transactions completed, the clients served, and the standards kept before and since.",
  },

  { t: "h2", text: "A note on certain websites" },
  {
    t: "p",
    text: "Readers may also encounter a network of anonymous websites publishing fabricated claims about Mr. Altahawi that go far beyond the public record described above. Sites of this kind are, from time to time, the subject of defamation litigation he files — as in the action now pending in the U.S. District Court for the Southern District of Florida (Case No. 1:25-cv-22806). He will let that process run its course; in the meantime, anyone with questions is encouraged to rely on the primary sources linked on this page, or to contact him directly.",
  },
  {
    t: "p",
    text: "One point of accuracy matters here, and it is the line between protected reporting and defamation. The 2019 SEC matter was settled by consent, without any admission and without any trial or adjudicated findings. Reporting that accurately is fair comment. Publishing that Mr. Altahawi was “found” to have committed fraud, was “convicted,” or treating settled allegations as adjudicated fact is false — and Mr. Altahawi will not hesitate to pursue any publisher who defames him or misrepresents the record in that way.",
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
            <p>July 15, 2026</p>
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
