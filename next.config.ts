import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served via `next start` (see Dockerfile / scripts/start.mjs), which needs the
  // full build + node_modules — not the standalone server — so the runtime has
  // the Prisma CLI + tsx for the on-boot db push/seed.
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  // ConveyThis language subdirectories: the language switcher links to
  // /es/..., /fr/..., /zh-cn/..., etc. Serve the underlying page for any
  // two-letter (optionally region-suffixed) prefix — the ConveyThis script
  // reads the prefix client-side and renders the page in that language.
  // These run after the filesystem routes, so real pages always win.
  async rewrites() {
    return [
      { source: "/:lang([a-z]{2}(?:-[a-z]{2})?)", destination: "/" },
      { source: "/:lang([a-z]{2}(?:-[a-z]{2})?)/:path*", destination: "/:path*" },
    ];
  },
};

export default nextConfig;
