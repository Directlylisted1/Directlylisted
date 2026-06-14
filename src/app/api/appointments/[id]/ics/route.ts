import { db } from "@/lib/db";
import { buildICS } from "@/lib/ics";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const appt = await db.appointment.findUnique({
    where: { id },
    include: { contact: true },
  });
  if (!appt) return new Response("Not found", { status: 404 });

  const ics = buildICS({
    id: appt.id,
    title: `${appt.typeLabel} — Directly Listed`,
    description: appt.message ?? "Your appointment with Directly Listed.",
    start: appt.startsAt,
    durationMin: appt.durationMin,
    organizerEmail: "info@directlylisted.com",
    attendeeEmail: appt.contact.email,
    url: appt.meetingUrl ?? undefined,
  });

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="directly-listed-${appt.id}.ics"`,
    },
  });
}
