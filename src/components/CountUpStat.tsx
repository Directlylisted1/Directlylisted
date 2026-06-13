"use client";

import { useEffect, useRef, useState } from "react";

/** Animated count-up for hero stats, e.g. value="$2B+" animates 0→2.
 * Respects prefers-reduced-motion (renders the final value immediately). */
export function CountUpStat({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^([^0-9]*)([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;
  const [display, setDisplay] = useState(match ? "0" : value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(match[2]);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const duration = 1600;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay((target * eased).toFixed(decimals));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {match[1]}
      {display}
      {match[3]}
    </span>
  );
}
