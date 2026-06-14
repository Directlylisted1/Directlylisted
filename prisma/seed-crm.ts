import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // Default availability: Monday–Friday, 9:00–17:00, 30-minute slots.
  const existing = await db.availabilityRule.count();
  if (existing === 0) {
    for (let weekday = 1; weekday <= 5; weekday++) {
      await db.availabilityRule.create({
        data: { weekday, startMin: 9 * 60, endMin: 17 * 60, slotMin: 30, active: true },
      });
    }
    console.log("Seeded Mon–Fri 9–5 availability.");
  }

  // A demo contact + upcoming appointment so the CRM isn't empty.
  const demoEmail = "sample.founder@example.com";
  const contact = await db.crmContact.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      name: "Sample Founder",
      email: demoEmail,
      company: "Sample Ventures, Inc.",
      phone: "+1 555 010 2030",
      source: "BOOKING",
      stage: "MEETING_SCHEDULED",
    },
  });

  const apptExists = await db.appointment.findFirst({ where: { contactId: contact.id } });
  if (!apptExists) {
    const start = new Date();
    start.setDate(start.getDate() + 2);
    start.setHours(10, 0, 0, 0);
    await db.appointment.create({
      data: {
        contactId: contact.id,
        typeId: "capital-strategy",
        typeLabel: "Capital Raise Strategy Call",
        startsAt: start,
        durationMin: 30,
        status: "CONFIRMED",
        message: "Interested in a Reg A+ raise.",
      },
    });
    await db.crmActivity.create({
      data: {
        contactId: contact.id,
        kind: "APPOINTMENT",
        body: "Booked Capital Raise Strategy Call (demo data).",
      },
    });
    console.log("Seeded a demo contact + appointment.");
  }
}

main().finally(() => db.$disconnect());
