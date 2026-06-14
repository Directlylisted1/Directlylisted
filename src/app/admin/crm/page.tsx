import Link from "next/link";
import { db } from "@/lib/db";
import { CrmSubnav } from "@/components/CrmSubnav";
import { StatusBadge } from "@/components/AppShell";
import { CRM_STAGES, STAGE_LABELS } from "@/lib/crm-types";
import { importLeads } from "@/lib/crm-actions";

export default async function CrmOverview() {
  const [contacts, upcoming, stageCounts, leadCount, contactCount] = await Promise.all([
    db.crmContact.findMany({ orderBy: { updatedAt: "desc" }, take: 6 }),
    db.appointment.findMany({
      where: { status: { in: ["REQUESTED", "CONFIRMED"] }, startsAt: { gte: new Date() } },
      include: { contact: true },
      orderBy: { startsAt: "asc" },
      take: 6,
    }),
    db.crmContact.groupBy({ by: ["stage"], _count: true }),
    db.lead.count(),
    db.crmContact.count(),
  ]);

  const countFor = (stage: string) =>
    stageCounts.find((s) => s.stage === stage)?._count ?? 0;

  return (
    <div>
      <CrmSubnav active="/admin/crm" />

      {/* Pipeline board */}
      <h2 className="mb-4 text-xl font-bold">Pipeline</h2>
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {CRM_STAGES.map((stage) => (
          <div key={stage} className="card !p-4 text-center">
            <div className="text-3xl font-bold">{countFor(stage)}</div>
            <div className="mt-1 text-xs text-navy-900/70">{STAGE_LABELS[stage]}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upcoming appointments */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Upcoming Appointments</h2>
            <Link href="/admin/crm/appointments" className="text-sm font-semibold text-brand-600">
              View all →
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="card text-sm text-navy-900/70">No upcoming appointments.</div>
          ) : (
            <div className="space-y-3">
              {upcoming.map((a) => (
                <div key={a.id} className="card flex items-center justify-between !p-4">
                  <div>
                    <div className="font-medium">{a.contact.name}</div>
                    <div className="text-xs text-navy-900/70">
                      {a.typeLabel} ·{" "}
                      {a.startsAt.toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <StatusBadge value={a.status} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent contacts + lead import */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Contacts</h2>
            <form action={importLeads}>
              <button className="btn-outline !py-2 text-xs">
                Import {leadCount} Lead{leadCount === 1 ? "" : "s"} →
              </button>
            </form>
          </div>
          {contacts.length === 0 ? (
            <div className="card text-sm text-navy-900/70">
              No contacts yet. Click “Import Leads” to pull in your marketing leads,
              or contacts are created automatically when someone books a call.
            </div>
          ) : (
            <div className="space-y-3">
              {contacts.map((c) => (
                <Link
                  key={c.id}
                  href={`/admin/crm/contacts/${c.id}`}
                  className="card flex items-center justify-between !p-4 hover:border-brand-300"
                >
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-navy-900/70">{c.email}</div>
                  </div>
                  <StatusBadge value={c.stage} />
                </Link>
              ))}
            </div>
          )}
          <p className="mt-3 text-xs text-navy-900/60">{contactCount} total contacts</p>
        </section>
      </div>
    </div>
  );
}
