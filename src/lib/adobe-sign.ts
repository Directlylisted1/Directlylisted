/**
 * Adobe Acrobat Sign client (REST v6) — works with Acrobat Pro for Teams and
 * Acrobat Sign Enterprise via an OAuth Integration Key.
 *
 * Config resolves at call time from the admin back office (Site Settings)
 * first, then environment variables — so an admin can connect/rotate the
 * enterprise API key from /admin/integrations without a redeploy:
 *   - adobe_sign_base_url       (e.g. https://api.na1.adobesign.com)
 *   - adobe_sign_integration_key
 *   - adobe_sign_mode           ("enterprise" | "teams")
 * Falls back to ADOBE_SIGN_BASE_URL / ADOBE_SIGN_INTEGRATION_KEY env vars.
 *
 * With no key configured the client runs in simulation mode so the full invest
 * flow stays testable end to end.
 */
import { db } from "./db";

export type AdobeConfig = {
  baseUrl: string;
  key: string;
  mode: "enterprise" | "teams";
  configured: boolean;
};

export async function getAdobeConfig(): Promise<AdobeConfig> {
  const rows = await db.siteSetting
    .findMany({
      where: { key: { in: ["adobe_sign_base_url", "adobe_sign_integration_key", "adobe_sign_mode"] } },
    })
    .catch(() => [] as { key: string; value: string }[]);
  const get = (k: string) => rows.find((r) => r.key === k)?.value;

  const baseUrl =
    get("adobe_sign_base_url") ||
    process.env.ADOBE_SIGN_BASE_URL ||
    "https://api.na1.adobesign.com";
  const key = get("adobe_sign_integration_key") || process.env.ADOBE_SIGN_INTEGRATION_KEY || "";
  const mode = (get("adobe_sign_mode") as "enterprise" | "teams") || "teams";
  return { baseUrl, key, mode, configured: key.length > 0 };
}

export async function isAdobeSignConfigured(): Promise<boolean> {
  return (await getAdobeConfig()).configured;
}

async function api<T>(cfg: AdobeConfig, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${cfg.baseUrl}/api/rest/v6${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${cfg.key}`,
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

/** Lightweight connectivity probe for the admin integrations page. */
export async function pingAdobeSign(): Promise<{ ok: boolean; detail: string }> {
  const cfg = await getAdobeConfig();
  if (!cfg.configured) return { ok: false, detail: "No integration key configured (simulation mode)." };
  try {
    const me = await api<{ email?: string; company?: string }>(cfg, "/users/me");
    return { ok: true, detail: `Connected${me.email ? ` as ${me.email}` : ""}.` };
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : "Connection failed." };
  }
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
  const cfg = await getAdobeConfig();
  if (!cfg.configured) {
    // Simulation mode for development without credentials.
    return {
      agreementId: `sim_${Math.random().toString(36).slice(2, 10)}`,
      signingUrl: null,
      simulated: true,
    };
  }

  const { id } = await api<{ id: string }>(cfg, "/agreements", {
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
      cfg,
      `/agreements/${id}/signingUrls`,
    );
    signingUrl = urls.signingUrlSetInfos?.[0]?.signingUrls?.[0]?.esignUrl ?? null;
  } catch {
    // Signing URL may not be immediately available; the signer also gets an email.
  }

  return { agreementId: id, signingUrl, simulated: false };
}

export async function getAgreementStatus(agreementId: string): Promise<string> {
  const cfg = await getAdobeConfig();
  if (agreementId.startsWith("sim_") || !cfg.configured) return "SIGNED";
  const data = await api<{ status: string }>(cfg, `/agreements/${agreementId}`);
  return data.status;
}
