# Deploying Directly Listed to AWS

The app is a Node.js (Next.js 15) server with a Prisma database and on-disk
campaign-media uploads, so it needs a host with **persistent disk** (or
swap SQLite → RDS Postgres and uploads → S3 first). Two supported paths:

## Path A — EC2 / Lightsail (simplest, persistent disk included)

1. **Launch an instance**: Amazon Lightsail (Node-friendly, ~$10/mo) or an
   EC2 `t3.small` running Ubuntu 24.04. Open ports 80/443.
2. **Install runtime**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt install -y nodejs caddy && sudo npm i -g pm2
   ```
3. **Upload the project** (zip without `node_modules`/`.next`), then:
   ```bash
   cd /var/www/directlylisted
   npm ci
   npx prisma db push && npx tsx prisma/seed.ts && npx tsx prisma/seed-blog.ts
   npm run build
   pm2 start npm --name directlylisted -- start
   pm2 save && pm2 startup
   ```
4. **HTTPS** — `/etc/caddy/Caddyfile`:
   ```
   www.directlylisted.com {
       reverse_proxy localhost:3000
   }
   directlylisted.com {
       redir https://www.directlylisted.com{uri} permanent
   }
   ```
   `sudo systemctl reload caddy` — certificates are automatic.
5. **DNS** — point the A records for `directlylisted.com` and `www` at the
   instance's static IP (keep MX records untouched).
6. **Backups** — nightly cron of `prisma/dev.db` + `public/uploads`
   (or snapshot the disk):
   ```bash
   0 3 * * * tar czf /root/backup-$(date +\%F).tgz /var/www/directlylisted/prisma/dev.db /var/www/directlylisted/public/uploads
   ```

## Path B — Docker on App Runner / ECS Fargate (managed, scales)

A production `Dockerfile` is included (standalone Next.js output).

1. Build & push:
   ```bash
   aws ecr create-repository --repository-name directlylisted
   docker build -t directlylisted .
   docker tag directlylisted:latest <acct>.dkr.ecr.<region>.amazonaws.com/directlylisted:latest
   docker push <acct>.dkr.ecr.<region>.amazonaws.com/directlylisted:latest
   ```
2. **Storage caveat**: App Runner/Fargate filesystems are ephemeral. Before
   using this path, either:
   - switch Prisma's datasource to **RDS Postgres** (one line in
     `prisma/schema.prisma`, then `prisma migrate deploy`), and move campaign
     uploads to **S3** (contained in `src/lib/media-actions.ts`), or
   - mount **EFS** at `/app/data` (set `DATABASE_URL=file:/app/data/prod.db`)
     and `/app/public/uploads`.
3. Create the App Runner service (port 3000) or an ECS service behind an ALB,
   set the environment variables below, then point Route 53 / your DNS at it.

## Environment variables (both paths)

| Variable | Notes |
| --- | --- |
| `DATABASE_URL` | `file:./dev.db` on EC2, or your RDS/EFS URL |
| `SESSION_SECRET` | long random string — required |
| `BRAINTREE_ENVIRONMENT` | `production` |
| `BRAINTREE_MERCHANT_ID` / `_PUBLIC_KEY` / `_PRIVATE_KEY` | from Braintree |
| `CARD_PAYMENT_LIMIT_USD` | `5000` |
| `ADOBE_SIGN_BASE_URL` / `ADOBE_SIGN_INTEGRATION_KEY` | from Acrobat Sign |

## Post-launch

- Change all seeded passwords, remove demo data.
- Submit `https://www.directlylisted.com/sitemap.xml` to Google Search Console
  and Bing Webmaster Tools.
- Point Braintree and Acrobat Sign webhooks at the production domain.
