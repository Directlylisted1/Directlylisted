import { existsSync } from "fs";
import path from "path";

/**
 * Directly Listed wordmark — italic "Directly" + "LISTED" with the lightning /
 * flag mark. Rendered with a layered extrusion + soft drop shadow for a 3D
 * sense of depth, at a medium (less bold) weight. Uses currentColor so it
 * renders white on dark backgrounds and navy on light ones.
 */
export function LogoWordmark({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 250 72" className={className} role="img" aria-label="Directly Listed">
      <defs>
        <filter id="dl-depth" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#dl-depth)">
        {/* Extrusion: stacked offset copies of the wordmark give it depth */}
        {[3, 2.4, 1.8, 1.2, 0.6].map((d) => (
          <text
            key={d}
            x={d}
            y={44 + d}
            fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
            fontStyle="italic"
            fontWeight="600"
            fontSize="46"
            letterSpacing="-1.5"
            fill="#000"
            opacity="0.18"
          >
            Directly
          </text>
        ))}
        <text
          x="0"
          y="44"
          fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
          fontStyle="italic"
          fontWeight="600"
          fontSize="46"
          letterSpacing="-1.5"
          fill="currentColor"
        >
          Directly
        </text>

        <text
          x="74"
          y="64"
          fill="#9aa6b2"
          fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
          fontWeight="600"
          fontSize="17"
          letterSpacing="7"
        >
          LISTED
        </text>

        {/* Flag / chevron mark with subtle two-tone for depth */}
        <polygon points="196,8 246,8 240,17 202,17" fill="#9aa6b2" />
        <polygon points="200,21 238,21 232,30 206,30" fill="currentColor" />
        {/* Lightning slash */}
        <polygon points="186,30 198,30 168,72 160,72" fill="currentColor" />
      </g>
    </svg>
  );
}

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="4" y="22" width="7" height="14" rx="1.5" fill="currentColor" opacity="0.55" />
      <rect x="14" y="14" width="7" height="22" rx="1.5" fill="currentColor" opacity="0.8" />
      <rect x="24" y="4" width="7" height="32" rx="1.5" fill="currentColor" />
      <path d="M24 4 L36 4 L36 16 Z" fill="var(--color-accent)" />
    </svg>
  );
}

/**
 * Brand logo. Drop the official raster at public/brand/logo.png and it is
 * used automatically; otherwise the built-in 3D wordmark renders.
 */
const BRAND = path.join(process.cwd(), "public", "brand");

// Layered drop-shadows give the flat raster logo a sense of extruded 3D depth.
const DEPTH_DARK =
  "drop-shadow(0 1px 0 rgba(0,0,0,.55)) drop-shadow(0 2px 1px rgba(0,0,0,.45)) drop-shadow(0 5px 7px rgba(0,0,0,.40))";
const DEPTH_LIGHT =
  "drop-shadow(0 1px 0 rgba(10,37,64,.35)) drop-shadow(0 3px 5px rgba(10,37,64,.25))";

export function Logo({ dark = false }: { dark?: boolean }) {
  const hasLight = existsSync(path.join(BRAND, "logo-light.png"));
  const hasPng = existsSync(path.join(BRAND, "logo.png"));

  // Dark backgrounds: white "Directly" + mark, gray "LISTED", on the page color
  // (no chip), with 3D depth shadows.
  if (dark && hasLight) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/brand/logo-light.png" alt="Directly Listed" className="h-12 w-auto" style={{ filter: DEPTH_DARK }} />
    );
  }
  // Light backgrounds: original navy logo with subtle depth.
  if (hasPng) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/brand/logo.png" alt="Directly Listed" className="h-12 w-auto" style={{ filter: DEPTH_LIGHT }} />
    );
  }
  return (
    <span className={dark ? "text-white" : "text-navy-900"}>
      <LogoWordmark className="h-12 w-auto" />
    </span>
  );
}
