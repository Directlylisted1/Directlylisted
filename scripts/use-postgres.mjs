// Switch the Prisma datasource to PostgreSQL when DATABASE_URL points at a
// Postgres server, otherwise leave it on SQLite. This runs on `postinstall`
// (and in the Render build) so the generated Prisma client always matches the
// database it will actually connect to — preventing the "URL must start with
// file:" provider-mismatch crash in production. Local dev (DATABASE_URL=file:)
// is untouched.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const url = process.env.DATABASE_URL || "";
const isPostgres = /^postgres(ql)?:\/\//i.test(url);

if (!isPostgres) {
  console.log(`[use-postgres] DATABASE_URL is not Postgres — keeping SQLite (${url || "unset"}).`);
  process.exit(0);
}

const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
const original = readFileSync(schemaPath, "utf8");
const swapped = original.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');

if (swapped === original) {
  console.log("[use-postgres] provider already postgresql — no change.");
} else {
  writeFileSync(schemaPath, swapped);
  console.log("[use-postgres] Prisma datasource provider set to postgresql for this build.");
}
