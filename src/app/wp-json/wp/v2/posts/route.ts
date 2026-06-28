import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { checkWpAuth, wpUnauthorized, savePostFromWp, toWpPost } from "@/lib/wp-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// List posts (WordPress shape). Public, like a standard WP site.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const perPage = Math.min(Number(url.searchParams.get("per_page") ?? 10) || 10, 100);
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: perPage,
  });
  const shaped = await Promise.all(posts.map(toWpPost));
  return NextResponse.json(shaped);
}

// Create a post.
export async function POST(req: Request) {
  if (!(await checkWpAuth(req))) return wpUnauthorized();
  let body: Record<string, unknown> = {};
  try {
    const ct = req.headers.get("content-type") || "";
    body = ct.includes("application/json")
      ? await req.json()
      : Object.fromEntries([...(await req.formData()).entries()]);
  } catch {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }
  if (!String(body.title ?? "").trim() && typeof body.title !== "object") {
    return NextResponse.json({ code: "rest_missing_param", message: "title is required", data: { status: 400 } }, { status: 400 });
  }
  try {
    const post = await savePostFromWp(body);
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return NextResponse.json(await toWpPost(post), { status: 201 });
  } catch (e) {
    console.error("[wp posts POST]", e instanceof Error ? e.message : e);
    return NextResponse.json({ message: "Could not create post" }, { status: 500 });
  }
}
