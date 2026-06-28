import { NextResponse } from "next/server";
import { checkWpAuth, wpUnauthorized, getWpCreds, SITE_URL } from "@/lib/wp-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Credential check endpoint — WordPress clients call this to validate the
// application password and confirm the user can publish/upload.
export async function GET(req: Request) {
  if (!(await checkWpAuth(req))) return wpUnauthorized();
  const { username } = await getWpCreds();
  return NextResponse.json({
    id: 1,
    name: username,
    slug: username,
    description: "",
    url: SITE_URL,
    link: SITE_URL,
    roles: ["administrator"],
    capabilities: { publish_posts: true, edit_posts: true, edit_others_posts: true, upload_files: true, manage_categories: true },
    extra_capabilities: { administrator: true },
  });
}
