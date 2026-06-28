import { NextResponse } from "next/server";
import { checkWpAuth, wpUnauthorized } from "@/lib/wp-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Our blog uses a free-text tags field, not WP taxonomies. Report an empty list,
// and synthesize an object on create so a client's category step doesn't fail.
export async function GET() {
  return NextResponse.json([]);
}

export async function POST(req: Request) {
  if (!(await checkWpAuth(req))) return wpUnauthorized();
  let name = "Uncategorized";
  try {
    const body = (await req.json()) as { name?: string };
    if (body?.name) name = String(body.name);
  } catch {}
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return NextResponse.json({ id: 1, name, slug, taxonomy: "category", count: 0 }, { status: 201 });
}
