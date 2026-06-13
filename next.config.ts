import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Docker/AWS deployment (node .next/standalone/server.js)
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
