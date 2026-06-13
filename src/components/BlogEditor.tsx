import { savePost } from "@/lib/blog-actions";

export function BlogEditor({
  post,
}: {
  post?: {
    id: string;
    title: string;
    excerpt: string | null;
    content: string;
    author: string;
    tags: string | null;
  };
}) {
  return (
    <form action={savePost} className="card mx-auto max-w-3xl space-y-5 !p-8">
      {post && <input type="hidden" name="postId" value={post.id} />}
      <div>
        <label htmlFor="bp-title" className="label">Title</label>
        <input id="bp-title" name="title" required defaultValue={post?.title} className="input text-lg font-semibold" />
      </div>
      <div>
        <label htmlFor="bp-excerpt" className="label">Excerpt (shown on the blog index and in search results)</label>
        <textarea id="bp-excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} className="input" />
      </div>
      <div>
        <label htmlFor="bp-content" className="label">Body</label>
        <textarea
          id="bp-content"
          name="content"
          rows={18}
          required
          defaultValue={post?.content}
          className="input font-mono text-xs"
          placeholder={"Write in plain text.\n\n## Section headings start with two hashes\n\nSeparate paragraphs with a blank line.\n\n- Bullet lists start with a dash\n\nLink like this: [SEC EDGAR](https://www.sec.gov/edgar/search/)"}
        />
        <p className="mt-1 text-xs text-navy-900/60">
          Formatting: blank line = new paragraph · <code>## Heading</code> ·{" "}
          <code>- bullet</code> · <code>[link text](https://…)</code>
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bp-author" className="label">Author</label>
          <input id="bp-author" name="author" defaultValue={post?.author ?? "Directly Listed"} className="input" />
        </div>
        <div>
          <label htmlFor="bp-tags" className="label">Tags (comma-separated)</label>
          <input id="bp-tags" name="tags" defaultValue={post?.tags ?? ""} className="input" placeholder="Direct Listing, Reg A+" />
        </div>
      </div>
      <button className="btn-dark w-full">{post ? "Save Changes" : "Create Draft"}</button>
    </form>
  );
}
