import { PrismaClient } from "@prisma/client";
import path from "path";

// Safety net: some runtimes (the Next.js standalone server, a bare `node`
// process, or a misconfigured host) don't auto-load the .env file, which makes
// Prisma throw "Environment variable not found: DATABASE_URL". Fall back to the
// local SQLite database (absolute path) so local runs never crash. Real
// deployments set DATABASE_URL explicitly and this fallback is skipped.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
