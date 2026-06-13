import { existsSync } from "fs";
import path from "path";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {/* Ascending listing bars — Directly Listed mark */}
      <rect x="4" y="22" width="7" height="14" rx="1.5" fill="currentColor" opacity="0.55" />
      <rect x="14" y="14" width="7" height="22" rx="1.5" fill="currentColor" opacity="0.8" />
      <rect x="24" y="4" width="7" height="32" rx="1.5" fill="currentColor" />
      <path d="M24 4 L36 4 L36 16 Z" fill="var(--color-accent)" />
    </svg>
  );
}

/**
 * Brand logo. Drop the official mark at public/brand/logo.png and it is
 * used automatically; until then the built-in SVG wordmark renders.
 */
export function Logo({ dark = false }: { dark?: boolean }) {
  const hasPng = existsSync(path.join(process.cwd(), "public", "brand", "logo.png"));
  if (hasPng) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand/logo.png"
        alt="Directly Listed"
        className={`h-10 w-auto ${dark ? "" : ""}`}
      />
    );
  }
  return (
    <span className={`flex items-center gap-2 ${dark ? "text-white" : "text-navy-900"}`}>
      <LogoMark className="h-7 w-7" />
      <span className="text-lg font-bold tracking-tight">
        directly<span className="font-light">listed</span>
      </span>
    </span>
  );
}
