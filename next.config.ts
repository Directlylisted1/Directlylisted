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
};

export default nextConfig;
