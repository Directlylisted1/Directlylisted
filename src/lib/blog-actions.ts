"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { getCurrentUser } from "./session";
import { sanitizeHtml, looksLikeHtml } from "./sanitize-html";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/signin?next=/admin/blog");
  return user;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

export async function savePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("postId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const rawContent = String(formData.get("content") ?? "");
  const data = {
    title,
    excerpt: String(formData.get("excerpt") ?? "").trim() || null,
    // Sanitize rich/pasted HTML; leave markdown-lite text as-is.
    content: looksLikeHtml(rawContent) ? sanitizeHtml(rawContent) : rawContent,
    coverImage: String(formData.get("coverImage") ?? "").trim() || null,
    author: String(formData.get("author") ?? "").trim() || "Directly Listed",
    tags: String(formData.get("tags") ?? "").trim() || null,
  };

  if (id) {
    await db.blogPost.update({ where: { id }, data });
  } else {
    let slug = slugify(title) || `post-${Date.now().toString(36)}`;
    if (await db.blogPost.findUnique({ where: { slug } })) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }
    await db.blogPost.create({ data: { ...data, slug } });
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function setPostPublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("postId"));
  const publish = String(formData.get("publish")) === "true";
  const post = await db.blogPost.findUniqueOrThrow({ where: { id } });
  await db.blogPost.update({
    where: { id },
    data: {
      published: publish,
      publishedAt: publish ? (post.publishedAt ?? new Date()) : post.publishedAt,
    },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("postId"));
  await db.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
