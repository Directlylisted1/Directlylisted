import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { db } from "@/lib/db";
import { checkWpAuth, wpUnauthorized, SITE_URL } from "@/lib/wp-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

export async function GET() {
  return NextResponse.json([]);
}

// WordPress media upload — accepts multipart (file field) or a raw binary body
// with a Content-Disposition filename. Returns a WP media object whose `id` can
// be used as `featured_media` when creating a post.
export async function POST(req: Request) {
  if (!(await checkWpAuth(req))) return wpUnauthorized();

  let buf: Buffer;
  let filename = "upload";
  let mime = "application/octet-stream";
  const ct = req.headers.get("content-type") || "";
  try {
    if (ct.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file");
      if (!file || typeof file === "string") {
        return NextResponse.json({ message: "No file" }, { status: 400 });
      }
      buf = Buffer.from(await file.arrayBuffer());
      filename = file.name || filename;
      mime = file.type || mime;
    } else {
      buf = Buffer.from(await req.arrayBuffer());
      const cd = req.headers.get("content-disposition") || "";
      const m = cd.match(/filename\*?=(?:UTF-8'')?"?([^"';]+)"?/i);
      if (m) filename = decodeURIComponent(m[1]);
      mime = ct.split(";")[0] || mime;
    }
  } catch {
    return NextResponse.json({ message: "Invalid upload" }, { status: 400 });
  }
  if (!buf.length) return NextResponse.json({ message: "Empty file" }, { status: 400 });

  const ext = path.extname(filename).toLowerCase() || EXT_BY_MIME[mime] || ".bin";
  const dir = path.join(process.cwd(), "public", "uploads", "blog");
  await mkdir(dir, { recursive: true });
  const name = `${crypto.randomUUID()}${ext}`;
  await writeFile(path.join(dir, name), buf);

  const url = `/uploads/blog/${name}`;
  const media = await db.wpMedia.create({ data: { url, mimeType: mime } });
  const source = `${SITE_URL}${url}`;
  const now = new Date().toISOString().replace("Z", "");
  return NextResponse.json(
    {
      id: media.id,
      date: now,
      slug: name,
      type: "attachment",
      link: source,
      title: { rendered: filename, raw: filename },
      source_url: source,
      guid: { rendered: source },
      media_type: "image",
      mime_type: mime,
    },
    { status: 201 },
  );
}
