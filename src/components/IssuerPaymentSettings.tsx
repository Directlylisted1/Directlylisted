import { saveIssuerBraintree } from "@/lib/issuer-actions";

export function IssuerPaymentSettings({
  merchantId,
  publicKey,
  hasPrivateKey,
  environment,
  adobeGroupId,
  saved,
}: {
  merchantId: string | null;
  publicKey: string | null;
  hasPrivateKey: boolean;
  environment: string | null;
  adobeGroupId: string | null;
  saved?: boolean;
}) {
  const connected = Boolean(merchantId && publicKey && hasPrivateKey);

  return (
    <section className="card !p-8">
      <div className="mb-1 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Payments — Your Merchant Account</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            connected ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
          }`}
        >
          {connected ? "Connected" : "Action required"}
        </span>
      </div>
      <p className="mb-5 text-sm text-navy-900/70">
        Connect your own payment merchant account. Funds are handled directly
        from investors to you — <strong>by card for amounts under $5,000, or by
        ACH or wire transfer straight to your bank account</strong>. Directly
        Listed never holds the money. You must connect your merchant account
        before you can launch a campaign. Your credentials are stored on your
        issuer group only; the private key authorizes charges, so treat it as a
        secret.
      </p>

      {saved && (
        <p role="status" className="mb-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Merchant credentials saved.
        </p>
      )}

      <form action={saveIssuerBraintree} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bt-merchant" className="label">Merchant ID</label>
          <input
            id="bt-merchant"
            name="merchantId"
            defaultValue={merchantId ?? ""}
            className="input"
            placeholder="e.g. 8r4x…"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="bt-env" className="label">Environment</label>
          <select id="bt-env" name="environment" defaultValue={environment ?? "sandbox"} className="input">
            <option value="sandbox">Sandbox (testing)</option>
            <option value="production">Production (live)</option>
          </select>
        </div>
        <div>
          <label htmlFor="bt-public" className="label">Public Key</label>
          <input
            id="bt-public"
            name="publicKey"
            defaultValue={publicKey ?? ""}
            className="input"
            placeholder="Public key"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="bt-private" className="label">Private Key</label>
          <input
            id="bt-private"
            name="privateKey"
            type="password"
            className="input"
            placeholder={hasPrivateKey ? "•••••••• (leave blank to keep current)" : "Private key"}
            autoComplete="off"
          />
        </div>
        <div className="sm:col-span-2">
          <button className="btn-dark">Save Merchant Connection</button>
        </div>
      </form>

      <div className="mt-6 border-t border-navy-900/10 pt-5 text-sm text-navy-900/70">
        <h3 className="mb-1 font-semibold text-navy-900">Adobe Acrobat Sign group</h3>
        <p>
          {adobeGroupId
            ? "Your isolated Adobe Sign group is provisioned — subscription agreements for your offerings are sent from your own branded group."
            : "Directly Listed provisions an isolated Adobe Sign group for your company. Until it’s assigned, agreements send from the platform default. Contact us if you need this expedited."}
        </p>
      </div>
    </section>
  );
}
