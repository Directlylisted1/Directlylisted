import { db } from "@/lib/db";
import { CrmSubnav } from "@/components/CrmSubnav";
import { APPOINTMENT_TYPES } from "@/lib/crm-types";
import { saveAvailability } from "@/lib/crm-actions";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const toTime = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

export default async function CrmAvailabilityPage() {
  const rules = await db.availabilityRule.findMany();
  const ruleFor = (weekday: number) => rules.find((r) => r.weekday === weekday);

  return (
    <div>
      <CrmSubnav active="/admin/crm/availability" />

      <div className="mb-6 max-w-2xl text-sm text-navy-900/75">
        Set the weekly windows when prospects can self-book. Bookable slots are
        generated automatically from these windows and exclude times already
        taken. Times are in the server&apos;s local timezone.
      </div>

      <form action={saveAvailability} className="card max-w-3xl space-y-3 !p-6">
        <div className="hidden grid-cols-[140px_1fr_1fr_1fr] gap-3 text-xs font-semibold uppercase text-navy-900/70 sm:grid">
          <span>Day</span><span>Start</span><span>End</span><span>Slot length</span>
        </div>
        {WEEKDAYS.map((name, weekday) => {
          const r = ruleFor(weekday);
          return (
            <div key={weekday} className="grid items-center gap-3 border-b border-navy-900/5 pb-3 sm:grid-cols-[140px_1fr_1fr_1fr]">
              <label className="flex items-center gap-2 font-medium">
                <input type="checkbox" name={`active_${weekday}`} defaultChecked={!!r} />
                {name}
              </label>
              <input
                type="time"
                name={`start_${weekday}`}
                defaultValue={r ? toTime(r.startMin) : "09:00"}
                aria-label={`${name} start time`}
                className="input !py-2"
              />
              <input
                type="time"
                name={`end_${weekday}`}
                defaultValue={r ? toTime(r.endMin) : "17:00"}
                aria-label={`${name} end time`}
                className="input !py-2"
              />
              <select
                name={`slot_${weekday}`}
                defaultValue={r?.slotMin ?? 30}
                aria-label={`${name} slot length`}
                className="input !py-2"
              >
                <option value={15}>15 min</option>
                <option value={30}>30 min</option>
                <option value={60}>60 min</option>
              </select>
            </div>
          );
        })}
        <button className="btn-dark w-full">Save Availability</button>
      </form>

      <div className="mt-8 max-w-3xl">
        <h3 className="mb-2 text-sm font-bold">Bookable call types</h3>
        <ul className="card space-y-2 !p-5 text-sm">
          {APPOINTMENT_TYPES.map((t) => (
            <li key={t.id} className="flex justify-between">
              <span className="font-medium">{t.label}</span>
              <span className="text-navy-900/60">{t.durationMin} min</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-navy-900/60">
          Call types are defined in <code>src/lib/crm-types.ts</code>.
        </p>
      </div>
    </div>
  );
}
