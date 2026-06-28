import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { checkWpAuth, wpUnauthorized, savePostFromWp, toWpPost } from "@/lib/wp-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function resolvePost(idParam: string) {
  const refId = Number(idParam);
  if (!Number.isInteger(refId)) return null;
  const ref = await db.wpPostRef.findUnique({ where: { id: refId } });
  if (!ref) return null;
  return db.blogPost.findUnique({ where: { id: ref.postId } });
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await resolvePost(id);
  if (!post) return NextResponse.json({ code: "rest_post_invalid_id", message: "Invalid post ID.", data: { status: 404 } }, { status: 404 });
  return NextResponse.json(await toWpPost(post));
}

// WordPress updates via POST (or PUT) to /posts/<id>.
async function update(req: Request, idParam: string) {
  if (!(await checkWpAuth(req))) return wpUnauthorized();
  const post = await resolvePost(idParam);
  if (!post) return NextResponse.json({ code: "rest_post_invalid_id", message: "Invalid post ID.", data: { status: 404 } }, { status: 404 });
  let body: Record<string, unknown> = {};
  try {
    const ct = req.headers.get("content-type") || "";
    body = ct.includes("application/json")
      ? await req.json()
      : Object.fromEntries([...(await req.formData()).entries()]);
  } catch {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }
  // Preserve existing title/content when not supplied in the update.
  if (body.title === undefined) body.title = post.title;
  if (body.content === undefined) body.content = post.content;
  const updated = await savePostFromWp(body, { postId: post.id });
  revalidatePath("/blog");
  revalidatePath(`/blog/${updated.slug}`);
  return NextResponse.json(await toWpPost(updated));
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return update(req, id);
}
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return update(req, id);
}
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return update(req, id);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkWpAuth(req))) return wpUnauthorized();
  const { id } = await params;
  const post = await resolvePost(id);
  if (!post) return NextResponse.json({ code: "rest_post_invalid_id", message: "Invalid post ID.", data: { status: 404 } }, { status: 404 });
  const shaped = await toWpPost(post);
  await db.blogPost.delete({ where: { id: post.id } }).catch(() => {});
  revalidatePath("/blog");
  return NextResponse.json({ deleted: true, previous: shaped });
}
