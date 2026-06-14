/** Build an RFC 5545 calendar invite for an appointment. */
export function buildICS(opts: {
  id: string;
  title: string;
  description?: string;
  start: Date;
  durationMin: number;
  organizerEmail?: string;
  attendeeEmail?: string;
  url?: string;
}): string {
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = new Date(opts.start.getTime() + opts.durationMin * 60_000);
  const esc = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Directly Listed//Appointments//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${opts.id}@directlylisted.com`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(opts.start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(opts.title)}`,
    opts.description ? `DESCRIPTION:${esc(opts.description)}` : "",
    opts.url ? `URL:${esc(opts.url)}` : "",
    opts.organizerEmail ? `ORGANIZER:mailto:${opts.organizerEmail}` : "",
    opts.attendeeEmail ? `ATTENDEE:mailto:${opts.attendeeEmail}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}
