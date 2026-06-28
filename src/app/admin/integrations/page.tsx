import { db } from "@/lib/db";
import { StatusBadge } from "@/components/AppShell";
import { getAdobeConfig, pingAdobeSign } from "@/lib/adobe-sign";
import { isBraintreeConfigured } from "@/lib/payments";
import { getMailConfig } from "@/lib/mailer";
import { getBlogApiToken } from "@/lib/blog-api";
import { getWpCreds } from "@/lib/wp-api";
import {
  saveAdobeConfig,
  disconnectAdobe,
  refreshAgreement,
  saveSmtpConfig,
  disconnectSmtp,
  sendSmtpTest,
  generateBlogApiToken,
  revokeBlogApiToken,
  generateWpAppPassword,
  revokeWpAppPassword,
} from "@/lib/integration-actions";
import { setIssuerAdobeGroup } from "@/lib/admin-actions";

export default async function AdminIntegrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; test?: string; to?: string; msg?: string }>;
}) {
  const { saved, test, to, msg } = await searchParams;
  const [cfg, ping, mailCfg, blogToken, wpCreds, agreements, issuers] = await Promise.all([
    getAdobeConfig(),
    pingAdobeSign(),
    getMailConfig(),
    getBlogApiToken(),
    getWpCreds(),
    db.agreement.findMany({
      include: { investment: { include: { offering: true, investor: true } } },
      orderBy: { createdAt: "desc" },
    }),
    db.issuerProfile.findMany({
      include: { user: true, _count: { select: { offerings: true } } },
      orderBy: { companyName: "asc" },
    }),
  ]);
  const braintree = isBraintreeConfigured();
  const mailReady = mailCfg.configured;
  const notifyEmail = mailCfg.notifyTo;

  return (
    <div className="space-y-10">
      {saved === "smtp" && (
        <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Email (SMTP) connection saved.
        </p>
      )}
      {test === "ok" && (
        <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Test email sent to {to}. Check that inbox.
        </p>
      )}
      {test === "fail" && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          Test email failed: {msg}
        </p>
      )}
      {saved === "1" && (
        <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Adobe Acrobat Sign connection saved.
        </p>
      )}

      {/* Connection status cards */}
      <div className="grid gap-6 md:grid-cols-3">
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
            <h2 className="font-bold">Card Payments</h2>
            <StatusBadge value={braintree ? "CONFIRMED" : "NOT_STARTED"} />
          </div>
          <p className="text-sm text-navy-900/70">
            {braintree
              ? `Connected (${process.env.BRAINTREE_ENVIRONMENT ?? "sandbox"}).`
              : "Not configured — card payments run in simulation mode."}
          </p>
          <p className="mt-1 text-xs text-navy-900/60">
            Platform fallback (env vars). Each issuer routes to their own merchant
            account — see Issuer Groups below. Card under $5,000; wire/ACH above.
          </p>
        </div>
        <div className="card">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-bold">Email Notifications</h2>
            <StatusBadge value={mailReady ? "CONFIRMED" : "NOT_STARTED"} />
          </div>
          <p className="text-sm text-navy-900/70">
            {mailReady
              ? `Connected — platform messages email ${notifyEmail}.`
              : "Not configured — inquiries save to Leads/CRM but no email is sent."}
          </p>
          <p className="mt-1 text-xs text-navy-900/60">
            {mailReady
              ? `Sending via ${mailCfg.host}:${mailCfg.port} as ${mailCfg.user}.`
              : "Connect your GoDaddy / Microsoft 365 mailbox below to receive an inbox copy of every platform message."}
          </p>
        </div>
      </div>

      {/* Email (SMTP) connection form */}
      <section className="card !p-8">
        <h2 className="mb-1 text-xl font-bold">Email Inbox Delivery (SMTP)</h2>
        <p className="mb-5 text-sm text-navy-900/70">
          Connect the mailbox that should <strong>receive an inbox copy of every
          message from the platform</strong> — contact forms, quote requests, guide
          downloads, and bookings all email the notify address below. Credentials
          are stored securely in the back office, never in the source code. For a
          GoDaddy Microsoft&nbsp;365 mailbox use host{" "}
          <code className="rounded bg-brand-50 px-1">smtp.office365.com</code>, port{" "}
          <code className="rounded bg-brand-50 px-1">587</code>, TLS{" "}
          <code className="rounded bg-brand-50 px-1">STARTTLS</code>, and the full
          email address as the username. (Microsoft&nbsp;365 may require
          &ldquo;Authenticated SMTP&rdquo; to be enabled for the mailbox, or an app
          password if security defaults / MFA are on.)
        </p>
        <form action={saveSmtpConfig} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="smtp-host" className="label">SMTP Host</label>
            <input id="smtp-host" name="smtp_host" defaultValue={mailCfg.host} className="input" placeholder="smtp.office365.com" autoComplete="off" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="smtp-port" className="label">Port</label>
              <input id="smtp-port" name="smtp_port" defaultValue={String(mailCfg.port)} className="input" placeholder="587" autoComplete="off" />
            </div>
            <div>
              <label htmlFor="smtp-secure" className="label">TLS Mode</label>
              <select id="smtp-secure" name="smtp_secure" defaultValue={mailCfg.secure ? "true" : "false"} className="input">
                <option value="false">STARTTLS (587)</option>
                <option value="true">SSL/TLS (465)</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="smtp-user" className="label">Username (full email)</label>
            <input id="smtp-user" name="smtp_user" defaultValue={mailCfg.user} className="input" placeholder="info@directlylisted.com" autoComplete="off" />
          </div>
          <div>
            <label htmlFor="smtp-pass" className="label">Password</label>
            <input
              id="smtp-pass"
              name="smtp_pass"
              type="password"
              className="input"
              placeholder={mailReady ? "•••••••• (leave blank to keep current)" : "Mailbox or app password"}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="smtp-from" className="label">From address</label>
            <input id="smtp-from" name="mail_from" defaultValue={mailCfg.from} className="input" placeholder="Directly Listed <info@directlylisted.com>" autoComplete="off" />
            <p className="mt-1 text-xs text-navy-900/60">Microsoft 365 requires this to match the username — it&apos;s auto-aligned for office365 hosts.</p>
          </div>
          <div>
            <label htmlFor="smtp-notify" className="label">Inbox 1 — Primary</label>
            <input id="smtp-notify" name="notify_email" defaultValue={mailCfg.notify1} className="input" placeholder="info@directlylisted.com" autoComplete="off" />
            <p className="mt-1 text-xs text-navy-900/60">Leads &amp; general inquiries. Comma-separate for more.</p>
          </div>
          <div>
            <label htmlFor="smtp-notify2" className="label">Inbox 2 — Support</label>
            <input id="smtp-notify2" name="notify_email_2" defaultValue={mailCfg.notify2} className="input" placeholder="support@directlylisted.com" autoComplete="off" />
            <p className="mt-1 text-xs text-navy-900/60">Second inbox — every platform message is also delivered here.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button className="btn-dark">Save Email Connection</button>
            {mailReady && (
              <button formAction={sendSmtpTest} className="btn-outline">Send test email</button>
            )}
            {mailReady && (
              <button formAction={disconnectSmtp} className="btn-outline">Disconnect</button>
            )}
          </div>
        </form>
      </section>

      {/* Blog publishing API — for RankChat & other SEO auto-posting tools */}
      <section className="card !p-8">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Blog Publishing API</h2>
          <StatusBadge value={blogToken ? "CONFIRMED" : "NOT_STARTED"} />
        </div>
        <p className="mb-5 text-sm text-navy-900/70">
          Let an external SEO tool (e.g. RankChat) publish posts straight to{" "}
          <a href="/blog" className="font-semibold text-brand-600">/blog</a> via a
          secure token. Point the tool at a <strong>custom / webhook / REST</strong>{" "}
          integration with the endpoint and token below.
        </p>

        <dl className="mb-5 space-y-3 text-sm">
          <div className="rounded-lg border border-navy-900/10 bg-brand-50/40 p-3">
            <dt className="text-xs font-semibold uppercase text-navy-900/60">Endpoint (POST)</dt>
            <dd className="mt-1 font-mono text-xs break-all">https://www.directlylisted.com/api/blog/ingest</dd>
          </div>
          <div className="rounded-lg border border-navy-900/10 bg-brand-50/40 p-3">
            <dt className="text-xs font-semibold uppercase text-navy-900/60">Auth header</dt>
            <dd className="mt-1 font-mono text-xs break-all">Authorization: Bearer &lt;token&gt;</dd>
          </div>
          <div className="rounded-lg border border-navy-900/10 bg-brand-50/40 p-3">
            <dt className="text-xs font-semibold uppercase text-navy-900/60">API token</dt>
            <dd className="mt-1">
              {blogToken ? (
                <input
                  readOnly
                  value={blogToken}
                  className="input !py-2 font-mono text-xs"
                  aria-label="Blog API token"
                />
              ) : (
                <span className="text-navy-900/60">No token yet — generate one to enable the API.</span>
              )}
            </dd>
          </div>
        </dl>

        <div className="mb-5 flex flex-wrap gap-3">
          <form action={generateBlogApiToken}>
            <button className="btn-dark !py-2.5 text-xs">
              {blogToken ? "Regenerate Token" : "Generate Token"}
            </button>
          </form>
          {blogToken && (
            <form action={revokeBlogApiToken}>
              <button className="btn-outline !py-2.5 text-xs">Revoke</button>
            </form>
          )}
        </div>

        <details className="text-sm text-navy-900/70">
          <summary className="cursor-pointer font-semibold">JSON fields the endpoint accepts</summary>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-navy-950 p-4 text-[11px] leading-relaxed text-white">{`POST /api/blog/ingest
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Post title",                 // required
  "content": "<p>Full HTML body…</p>",   // HTML or plain text
  "excerpt": "Short summary",            // optional
  "coverImage": "https://…/image.jpg",   // optional
  "tags": "Reg A+, Direct Listing",      // optional (string or array)
  "author": "Directly Listed",           // optional
  "slug": "custom-slug",                 // optional (auto from title)
  "published": true                       // optional (default true)
}`}</pre>
          <p className="mt-2 text-xs text-navy-900/60">
            Re-posting the same slug updates that post. Send <code>&quot;published&quot;: false</code> to
            create a draft. Test the connection with a GET to the same endpoint using the token.
          </p>
        </details>
      </section>

      {/* WordPress-compatible API — for RankChat's WordPress connector */}
      <section className="card !p-8">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">WordPress Connector (RankChat)</h2>
          <StatusBadge value={wpCreds.appPassword ? "CONFIRMED" : "NOT_STARTED"} />
        </div>
        <p className="mb-5 text-sm text-navy-900/70">
          This site exposes a WordPress-compatible REST API so RankChat&apos;s
          <strong> WordPress</strong> integration can publish posts here. In RankChat,
          choose <strong>WordPress</strong> and enter the values below (it authenticates
          with an Application Password). No plugin needed.
        </p>

        <dl className="mb-5 space-y-3 text-sm">
          <div className="rounded-lg border border-navy-900/10 bg-brand-50/40 p-3">
            <dt className="text-xs font-semibold uppercase text-navy-900/60">Site URL</dt>
            <dd className="mt-1 font-mono text-xs break-all">https://www.directlylisted.com</dd>
          </div>
          <div className="rounded-lg border border-navy-900/10 bg-brand-50/40 p-3">
            <dt className="text-xs font-semibold uppercase text-navy-900/60">Username</dt>
            <dd className="mt-1 font-mono text-xs">{wpCreds.username}</dd>
          </div>
          <div className="rounded-lg border border-navy-900/10 bg-brand-50/40 p-3">
            <dt className="text-xs font-semibold uppercase text-navy-900/60">Application Password</dt>
            <dd className="mt-1">
              {wpCreds.appPassword ? (
                <input readOnly value={wpCreds.appPassword} className="input !py-2 font-mono text-xs" aria-label="WordPress application password" />
              ) : (
                <span className="text-navy-900/60">Not generated yet.</span>
              )}
            </dd>
          </div>
        </dl>

        <form action={generateWpAppPassword} className="flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor="wp-user" className="label">Username</label>
            <input id="wp-user" name="username" defaultValue={wpCreds.username} className="input !py-2 text-xs !w-48" />
          </div>
          <button className="btn-dark !py-2.5 text-xs">
            {wpCreds.appPassword ? "Regenerate Password" : "Generate Password"}
          </button>
          {wpCreds.appPassword && (
            <button formAction={revokeWpAppPassword} className="btn-outline !py-2.5 text-xs">Revoke</button>
          )}
        </form>
        <p className="mt-3 text-xs text-navy-900/60">
          Endpoints live under <code>/wp-json/wp/v2/</code> (posts, media, users/me).
          Treat the application password like a secret; regenerate to rotate it.
        </p>
      </section>

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

      {/* Per-issuer multi-tenant groups: payment routing + Adobe Sign group */}
      <section>
        <h2 className="mb-1 text-xl font-bold">Issuer Groups — Payments &amp; eSign ({issuers.length})</h2>
        <p className="mb-4 text-sm text-navy-900/70">
          Each issuer connects their own merchant account (funds settle directly to
          the issuer — no platform custody) and is assigned an isolated Adobe
          Acrobat Sign group. Issuers enter their own payment keys from their
          account; assign the Adobe group id here.
        </p>
        <div className="card overflow-x-auto !p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-navy-900/10 text-left text-xs uppercase text-navy-900/70">
              <tr>
                <th scope="col" className="px-5 py-3">Issuer</th>
                <th scope="col" className="px-5 py-3">Offerings</th>
                <th scope="col" className="px-5 py-3">Payments</th>
                <th scope="col" className="px-5 py-3">Adobe Sign group id</th>
              </tr>
            </thead>
            <tbody>
              {issuers.map((iss) => {
                const btReady = Boolean(
                  iss.braintreeMerchantId && iss.braintreePublicKey && iss.braintreePrivateKey,
                );
                return (
                  <tr key={iss.id} className="border-b border-navy-900/5 align-top">
                    <td className="px-5 py-3">
                      <div className="font-medium">{iss.companyName}</div>
                      <div className="text-xs text-navy-900/60">{iss.user.email}</div>
                    </td>
                    <td className="px-5 py-3">{iss._count.offerings}</td>
                    <td className="px-5 py-3">
                      <StatusBadge value={btReady ? "CONFIRMED" : "NOT_STARTED"} />
                      {btReady && (
                        <div className="mt-1 text-xs text-navy-900/60">
                          {iss.braintreeEnvironment ?? "sandbox"}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <form action={setIssuerAdobeGroup} className="flex items-center gap-2">
                        <input type="hidden" name="issuerId" value={iss.id} />
                        <input
                          name="adobeGroupId"
                          defaultValue={iss.adobeGroupId ?? ""}
                          aria-label={`Adobe Sign group id for ${iss.companyName}`}
                          className="input !w-44 !py-2 text-xs"
                          placeholder="group id"
                        />
                        <button className="btn-outline !px-4 !py-2 text-[11px]">Save</button>
                      </form>
                    </td>
                  </tr>
                );
              })}
              {issuers.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-navy-900/70">No issuers yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
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
