import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { notifyInquiry } from "@/lib/mailer";

export const metadata = { title: "Contact — Directly Listed" };

async function submitContact(formData: FormData) {
  "use server";
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const message = String(formData.get("message") ?? "") || null;
  await db.lead.create({ data: { kind: "CONTACT", name, email, message } });
  await notifyInquiry({ kind: "CONTACT", name, email, message });
  redirect("/get-started/thanks");
}

export default function ContactPage() {
  return (
    <section className="bg-navy-950 px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-2">
        <div className="text-white">
          <h1 className="mb-4 text-5xl font-bold">Contact Us</h1>
          <p className="mb-8 text-white/70">
            Questions about an offering, a listing, or the platform? We&apos;re
            here to help.
          </p>
          <div className="space-y-2 text-sm text-white/80">
            <p><a href="mailto:info@directlylisted.com" className="hover:text-white">info@directlylisted.com</a></p>
            <p><a href="tel:+19495292500" className="hover:text-white">+1 949-529-2500</a></p>
          </div>
        </div>
        <form action={submitContact} className="card space-y-4 !p-8">
          <div>
            <label htmlFor="ct-name" className="label">Name</label>
            <input id="ct-name" name="name" autoComplete="name" required className="input" />
          </div>
          <div>
            <label htmlFor="ct-email" className="label">Email</label>
            <input id="ct-email" name="email" type="email" autoComplete="email" required className="input" />
          </div>
          <div>
            <label htmlFor="ct-message" className="label">Message</label>
            <textarea id="ct-message" name="message" rows={5} className="input" />
          </div>
          <button type="submit" className="btn-dark w-full">Send Message</button>
        </form>
      </div>
    </section>
  );
}
