"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NavGroup } from "@/lib/nav";

export type BlogTeaser = { slug: string; title: string; excerpt: string | null };

export function NavMenus({
  groups,
  blogPosts,
}: {
  groups: NavGroup[];
  blogPosts: BlogTeaser[];
}) {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div ref={ref} className="hidden items-center gap-1 text-sm font-medium text-white/90 lg:flex">
      {groups.map((g) => (
        <div key={g.label} className="relative">
          <button
            type="button"
            aria-expanded={open === g.label}
            onClick={() => setOpen(open === g.label ? null : g.label)}
            className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white/10 hover:text-white ${
              open === g.label ? "bg-white/10 text-white" : ""
            }`}
          >
            {g.label}
            <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${open === g.label ? "rotate-180" : ""}`} aria-hidden>
              <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          {open === g.label && (
            <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-white/10 bg-navy-950 p-2 shadow-2xl">
              {g.href && (
                <Link
                  href={g.href}
                  onClick={() => setOpen(null)}
                  className="block rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-accent hover:bg-white/10"
                >
                  {g.label} — Overview
                </Link>
              )}
              {g.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(null)}
                  className="block rounded-xl px-4 py-2.5 text-white/85 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Blog/Vlog — expandable boxes of articles */}
      <div className="relative">
        <button
          type="button"
          aria-expanded={open === "blog"}
          onClick={() => setOpen(open === "blog" ? null : "blog")}
          className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white/10 hover:text-white ${
            open === "blog" ? "bg-white/10 text-white" : ""
          }`}
        >
          Blog/Vlog
          <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${open === "blog" ? "rotate-180" : ""}`} aria-hidden>
            <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        {open === "blog" && (
          <div className="absolute right-0 top-full z-50 mt-2 w-[34rem] max-w-[80vw] rounded-2xl border border-white/10 bg-navy-950 p-4 shadow-2xl">
            <div className="grid grid-cols-2 gap-3">
              {blogPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  onClick={() => setOpen(null)}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-accent/60 hover:bg-white/10"
                >
                  <div className="mb-1 text-sm font-bold text-white">{p.title}</div>
                  {p.excerpt && (
                    <p className="line-clamp-2 text-xs text-white/60">{p.excerpt}</p>
                  )}
                </Link>
              ))}
              {blogPosts.length === 0 && (
                <p className="col-span-2 p-2 text-sm text-white/60">New articles coming soon.</p>
              )}
            </div>
            <Link
              href="/blog"
              onClick={() => setOpen(null)}
              className="mt-3 block rounded-xl px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-accent hover:bg-white/10"
            >
              View All Articles & Videos →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
