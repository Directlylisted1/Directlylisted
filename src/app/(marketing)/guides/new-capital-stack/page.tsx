import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { notifyInquiry } from "@/lib/mailer";

export const metadata = {
  title: "The New Capital Stack — Free Guide — Directly Listed",
  description:
    "Why retail capital belongs in modern financing strategy, and a practical blueprint for planning and launching a retail raise.",
  alternates: { canonical: "/guides/new-capital-stack" },
};

async function requestGuide(formData: FormData) {
  "use server";
  const lead = {
    kind: "GUIDE_DOWNLOAD",
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? "") || null,
    productInterest: "new-capital-stack-guide",
  };
  await db.lead.create({ data: lead });
  await notifyInquiry(lead);
  redirect("/get-started/thanks");
}

const SECTIONS = [
  {
    title: "Where the traditional capital stack falls short",
    body: "Venture rounds dilute heavily and arrive on someone else's timeline; bank debt demands covenants young companies can't carry; and follow-on offerings punish your share price. The conventional stack leaves growing companies choosing between control and capital.",
  },
  {
    title: "Customers as shareholders",
    body: "When the people who already buy from you own a piece of the company, their relationship changes: customer-shareholders tend to spend more, stay longer, and refer more often — and they show up as advocates when you list. A retail tranche converts brand loyalty into committed capital.",
  },
  {
    title: "The blueprint",
    body: "Pick the exemption that matches your audience (Reg A+ to reach everyone, 506(c) for accredited reach with advertising, Reg S for international demand). Stage your documents and SEC filings, launch an offering page with an Invest Now button on your own site, market to your community first, and reconcile funds on one dashboard. Then pair the raise with a listing and an ELOC so capital stays available after you ring the bell.",
  },
];

export default function NewCapitalStackPage() {
  return (
    <>
      <section className="bg-navy-950 px-6 pb-20 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Free Guide
          </div>
          <h1 className="mb-4 text-5xl font-bold">The New Capital Stack</h1>
          <p className="max-w-2xl text-white/70">
            The funding landscape is changing, and forward-thinking companies
            are tapping retail capital to accelerate growth. Here&apos;s why —
            and how to do it well.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-16 md:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="mb-3 text-2xl font-bold">{s.title}</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-navy-900/75">{s.body}</p>
            </div>
          ))}
        </div>
        <form action={requestGuide} className="card h-fit space-y-4 !p-8">
          <h2 className="text-lg font-bold">Download the full guide</h2>
          <div>
            <label htmlFor="gd-name" className="label">Name</label>
            <input id="gd-name" name="name" required className="input" />
          </div>
          <div>
            <label htmlFor="gd-email" className="label">Work Email</label>
            <input id="gd-email" name="email" type="email" required className="input" />
          </div>
          <div>
            <label htmlFor="gd-company" className="label">Company</label>
            <input id="gd-company" name="company" className="input" />
          </div>
          <button className="btn-dark w-full">Download Now</button>
          <p className="text-[11px] text-navy-900/60">
            We&apos;ll email you the guide and follow up about your raise.
          </p>
        </form>
      </section>
    </>
  );
}
