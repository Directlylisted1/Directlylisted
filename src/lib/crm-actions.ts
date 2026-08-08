"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { getCurrentUser } from "./session";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/signin?next=/admin/crm");
  return user;
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
