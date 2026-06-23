import "server-only";
import nodemailer from "nodemailer";
import { db } from "./db";

/**
 * SMTP mailer for inquiry/lead notifications.
 *
 * Config resolves at call time from the admin back office (Site Settings) first,
 * then environment variables — so an admin can connect/rotate the mailbox
 * (e.g. GoDaddy / Microsoft 365) from /admin/integrations WITHOUT putting any
 * password in the source code or env. DB keys:
 *   smtp_host, smtp_port, smtp_secure, smtp_user, smtp_pass, mail_from, notify_email
 * Env fallbacks:
 *   SMTP_HOST, SMTP_PORT (default 587), SMTP_SECURE ("true" for 465),
 *   SMTP_USER, SMTP_PASS, MAIL_FROM, NOTIFY_EMAIL (default info@directlylisted.com)
 *
 * With nothing configured, sending no-ops (logs and returns) so forms keep
 * working and inquiries still save to the Leads inbox.
 */
export const SMTP_KEYS = [
  "smtp_host",
  "smtp_port",
  "smtp_secure",
  "smtp_user",
  "smtp_pass",
  "mail_from",
  "notify_email",
  "notify_email_2",
] as const;

export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  notify1: string; // primary inbox (default info@directlylisted.com)
  notify2: string; // second inbox (default support@directlylisted.com)
  notifyTo: string; // combined recipient list actually sent to
  configured: boolean;
};

export async function getMailConfig(): Promise<MailConfig> {
  const rows = await db.siteSetting
    .findMany({ where: { key: { in: [...SMTP_KEYS] } } })
    .catch(() => [] as { key: string; value: string }[]);
  const get = (k: string) => rows.find((r) => r.key === k)?.value;

  const host = get("smtp_host") || process.env.SMTP_HOST || "";
  const port = Number(get("smtp_port") || process.env.SMTP_PORT || 587) || 587;
  const secureRaw = get("smtp_secure") ?? process.env.SMTP_SECURE;
  // Default: implicit TLS only on 465; STARTTLS (secure:false) on 587.
  const secure = secureRaw ? secureRaw === "true" : port === 465;
  const user = get("smtp_user") || process.env.SMTP_USER || "";
  const pass = get("smtp_pass") || process.env.SMTP_PASS || "";
  // Many providers (notably Microsoft 365) reject a From that differs from the
  // authenticated mailbox, so default From to the SMTP user.
  let from =
    get("mail_from") ||
    process.env.MAIL_FROM ||
    (user ? `Directly Listed <${user}>` : "Directly Listed <no-reply@directlylisted.com>");

  // Microsoft 365 / Outlook only permit sending AS the authenticated mailbox
  // (no "send as" by default), which otherwise causes "5.2.252 SendAsDenied".
  // For those hosts, force the From address to the SMTP user while keeping the
  // display name. Transactional providers (Brevo, SendGrid, SES, …) that allow
  // any verified From are left untouched.
  const isMicrosoftHost = /office365\.com|outlook\.com|\.protection\.outlook\.com/i.test(host);
  if (user && isMicrosoftHost) {
    const currentAddr = (from.match(/<([^>]+)>/)?.[1] ?? from).trim();
    if (currentAddr.toLowerCase() !== user.toLowerCase()) {
      const displayName = from.match(/^\s*([^<]+?)\s*</)?.[1]?.trim() || "Directly Listed";
      from = `${displayName} <${user}>`;
    }
  }
  const notify1 = get("notify_email") || process.env.NOTIFY_EMAIL || "info@directlylisted.com";
  const notify2 = get("notify_email_2") || process.env.NOTIFY_EMAIL_2 || "support@directlylisted.com";
  // Combined, de-duplicated recipient list — every platform message goes to both.
  const notifyTo = Array.from(
    new Set([notify1, notify2].flatMap((s) => s.split(",")).map((s) => s.trim()).filter(Boolean)),
  ).join(", ");

  return { host, port, secure, user, pass, from, notify1, notify2, notifyTo, configured: Boolean(host && user && pass) };
}

export async function isMailConfigured(): Promise<boolean> {
  return (await getMailConfig()).configured;
}

async function send(opts: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ sent: boolean; error?: string }> {
  const cfg = await getMailConfig();
  if (!cfg.configured) {
    console.log(`[mailer] SMTP not configured — would have emailed "${opts.subject}" to ${cfg.notifyTo}`);
    return { sent: false, error: "SMTP not configured" };
  }
  try {
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: { user: cfg.user, pass: cfg.pass },
    });
    await transporter.sendMail({
      from: cfg.from,
      to: cfg.notifyTo,
      subject: opts.subject,
      text: opts.text,
      replyTo: opts.replyTo,
    });
    return { sent: true };
  } catch (e) {
    // Never let an email failure break the user's form submission.
    const error = e instanceof Error ? e.message : "send failed";
    console.error("[mailer] send failed:", error);
    return { sent: false, error };
  }
}

/** Admin connectivity check: send a real test message to the notify address. */
export async function sendTestEmail(): Promise<{ sent: boolean; error?: string; to: string }> {
  const cfg = await getMailConfig();
  const result = await send({
    subject: "Directly Listed — SMTP test email",
    text:
      "This is a test message from the Directly Listed admin back office.\n\n" +
      "If you received this, your SMTP connection is working and platform " +
      "inquiries/leads will be delivered to this inbox.",
  });
  return { ...result, to: cfg.notifyTo };
}

/** Notify the team of a new marketing inquiry / lead. */
export async function notifyInquiry(input: {
  kind: string; // CONTACT | ISSUER_QUOTE | GUIDE_DOWNLOAD | …
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  productInterest?: string | null;
  message?: string | null;
}) {
  const label =
    {
      CONTACT: "Contact form",
      ISSUER_QUOTE: "Quote request",
      GUIDE_DOWNLOAD: "Guide download",
      INVESTOR_LOI: "Investor interest",
    }[input.kind] ?? "Website inquiry";

  const lines = [
    `New ${label} from directlylisted.com`,
    "",
    `Name:    ${input.name}`,
    `Email:   ${input.email}`,
    input.phone ? `Phone:   ${input.phone}` : null,
    input.company ? `Company: ${input.company}` : null,
    input.productInterest ? `Interest: ${input.productInterest}` : null,
    input.message ? `\nMessage:\n${input.message}` : null,
    "",
    "— View in the admin Leads inbox: /admin/leads",
  ].filter(Boolean);

  return send({
    subject: `New ${label}: ${input.name}`,
    text: lines.join("\n"),
    replyTo: input.email,
  });
}

/** Notify the team of a new booked appointment. */
export async function notifyBooking(input: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  typeLabel: string;
  startsAt: Date;
  message?: string | null;
}) {
  const when = input.startsAt.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const lines = [
    `New appointment booked on directlylisted.com`,
    "",
    `Type:    ${input.typeLabel}`,
    `When:    ${when}`,
    `Name:    ${input.name}`,
    `Email:   ${input.email}`,
    input.phone ? `Phone:   ${input.phone}` : null,
    input.company ? `Company: ${input.company}` : null,
    input.message ? `\nNotes:\n${input.message}` : null,
    "",
    "— Manage in the admin CRM: /admin/crm/appointments",
  ].filter(Boolean);

  return send({
    subject: `New booking: ${input.typeLabel} — ${input.name}`,
    text: lines.join("\n"),
    replyTo: input.email,
  });
}
