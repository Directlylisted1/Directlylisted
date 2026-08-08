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
    return [
      ...langs.flatMap(([prefix, sub]) => [
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
      ]),
      // The self-serve booking calendar was removed (SE Ranking audit fix #1:
      // 360 parameterised slot URLs were flooding the index with duplicate
      // titles). Send old slot/confirmation URLs to the request form so Google
      // processes the removals and visitors land somewhere useful.
      { source: "/book/details", destination: "/book", permanent: true },
      { source: "/book/confirmed", destination: "/book", permanent: true },
    ];
  },
};

export default nextConfig;
