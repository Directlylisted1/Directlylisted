import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PRODUCTS } from "@/lib/offering-types";
import { FeeDisclosure } from "@/components/FeeDisclosure";
import { WhatsAppContact } from "@/components/WhatsAppContact";
import { notifyInquiry } from "@/lib/mailer";

export const metadata = { title: "Get Started — Directly Listed" };

async function submitLead(formData: FormData) {
  "use server";
  const lead = {
    kind: String(formData.get("kind") ?? "ISSUER_QUOTE"),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? "") || null,
    company: String(formData.get("company") ?? "") || null,
    productInterest: String(formData.get("product") ?? "") || null,
    message: String(formData.get("message") ?? "") || null,
  };
  await db.lead.create({ data: lead });
  await notifyInquiry(lead);
  redirect("/get-started/thanks");
}

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  return (
    <section className="bg-navy-950 px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2">
        <div className="text-white">
          <h1 className="mb-4 text-5xl font-bold leading-tight">
            Get Your Deal Quoted
          </h1>
          <p className="mb-8 max-w-md text-white/70">
            Every engagement is quoted individually: a flat platform fee plus an
            equity grant at signing. Tell us about your company and our team
            will scope your raise or listing.
          </p>
          <ul className="space-y-3 text-sm text-white/80">
            <li>✓ Response within one business day</li>
            <li>✓ Flat-fee pricing — no percentage of the raise</li>
            <li>✓ Reg D, Reg A+, direct listings, and ELOC under one roof</li>
          </ul>
          <div className="mt-8">
            <FeeDisclosure />
          </div>
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-white/80">
              Prefer to chat now?
            </p>
            <WhatsAppContact className="max-w-sm !text-left" />
          </div>
        </div>
        <form action={submitLead} className="card space-y-4 !p-8">
          <input type="hidden" name="kind" value="ISSUER_QUOTE" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="gs-name" className="label">Full Name</label>
              <input id="gs-name" name="name" autoComplete="name" required className="input" placeholder="Jane Founder" />
            </div>
            <div>
              <label htmlFor="gs-email" className="label">Work Email</label>
              <input id="gs-email" name="email" type="email" autoComplete="email" required className="input" placeholder="jane@company.com" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="gs-phone" className="label">Phone</label>
              <input id="gs-phone" name="phone" autoComplete="tel" className="input" placeholder="+1 555 000 0000" />
            </div>
            <div>
              <label htmlFor="gs-company" className="label">Company</label>
              <input id="gs-company" name="company" autoComplete="organization" className="input" placeholder="Company, Inc." />
            </div>
          </div>
          <div>
            <label htmlFor="gs-product" className="label">Product Interest</label>
            <select id="gs-product" name="product" defaultValue={product ?? ""} className="input">
              <option value="">Not sure yet</option>
              {PRODUCTS.map((p) => (
                <option key={p.slug} value={p.slug}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="gs-message" className="label">Tell us about your raise</label>
            <textarea id="gs-message" name="message" rows={4} className="input" placeholder="Target amount, timeline, current stage…" />
          </div>
          <button type="submit" className="btn-dark w-full">Request Quote</button>
        </form>
      </div>
    </section>
  );
}
