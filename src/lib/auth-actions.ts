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

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return { error: "Invalid email or password." };
  }
  await createSession({ userId: user.id, role: user.role });
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
  if (await db.user.findUnique({ where: { email } })) {
    return { error: "An account with this email already exists." };
  }

  const role = accountType === "ISSUER" ? "ISSUER" : "INVESTOR";
  const user = await db.user.create({
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
  await createSession({ userId: user.id, role: user.role });
  redirect(next || portalHome(user.role));
}

export async function signOut() {
  await destroySession();
  redirect("/");
}
