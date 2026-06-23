import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { signOut, switchRole } from "@/lib/auth-actions";

export function AppShell({
  title,
  nav,
  userName,
  switchTo,
  children,
}: {
  title: string;
  nav: Array<{ href: string; label: string }>;
  userName: string;
  // When set, shows a one-click "Switch to …" control to act as the other role.
  switchTo?: "ISSUER" | "INVESTOR";
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-50/50">
      <header className="relative border-b border-navy-900/10 bg-navy-950 text-white">
        <a href="#content" className="skip-link">Skip to content</a>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-10">
            <Link href="/"><Logo dark /></Link>
            <nav aria-label="Dashboard" className="hidden gap-6 text-sm font-medium text-white/80 md:flex">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-white/70 sm:inline">{userName}</span>
            {switchTo && (
              <form action={switchRole}>
                <input type="hidden" name="role" value={switchTo} />
                <button className="rounded-full border border-accent/50 bg-accent/10 px-4 py-2.5 text-xs font-medium text-accent hover:bg-accent/20">
                  Switch to {switchTo === "ISSUER" ? "Issuer" : "Investor"}
                </button>
              </form>
            )}
            <form action={signOut}>
              <button className="rounded-full border border-white/20 px-4 py-2.5 text-xs hover:bg-white/10">
                Sign Out
              </button>
            </form>
            <div className="md:hidden">
              <MobileMenu links={nav} />
            </div>
          </div>
        </div>
      </header>
      <main id="content" className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-3xl font-bold">{title}</h1>
        {children}
      </main>
    </div>
  );
}

export function StatusBadge({ value }: { value: string }) {
  const tone =
    {
      LIVE: "bg-emerald-100 text-emerald-800",
      COMPLETED: "bg-emerald-100 text-emerald-800",
      FUNDS_RECEIVED: "bg-emerald-100 text-emerald-800",
      SETTLED: "bg-emerald-100 text-emerald-800",
      VERIFIED: "bg-emerald-100 text-emerald-800",
      ACCEPTED: "bg-emerald-100 text-emerald-800",
      SIGNED: "bg-emerald-100 text-emerald-800",
      DOCS_SIGNED: "bg-sky-100 text-sky-800",
      PAYMENT_PENDING: "bg-amber-100 text-amber-800",
      PENDING_REVIEW: "bg-amber-100 text-amber-800",
      PENDING_VERIFICATION: "bg-amber-100 text-amber-800",
      PENDING: "bg-amber-100 text-amber-800",
      SENT: "bg-sky-100 text-sky-800",
      OUT_FOR_SIGNATURE: "bg-sky-100 text-sky-800",
      DOCS_SENT: "bg-sky-100 text-sky-800",
      SELF_CERTIFIED: "bg-sky-100 text-sky-800",
      NEW: "bg-sky-100 text-sky-800",
      DRAFT: "bg-slate-100 text-slate-700",
      STARTED: "bg-slate-100 text-slate-700",
      NOT_STARTED: "bg-slate-100 text-slate-700",
      CANCELLED: "bg-red-100 text-red-700",
      FAILED: "bg-red-100 text-red-700",
      REJECTED: "bg-red-100 text-red-700",
      CLOSED: "bg-slate-200 text-slate-700",
      // CRM stages + appointment statuses
      WON: "bg-emerald-100 text-emerald-800",
      CONFIRMED: "bg-emerald-100 text-emerald-800",
      QUALIFIED: "bg-sky-100 text-sky-800",
      MEETING_SCHEDULED: "bg-sky-100 text-sky-800",
      CONTACTED: "bg-sky-100 text-sky-800",
      REQUESTED: "bg-amber-100 text-amber-800",
      PROPOSAL: "bg-amber-100 text-amber-800",
      LOST: "bg-red-100 text-red-700",
      NO_SHOW: "bg-red-100 text-red-700",
    }[value] ?? "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tone}`}>
      {value.replaceAll("_", " ")}
    </span>
  );
}
