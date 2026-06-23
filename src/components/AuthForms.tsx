"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-actions";

export function SignInForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(signIn, undefined);
  const [role, setRole] = useState<"INVESTOR" | "ISSUER">("INVESTOR");
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next ?? ""} />
      <input type="hidden" name="role" value={role} />
      <div>
        <span className="label">Sign in as</span>
        <div
          role="group"
          aria-label="Sign in as"
          className="grid grid-cols-2 gap-2 rounded-full bg-brand-50 p-1 text-sm font-semibold"
        >
          {(["INVESTOR", "ISSUER"] as const).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={role === t}
              onClick={() => setRole(t)}
              className={`rounded-full py-2 transition ${role === t ? "bg-navy-900 text-white" : "text-navy-900/70"}`}
            >
              {t === "INVESTOR" ? "Investor" : "Issuer"}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-navy-900/55">
          The same email and password work for both — choose which portal to open.
        </p>
      </div>
      <div>
        <label htmlFor="si-email" className="label">Email</label>
        <input id="si-email" name="email" type="email" autoComplete="email" required className="input" />
      </div>
      <div>
        <label htmlFor="si-password" className="label">Password</label>
        <input id="si-password" name="password" type="password" autoComplete="current-password" required className="input" />
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-red-600">{state.error}</p>
      )}
      <button disabled={pending} className="btn-dark w-full disabled:opacity-50">
        {pending ? "Signing in…" : "Sign In"}
      </button>
      <p className="text-center text-sm text-navy-900/70">
        No account?{" "}
        <Link className="font-semibold text-brand-600" href={`/signup${next ? `?next=${encodeURIComponent(next)}` : ""}`}>
          Create one
        </Link>
      </p>
    </form>
  );
}

export function SignUpForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(signUp, undefined);
  const [type, setType] = useState<"INVESTOR" | "ISSUER">("INVESTOR");
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next ?? ""} />
      <input type="hidden" name="accountType" value={type} />
      <div
        role="group"
        aria-label="Account type"
        className="grid grid-cols-2 gap-2 rounded-full bg-brand-50 p-1 text-sm font-semibold"
      >
        {(["INVESTOR", "ISSUER"] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={type === t}
            onClick={() => setType(t)}
            className={`rounded-full py-2 transition ${type === t ? "bg-navy-900 text-white" : "text-navy-900/70"}`}
          >
            {t === "INVESTOR" ? "I'm an Investor" : "I'm an Issuer"}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="su-first" className="label">First Name</label>
          <input id="su-first" name="firstName" autoComplete="given-name" required className="input" />
        </div>
        <div>
          <label htmlFor="su-last" className="label">Last Name</label>
          <input id="su-last" name="lastName" autoComplete="family-name" required className="input" />
        </div>
      </div>
      {type === "ISSUER" && (
        <div>
          <label htmlFor="su-company" className="label">Company Name</label>
          <input id="su-company" name="companyName" autoComplete="organization" required className="input" />
        </div>
      )}
      <div>
        <label htmlFor="su-email" className="label">Email</label>
        <input id="su-email" name="email" type="email" autoComplete="email" required className="input" />
      </div>
      <div>
        <label htmlFor="su-password" className="label">Password (8+ characters)</label>
        <input id="su-password" name="password" type="password" autoComplete="new-password" minLength={8} required className="input" />
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-red-600">{state.error}</p>
      )}
      <button disabled={pending} className="btn-dark w-full disabled:opacity-50">
        {pending ? "Creating account…" : "Create Account"}
      </button>
      <p className="text-center text-sm text-navy-900/70">
        Already registered?{" "}
        <Link className="font-semibold text-brand-600" href="/signin">Sign in</Link>
      </p>
    </form>
  );
}
