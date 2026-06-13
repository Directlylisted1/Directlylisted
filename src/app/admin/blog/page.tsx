import Link from "next/link";
import { db } from "@/lib/db";
import { StatusBadge } from "@/components/AppShell";
import { deletePost, setPostPublished } from "@/lib/blog-actions";

export default async function AdminBlogList() {
  const posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-navy-900/70">
          Posts appear on the public <Link href="/blog" className="font-semibold text-brand-600">/blog</Link> page once published.
        </p>
        <Link href="/admin/blog/new" className="btn-dark !py-2 text-xs">+ New Post</Link>
      </div>
      {posts.length === 0 ? (
        <div className="card text-sm text-navy-900/70">No posts yet. Write your first one.</div>
      ) : (
        <div className="card overflow-x-auto !p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-navy-900/10 text-left text-xs uppercase text-navy-900/60">
              <tr>
                <th scope="col" className="px-5 py-3">Title</th>
                <th scope="col" className="px-5 py-3">Author</th>
                <th scope="col" className="px-5 py-3">Status</th>
                <th scope="col" className="px-5 py-3">Published</th>
                <th scope="col" className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-navy-900/5">
                  <td className="px-5 py-3">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-navy-900/60">/blog/{p.slug}</div>
                  </td>
                  <td className="px-5 py-3">{p.author}</td>
                  <td className="px-5 py-3">
                    <StatusBadge value={p.published ? "LIVE" : "DRAFT"} />
                  </td>
                  <td className="px-5 py-3 text-xs">
                    {p.publishedAt?.toLocaleDateString() ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admin/blog/${p.id}`} className="btn-outline !px-4 !py-2 text-[11px]">
                        Edit
                      </Link>
                      <form action={setPostPublished}>
                        <input type="hidden" name="postId" value={p.id} />
                        <input type="hidden" name="publish" value={(!p.published).toString()} />
                        <button className="btn-primary !px-4 !py-2 text-[11px]">
                          {p.published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <form action={deletePost}>
                        <input type="hidden" name="postId" value={p.id} />
                        <button className="rounded-full border border-red-200 px-4 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50">
                          Delete<span className="sr-only"> {p.title}</span>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
