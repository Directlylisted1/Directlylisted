import { getCurrentUser } from "@/lib/session";
import { updateAccreditation } from "@/lib/invest-actions";
import { StatusBadge } from "@/components/AppShell";

const BASES = [
  ["income", "Income — $200K+ individual / $300K+ joint for the past 2 years"],
  ["net_worth", "Net worth — over $1M excluding primary residence"],
  ["license", "Professional license — Series 7, 65, or 82 in good standing"],
  ["entity", "Entity — $5M+ in assets or all owners accredited"],
  ["none", "I am not an accredited investor"],
] as const;

export default async function AccreditationPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const user = (await getCurrentUser())!;
  const profile = user.investorProfile!;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="card flex items-center justify-between">
        <span className="text-sm font-medium">Current status</span>
        <StatusBadge value={profile.accreditationStatus} />
      </div>
      <form action={updateAccreditation} className="card space-y-5 !p-8">
        <input type="hidden" name="next" value={next ?? ""} />
        <div>
          <h2 className="mb-1 text-xl font-bold">Accreditation Questionnaire</h2>
          <p className="text-sm text-navy-900/60">
            Select the basis on which you qualify as an accredited investor
            under SEC Rule 501. For Rule 506(c) offerings, third-party
            verification will also be required before your investment closes.
          </p>
        </div>
        <div className="space-y-3">
          {BASES.map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-navy-900/10 p-4 text-sm hover:border-brand-400"
            >
              <input
                type="radio"
                name="basis"
                value={value}
                defaultChecked={profile.accreditationBasis === value}
                required
                className="mt-0.5"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="acc-country" className="label">Country</label>
            <input id="acc-country" name="country" autoComplete="country" defaultValue={profile.country} className="input" />
          </div>
          <div>
            <label htmlFor="acc-state" className="label">State / Province</label>
            <input id="acc-state" name="state" autoComplete="address-level1" defaultValue={profile.state ?? ""} className="input" />
          </div>
        </div>
        <button className="btn-dark w-full">Save Accreditation</button>
      </form>
    </div>
  );
}
