"use server";

import bcrypt from "bcryptjs";
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

export async function changeAdminPassword(
  _prev: { error?: string; success?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string; success?: string }> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return { error: "Not authorized." };

  const current = String(formData.get("currentPassword") ?? "");
  const next = String(formData.get("newPassword") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

  if (!bcrypt.compareSync(current, user.passwordHash)) {
    return { error: "Current password is incorrect." };
  }
  if (next.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }
  if (next !== confirm) {
    return { error: "New passwords do not match." };
  }
  if (next === current) {
    return { error: "New password must be different from the current one." };
  }

  try {
    await db.user.update({
      where: { id: user.id },
      data: { passwordHash: bcrypt.hashSync(next, 10) },
    });
  } catch (err) {
    console.error("[changeAdminPassword] database error:", err);
    return { error: "We couldn't update your password. Please try again in a moment." };
  }
  return { success: "Password updated. Use it next time you sign in." };
}
