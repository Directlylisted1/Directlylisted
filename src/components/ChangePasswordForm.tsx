"use client";

import { useActionState } from "react";
import { changeAdminPassword } from "@/lib/settings-actions";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changeAdminPassword, undefined);
  return (
    <form action={action} className="card space-y-5 !p-8">
      <div>
        <h2 className="mb-1 text-xl font-bold">Change Password</h2>
        <p className="text-sm text-navy-900/70">
          Update your admin account password. You&apos;ll use the new password the
          next time you sign in.
        </p>
      </div>
      <div>
        <label htmlFor="cp-current" className="label">Current Password</label>
        <input
          id="cp-current"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className="input"
        />
      </div>
      <div>
        <label htmlFor="cp-new" className="label">New Password (8+ characters)</label>
        <input
          id="cp-new"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className="input"
        />
      </div>
      <div>
        <label htmlFor="cp-confirm" className="label">Confirm New Password</label>
        <input
          id="cp-confirm"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className="input"
        />
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-red-600">{state.error}</p>
      )}
      {state?.success && (
        <p role="status" className="text-sm text-green-600">{state.success}</p>
      )}
      <button disabled={pending} className="btn-dark w-full disabled:opacity-50">
        {pending ? "Updating…" : "Update Password"}
      </button>
    </form>
  );
}
