import { db } from "@/lib/db";
import { savePromoVideos } from "@/lib/settings-actions";
import { PROMO_KEYS } from "@/lib/settings-keys";

export default async function AdminSettingsPage() {
  const settings = await db.siteSetting.findMany();
  const value = (key: string) => settings.find((s) => s.key === key)?.value ?? "";

  return (
    <div className="mx-auto max-w-2xl">
      <form action={savePromoVideos} className="card space-y-5 !p-8">
        <div>
          <h2 className="mb-1 text-xl font-bold">Promo Videos</h2>
          <p className="text-sm text-navy-900/70">
            Paste YouTube or Vimeo links. Each video embeds on its page; pages
            without a specific video fall back to the site-wide default. Leave
            a field empty to remove the video.
          </p>
        </div>
        {PROMO_KEYS.map(({ key, label }) => (
          <div key={key}>
            <label htmlFor={`set-${key}`} className="label">{label}</label>
            <input
              id={`set-${key}`}
              name={key}
              type="url"
              defaultValue={value(key)}
              className="input"
              placeholder="https://www.youtube.com/watch?v=…"
            />
          </div>
        ))}
        <button className="btn-dark w-full">Save Promo Videos</button>
      </form>
    </div>
  );
}
