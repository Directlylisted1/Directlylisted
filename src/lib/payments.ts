import braintree from "braintree";
import { db } from "./db";

// Card payments to escrow are permitted only under this limit;
// anything at or above it must be funded by wire or ACH.
export const CARD_LIMIT_USD = Number(process.env.CARD_PAYMENT_LIMIT_USD ?? 5000);

export function allowedPaymentMethods(amount: number): Array<"CARD" | "ACH" | "WIRE"> {
  return amount < CARD_LIMIT_USD ? ["CARD", "ACH", "WIRE"] : ["ACH", "WIRE"];
}

export function isBraintreeConfigured() {
  return Boolean(
    process.env.BRAINTREE_MERCHANT_ID &&
      process.env.BRAINTREE_PUBLIC_KEY &&
      process.env.BRAINTREE_PRIVATE_KEY,
  );
}

let gateway: braintree.BraintreeGateway | null = null;

export function getBraintreeGateway(): braintree.BraintreeGateway {
  if (!gateway) {
    gateway = new braintree.BraintreeGateway({
      environment:
        process.env.BRAINTREE_ENVIRONMENT === "production"
          ? braintree.Environment.Production
          : braintree.Environment.Sandbox,
      merchantId: process.env.BRAINTREE_MERCHANT_ID ?? "",
      publicKey: process.env.BRAINTREE_PUBLIC_KEY ?? "",
      privateKey: process.env.BRAINTREE_PRIVATE_KEY ?? "",
    });
  }
  return gateway;
}

/** Generate a client token for the Braintree Drop-in UI. */
export async function braintreeClientToken(): Promise<string> {
  const res = await getBraintreeGateway().clientToken.generate({});
  return res.clientToken;
}

/** Charge a card via Braintree for an under-limit investment. */
export async function chargeCard(opts: {
  amount: number;
  nonce: string;
  investmentId: string;
}): Promise<{ ok: true; txnId: string } | { ok: false; error: string }> {
  if (opts.amount >= CARD_LIMIT_USD) {
    return { ok: false, error: `Card payments are limited to amounts under $${CARD_LIMIT_USD.toLocaleString()}.` };
  }
  const result = await getBraintreeGateway().transaction.sale({
    amount: opts.amount.toFixed(2),
    paymentMethodNonce: opts.nonce,
    orderId: opts.investmentId,
    options: { submitForSettlement: true },
  });
  if (result.success && result.transaction) {
    return { ok: true, txnId: result.transaction.id };
  }
  return { ok: false, error: result.message ?? "Card was declined." };
}

// =====================================================================
//  Per-issuer (group-level) Braintree — multi-tenant payment routing.
//
//  Each issuer connects their OWN Braintree merchant account. Funds on that
//  issuer's offerings settle directly into the issuer's account; Directly
//  Listed never takes custody. When an issuer hasn't connected Braintree yet,
//  we fall back to the platform-level credentials (env vars) so existing
//  single-tenant deployments and local development keep working.
// =====================================================================

export type IssuerBraintree = {
  merchantId: string | null;
  publicKey: string | null;
  privateKey: string | null;
  environment: string | null; // "sandbox" | "production"
};

export function issuerBraintreeConfigured(c?: IssuerBraintree | null): boolean {
  return Boolean(c?.merchantId && c?.publicKey && c?.privateKey);
}

function gatewayFor(c: IssuerBraintree): braintree.BraintreeGateway {
  return new braintree.BraintreeGateway({
    environment:
      c.environment === "production"
        ? braintree.Environment.Production
        : braintree.Environment.Sandbox,
    merchantId: c.merchantId ?? "",
    publicKey: c.publicKey ?? "",
    privateKey: c.privateKey ?? "",
  });
}

/**
 * Resolve the Braintree credentials that should process a given investment:
 * the offering's issuer group first, then the platform-level env fallback.
 * Returns `null` when neither is configured (→ simulation mode).
 */
export async function resolveInvestmentBraintree(
  investmentId: string,
): Promise<{ creds: IssuerBraintree; scope: "issuer" | "platform" } | null> {
  const investment = await db.investment
    .findUnique({
      where: { id: investmentId },
      include: { offering: { include: { issuer: true } } },
    })
    .catch(() => null);

  const issuer = investment?.offering.issuer;
  const issuerCreds: IssuerBraintree = {
    merchantId: issuer?.braintreeMerchantId ?? null,
    publicKey: issuer?.braintreePublicKey ?? null,
    privateKey: issuer?.braintreePrivateKey ?? null,
    environment: issuer?.braintreeEnvironment ?? null,
  };
  if (issuerBraintreeConfigured(issuerCreds)) {
    return { creds: issuerCreds, scope: "issuer" };
  }

  if (isBraintreeConfigured()) {
    return {
      creds: {
        merchantId: process.env.BRAINTREE_MERCHANT_ID ?? null,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY ?? null,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY ?? null,
        environment: process.env.BRAINTREE_ENVIRONMENT ?? "sandbox",
      },
      scope: "platform",
    };
  }
  return null;
}

/** True when card payments can be processed for this investment (issuer or platform). */
export async function investmentBraintreeReady(investmentId: string): Promise<boolean> {
  return (await resolveInvestmentBraintree(investmentId)) !== null;
}

/** Client token for the Drop-in UI, scoped to the resolved merchant account. */
export async function braintreeClientTokenFor(creds: IssuerBraintree): Promise<string> {
  const res = await gatewayFor(creds).clientToken.generate({});
  return res.clientToken;
}

/** Charge a card against a specific (issuer or platform) merchant account. */
export async function chargeCardWith(
  creds: IssuerBraintree,
  opts: { amount: number; nonce: string; investmentId: string },
): Promise<{ ok: true; txnId: string } | { ok: false; error: string }> {
  if (opts.amount >= CARD_LIMIT_USD) {
    return { ok: false, error: `Card payments are limited to amounts under $${CARD_LIMIT_USD.toLocaleString()}.` };
  }
  const result = await gatewayFor(creds).transaction.sale({
    amount: opts.amount.toFixed(2),
    paymentMethodNonce: opts.nonce,
    orderId: opts.investmentId,
    options: { submitForSettlement: true },
  });
  if (result.success && result.transaction) {
    return { ok: true, txnId: result.transaction.id };
  }
  return { ok: false, error: result.message ?? "Card was declined." };
}

export function escrowWireInstructions() {
  return {
    bankName: process.env.ESCROW_BANK_NAME ?? "Escrow Bank, N.A.",
    accountName: process.env.ESCROW_ACCOUNT_NAME ?? "Adamson Brothers Corp. FBO Escrow",
    routingNumber: process.env.ESCROW_ROUTING_NUMBER ?? "000000000",
    accountNumber: process.env.ESCROW_ACCOUNT_NUMBER ?? "0000000000",
  };
}
