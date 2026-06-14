import Link from "next/link";
import { db } from "@/lib/db";
import { CrmSubnav } from "@/components/CrmSubnav";
import { StatusBadge } from "@/components/AppShell";
import { setAppointmentStatus, setMeetingUrl } from "@/lib/crm-actions";

export default async function CrmAppointmentsPage() {
  const now = new Date();
  const [upcoming, past] = await Promise.all([
    db.appointment.findMany({
      where: { startsAt: { gte: now } },
      include: { contact: true },
      orderBy: { startsAt: "asc" },
    }),
    db.appointment.findMany({
      where: { startsAt: { lt: now } },
      include: { contact: true },
      orderBy: { startsAt: "desc" },
      take: 25,
    }),
  ]);

  const Row = ({ a }: { a: (typeof upcoming)[number] }) => (
    <tr className="border-b border-navy-900/5 align-top">
      <td className="px-5 py-3">
        <div className="font-medium">
          {a.startsAt.toLocaleString("en-US", {
            weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
          })}
        </div>
        <div className="text-xs text-navy-900/70">{a.durationMin} min · {a.typeLabel}</div>
      </td>
      <td className="px-5 py-3">
        <Link href={`/admin/crm/contacts/${a.contactId}`} className="font-medium text-brand-600">
          {a.contact.name}
        </Link>
        <div className="text-xs text-navy-900/70">{a.contact.email}</div>
      </td>
      <td className="px-5 py-3"><StatusBadge value={a.status} /></td>
      <td className="px-5 py-3">
        <form action={setMeetingUrl} className="flex items-center gap-2">
          <input type="hidden" name="appointmentId" value={a.id} />
          <input
            name="meetingUrl"
            defaultValue={a.meetingUrl ?? ""}
            placeholder="Meeting link"
            aria-label={`Meeting link for ${a.contact.name}`}
            className="input !w-40 !py-1.5 text-xs"
          />
          <button className="btn-outline !px-3 !py-1.5 text-[11px]">Save</button>
        </form>
      </td>
      <td className="px-5 py-3">
        <div className="flex flex-wrap gap-1.5">
          {(["CONFIRMED", "COMPLETED", "NO_SHOW", "CANCELLED"] as const).map((s) => (
            <form key={s} action={setAppointmentStatus}>
              <input type="hidden" name="appointmentId" value={a.id} />
              <input type="hidden" name="status" value={s} />
              <button className="rounded-full border border-navy-900/15 px-2.5 py-1 text-[10px] font-semibold hover:border-brand-500 hover:text-brand-600">
                {s.replaceAll("_", " ")}
              </button>
            </form>
          ))}
          <a
            href={`/api/appointments/${a.id}/ics`}
            className="rounded-full border border-navy-900/15 px-2.5 py-1 text-[10px] font-semibold hover:border-brand-500 hover:text-brand-600"
          >
            .ics
          </a>
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <CrmSubnav active="/admin/crm/appointments" />

      <h2 className="mb-4 text-xl font-bold">Upcoming ({upcoming.length})</h2>
      <div className="card mb-10 overflow-x-auto !p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-navy-900/10 text-left text-xs uppercase text-navy-900/70">
            <tr>
              <th scope="col" className="px-5 py-3">When</th>
              <th scope="col" className="px-5 py-3">Contact</th>
              <th scope="col" className="px-5 py-3">Status</th>
              <th scope="col" className="px-5 py-3">Meeting Link</th>
              <th scope="col" className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((a) => <Row key={a.id} a={a} />)}
            {upcoming.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-navy-900/70">No upcoming appointments.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {past.length > 0 && (
        <>
          <h2 className="mb-4 text-xl font-bold">Past</h2>
          <div className="card overflow-x-auto !p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-navy-900/10 text-left text-xs uppercase text-navy-900/70">
                <tr>
                  <th scope="col" className="px-5 py-3">When</th>
                  <th scope="col" className="px-5 py-3">Contact</th>
                  <th scope="col" className="px-5 py-3">Status</th>
                  <th scope="col" className="px-5 py-3">Meeting Link</th>
                  <th scope="col" className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {past.map((a) => <Row key={a.id} a={a} />)}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
