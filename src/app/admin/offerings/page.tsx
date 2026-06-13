import { db } from "@/lib/db";
import { StatusBadge } from "@/components/AppShell";
import { fmtMoney, productByType } from "@/lib/offering-types";
import { sendQuotation, setOfferingStatus } from "@/lib/admin-actions";

export default async function AdminOfferings() {
  const offerings = await db.offering.findMany({
    include: { issuer: true, quotation: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {offerings.map((o) => (
        <div key={o.id} className="card space-y-5 !p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-lg font-bold">{o.name}</div>
              <div className="text-sm text-navy-900/60">
                {o.issuer.companyName} · {productByType(o.type).label} ·{" "}
                {fmtMoney(o.raisedAmount)} / {fmtMoney(o.targetAmount)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge value={o.status} />
              <form action={setOfferingStatus} className="flex items-center gap-2">
                <input type="hidden" name="offeringId" value={o.id} />
                <select
                  name="status"
                  defaultValue={o.status}
                  aria-label={`Status for ${o.name}`}
                  className="input !w-auto !py-2 text-xs"
                >
                  {["DRAFT", "PENDING_REVIEW", "LIVE", "CLOSED", "WITHDRAWN"].map((s) => (
                    <option key={s} value={s}>{s.replaceAll("_", " ")}</option>
                  ))}
                </select>
                <button className="btn-dark !py-2.5 text-xs">Set</button>
              </form>
            </div>
          </div>

          <div className="rounded-xl border border-navy-900/10 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold">Deal Quotation</h3>
              {o.quotation && <StatusBadge value={o.quotation.status} />}
            </div>
            <form action={sendQuotation} className="grid items-end gap-3 sm:grid-cols-[1fr_1fr_2fr_auto]">
              <input type="hidden" name="offeringId" value={o.id} />
              <div>
                <label htmlFor={`fee-${o.id}`} className="label">Flat Fee (USD)</label>
                <input
                  id={`fee-${o.id}`}
                  name="flatFeeUsd"
                  type="number"
                  min="0"
                  required
                  defaultValue={o.quotation?.flatFeeUsd}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor={`equity-${o.id}`} className="label">Equity Grant (%)</label>
                <input
                  id={`equity-${o.id}`}
                  name="equityGrantPct"
                  type="number"
                  min="0"
                  step="0.05"
                  required
                  defaultValue={o.quotation?.equityGrantPct}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor={`notes-${o.id}`} className="label">Notes</label>
                <input id={`notes-${o.id}`} name="notes" defaultValue={o.quotation?.notes ?? ""} className="input" />
              </div>
              <button className="btn-primary !py-2.5 text-xs">
                {o.quotation ? "Re-send Quote" : "Send Quote"}
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
