import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { getCurrentUser } from "@/lib/session";

export const runtime = "nodejs";

const MAX_BYTES = 20 * 1024 * 1024; // 20MB
const ALLOWED = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];

// Admin uploads a blog image/graphic; returns its public URL. Files live on the
// persistent disk under public/uploads/blog and are served by app/uploads/[...].
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file || file.size === 0) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "File exceeds 20MB" }, { status: 400 });

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED.includes(ext)) {
    return NextResponse.json({ error: `Unsupported type ${ext}. Allowed: ${ALLOWED.join(", ")}` }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "public", "uploads", "blog");
  await mkdir(dir, { recursive: true });
  const name = `${crypto.randomUUID()}${ext}`;
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/uploads/blog/${name}` });
}
