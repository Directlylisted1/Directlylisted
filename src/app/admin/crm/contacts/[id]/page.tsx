import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { StatusBadge } from "@/components/AppShell";
import { CRM_STAGES, STAGE_LABELS } from "@/lib/crm-types";
import { addNote, updateStage } from "@/lib/crm-actions";

export default async function CrmContactDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = await db.crmContact.findUnique({
    where: { id },
    include: {
      appointments: { orderBy: { startsAt: "desc" } },
      activities: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!contact) notFound();

  return (
    <div>
      <Link href="/admin/crm/contacts" className="text-sm text-brand-600">← All contacts</Link>
      <div className="mt-3 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{contact.name}</h2>
          <div className="text-sm text-navy-900/70">
            {contact.email}
            {contact.phone && ` · ${contact.phone}`}
            {contact.company && ` · ${contact.company}`}
          </div>
        </div>
        <StatusBadge value={contact.stage} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          {/* Stage changer */}
          <div className="card">
            <h3 className="mb-3 text-sm font-bold">Pipeline Stage</h3>
            <form action={updateStage} className="flex items-center gap-2">
              <input type="hidden" name="contactId" value={contact.id} />
              <select
                name="stage"
                defaultValue={contact.stage}
                aria-label="Pipeline stage"
                className="input !w-auto !py-2 text-sm"
              >
                {CRM_STAGES.map((s) => (
                  <option key={s} value={s}>{STAGE_LABELS[s]}</option>
                ))}
              </select>
              <button className="btn-dark !py-2 text-xs">Update</button>
            </form>
          </div>

          {/* Appointments */}
          <div className="card">
            <h3 className="mb-3 text-sm font-bold">Appointments ({contact.appointments.length})</h3>
            {contact.appointments.length === 0 ? (
              <p className="text-sm text-navy-900/70">No appointments.</p>
            ) : (
              <ul className="space-y-3">
                {contact.appointments.map((a) => (
                  <li key={a.id} className="flex items-center justify-between rounded-xl border border-navy-900/10 p-3 text-sm">
                    <div>
                      <div className="font-medium">{a.typeLabel}</div>
                      <div className="text-xs text-navy-900/70">
                        {a.startsAt.toLocaleString("en-US", {
                          month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <StatusBadge value={a.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Add note */}
          <div className="card">
            <h3 className="mb-3 text-sm font-bold">Add a Note</h3>
            <form action={addNote} className="space-y-3">
              <input type="hidden" name="contactId" value={contact.id} />
              <textarea name="body" rows={3} required className="input" placeholder="Log a call, email, or note…" />
              <button className="btn-dark !py-2 text-xs">Save Note</button>
            </form>
          </div>
        </div>

        {/* Activity timeline */}
        <div className="card">
          <h3 className="mb-4 text-sm font-bold">Activity Timeline</h3>
          {contact.activities.length === 0 ? (
            <p className="text-sm text-navy-900/70">No activity yet.</p>
          ) : (
            <ol className="space-y-4">
              {contact.activities.map((act) => (
                <li key={act.id} className="border-l-2 border-brand-200 pl-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
                      {act.kind.replaceAll("_", " ")}
                    </span>
                    <span className="text-xs text-navy-900/60">
                      {act.createdAt.toLocaleString("en-US", {
                        month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-navy-900/80">{act.body}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
