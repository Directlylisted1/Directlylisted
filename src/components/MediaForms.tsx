"use client";

import { useActionState } from "react";
import { addVideoLink, uploadAsset } from "@/lib/media-actions";

export function UploadAssetForm({
  offeringId,
  kind,
  accept,
  heading,
  hint,
}: {
  offeringId: string;
  kind: "IMAGE" | "DOCUMENT" | "PRESENTATION" | "OTHER";
  accept: string;
  heading: string;
  hint: string;
}) {
  const [state, action, pending] = useActionState(uploadAsset, undefined);
  const idp = `up-${kind.toLowerCase()}`;
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="offeringId" value={offeringId} />
      <input type="hidden" name="kind" value={kind} />
      <h3 className="text-sm font-bold">{heading}</h3>
      <div>
        <label htmlFor={`${idp}-title`} className="label">Title</label>
        <input id={`${idp}-title`} name="title" className="input" placeholder="e.g. Investor deck Q2" />
      </div>
      <div>
        <label htmlFor={`${idp}-file`} className="label">File</label>
        <input
          id={`${idp}-file`}
          name="file"
          type="file"
          accept={accept}
          required
          className="input !p-2 file:mr-3 file:rounded-full file:border-0 file:bg-navy-900 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white"
        />
        <p className="mt-1 text-xs text-navy-900/60">{hint} Max 20MB.</p>
      </div>
      {state?.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
      <button disabled={pending} className="btn-dark w-full !py-2.5 text-xs disabled:opacity-50">
        {pending ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}

export function AddVideoForm({ offeringId }: { offeringId: string }) {
  const [state, action, pending] = useActionState(addVideoLink, undefined);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="offeringId" value={offeringId} />
      <h3 className="text-sm font-bold">Add a Video Link</h3>
      <div>
        <label htmlFor="vid-title" className="label">Title</label>
        <input id="vid-title" name="title" required className="input" placeholder="e.g. Founder pitch video" />
      </div>
      <div>
        <label htmlFor="vid-url" className="label">YouTube or Vimeo URL</label>
        <input
          id="vid-url"
          name="url"
          type="url"
          required
          className="input"
          placeholder="https://www.youtube.com/watch?v=…"
        />
      </div>
      {state?.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
      <button disabled={pending} className="btn-dark w-full !py-2.5 text-xs disabled:opacity-50">
        {pending ? "Saving…" : "Add Video"}
      </button>
    </form>
  );
}
