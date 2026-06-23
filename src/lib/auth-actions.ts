"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "./db";
import { createSession, destroySession } from "./session";

const portalHome = (role: string) =>
  role === "ADMIN" ? "/admin" : role === "ISSUER" ? "/issuer" : "/portal";

export async function signIn(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");

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
  try {
    await createSession({ userId: user.id, role: user.role });
  } catch (err) {
    console.error("[signIn] session error:", err);
    return { error: "We couldn't start your session. Please try again." };
  }
  // redirect() throws NEXT_REDIRECT by design — keep it outside the try/catch.
  redirect(next || portalHome(user.role));
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
        ...(role === "INVESTOR"
          ? { investorProfile: { create: {} } }
          : { issuerProfile: { create: { companyName: companyName || `${firstName} ${lastName} Co.` } } }),
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
