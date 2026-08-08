// app/(marketing)/book/page.tsx
// -----------------------------------------------------------------------------
// Book a call — consultation request form.
// The former self-serve booking calendar exposed a crawlable URL for every
// consultation slot (360 parameterised /book/details URLs), which flooded the
// search index with duplicate titles/descriptions/H1s (SE Ranking audit
// #307117, fix #1). It has been replaced with this single request form; the
// team schedules the call by reply. /book/details and /book/confirmed now
// 301-redirect here (see next.config.ts).
// -----------------------------------------------------------------------------

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { notifyInquiry } from "@/lib/mailer";
import { WhatsAppContact } from "@/components/WhatsAppContact";
import { APPOINTMENT_TYPES } from "@/lib/crm-types";

export const metadata = {
  title: "Book a Call — Directly Listed",
  description:
    "Request a listing consultation, capital raise strategy call, or investor onboarding call with the Directly Listed team. We reply within one business day.",
  alternates: { canonical: "/book" },
};

async function submitBookingRequest(formData: FormData) {
  "use server";
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "") || null;
  const company = String(formData.get("company") ?? "") || null;
  const callType = String(formData.get("callType") ?? "");
  const preferred = String(formData.get("preferred") ?? "");
  const notes = String(formData.get("notes") ?? "");
  const message = [
    callType && `Call type: ${callType}`,
    preferred && `Preferred times: ${preferred}`,
    notes,
  ]
    .filter(Boolean)
    .join("\n");
  await db.lead.create({
    data: { kind: "CONTACT", name, email, phone, company, message: message || null },
  });
  await notifyInquiry({ kind: "BOOKING_REQUEST", name, email, phone, company, message });
  redirect("/get-started/thanks");
}

export default function BookPage() {
  return (
    <section className="bg-navy-950 px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-2">
        <div className="text-white">
          <h1 className="mb-4 text-5xl font-bold">Book a Call</h1>
          <p className="mb-6 text-white/70">
            Tell us what you&apos;d like to discuss and when suits you — we&apos;ll
            confirm your consultation by email within one business day, with a
            calendar invite. No back-and-forth.
          </p>
          <ul className="mb-8 space-y-3 text-sm text-white/80">
            {APPOINTMENT_TYPES.map((t) => (
              <li key={t.id} className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>
                  <span className="font-semibold">{t.label}</span>
                  <span className="text-white/60"> — {t.durationMin} min. {t.blurb}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-sm text-white/80">
            <p><a href="mailto:info@directlylisted.com" className="hover:text-white">info@directlylisted.com</a></p>
            <p><a href="tel:+19495292500" className="hover:text-white">+1 949-529-2500</a></p>
          </div>
          <WhatsAppContact className="mt-6 max-w-sm" />
        </div>
        <form action={submitBookingRequest} className="card space-y-4 !p-8">
          <div>
            <label htmlFor="bk-name" className="label">Name</label>
            <input id="bk-name" name="name" autoComplete="name" required className="input" />
          </div>
          <div>
            <label htmlFor="bk-email" className="label">Email</label>
            <input id="bk-email" name="email" type="email" autoComplete="email" required className="input" />
          </div>
          <div>
            <label htmlFor="bk-phone" className="label">Phone (optional)</label>
            <input id="bk-phone" name="phone" type="tel" autoComplete="tel" className="input" />
          </div>
          <div>
            <label htmlFor="bk-company" className="label">Company (optional)</label>
            <input id="bk-company" name="company" autoComplete="organization" className="input" />
          </div>
          <div>
            <label htmlFor="bk-type" className="label">Call type</label>
            <select id="bk-type" name="callType" required className="input">
              {APPOINTMENT_TYPES.map((t) => (
                <option key={t.id} value={t.label}>
                  {t.label} — {t.durationMin} min
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bk-preferred" className="label">Preferred days / times</label>
            <input
              id="bk-preferred"
              name="preferred"
              className="input"
              placeholder="e.g. Tue–Thu afternoons ET"
            />
          </div>
          <div>
            <label htmlFor="bk-notes" className="label">What would you like to discuss?</label>
            <textarea id="bk-notes" name="notes" rows={4} className="input" />
          </div>
          <button type="submit" className="btn-dark w-full">Request My Call</button>
        </form>
      </div>
    </section>
  );
}
