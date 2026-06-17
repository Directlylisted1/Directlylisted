# Deploying Directly Listed to Render

Render runs the Node.js app directly and provisions a **managed PostgreSQL**
database. A [`render.yaml`](render.yaml) blueprint wires it all up.

> **Local dev is unchanged.** The committed Prisma schema uses SQLite so your
> local preview keeps working. During the Render build, `scripts/use-postgres.mjs`
> swaps the datasource to PostgreSQL for the deployed app only.

## One-time setup (Blueprint — recommended)

1. Push this project to a GitHub/GitLab repo.
2. In Render: **New → Blueprint**, select the repo. Render reads `render.yaml`
   and creates **the web service, a managed PostgreSQL database, and a 1 GB disk
   for uploads** automatically. `DATABASE_URL` is injected from the database — you
   don't set it by hand.
3. Fill the `sync: false` secrets in the Render dashboard (Environment tab):
   `BRAINTREE_MERCHANT_ID`, `BRAINTREE_PUBLIC_KEY`, `BRAINTREE_PRIVATE_KEY`,
   `ADOBE_SIGN_INTEGRATION_KEY`. `SESSION_SECRET` is generated for you.
4. The first deploy runs `prisma db push` automatically (preDeployCommand),
   creating the tables in Postgres. To load demo data + CRM availability once,
   open **Shell** in the Render dashboard and run:
   ```bash
   npx tsx prisma/seed.ts
   npx tsx prisma/seed-blog.ts
   npx tsx prisma/seed-crm.ts
   ```
5. Add your custom domain under **Settings → Custom Domains**
   (`www.directlylisted.com`), then point your DNS CNAME at the Render URL.

## Manual setup (without the Blueprint)

If you created the web service by hand, you must also create the database and
wire it up:

1. **New → PostgreSQL** → create a database (e.g. `directlylisted-db`).
2. On the web service → **Environment**, add `DATABASE_URL` = the database's
   **Internal Connection String**. Also add `SESSION_SECRET` (long random) and
   `NODE_VERSION` = `22.11.0`.
3. **Build Command:** `npm ci && node scripts/use-postgres.mjs && npx prisma generate && npm run build`
4. **Pre-Deploy Command:** `npx prisma db push`
5. **Start Command:** `npm run start`
6. Add a **Disk** mounted at `/opt/render/project/src/public/uploads` (1 GB) for
   campaign-media uploads.
7. Seed once via the **Shell** (the three `npx tsx prisma/seed*.ts` commands).

## How it maps

| Concern | Render setup |
| --- | --- |
| Web server | `npm run start` (Next.js, binds Render's `$PORT`) |
| Build | `npm ci && node scripts/use-postgres.mjs && npx prisma generate && npm run build` |
| Schema sync | `npx prisma db push` as `preDeployCommand` (every deploy) |
| Database | Render-managed **PostgreSQL** (`DATABASE_URL` from the DB) |
| Uploads | 1 GB persistent disk mounted at `public/uploads` |
| Health check | `GET /` |

## Notes

- The free Postgres plan expires after 90 days — switch the database `plan` in
  `render.yaml` to a paid tier (e.g. `basic-256mb`) for production.
- A service with a disk runs a single instance. To scale the web tier
  horizontally, move uploads to **S3/R2** (a contained change in
  `src/lib/media-actions.ts`) and drop the disk; Postgres already supports
  multiple instances.
- The AWS deploy path (`Dockerfile`, `DEPLOY-AWS.md`) still works; for AWS,
  either run the same `use-postgres.mjs` swap and point `DATABASE_URL` at RDS
  Postgres, or keep SQLite on an EBS/EFS volume.
