import { existsSync } from "fs";
import path from "path";

/**
 * DealMaker-style hero backdrop: a muted looping video behind a dark
 * "shadow" overlay. Drop a licensed loop at public/videos/hero-loop.mp4
 * (optional poster at hero-poster.jpg) and it plays automatically;
 * otherwise an animated market-line loop renders in pure CSS/SVG.
 * Honors prefers-reduced-motion.
 */
export function HeroBackground() {
  const videoDir = path.join(process.cwd(), "public", "videos");
  const hasVideo = existsSync(path.join(videoDir, "hero-loop.mp4"));
  const hasPoster = existsSync(path.join(videoDir, "hero-poster.jpg"));

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {hasVideo ? (
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
      ) : (
        <>
          <div
            className="hero-pan absolute inset-[-8%]"
            style={{
              background:
                "radial-gradient(1200px 600px at 80% 20%, #16406b 0%, transparent 60%), radial-gradient(900px 500px at 20% 90%, #183fb4 0%, transparent 55%), linear-gradient(160deg, #061629 0%, #0a2540 100%)",
            }}
          />
          <div
            className="hero-glow absolute inset-0"
            style={{
              background:
                "radial-gradient(700px 380px at 60% 65%, rgba(54,197,181,0.18) 0%, transparent 70%)",
            }}
          />
          {/* Drifting market lines (duplicated for a seamless loop) */}
          <svg
            className="absolute bottom-[12%] left-0 h-[40%] w-full opacity-40"
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
                stroke="#3380fc"
                strokeWidth="2"
                strokeLinejoin="round"
                opacity="0.6"
              />
            </g>
          </svg>
        </>
      )}
      {/* Shadow overlay — keeps hero copy readable over any footage */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/55 to-navy-950/90" />
    </div>
  );
}
