// Production start sequence for Render.
//
// Ensures the PostgreSQL schema and seed data exist, then launches the Next.js
// server. This runs on EVERY boot so a missed Render "Blueprint sync" (which is
// what skipped the preDeployCommand migration before) can never again leave the
// database unmigrated/empty. Both operations are idempotent:
//   - `prisma db push` only applies schema changes when there are any.
//   - the seed scripts are upserts (safe to re-run).
//
// Migration/seed failures are LOGGED but do NOT block startup — the server
// still launches so public pages degrade gracefully (empty states) instead of
// the whole site going down. Local dev (SQLite, `npm run dev`) never hits this.
import { spawnSync, spawn } from "node:child_process";

const run = (cmd) => {
  console.log(`[start] $ ${cmd}`);
  return spawnSync(cmd, { stdio: "inherit", shell: true }).status === 0;
};

const isPostgres = /^postgres(ql)?:\/\//i.test(process.env.DATABASE_URL || "");
if (isPostgres) {
  // Guarantee schema.prisma matches the Postgres URL before db push, regardless
  // of what the image baked in (a stale SQLite schema would fail validation).
  run("node scripts/use-postgres.mjs");
  if (run("npx prisma db push --skip-generate")) {
    if (!run("npm run db:seed:all")) {
      console.warn("[start] seed failed — starting server anyway.");
    }
  } else {
    console.warn("[start] prisma db push failed — starting server anyway.");
  }
} else {
  console.log(`[start] DATABASE_URL is not Postgres — skipping prod migrate/seed (${process.env.DATABASE_URL || "unset"}).`);
}

// Hand off to the Next.js server as the long-running foreground process.
const server = spawn("npm run start", { stdio: "inherit", shell: true });
for (const sig of ["SIGTERM", "SIGINT"]) {
  process.on(sig, () => server.kill(sig)); // forward shutdown for graceful exit
}
server.on("exit", (code) => process.exit(code ?? 0));
