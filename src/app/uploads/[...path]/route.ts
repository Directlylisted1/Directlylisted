import { readFile, stat } from "fs/promises";
import path from "path";

// Serve issuer-uploaded campaign assets (images, PDFs, decks) from the
// persistent disk at request time. Next.js `next start` only serves files that
// were in `public/` at BUILD time, so runtime uploads to public/uploads 404 via
// static serving — this handler reads them from disk instead.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOADS_ROOT = path.join(process.cwd(), "public", "uploads");

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".csv": "text/csv",
  ".txt": "text/plain; charset=utf-8",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: parts } = await params;
  // Resolve and guard against path traversal — must stay under UPLOADS_ROOT.
  const filePath = path.normalize(path.join(UPLOADS_ROOT, ...parts));
  if (filePath !== UPLOADS_ROOT && !filePath.startsWith(UPLOADS_ROOT + path.sep)) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) return new Response("Not found", { status: 404 });
    const data = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const type = CONTENT_TYPES[ext] ?? "application/octet-stream";
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": type,
        "Content-Length": String(info.size),
        // PDFs/images open inline in the browser.
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=3600, must-revalidate",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
