"use server";

import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { getCurrentUser } from "./session";
import { isSupportedVideoUrl } from "./video";

const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20MB

const ALLOWED: Record<string, { exts: string[]; kinds: string[] }> = {
  IMAGE: { exts: [".jpg", ".jpeg", ".png", ".webp", ".gif"], kinds: ["IMAGE"] },
  FILE: {
    exts: [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".csv", ".txt"],
    kinds: ["DOCUMENT", "PRESENTATION", "OTHER"],
  },
};

/** Issuer who owns the offering — or a platform admin — may manage its media. */
async function authorizeOffering(offeringId: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");
  const offering = await db.offering.findUnique({
    where: { id: offeringId },
    include: { issuer: true },
  });
  if (!offering) redirect("/issuer");
  const isOwner = user.issuerProfile?.id === offering.issuerId;
  const isAdmin = user.role === "ADMIN";
  if (!isOwner && !isAdmin) redirect("/issuer");
  return { user, offering, backPath: isAdmin && !isOwner ? "/admin/offerings" : `/issuer/offerings/${offeringId}/media` };
}

export async function uploadAsset(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const offeringId = String(formData.get("offeringId"));
  const kind = String(formData.get("kind"));
  const title = String(formData.get("title") ?? "").trim();
  const file = formData.get("file") as File | null;
  const { backPath } = await authorizeOffering(offeringId);

  if (!file || file.size === 0) return { error: "Choose a file to upload." };
  if (file.size > MAX_FILE_BYTES) return { error: "File is larger than the 20MB limit." };

  const category = kind === "IMAGE" ? "IMAGE" : "FILE";
  if (!ALLOWED[category].kinds.includes(kind)) return { error: "Invalid material type." };
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED[category].exts.includes(ext)) {
    return { error: `File type ${ext || "(none)"} is not allowed. Allowed: ${ALLOWED[category].exts.join(", ")}` };
  }

  const dir = path.join(process.cwd(), "public", "uploads", offeringId);
  await mkdir(dir, { recursive: true });
  const safeName = `${crypto.randomUUID()}${ext}`;
  await writeFile(path.join(dir, safeName), Buffer.from(await file.arrayBuffer()));

  await db.campaignAsset.create({
    data: {
      offeringId,
      kind: kind as never,
      title: title || file.name,
      url: `/uploads/${offeringId}/${safeName}`,
      fileName: file.name,
      mimeType: file.type || null,
      sizeBytes: file.size,
    },
  });
  revalidatePath(backPath);
  redirect(backPath);
}

export async function addVideoLink(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const offeringId = String(formData.get("offeringId"));
  const title = String(formData.get("title") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const { backPath } = await authorizeOffering(offeringId);

  if (!title) return { error: "Give the video a title." };
  if (!isSupportedVideoUrl(url)) {
    return { error: "Enter a valid YouTube or Vimeo URL." };
  }

  await db.campaignAsset.create({
    data: { offeringId, kind: "VIDEO_LINK", title, url },
  });
  revalidatePath(backPath);
  redirect(backPath);
}

export async function deleteAsset(formData: FormData) {
  const assetId = String(formData.get("assetId"));
  const asset = await db.campaignAsset.findUnique({ where: { id: assetId } });
  if (!asset) return;
  const { backPath } = await authorizeOffering(asset.offeringId);

  await db.campaignAsset.delete({ where: { id: assetId } });
  if (asset.url.startsWith("/uploads/")) {
    // Best-effort file cleanup; the DB row is the source of truth.
    await unlink(path.join(process.cwd(), "public", asset.url)).catch(() => {});
  }
  revalidatePath(backPath);
}
