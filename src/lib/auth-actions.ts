"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "./db";
import { createSession, destroySession, getCurrentUser } from "./session";

const portalHome = (role: string) =>
  role === "ADMIN" ? "/admin" : role === "ISSUER" ? "/issuer" : "/portal";

type ActingRole = "ISSUER" | "INVESTOR";

/**
 * Ensure the user has the profile needed to act as the requested role, creating
 * a minimal one on demand. This is what lets a single set of credentials work
 * as both an issuer and an investor.
 */
async function ensureProfileFor(
  user: { id: string; firstName: string; lastName: string },
  role: ActingRole,
) {
  if (role === "ISSUER") {
    const existing = await db.issuerProfile.findUnique({ where: { userId: user.id } });
    if (!existing) {
      await db.issuerProfile.create({
        data: { userId: user.id, companyName: `${user.firstName} ${user.lastName} Co.` },
      });
    }
  } else {
    const existing = await db.investorProfile.findUnique({ where: { userId: user.id } });
    if (!existing) await db.investorProfile.create({ data: { userId: user.id } });
  }
}

export async function signIn(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");
  // The portal the user chose to sign in to (ignored for admins).
  const chosen: ActingRole = String(formData.get("role") ?? "") === "ISSUER" ? "ISSUER" : "INVESTOR";

  let user;
  try {
    user = await db.user.findUnique({ where: { email } });
  } catch (err) {
    console.error("[signIn] database error:", err);
    return { error: "We couldn't reach the server. Please try again in a moment." };
  }
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return { error: "Invalid email or password." };
  }
  if (user.archivedAt) {
    return { error: "This account has been deactivated. Contact support@directlylisted.com." };
  }

  // Admins always act as admin; everyone else acts as the role they chose, and
  // we provision the matching profile so the same login works for both.
  const active = user.role === "ADMIN" ? "ADMIN" : chosen;
  try {
    if (active !== "ADMIN") await ensureProfileFor(user, active);
    await createSession({ userId: user.id, role: active });
  } catch (err) {
    console.error("[signIn] session error:", err);
    return { error: "We couldn't start your session. Please try again." };
  }
  // redirect() throws NEXT_REDIRECT by design — keep it outside the try/catch.
  redirect(next || portalHome(active));
}

/**
 * Switch the signed-in account between acting as an issuer and an investor
 * (provisioning the profile if needed). Admins are unaffected.
 */
export async function switchRole(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");
  if (user.role === "ADMIN") redirect("/admin");
  const target: ActingRole = String(formData.get("role") ?? "") === "ISSUER" ? "ISSUER" : "INVESTOR";
  await ensureProfileFor(user, target);
  await createSession({ userId: user.id, role: target });
  redirect(portalHome(target));
}

export async function signUp(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const accountType = String(formData.get("accountType") ?? "INVESTOR");
  const companyName = String(formData.get("companyName") ?? "").trim();
  const next = String(formData.get("next") ?? "");

  if (!email || password.length < 8 || !firstName || !lastName) {
    return { error: "All fields are required; password must be at least 8 characters." };
  }

  // accountType is INVESTOR | ISSUER | BOTH. "Both" provisions both profiles so
  // the one login works as either from day one; it defaults to the investor
  // portal and can switch to issuer anytime.
  const wantIssuer = accountType === "ISSUER" || accountType === "BOTH";
  const wantInvestor = accountType === "INVESTOR" || accountType === "BOTH";
  const role = accountType === "ISSUER" ? "ISSUER" : "INVESTOR";
  let user;
  try {
    if (await db.user.findUnique({ where: { email } })) {
      return { error: "An account with this email already exists." };
    }
    user = await db.user.create({
      data: {
        email,
        passwordHash: bcrypt.hashSync(password, 10),
        firstName,
        lastName,
        role,
        ...(wantIssuer
          ? { issuerProfile: { create: { companyName: companyName || `${firstName} ${lastName} Co.` } } }
          : {}),
        ...(wantInvestor ? { investorProfile: { create: {} } } : {}),
      },
    });
  } catch (err) {
    console.error("[signUp] database error:", err);
    return { error: "We couldn't reach the server. Please try again in a moment." };
  }
  try {
    await createSession({ userId: user.id, role: user.role });
  } catch (err) {
    console.error("[signUp] session error:", err);
    return { error: "We couldn't start your session. Please try again." };
  }
  // redirect() throws NEXT_REDIRECT by design — keep it outside the try/catch.
  redirect(next || portalHome(user.role));
}

export async function signOut() {
  await destroySession();
  redirect("/");
}
