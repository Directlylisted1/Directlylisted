import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/wp-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// WordPress REST API discovery document — tools fetch this to confirm the site
// is "WordPress" and learn which auth methods + routes are available.
export async function GET() {
  return NextResponse.json({
    name: "Directly Listed",
    description: "Directly Listed — blog",
    url: SITE_URL,
    home: SITE_URL,
    gmt_offset: 0,
    timezone_string: "",
    namespaces: ["wp/v2"],
    authentication: {
      "application-passwords": {
        endpoints: { authorization: `${SITE_URL}/wp-admin/authorize-application.php` },
      },
    },
    routes: {
      "/wp/v2/posts": { namespace: "wp/v2", methods: ["GET", "POST"] },
      "/wp/v2/posts/(?P<id>[\\d]+)": { namespace: "wp/v2", methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] },
      "/wp/v2/media": { namespace: "wp/v2", methods: ["GET", "POST"] },
      "/wp/v2/categories": { namespace: "wp/v2", methods: ["GET"] },
      "/wp/v2/tags": { namespace: "wp/v2", methods: ["GET"] },
      "/wp/v2/users/me": { namespace: "wp/v2", methods: ["GET"] },
    },
  });
}
