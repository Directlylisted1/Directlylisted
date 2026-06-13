/**
 * Adobe Acrobat Sign (Acrobat Pro for teams) REST v6 client.
 *
 * Setup: in Acrobat Sign, create an API application and an Integration Key
 * with scopes agreement_read, agreement_write, agreement_send, then set
 * ADOBE_SIGN_INTEGRATION_KEY and ADOBE_SIGN_BASE_URL in .env.
 *
 * When the key is not configured the client runs in simulation mode so the
 * full invest flow remains testable end to end in development.
 */

const BASE = process.env.ADOBE_SIGN_BASE_URL ?? "https://api.na1.adobesign.com";
const KEY = process.env.ADOBE_SIGN_INTEGRATION_KEY ?? "";

export function isAdobeSignConfigured() {
  return KEY.length > 0;
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}/api/rest/v6${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Acrobat Sign ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

export type CreatedAgreement = { agreementId: string; signingUrl: string | null; simulated: boolean };

/**
 * Send a subscription agreement (or engagement letter) for signature.
 * Uses a library document template when provided; recipients sign in order.
 */
export async function sendAgreement(opts: {
  name: string;
  signerEmail: string;
  signerName: string;
  libraryDocumentId?: string | null;
}): Promise<CreatedAgreement> {
  if (!isAdobeSignConfigured()) {
    // Simulation mode for development without credentials.
    return {
      agreementId: `sim_${Math.random().toString(36).slice(2, 10)}`,
      signingUrl: null,
      simulated: true,
    };
  }

  const { id } = await api<{ id: string }>("/agreements", {
    method: "POST",
    body: JSON.stringify({
      fileInfos: [{ libraryDocumentId: opts.libraryDocumentId }],
      name: opts.name,
      participantSetsInfo: [
        {
          memberInfos: [{ email: opts.signerEmail, name: opts.signerName }],
          order: 1,
          role: "SIGNER",
        },
      ],
      signatureType: "ESIGN",
      state: "IN_PROCESS",
    }),
  });

  let signingUrl: string | null = null;
  try {
    const urls = await api<{ signingUrlSetInfos: Array<{ signingUrls: Array<{ esignUrl: string }> }> }>(
      `/agreements/${id}/signingUrls`,
    );
    signingUrl = urls.signingUrlSetInfos?.[0]?.signingUrls?.[0]?.esignUrl ?? null;
  } catch {
    // Signing URL may not be immediately available; the signer also gets an email.
  }

  return { agreementId: id, signingUrl, simulated: false };
}

export async function getAgreementStatus(agreementId: string): Promise<string> {
  if (agreementId.startsWith("sim_") || !isAdobeSignConfigured()) return "SIGNED";
  const data = await api<{ status: string }>(`/agreements/${agreementId}`);
  return data.status;
}
