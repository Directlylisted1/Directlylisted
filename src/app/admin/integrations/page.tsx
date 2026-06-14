import { db } from "@/lib/db";
import { StatusBadge } from "@/components/AppShell";
import { getAdobeConfig, pingAdobeSign } from "@/lib/adobe-sign";
import { isBraintreeConfigured } from "@/lib/payments";
import { saveAdobeConfig, disconnectAdobe, refreshAgreement } from "@/lib/integration-actions";

export default async function AdminIntegrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const [cfg, ping, agreements] = await Promise.all([
    getAdobeConfig(),
    pingAdobeSign(),
    db.agreement.findMany({
      include: { investment: { include: { offering: true, investor: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);
  const braintree = isBraintreeConfigured();

  return (
    <div className="space-y-10">
      {saved && (
        <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Adobe Acrobat Sign connection saved.
        </p>
      )}

      {/* Connection status cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-bold">Adobe Acrobat Sign</h2>
            <StatusBadge value={cfg.configured ? "CONFIRMED" : "NOT_STARTED"} />
          </div>
          <p className="text-sm text-navy-900/70">
            {cfg.configured
              ? `Connected (${cfg.mode === "enterprise" ? "Enterprise" : "Teams"} API).`
              : "Not configured — agreements run in simulation mode."}
          </p>
          <p className="mt-1 text-xs text-navy-900/60">Shard: {cfg.baseUrl}</p>
          <p className={`mt-1 text-xs ${ping.ok ? "text-emerald-700" : "text-amber-700"}`}>
            Live check: {ping.detail}
          </p>
        </div>
        <div className="card">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-bold">Braintree (PayPal) Payments</h2>
            <StatusBadge value={braintree ? "CONFIRMED" : "NOT_STARTED"} />
          </div>
          <p className="text-sm text-navy-900/70">
            {braintree
              ? `Connected (${process.env.BRAINTREE_ENVIRONMENT ?? "sandbox"}).`
              : "Not configured — card payments run in simulation mode."}
          </p>
          <p className="mt-1 text-xs text-navy-900/60">
            Card under $5,000; wire/ACH above. Configured via environment variables.
          </p>
        </div>
      </div>

      {/* Adobe connection form */}
      <section className="card !p-8">
        <h2 className="mb-1 text-xl font-bold">Connect Adobe Acrobat Sign / Enterprise</h2>
        <p className="mb-5 text-sm text-navy-900/70">
          Create an API application + Integration Key in Acrobat Sign (scopes:
          agreement_read, agreement_write, agreement_send) and paste it here.
          This applies platform-wide to every offering&apos;s subscription
          agreements and engagement letters — no redeploy needed.
        </p>
        <form action={saveAdobeConfig} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ad-base" className="label">API Base URL (shard)</label>
            <input
              id="ad-base"
              name="baseUrl"
              defaultValue={cfg.baseUrl}
              className="input"
              placeholder="https://api.na1.adobesign.com"
            />
          </div>
          <div>
            <label htmlFor="ad-mode" className="label">Account Type</label>
            <select id="ad-mode" name="mode" defaultValue={cfg.mode} className="input">
              <option value="teams">Acrobat Pro for Teams</option>
              <option value="enterprise">Acrobat Sign Enterprise</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ad-key" className="label">Integration Key (OAuth bearer token)</label>
            <input
              id="ad-key"
              name="integrationKey"
              type="password"
              className="input"
              placeholder={cfg.configured ? "•••••••• (leave blank to keep current)" : "Paste integration key"}
            />
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <button className="btn-dark">Save Connection</button>
            {cfg.configured && (
              <form action={disconnectAdobe}>
                <button className="btn-outline">Disconnect</button>
              </form>
            )}
          </div>
        </form>
      </section>

      {/* All agreements across the platform */}
      <section>
        <h2 className="mb-4 text-xl font-bold">eSign Agreements — All Offerings ({agreements.length})</h2>
        <div className="card overflow-x-auto !p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-navy-900/10 text-left text-xs uppercase text-navy-900/70">
              <tr>
                <th scope="col" className="px-5 py-3">Agreement</th>
                <th scope="col" className="px-5 py-3">Offering</th>
                <th scope="col" className="px-5 py-3">Signer</th>
                <th scope="col" className="px-5 py-3">Acrobat ID</th>
                <th scope="col" className="px-5 py-3">Status</th>
                <th scope="col" className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agreements.map((a) => (
                <tr key={a.id} className="border-b border-navy-900/5">
                  <td className="px-5 py-3">{a.name}</td>
                  <td className="px-5 py-3">{a.investment.offering.name}</td>
                  <td className="px-5 py-3">
                    <div>{a.investment.investor.firstName} {a.investment.investor.lastName}</div>
                    <div className="text-xs text-navy-900/60">{a.investment.investor.email}</div>
                  </td>
                  <td className="px-5 py-3 text-xs">{a.acrobatAgreementId ?? "—"}</td>
                  <td className="px-5 py-3"><StatusBadge value={a.status} /></td>
                  <td className="px-5 py-3">
                    <form action={refreshAgreement}>
                      <input type="hidden" name="agreementId" value={a.id} />
                      <button className="btn-outline !px-4 !py-2 text-[11px]">Refresh status</button>
                    </form>
                  </td>
                </tr>
              ))}
              {agreements.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-navy-900/70">No agreements yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
