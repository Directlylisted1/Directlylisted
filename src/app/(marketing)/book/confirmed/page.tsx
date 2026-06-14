import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export const metadata = { title: "Booking Confirmed — Directly Listed" };

export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const appt = id
    ? await db.appointment.findUnique({ where: { id }, include: { contact: true } })
    : null;
  if (!appt) notFound();

  const start = appt.startsAt;
  const end = new Date(start.getTime() + appt.durationMin * 60_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const gcal = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${appt.typeLabel} — Directly Listed`,
  )}&dates=${fmt(start)}/${fmt(end)}&details=${encodeURIComponent(
    "Your appointment with Directly Listed.",
  )}`;

  return (
    <section className="mx-auto max-w-2xl px-6 pb-20 pt-36 text-center">
      <div aria-hidden="true" className="mb-4 text-5xl">✅</div>
      <h1 className="mb-3 text-4xl font-bold">You&apos;re booked!</h1>
      <p className="mb-8 text-navy-900/75">
        We&apos;ve scheduled your <strong>{appt.typeLabel}</strong> for
        <br />
        {start.toLocaleString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}{" "}
        ({appt.durationMin} min). A confirmation is on its way to{" "}
        <strong>{appt.contact.email}</strong>.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href={`/api/appointments/${appt.id}/ics`} className="btn-dark">
          Add to Calendar (.ics)
        </a>
        <a href={gcal} target="_blank" rel="noopener noreferrer" className="btn-outline">
          Add to Google Calendar
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <p className="mt-10">
        <Link href="/" className="text-sm font-semibold text-brand-600">← Back to home</Link>
      </p>
    </section>
  );
}
