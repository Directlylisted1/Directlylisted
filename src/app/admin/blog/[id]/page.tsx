import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { BlogEditor } from "@/components/BlogEditor";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await db.blogPost.findUnique({ where: { id } });
  if (!post) notFound();
  return <BlogEditor post={post} />;
}
