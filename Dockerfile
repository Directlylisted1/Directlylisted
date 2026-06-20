# Directly Listed — production image for Render (Docker runtime).
#
# Single stage on purpose: the running container must keep the Prisma CLI and
# tsx (devDependencies) so scripts/start.mjs can run `prisma db push` + seed on
# boot. We therefore install ALL dependencies and keep them in the final image.
FROM node:22-alpine
WORKDIR /app

# Force the Prisma datasource to PostgreSQL for this image. Docker builds do not
# receive the service's runtime env vars, so DATABASE_URL is absent at build
# time — without this the postinstall swap would leave the schema on SQLite and
# generate a mismatched client. scripts/use-postgres.mjs honors FORCE_POSTGRES.
ENV FORCE_POSTGRES=1
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies first for better layer caching. `npm ci` runs the
# postinstall hook: use-postgres.mjs (schema -> postgresql) + prisma generate.
# NODE_ENV is intentionally NOT "production" here so devDependencies (prisma,
# tsx, typescript, tailwind) are installed — they're needed for build AND for
# the on-boot migrate/seed.
COPY package.json package-lock.json* ./
COPY prisma ./prisma
COPY scripts ./scripts
RUN npm ci

# Build the Next.js app. Build-time DB reads (sitemap) are guarded with .catch,
# so the absent database at build time does not fail the build.
COPY . .
# COPY . . just re-introduced the repo's SQLite schema over the swap that ran in
# `npm ci` postinstall — re-apply the Postgres swap so the image schema matches
# the generated (Postgres) client and the runtime `prisma db push`.
RUN node scripts/use-postgres.mjs
RUN npm run build

# Issuer-uploaded media lives here; mount a Render disk at /app/public/uploads
# to persist it across deploys.
RUN mkdir -p public/uploads

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# On boot: prisma db push + seed (idempotent, fault-tolerant), then start Next.
CMD ["node", "scripts/start.mjs"]
