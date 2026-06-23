import { db } from "@/lib/db";
import { StatusBadge } from "@/components/AppShell";
import { fmtMoney, productByType } from "@/lib/offering-types";
import {
  sendQuotation,
  setOfferingStatus,
  setOfferingFeatured,
  setOfferingArchived,
  deleteOffering,
} from "@/lib/admin-actions";

export default async function AdminOfferings() {
  const offerings = await db.offering.findMany({
    include: { issuer: true, quotation: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {offerings.map((o) => (
        <div key={o.id} className={`card space-y-5 !p-6 ${o.archivedAt ? "opacity-60" : ""}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-lg font-bold">
                {o.name}
                {o.featured && !o.archivedAt && (
                  <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-semibold text-navy-900">
                    ★ Featured #{o.featuredRank || "—"}
                  </span>
                )}
                {o.archivedAt && (
                  <span className="rounded-full bg-navy-900/10 px-2 py-0.5 text-[11px] font-semibold text-navy-900/70">
                    Archived
                  </span>
                )}
              </div>
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

          {/* Homepage flagship + lifecycle controls */}
          <div className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-navy-900/10 p-4">
            <form action={setOfferingFeatured} className="flex flex-wrap items-end gap-3">
              <input type="hidden" name="offeringId" value={o.id} />
              <label className="flex items-center gap-2 text-xs font-medium">
                <input type="checkbox" name="featured" defaultChecked={o.featured} className="h-4 w-4" />
                Feature on homepage
              </label>
              <div>
                <label htmlFor={`rank-${o.id}`} className="label">Rank (1–3)</label>
                <input
                  id={`rank-${o.id}`}
                  name="featuredRank"
                  type="number"
                  min="0"
                  max="3"
                  defaultValue={o.featuredRank}
                  className="input !w-24 !py-2 text-xs"
                />
              </div>
              <button className="btn-outline !py-2.5 text-xs">Save</button>
            </form>
            <div className="flex items-center gap-2">
              <form action={setOfferingArchived}>
                <input type="hidden" name="offeringId" value={o.id} />
                <input type="hidden" name="archive" value={o.archivedAt ? "0" : "1"} />
                <button className="btn-outline !py-2.5 text-xs">
                  {o.archivedAt ? "Unarchive" : "Archive"}
                </button>
              </form>
              <form action={deleteOffering}>
                <input type="hidden" name="offeringId" value={o.id} />
                <button className="!rounded-lg !border !border-red-300 !bg-red-50 !px-4 !py-2.5 text-xs font-semibold text-red-700 hover:!bg-red-100">
                  Delete
                </button>
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
