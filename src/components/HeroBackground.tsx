import { existsSync } from "fs";
import path from "path";

// Cinematic hero backdrop: a generic high-res exchange LED wall (generated
// in-house — dark navy, glowing tickers, no people, no trademarks) on a slow
// seamless Ken Burns pan, under a deep-navy shadow overlay, with drifting
// market lines and teal/blue atmosphere. If a licensed clip is dropped at
// public/videos/hero-loop.mp4 it plays on top of the still automatically.
// Honors prefers-reduced-motion (styles in globals.css).
export function HeroBackground() {
  const videoDir = path.join(process.cwd(), "public", "videos");
  const hasVideo = existsSync(path.join(videoDir, "hero-loop.mp4"));
  const hasPoster = existsSync(path.join(videoDir, "hero-poster.jpg"));

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-navy-950">
      {/* The exchange wall — slow pan/zoom loop for a video feel */}
      <div
        className="hero-pan absolute inset-[-6%] bg-cover"
        style={{
          backgroundImage: "url(/hero/nasdaq-wall.jpg)",
          backgroundPosition: "center 35%",
        }}
      />

      {/* Optional licensed footage layer (public/videos/hero-loop.mp4) */}
      {hasVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={hasPoster ? "/videos/hero-poster.jpg" : undefined}
          className="hero-video-el absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Deep-navy shadow overlay — dark cinematic wash, copy stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/60 to-navy-950/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/30 to-navy-950/50" />

      {/* Color atmosphere — market-blue and teal glows drifting over the wall */}
      <div
        className="hero-glow absolute inset-0"
        style={{
          background:
            "radial-gradient(760px 400px at 68% 55%, rgba(54,197,181,0.14) 0%, transparent 70%), radial-gradient(900px 480px at 12% 25%, rgba(51,128,252,0.16) 0%, transparent 65%)",
        }}
      />

      {/* Drifting market lines (duplicated for a seamless loop) */}
      <svg
        className="absolute bottom-[10%] left-0 h-[36%] w-full opacity-30"
        viewBox="0 0 2400 400"
        preserveAspectRatio="none"
      >
        <g className="hero-ticker">
          <path
            d="M0,300 L100,280 L200,310 L300,240 L400,265 L500,200 L600,235 L700,170 L800,210 L900,140 L1000,180 L1100,120 L1200,300 L1300,280 L1400,310 L1500,240 L1600,265 L1700,200 L1800,235 L1900,170 L2000,210 L2100,140 L2200,180 L2300,120 L2400,300"
            fill="none"
            stroke="#36c5b5"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </g>
        <g className="hero-ticker-slow">
          <path
            d="M0,360 L120,340 L240,365 L360,310 L480,330 L600,280 L720,305 L840,250 L960,285 L1080,230 L1200,360 L1320,340 L1440,365 L1560,310 L1680,330 L1800,280 L1920,305 L2040,250 L2160,285 L2280,230 L2400,360"
            fill="none"
            stroke="#59a2ff"
            strokeWidth="2"
            strokeLinejoin="round"
            opacity="0.6"
          />
        </g>
      </svg>
    </div>
  );
}
