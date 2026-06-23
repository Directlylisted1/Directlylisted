import { createOffering } from "@/lib/issuer-actions";
import { PRODUCTS } from "@/lib/offering-types";

export default function NewOfferingPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <form action={createOffering} className="card space-y-5 !p-8">
        <div>
          <h2 className="mb-1 text-xl font-bold">Create An Offering</h2>
          <p className="text-sm text-navy-900/60">
            Draft your offering. Our team will review it, issue your deal
            quotation (flat fee + equity grant), and publish it when approved.
          </p>
        </div>
        <div>
          <label htmlFor="of-name" className="label">Offering Name</label>
          <input id="of-name" name="name" required className="input" placeholder="Company, Inc. Series A" />
        </div>
        <div>
          <label htmlFor="of-type" className="label">Offering Type</label>
          <select id="of-type" name="type" required className="input">
            {PRODUCTS.map((p) => (
              <option key={p.type} value={p.type}>{p.label}</option>
            ))}
          </select>
        </div>
        <div className="rounded-xl border border-navy-900/10 bg-brand-50/40 p-4">
          <h3 className="mb-1 text-sm font-bold">Homepage flagship card</h3>
          <p className="mb-3 text-xs text-navy-900/60">
            If your offering is featured on the homepage, this is the bold title
            and subtitle that appear on your card. Leave blank to use your offering
            name and tagline.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="of-headline" className="label">Bold Title</label>
              <input id="of-headline" name="headline" className="input" placeholder="Powering the next grid" />
            </div>
            <div>
              <label htmlFor="of-subheadline" className="label">Subtitle</label>
              <input id="of-subheadline" name="subheadline" className="input" placeholder="Series A · Clean energy storage" />
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="of-tagline" className="label">Tagline</label>
            <input id="of-tagline" name="tagline" className="input" placeholder="One bold sentence." />
          </div>
          <div>
            <label htmlFor="of-industry" className="label">Industry</label>
            <input id="of-industry" name="industry" className="input" placeholder="Clean Energy" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="of-target" className="label">Target Amount ($)</label>
            <input id="of-target" name="targetAmount" type="number" min="0" className="input" />
          </div>
          <div>
            <label htmlFor="of-price" className="label">Price / Share ($)</label>
            <input id="of-price" name="pricePerUnit" type="number" min="0" step="0.01" className="input" />
          </div>
          <div>
            <label htmlFor="of-min" className="label">Min Investment ($)</label>
            <input id="of-min" name="minInvestment" type="number" min="0" className="input" />
          </div>
        </div>
        <div>
          <label htmlFor="of-desc" className="label">Description</label>
          <textarea id="of-desc" name="description" rows={4} className="input" />
        </div>
        <div>
          <label htmlFor="of-exemption" className="label">Exemption Relied Upon</label>
          <input
            id="of-exemption"
            name="exemptionNote"
            className="input"
            placeholder="e.g. Rule 506(c) — accredited investors only, verification required"
          />
          <p className="mt-1 text-xs text-navy-900/70">
            Offerings are conducted in reliance on the issuer&apos;s own exemption.
          </p>
        </div>
        <button className="btn-dark w-full">Save Draft</button>
      </form>
    </div>
  );
}
