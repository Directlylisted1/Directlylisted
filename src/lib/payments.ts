import braintree from "braintree";

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

export function escrowWireInstructions() {
  return {
    bankName: process.env.ESCROW_BANK_NAME ?? "Escrow Bank, N.A.",
    accountName: process.env.ESCROW_ACCOUNT_NAME ?? "Adamson Brothers Corp. FBO Escrow",
    routingNumber: process.env.ESCROW_ROUTING_NUMBER ?? "000000000",
    accountNumber: process.env.ESCROW_ACCOUNT_NUMBER ?? "0000000000",
  };
}
