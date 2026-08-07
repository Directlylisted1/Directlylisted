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
  // ConveyThis runs in sub-domain mode (es.directlylisted.com, ...): each
  // language subdomain CNAMEs to ConveyThis, which serves the translated site.
  // Redirect the old /es-style path prefixes to the matching subdomain so any
  // previously shared or indexed subdirectory URL lands on the canonical
  // translated page instead of duplicate English content.
  async redirects() {
    const langs: Array<[string, string]> = [
      ["ar", "ar"],
      ["zh", "zh"],
      ["zh-cn", "zh"],
      ["fr", "fr"],
      ["pt-br", "pt-br"],
      ["es", "es"],
    ];
    return langs.flatMap(([prefix, sub]) => [
      {
        source: `/${prefix}`,
        destination: `https://${sub}.directlylisted.com/`,
        permanent: true,
      },
      {
        source: `/${prefix}/:path*`,
        destination: `https://${sub}.directlylisted.com/:path*`,
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;
