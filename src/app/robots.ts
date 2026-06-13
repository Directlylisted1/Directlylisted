import type { MetadataRoute } from "next";

const SITE = "https://www.directlylisted.com";

// Explicitly welcome AI crawlers alongside traditional search engines so the
// platform is discoverable in AI answer engines (ChatGPT, Claude, Perplexity).
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/portal", "/issuer", "/api"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-Web", allow: "/", disallow },
      { userAgent: "anthropic-ai", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "CCBot", allow: "/", disallow },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
