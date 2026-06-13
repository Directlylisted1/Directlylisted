# Directly Listed Platform

Capital-raising platform for **Adamson Brothers Corp. d/b/a Directly Listed** —
a DealMaker-style portal covering the full Directly Listed product line:

- Regulation D 506(b) and 506(c)
- Regulation A+
- NASDAQ Direct Listing
- NYSE Direct Listing
- Institutional Equity Line of Credit (ELOC)

## Stack

Next.js 15 (App Router, server actions) · TypeScript · Tailwind CSS v4 ·
Prisma + SQLite (dev; swap `datasource` to PostgreSQL for production) ·
Braintree (payments) · Adobe Acrobat Sign (eSignature).

## Quick start

```bash
npm install
npx prisma db push
npx tsx prisma/seed.ts
npm run dev        # http://localhost:3000
```

### Demo accounts (seeded)

| Role     | Email                      | Password     |
| -------- | -------------------------- | ------------ |
| Admin    | admin@directlylisted.com   | Admin123!    |
| Issuer   | issuer@example.com         | Issuer123!   |
| Investor | investor@example.com       | Investor123! |

## Business rules encoded

- **Payments to escrow:** card (Braintree, a PayPal service) only for amounts
  **under $5,000** (`CARD_PAYMENT_LIMIT_USD`); wire or ACH for everything else.
  Wire/ACH transfers get a reference code and are reconciled by an admin on
  `/admin/investments`.
- **Platform fees:** every deal is quoted individually — a **flat fee plus an
  equity grant at signing** (`Quotation` model). Admin sends quotes from
  `/admin/offerings`; issuers accept them on `/issuer`.
- **Compliance posture:** Directly Listed is a technology platform; offerings
  are conducted by issuers in reliance on **their own exemptions**
  (`Offering.exemptionNote`). Reg D investments require the accreditation
  questionnaire; admins verify accreditation on `/admin/users`.
- **eSignature:** subscription agreements go out via **Adobe Acrobat Sign**
  (REST v6, integration key). Without a key the flow runs in simulation mode
  so it is fully testable in development.

## Integration setup

1. **Braintree** — create a sandbox at braintreegateway.com and fill
   `BRAINTREE_*` in `.env`. The invest flow uses the Drop-in UI; without
   credentials, card payment is simulated.
2. **Acrobat Sign** — in Acrobat Sign admin, create an API application +
   integration key with `agreement_read/write/send` scopes; set
   `ADOBE_SIGN_INTEGRATION_KEY` (and the correct `ADOBE_SIGN_BASE_URL` shard).
   Upload your subscription agreement as a library template and store its id
   on `Offering.acrobatTemplateId`. In production, point an Acrobat Sign
   webhook at the app to flip `Agreement` status automatically (the
   `confirmDocsSigned` action is the manual fallback).
3. **Escrow** — set the `ESCROW_*` variables to your real escrow account.

## App map

- `/` `/products/*` `/raise-capital` `/offerings/*` `/get-started` `/contact` — marketing site + lead capture
- `/signin` `/signup` — auth (investor or issuer accounts)
- `/portal` — investor dashboard, accreditation, invest wizard (amount → eSign → pay)
- `/issuer` — issuer dashboard: offerings, subscriptions, quotation acceptance
- `/issuer/offerings/[id]/media` — campaign media manager: photo uploads,
  YouTube/Vimeo video links, documents & presentations (stored under
  `public/uploads/`, 20MB cap, type-validated; shown on the public offering page)
- `/admin` — back office: offering approval/publish, deal quotations, payment
  reconciliation, countersigning, accreditation verification, leads inbox

> Hero stats on the homepage are placeholders — update them in
> `src/app/(marketing)/page.tsx` with audited figures before launch.
