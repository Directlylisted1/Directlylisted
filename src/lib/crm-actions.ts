"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { getCurrentUser } from "./session";
import { appointmentType } from "./crm-types";
import { isSlotFree } from "./availability";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/signin?next=/admin/crm");
  return user;
}

// ---------------------------------------------------------------------------
// PUBLIC — self-serve appointment booking
// ---------------------------------------------------------------------------

/** Book an appointment from the public funnel: auto-creates/links a CRM
 * contact, confirms the slot (re-checking for races), and logs activity. */
export async function bookAppointment(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const typeId = String(formData.get("typeId") ?? "");
  const startIso = String(formData.get("start") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const company = String(formData.get("company") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim() || null;

  const type = appointmentType(typeId);
  const start = new Date(startIso);
  if (!type || Number.isNaN(start.getTime())) return { error: "Invalid appointment selection." };
  if (!name || !email) return { error: "Name and email are required." };

  if (!(await isSlotFree(start, type.durationMin))) {
    return { error: "Sorry — that time was just booked. Please choose another slot." };
  }

  // Upsert the contact by email and move them into the meeting pipeline.
  const contact = await db.crmContact.upsert({
    where: { email },
    update: { name, phone, company, stage: "MEETING_SCHEDULED" },
    create: {
      name,
      email,
      phone,
      company,
      source: "BOOKING",
      stage: "MEETING_SCHEDULED",
    },
  });

  const appt = await db.appointment.create({
    data: {
      contactId: contact.id,
      typeId: type.id,
      typeLabel: type.label,
      startsAt: start,
      durationMin: type.durationMin,
      status: "CONFIRMED",
      message,
    },
  });

  await db.crmActivity.create({
    data: {
      contactId: contact.id,
      kind: "APPOINTMENT",
      body: `Booked ${type.label} for ${start.toLocaleString("en-US")}.`,
    },
  });

  redirect(`/book/confirmed?id=${appt.id}`);
}

// ---------------------------------------------------------------------------
// ADMIN — contacts
// ---------------------------------------------------------------------------

export async function createContact(formData: FormData) {
  await requireAdmin();
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const name = String(formData.get("name") ?? "").trim();
  if (!email || !name) redirect("/admin/crm/contacts");
  await db.crmContact.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
      phone: String(formData.get("phone") ?? "").trim() || null,
      company: String(formData.get("company") ?? "").trim() || null,
      source: "MANUAL",
    },
  });
  revalidatePath("/admin/crm/contacts");
  redirect("/admin/crm/contacts");
}

export async function updateStage(formData: FormData) {
  await requireAdmin();
  const contactId = String(formData.get("contactId"));
  const stage = String(formData.get("stage")) as
    | "NEW" | "CONTACTED" | "QUALIFIED" | "MEETING_SCHEDULED" | "PROPOSAL" | "WON" | "LOST";
  await db.$transaction([
    db.crmContact.update({ where: { id: contactId }, data: { stage } }),
    db.crmActivity.create({
      data: { contactId, kind: "STAGE_CHANGE", body: `Stage changed to ${stage.replaceAll("_", " ")}.` },
    }),
  ]);
  revalidatePath(`/admin/crm/contacts/${contactId}`);
  revalidatePath("/admin/crm");
}

export async function addNote(formData: FormData) {
  await requireAdmin();
  const contactId = String(formData.get("contactId"));
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;
  await db.crmActivity.create({ data: { contactId, kind: "NOTE", body } });
  revalidatePath(`/admin/crm/contacts/${contactId}`);
}

/** Automation: pull marketing Leads into the CRM as contacts (no Lead edits). */
export async function importLeads() {
  await requireAdmin();
  const leads = await db.lead.findMany({ orderBy: { createdAt: "asc" } });
  let imported = 0;
  for (const lead of leads) {
    if (!lead.email) continue;
    const email = lead.email.toLowerCase().trim();
    const existing = await db.crmContact.findUnique({ where: { email } });
    if (existing) continue;
    const contact = await db.crmContact.create({
      data: {
        name: lead.name || email,
        email,
        phone: lead.phone,
        company: lead.company,
        source: "LEAD",
        leadId: lead.id,
        stage: "NEW",
      },
    });
    await db.crmActivity.create({
      data: {
        contactId: contact.id,
        kind: "IMPORT",
        body: `Imported from marketing lead (${lead.kind}${lead.productInterest ? `, interest: ${lead.productInterest}` : ""}).`,
      },
    });
    imported++;
  }
  revalidatePath("/admin/crm");
  revalidatePath("/admin/crm/contacts");
}

// ---------------------------------------------------------------------------
// ADMIN — appointments
// ---------------------------------------------------------------------------

export async function setAppointmentStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("appointmentId"));
  const status = String(formData.get("status")) as
    | "REQUESTED" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  const appt = await db.appointment.update({ where: { id }, data: { status } });
  await db.crmActivity.create({
    data: {
      contactId: appt.contactId,
      kind: "APPOINTMENT",
      body: `Appointment "${appt.typeLabel}" marked ${status.replaceAll("_", " ")}.`,
    },
  });
  revalidatePath("/admin/crm/appointments");
  revalidatePath("/admin/crm");
}

export async function setMeetingUrl(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("appointmentId"));
  const meetingUrl = String(formData.get("meetingUrl") ?? "").trim() || null;
  await db.appointment.update({ where: { id }, data: { meetingUrl } });
  revalidatePath("/admin/crm/appointments");
}

// ---------------------------------------------------------------------------
// ADMIN — availability
// ---------------------------------------------------------------------------

export async function saveAvailability(formData: FormData) {
  await requireAdmin();
  const toMin = (v: string) => {
    const [h, m] = v.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };
  // Rebuild the rule set from the submitted weekly grid.
  await db.availabilityRule.deleteMany({});
  for (let weekday = 0; weekday < 7; weekday++) {
    const active = formData.get(`active_${weekday}`) === "on";
    if (!active) continue;
    const start = String(formData.get(`start_${weekday}`) ?? "09:00");
    const end = String(formData.get(`end_${weekday}`) ?? "17:00");
    const slotMin = Number(formData.get(`slot_${weekday}`) ?? 30);
    const startMin = toMin(start);
    const endMin = toMin(end);
    if (endMin <= startMin) continue;
    await db.availabilityRule.create({
      data: { weekday, startMin, endMin, slotMin, active: true },
    });
  }
  revalidatePath("/admin/crm/availability");
  revalidatePath("/book");
  redirect("/admin/crm/availability");
}
