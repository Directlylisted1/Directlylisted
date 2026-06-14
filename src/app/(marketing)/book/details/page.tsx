import Link from "next/link";
import { notFound } from "next/navigation";
import { appointmentType } from "@/lib/crm-types";
import { isSlotFree } from "@/lib/availability";
import { BookingForm } from "@/components/BookingForm";

export const metadata = { title: "Confirm Your Booking — Directly Listed" };

export default async function BookDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; start?: string }>;
}) {
  const { type: typeId, start } = await searchParams;
  const type = typeId ? appointmentType(typeId) : undefined;
  const startDate = start ? new Date(start) : null;
  if (!type || !startDate || Number.isNaN(startDate.getTime())) notFound();

  const free = await isSlotFree(startDate, type.durationMin);

  return (
    <section className="mx-auto max-w-2xl px-6 pb-16 pt-36">
      <Link href={`/book?type=${type.id}`} className="text-sm text-brand-600">
        ← Pick a different time
      </Link>
      <div className="mt-4 mb-6">
        <h1 className="text-3xl font-bold">Confirm your booking</h1>
        <p className="mt-2 text-navy-900/75">
          <strong>{type.label}</strong> ({type.durationMin} min)
          <br />
          {startDate.toLocaleString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      </div>
      {free ? (
        <BookingForm typeId={type.id} start={startDate.toISOString()} />
      ) : (
        <div className="card text-sm text-navy-900/75">
          That time is no longer available.{" "}
          <Link href={`/book?type=${type.id}`} className="font-semibold text-brand-600">
            Choose another slot →
          </Link>
        </div>
      )}
    </section>
  );
}
