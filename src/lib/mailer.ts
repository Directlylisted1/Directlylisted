import "server-only";
import nodemailer from "nodemailer";

/**
 * SMTP mailer for inquiry notifications. Configured entirely via env vars; if
 * SMTP isn't configured it no-ops (logs and returns), so forms keep working in
 * development and nothing is sent until credentials are added.
 *
 *   SMTP_HOST, SMTP_PORT (default 587), SMTP_SECURE ("true" for port 465),
 *   SMTP_USER, SMTP_PASS
 *   NOTIFY_EMAIL  (where inquiries are sent; default info@directlylisted.com)
 *   MAIL_FROM     (envelope From; default "Directly Listed <no-reply@directlylisted.com>")
 */
const NOTIFY_TO = process.env.NOTIFY_EMAIL || "info@directlylisted.com";
const MAIL_FROM = process.env.MAIL_FROM || "Directly Listed <no-reply@directlylisted.com>";

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

let transporter: nodemailer.Transporter | null = null;
function getTransport() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

async function send(opts: { subject: string; text: string; replyTo?: string }) {
  if (!isMailConfigured()) {
    console.log(`[mailer] SMTP not configured — would have emailed "${opts.subject}" to ${NOTIFY_TO}`);
    return { sent: false };
  }
  try {
    await getTransport().sendMail({
      from: MAIL_FROM,
      to: NOTIFY_TO,
      subject: opts.subject,
      text: opts.text,
      replyTo: opts.replyTo,
    });
    return { sent: true };
  } catch (e) {
    // Never let an email failure break the user's form submission.
    console.error("[mailer] send failed:", e instanceof Error ? e.message : e);
    return { sent: false };
  }
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
