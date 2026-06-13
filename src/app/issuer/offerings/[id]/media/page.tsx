import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { AddVideoForm, UploadAssetForm } from "@/components/MediaForms";
import { deleteAsset } from "@/lib/media-actions";
import { toEmbedUrl } from "@/lib/video";

export const metadata = { title: "Campaign Media — Directly Listed" };

const fmtSize = (b?: number | null) =>
  !b ? "" : b > 1_048_576 ? `${(b / 1_048_576).toFixed(1)} MB` : `${Math.ceil(b / 1024)} KB`;

export default async function CampaignMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = (await getCurrentUser())!;
  const offering = await db.offering.findUnique({
    where: { id },
    include: { assets: { orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] } },
  });
  if (!offering || offering.issuerId !== user.issuerProfile!.id) notFound();

  const images = offering.assets.filter((a) => a.kind === "IMAGE");
  const videos = offering.assets.filter((a) => a.kind === "VIDEO_LINK");
  const files = offering.assets.filter((a) =>
    ["DOCUMENT", "PRESENTATION", "OTHER"].includes(a.kind),
  );

  const DeleteButton = ({ assetId, title }: { assetId: string; title: string }) => (
    <form action={deleteAsset}>
      <input type="hidden" name="assetId" value={assetId} />
      <button className="rounded-full border border-red-200 px-3 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-50">
        Remove<span className="sr-only"> {title}</span>
      </button>
    </form>
  );

  return (
    <div className="space-y-8">
      <div>
        <Link href={`/issuer/offerings/${id}`} className="text-sm text-brand-600">
          ← Back to offering
        </Link>
        <h2 className="text-2xl font-bold">Campaign Media — {offering.name}</h2>
        <p className="mt-1 max-w-2xl text-sm text-navy-900/70">
          Photos, videos, documents, presentations, and other materials you add
          here appear on your public offering page
          {offering.status === "LIVE" && (
            <> — <Link href={`/offerings/${offering.slug}`} className="font-semibold text-brand-600">view it live</Link></>
          )}
          .
        </p>
      </div>

      {/* Photos */}
      <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="card h-fit !p-6">
          <UploadAssetForm
            offeringId={id}
            kind="IMAGE"
            accept=".jpg,.jpeg,.png,.webp,.gif"
            heading="Upload a Photo"
            hint="JPG, PNG, WebP, or GIF."
          />
        </div>
        <div className="card !p-6">
          <h3 className="mb-4 text-sm font-bold">Photos ({images.length})</h3>
          {images.length === 0 ? (
            <p className="text-sm text-navy-900/60">No photos yet.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((a) => (
                <li key={a.id} className="space-y-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.url} alt={a.title} className="aspect-video w-full rounded-lg object-cover" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-medium">{a.title}</span>
                    <DeleteButton assetId={a.id} title={a.title} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Videos */}
      <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="card h-fit !p-6">
          <AddVideoForm offeringId={id} />
        </div>
        <div className="card !p-6">
          <h3 className="mb-4 text-sm font-bold">Videos ({videos.length})</h3>
          {videos.length === 0 ? (
            <p className="text-sm text-navy-900/60">No videos yet. Paste a YouTube or Vimeo link.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {videos.map((a) => {
                const embed = toEmbedUrl(a.url);
                return (
                  <li key={a.id} className="space-y-2">
                    {embed && (
                      <iframe
                        src={embed}
                        title={a.title}
                        className="aspect-video w-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-xs font-medium">{a.title}</span>
                      <DeleteButton assetId={a.id} title={a.title} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* Documents & presentations */}
      <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="card h-fit space-y-6 !p-6">
          <UploadAssetForm
            offeringId={id}
            kind="PRESENTATION"
            accept=".pdf,.ppt,.pptx"
            heading="Upload a Presentation"
            hint="PDF, PPT, or PPTX."
          />
          <hr className="border-navy-900/10" />
          <UploadAssetForm
            offeringId={id}
            kind="DOCUMENT"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
            heading="Upload a Document"
            hint="PDF, Word, Excel, CSV, or text."
          />
        </div>
        <div className="card !p-6">
          <h3 className="mb-4 text-sm font-bold">Documents &amp; Presentations ({files.length})</h3>
          {files.length === 0 ? (
            <p className="text-sm text-navy-900/60">No documents yet.</p>
          ) : (
            <ul className="space-y-3">
              {files.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-navy-900/10 p-4 text-sm">
                  <div className="min-w-0">
                    <a href={a.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 hover:underline">
                      {a.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <div className="text-xs text-navy-900/60">
                      {a.kind.replaceAll("_", " ")} · {a.fileName} {fmtSize(a.sizeBytes) && `· ${fmtSize(a.sizeBytes)}`}
                    </div>
                  </div>
                  <DeleteButton assetId={a.id} title={a.title} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
