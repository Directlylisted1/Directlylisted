import { db } from "./db";

export type Slot = { start: Date; end: Date };
export type DaySlots = { dateKey: string; label: string; slots: Slot[] };

/**
 * Generate open appointment slots for the next `days` days from availability
 * rules, excluding times that overlap existing (non-cancelled) appointments
 * and any slot in the past. All times are computed in the server's local zone.
 */
export async function getOpenSlots(opts: {
  durationMin: number;
  days?: number;
}): Promise<DaySlots[]> {
  const days = opts.days ?? 14;
  const [rules, booked] = await Promise.all([
    db.availabilityRule.findMany({ where: { active: true } }),
    db.appointment.findMany({
      where: { status: { in: ["REQUESTED", "CONFIRMED"] } },
      select: { startsAt: true, durationMin: true },
    }),
  ]);

  const bookedRanges = booked.map((b) => ({
    start: b.startsAt.getTime(),
    end: b.startsAt.getTime() + b.durationMin * 60_000,
  }));

  const now = Date.now();
  const out: DaySlots[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 0; d < days; d++) {
    const day = new Date(today);
    day.setDate(today.getDate() + d);
    const weekday = day.getDay();
    const dayRules = rules.filter((r) => r.weekday === weekday);
    if (dayRules.length === 0) continue;

    const slots: Slot[] = [];
    for (const rule of dayRules) {
      for (let m = rule.startMin; m + opts.durationMin <= rule.endMin; m += rule.slotMin) {
        const start = new Date(day);
        start.setMinutes(m);
        const startMs = start.getTime();
        const endMs = startMs + opts.durationMin * 60_000;
        if (startMs < now) continue; // no past slots
        const overlaps = bookedRanges.some((b) => startMs < b.end && endMs > b.start);
        if (overlaps) continue;
        slots.push({ start, end: new Date(endMs) });
      }
    }
    if (slots.length === 0) continue;
    out.push({
      dateKey: day.toISOString().slice(0, 10),
      label: day.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      slots: slots.sort((a, b) => a.start.getTime() - b.start.getTime()),
    });
  }
  return out;
}

/** True if the exact slot is still free (re-checked at submit to avoid races). */
export async function isSlotFree(startsAt: Date, durationMin: number): Promise<boolean> {
  const startMs = startsAt.getTime();
  const endMs = startMs + durationMin * 60_000;
  if (startMs < Date.now()) return false;
  const booked = await db.appointment.findMany({
    where: { status: { in: ["REQUESTED", "CONFIRMED"] } },
    select: { startsAt: true, durationMin: true },
  });
  return !booked.some((b) => {
    const bStart = b.startsAt.getTime();
    const bEnd = bStart + b.durationMin * 60_000;
    return startMs < bEnd && endMs > bStart;
  });
}
