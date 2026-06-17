// Render build step: switch the Prisma datasource to PostgreSQL.
// Local development stays on SQLite (schema.prisma ships with provider="sqlite");
// this script rewrites it to postgresql during the Render build only, so the
// deployed app uses Render's managed Postgres while local dev is unchanged.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
const original = readFileSync(schemaPath, "utf8");
const swapped = original.replace(
  /provider\s*=\s*"sqlite"/,
  'provider = "postgresql"',
);

if (swapped === original) {
  console.log("[use-postgres] provider already postgresql (or sqlite not found) — no change.");
} else {
  writeFileSync(schemaPath, swapped);
  console.log("[use-postgres] Prisma datasource provider set to postgresql for this build.");
}
