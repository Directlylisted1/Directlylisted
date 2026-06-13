import { db } from "@/lib/db";
import { toEmbedUrl } from "@/lib/video";

/**
 * Embedded promo video slot. Renders the YouTube/Vimeo video configured in
 * the admin back office (Settings → Promo Videos) for the given key, falling
 * back to the site-wide default. Renders nothing if no video is configured,
 * so it can safely sit on every relevant page.
 */
export async function PromoVideo({
  settingKey,
  title = "Directly Listed promo video",
}: {
  settingKey: string;
  title?: string;
}) {
  const settings = await db.siteSetting
    .findMany({ where: { key: { in: [settingKey, "promo_default"] } } })
    .catch(() => []);
  const url =
    settings.find((s) => s.key === settingKey)?.value ??
    settings.find((s) => s.key === "promo_default")?.value;
  if (!url) return null;
  const embed = toEmbedUrl(url);
  if (!embed) return null;

  return (
    <iframe
      src={embed}
      title={title}
      className="aspect-video w-full rounded-2xl shadow-lg"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
