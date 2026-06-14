# Deploying Directly Listed to Render

Render runs the Node.js app directly and gives you a **persistent disk**, so
the SQLite database survives deploys. A [`render.yaml`](render.yaml) blueprint
is included.

## One-time setup

1. Push this project to a GitHub/GitLab repo.
2. In Render: **New → Blueprint**, select the repo. Render reads `render.yaml`
   and creates the web service + 1 GB disk automatically.
3. Fill the `sync: false` secrets in the Render dashboard (Environment tab):
   `BRAINTREE_MERCHANT_ID`, `BRAINTREE_PUBLIC_KEY`, `BRAINTREE_PRIVATE_KEY`,
   `ADOBE_SIGN_INTEGRATION_KEY`. `SESSION_SECRET` is generated for you.
4. First deploy runs `prisma db push` automatically (preDeployCommand). To load
   demo data + seed CRM availability once, open **Shell** in the Render
   dashboard and run:
   ```bash
   npx tsx prisma/seed.ts
   npx tsx prisma/seed-blog.ts
   npx tsx prisma/seed-crm.ts
   ```
5. Add your custom domain under **Settings → Custom Domains**
   (`www.directlylisted.com`), then point your DNS CNAME at the Render URL.

## How it maps

| Concern | Render setup |
| --- | --- |
| Web server | `npm run start` (Next.js, binds Render's `$PORT`) |
| Build | `npm ci && npx prisma generate && npm run build` |
| Migrations | `npx prisma db push` as `preDeployCommand` (every deploy) |
| Database | SQLite at `/var/data/app.db` on the persistent disk |
| Health check | `GET /` |

## Important: campaign-media uploads

Issuer-uploaded files are written to `public/uploads`, which is **not** on the
persistent disk, so they would be lost on redeploy. Before relying on uploads
in production, pick one (kept out of this change set so nothing else moves):

- **Move uploads to S3/R2** — a contained change in `src/lib/media-actions.ts`.
- **Or** put uploads on the disk too by mounting at
  `/opt/render/project/src/public/uploads` instead of `/var/data` and setting
  `DATABASE_URL=file:/var/data/app.db` via a second disk (paid plans support
  one disk per service, so S3 is the cleaner path).

The database and all CRM/appointment data are already safe on the disk.

## Notes

- The Starter plan with a disk runs a single instance (no horizontal scaling),
  which SQLite requires. Move to Postgres (one line in `prisma/schema.prisma`,
  then `prisma migrate deploy`) when you need to scale out.
- This file is additive — the existing AWS deploy path (`Dockerfile`,
  `DEPLOY-AWS.md`) still works unchanged.
