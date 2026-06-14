import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Applies the requested copy/figure changes to existing offering rows.
// Slugs are unchanged so no URLs break.
const updates = [
  {
    slug: "helio-grid",
    data: {
      name: "MARKETY AI",
      tagline: "Disrupting $365B From the Bottom Up.",
      industry: "AI / Marketing Tech",
      raisedAmount: 2_400_000,
      investorCount: 306,
      description:
        "Digitals AI operates MARKETY AI — an AI-native marketing and CRM platform purpose-built for the 400M+ small businesses that enterprise tools ignore.",
    },
  },
  {
    slug: "atlas-robotics",
    data: {
      name: "Pathfinders Technologies Inc",
      tagline: "Revolutionizing Retail with GenAI-Powered Innovation.",
      industry: "Retail AI",
      raisedAmount: 9_600_000,
      investorCount: 362,
      description:
        "Empowering retailers and enhancing customer experiences through cutting-edge conversational AI.",
    },
  },
  {
    slug: "vantage-mobility",
    data: {
      name: "Biointra Corp.",
      tagline: "We develop renewable energy products and solutions.",
      industry: "Renewable Energy",
      targetAmount: 350_000_000,
      raisedAmount: 350_000_000,
      investorCount: 1,
      description:
        "We develop renewable energy products and solutions. A committed institutional equity line of credit giving the issuer the right to draw capital as needed after listing.",
    },
  },
];

async function main() {
  for (const u of updates) {
    const existing = await db.offering.findUnique({ where: { slug: u.slug } });
    if (!existing) {
      console.log(`skip (not found): ${u.slug}`);
      continue;
    }
    await db.offering.update({ where: { slug: u.slug }, data: u.data });
    console.log(`updated: ${u.slug} -> ${u.data.name}`);
  }
}

main().finally(() => db.$disconnect());
