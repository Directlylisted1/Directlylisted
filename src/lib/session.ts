import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "./db";

const COOKIE = "dl_session";
const secret = () =>
  new TextEncoder().encode(process.env.SESSION_SECRET ?? "dev-secret");

export type SessionPayload = {
  userId: string;
  role: "ADMIN" | "ISSUER" | "INVESTOR";
};

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return { userId: payload.userId as string, role: payload.role as SessionPayload["role"] };
  } catch {
    return null;
  }
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;
  try {
    return await db.user.findUnique({
      where: { id: session.userId },
      include: { investorProfile: true, issuerProfile: true },
    });
  } catch (err) {
    console.error("[getCurrentUser] database error:", err);
    return null;
  }
});

/**
 * The role the user is currently *acting as* — chosen at login and stored in the
 * session. A single account can act as both ISSUER and INVESTOR (and switch
 * between them); admins always act as ADMIN. Falls back to the user's stored
 * role for older sessions.
 */
export const getActiveRole = cache(async (): Promise<SessionPayload["role"] | null> => {
  const session = await getSession();
  return session?.role ?? null;
});

export async function requireRole(role: SessionPayload["role"]) {
  const user = await getCurrentUser();
  if (!user || user.role !== role) return null;
  return user;
}
