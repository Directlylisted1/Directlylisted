"use client";

import { useActionState } from "react";
import { bookAppointment } from "@/lib/crm-actions";

export function BookingForm({
  typeId,
  start,
}: {
  typeId: string;
  start: string;
}) {
  const [state, action, pending] = useActionState(bookAppointment, undefined);
  return (
    <form action={action} className="card space-y-4 !p-8">
      <input type="hidden" name="typeId" value={typeId} />
      <input type="hidden" name="start" value={start} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className="label">Full Name</label>
          <input id="bk-name" name="name" autoComplete="name" required className="input" />
        </div>
        <div>
          <label htmlFor="bk-email" className="label">Email</label>
          <input id="bk-email" name="email" type="email" autoComplete="email" required className="input" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-phone" className="label">Phone</label>
          <input id="bk-phone" name="phone" autoComplete="tel" className="input" />
        </div>
        <div>
          <label htmlFor="bk-company" className="label">Company</label>
          <input id="bk-company" name="company" autoComplete="organization" className="input" />
        </div>
      </div>
      <div>
        <label htmlFor="bk-message" className="label">What would you like to cover?</label>
        <textarea id="bk-message" name="message" rows={3} className="input" />
      </div>
      {state?.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
      <button disabled={pending} className="btn-dark w-full disabled:opacity-50">
        {pending ? "Booking…" : "Confirm Booking"}
      </button>
    </form>
  );
}
