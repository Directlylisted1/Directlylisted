"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { getCurrentUser } from "./session";
import { isSupportedVideoUrl } from "./video";
import { PROMO_KEYS } from "./settings-keys";

export async function savePromoVideos(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/signin?next=/admin/settings");

  for (const { key } of PROMO_KEYS) {
    const value = String(formData.get(key) ?? "").trim();
    if (value && !isSupportedVideoUrl(value)) continue; // silently skip invalid URLs
    if (value) {
      await db.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    } else {
      await db.siteSetting.deleteMany({ where: { key } });
    }
  }
  revalidatePath("/", "layout");
  redirect("/admin/settings");
}
