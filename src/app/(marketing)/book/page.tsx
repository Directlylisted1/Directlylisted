import Link from "next/link";
import { APPOINTMENT_TYPES, appointmentType } from "@/lib/crm-types";
import { getOpenSlots } from "@/lib/availability";

export const metadata = {
  title: "Book a Call — Directly Listed",
  description:
    "Schedule a listing consultation, capital raise strategy call, or investor onboarding call with the Directly Listed team.",
  alternates: { canonical: "/book" },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; date?: string }>;
}) {
  const { type: typeId, date } = await searchParams;
  const selectedType = typeId ? appointmentType(typeId) : undefined;
  const days = selectedType ? await getOpenSlots({ durationMin: selectedType.durationMin }) : [];
  const selectedDay = date ? days.find((d) => d.dateKey === date) : days[0];

  return (
    <>
      <section className="bg-navy-950 px-6 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-3 text-5xl font-bold">Book a Call</h1>
          <p className="max-w-2xl text-white/70">
            Pick a call type and a time that works for you. You&apos;ll get an
            instant confirmation and a calendar invite — no back-and-forth.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14">
        {/* Step 1 — choose a call type */}
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-navy-900/70">
          1. Choose a call type
        </h2>
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {APPOINTMENT_TYPES.map((t) => (
            <Link
              key={t.id}
              href={`/book?type=${t.id}`}
              className={`card transition hover:border-brand-400 ${
                selectedType?.id === t.id ? "border-brand-500 ring-2 ring-brand-100" : ""
              }`}
            >
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-600">
                {t.durationMin} min
              </div>
              <h3 className="mb-1 font-bold">{t.label}</h3>
              <p className="text-sm text-navy-900/70">{t.blurb}</p>
            </Link>
          ))}
        </div>

        {/* Step 2 — choose a time */}
        {selectedType && (
          <>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-navy-900/70">
              2. Choose a time for your {selectedType.label}
            </h2>
            {days.length === 0 ? (
              <div className="card text-sm text-navy-900/70">
                No open times right now. Please{" "}
                <Link href="/contact" className="font-semibold text-brand-600">contact us</Link>{" "}
                and we&apos;ll find a slot.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                <div className="flex flex-row flex-wrap gap-2 md:flex-col">
                  {days.map((d) => (
                    <Link
                      key={d.dateKey}
                      href={`/book?type=${selectedType.id}&date=${d.dateKey}`}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-medium ${
                        selectedDay?.dateKey === d.dateKey
                          ? "border-navy-900 bg-navy-900 text-white"
                          : "border-navy-900/15 hover:border-brand-400"
                      }`}
                    >
                      {d.label}
                      <span className="ml-2 text-xs opacity-70">{d.slots.length}</span>
                    </Link>
                  ))}
                </div>
                <div className="card">
                  <div className="mb-3 text-sm font-semibold">{selectedDay?.label}</div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {selectedDay?.slots.map((s) => {
                      const iso = s.start.toISOString();
                      const time = s.start.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      });
                      return (
                        <Link
                          key={iso}
                          href={`/book/details?type=${selectedType.id}&start=${encodeURIComponent(iso)}`}
                          className="rounded-lg border border-navy-900/15 py-2.5 text-center text-sm font-medium hover:border-brand-500 hover:bg-brand-50"
                        >
                          {time}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
