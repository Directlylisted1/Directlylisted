import { db } from "@/lib/db";
import { StatusBadge } from "@/components/AppShell";
import { setLeadStatus, deleteLead } from "@/lib/admin-actions";

export default async function AdminLeads() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-4">
      {leads.map((l) => (
        <div key={l.id} className="card flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-bold">
              {l.name}{" "}
              <span className="font-normal text-navy-900/70">
                · <a href={`mailto:${l.email}`} className="hover:text-navy-900">{l.email}</a>
                {l.phone && (
                  <>
                    {" · "}
                    <a href={`tel:${l.phone.replace(/[^+\d]/g, "")}`} className="hover:text-navy-900">
                      {l.phone}
                    </a>
                  </>
                )}
              </span>
            </div>
            <div className="text-xs text-navy-900/70">
              {l.kind.replaceAll("_", " ")} · {l.phone ?? "no phone"} ·{" "}
              {l.company ?? "no company"} ·{" "}
              {l.productInterest || "no product selected"} ·{" "}
              {l.createdAt.toLocaleDateString()}
            </div>
            {l.message && <p className="mt-2 max-w-xl text-sm text-navy-900/70">{l.message}</p>}
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge value={l.status} />
            <form action={setLeadStatus} className="flex items-center gap-2">
              <input type="hidden" name="leadId" value={l.id} />
              <select
                name="status"
                defaultValue={l.status}
                aria-label={`Status for lead from ${l.name}`}
                className="input !w-auto !py-2 text-xs"
              >
                {["NEW", "CONTACTED", "QUALIFIED", "CLOSED"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button className="btn-dark !py-2.5 text-xs">Set</button>
            </form>
            <form action={deleteLead}>
              <input type="hidden" name="leadId" value={l.id} />
              <button className="!rounded-lg !border !border-red-300 !bg-red-50 !px-4 !py-2.5 text-xs font-semibold text-red-700 hover:!bg-red-100">
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
      {leads.length === 0 && (
        <div className="card text-sm text-navy-900/60">No leads yet.</div>
      )}
    </div>
  );
}
