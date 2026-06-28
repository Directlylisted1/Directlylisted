"use client";

import { useRef, useState } from "react";
import { savePost } from "@/lib/blog-actions";

const isHtml = (s: string) => /<\/?[a-z][\s\S]*>/i.test(s);

export function BlogEditor({
  post,
}: {
  post?: {
    id: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImage?: string | null;
    author: string;
    tags: string | null;
  };
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const insertRef = useRef<HTMLInputElement>(null);
  const [cover, setCover] = useState(post?.coverImage ?? "");
  const [busy, setBusy] = useState(false);

  // Legacy markdown-lite posts: show line breaks while editing.
  const initialHtml = post?.content
    ? isHtml(post.content)
      ? post.content
      : post.content.replace(/\n/g, "<br>")
    : "";

  const sync = () => {
    if (contentRef.current && editorRef.current) {
      contentRef.current.value = editorRef.current.innerHTML;
    }
  };

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    sync();
  };

  async function upload(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append("file", file);
    setBusy(true);
    try {
      const res = await fetch("/api/blog/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) {
        alert(json.error || "Upload failed");
        return null;
      }
      return json.url as string;
    } finally {
      setBusy(false);
    }
  }

  async function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      const url = await upload(f);
      if (url) setCover(url);
    }
    e.target.value = "";
  }

  async function onInsertImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      const url = await upload(f);
      if (url) {
        editorRef.current?.focus();
        document.execCommand(
          "insertHTML",
          false,
          `<img src="${url}" alt="" style="max-width:100%;height:auto;border-radius:12px;margin:1rem 0;" />`,
        );
        sync();
      }
    }
    e.target.value = "";
  }

  const Tool = ({ label, onClick, title }: { label: string; onClick: () => void; title: string }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="rounded-md border border-navy-900/15 bg-white px-2.5 py-1.5 text-xs font-semibold hover:bg-brand-50"
    >
      {label}
    </button>
  );

  return (
    <form action={savePost} className="card mx-auto max-w-3xl space-y-5 !p-8">
      {post && <input type="hidden" name="postId" value={post.id} />}
      <input type="hidden" name="content" ref={contentRef} defaultValue={post?.content ?? ""} />
      <input type="hidden" name="coverImage" value={cover} />

      <div>
        <label htmlFor="bp-title" className="label">Title</label>
        <input id="bp-title" name="title" required defaultValue={post?.title} className="input text-lg font-semibold" />
      </div>

      {/* Media section directly under the title — cover image / graphic */}
      <div className="rounded-xl border border-navy-900/10 bg-brand-50/40 p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold">Cover Image / Graphic</h3>
          <label className="btn-outline !py-2 text-xs cursor-pointer">
            {cover ? "Replace" : "Add image"}
            <input type="file" accept="image/*" className="hidden" onChange={onCoverChange} />
          </label>
        </div>
        {cover ? (
          <div className="space-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt="Cover preview" className="max-h-56 w-full rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => setCover("")}
              className="text-xs font-semibold text-red-600 hover:underline"
            >
              Remove cover
            </button>
          </div>
        ) : (
          <p className="text-xs text-navy-900/60">
            Shown under the title on the post. Recommended a wide image (e.g. 1600×900).
          </p>
        )}
      </div>

      <div>
        <label htmlFor="bp-excerpt" className="label">Excerpt (shown on the blog index and in search results)</label>
        <textarea id="bp-excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} className="input" />
      </div>

      <div>
        <span className="label">Body</span>
        {/* Formatting toolbar */}
        <div className="mb-2 flex flex-wrap gap-1.5">
          <Tool label="B" title="Bold" onClick={() => exec("bold")} />
          <Tool label="I" title="Italic" onClick={() => exec("italic")} />
          <Tool label="U" title="Underline" onClick={() => exec("underline")} />
          <Tool label="H2" title="Heading" onClick={() => exec("formatBlock", "<h2>")} />
          <Tool label="H3" title="Subheading" onClick={() => exec("formatBlock", "<h3>")} />
          <Tool label="¶" title="Paragraph" onClick={() => exec("formatBlock", "<p>")} />
          <Tool label="• List" title="Bullet list" onClick={() => exec("insertUnorderedList")} />
          <Tool label="1. List" title="Numbered list" onClick={() => exec("insertOrderedList")} />
          <Tool label="Link" title="Insert link" onClick={() => { const u = prompt("Link URL (https://…)"); if (u) exec("createLink", u); }} />
          <Tool label="Image" title="Insert image" onClick={() => insertRef.current?.click()} />
          <Tool label="Clear" title="Clear formatting" onClick={() => exec("removeFormat")} />
          <input ref={insertRef} type="file" accept="image/*" className="hidden" onChange={onInsertImage} />
        </div>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={sync}
          onBlur={sync}
          role="textbox"
          aria-multiline="true"
          aria-label="Post body"
          className="blog-body min-h-[360px] w-full rounded-lg border border-navy-900/15 bg-white px-4 py-3 text-sm leading-relaxed focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          dangerouslySetInnerHTML={{ __html: initialHtml }}
        />
        <p className="mt-1 text-xs text-navy-900/60">
          Paste directly from Word, Google Docs, or any web page — your formatting
          (bold, fonts, sizes, colors) is preserved. Use the toolbar to adjust,
          and <strong>Image</strong> to drop a picture into the body.
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

      <button disabled={busy} className="btn-dark w-full disabled:opacity-50">
        {busy ? "Uploading…" : post ? "Save Changes" : "Create Draft"}
      </button>
    </form>
  );
}
