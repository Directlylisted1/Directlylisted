import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const hash = (pw: string) => bcrypt.hashSync(pw, 10);

  const admin = await db.user.upsert({
    where: { email: "admin@directlylisted.com" },
    update: {},
    create: {
      email: "admin@directlylisted.com",
      passwordHash: hash("Admin123!"),
      firstName: "Platform",
      lastName: "Admin",
      role: "ADMIN",
    },
  });

  const issuerUser = await db.user.upsert({
    where: { email: "issuer@example.com" },
    update: {},
    create: {
      email: "issuer@example.com",
      passwordHash: hash("Issuer123!"),
      firstName: "Jordan",
      lastName: "Founder",
      role: "ISSUER",
      issuerProfile: {
        create: {
          companyName: "Helio Grid Technologies, Inc.",
          entityType: "Delaware C-Corp",
          stateOfInc: "DE",
          website: "https://example.com",
          description:
            "Utility-scale battery analytics for renewable grid operators.",
        },
      },
    },
  });

  const investorUser = await db.user.upsert({
    where: { email: "investor@example.com" },
    update: {},
    create: {
      email: "investor@example.com",
      passwordHash: hash("Investor123!"),
      firstName: "Avery",
      lastName: "Capital",
      role: "INVESTOR",
      investorProfile: {
        create: {
          country: "US",
          state: "CA",
          accreditationStatus: "SELF_CERTIFIED",
          accreditationBasis: "income",
        },
      },
    },
  });

  const issuerProfile = await db.issuerProfile.findUniqueOrThrow({
    where: { userId: issuerUser.id },
  });

  const offerings = [
    {
      type: "REG_D_506C" as const,
      name: "MARKETY AI",
      slug: "helio-grid",
      tagline: "Disrupting $365B From the Bottom Up.",
      industry: "AI / Marketing Tech",
      heroColor: "#0B3B66",
      targetAmount: 25_000_000,
      raisedAmount: 2_400_000,
      investorCount: 306,
      pricePerUnit: 4.25,
      minInvestment: 1000,
      status: "LIVE" as const,
      exemptionNote: "Rule 506(c) — general solicitation, accredited investors only, verification required.",
      description:
        "Digitals AI operates MARKETY AI — an AI-native marketing and CRM platform purpose-built for the 400M+ small businesses that enterprise tools ignore.",
    },
    {
      type: "REG_A_PLUS" as const,
      name: "Pathfinders Technologies Inc",
      slug: "atlas-robotics",
      tagline: "Revolutionizing Retail with GenAI-Powered Innovation.",
      industry: "Retail AI",
      heroColor: "#1A1A2E",
      targetAmount: 75_000_000,
      raisedAmount: 9_600_000,
      investorCount: 362,
      pricePerUnit: 9.5,
      minInvestment: 475,
      status: "LIVE" as const,
      exemptionNote: "Regulation A+ Tier 2 — qualified offering circular, open to all investors with limits.",
      description:
        "Empowering retailers and enhancing customer experiences through cutting-edge conversational AI.",
    },
    {
      type: "NASDAQ_DIRECT_LISTING" as const,
      name: "Northcove Biolabs",
      slug: "northcove-biolabs",
      tagline: "Going Public Without The IPO.",
      industry: "Life Sciences",
      heroColor: "#123A5C",
      targetAmount: 0,
      raisedAmount: 0,
      investorCount: 0,
      pricePerUnit: 0,
      minInvestment: 0,
      status: "PENDING_REVIEW" as const,
      exemptionNote: "Exchange direct listing — no underwriter, existing shares registered for resale.",
      description:
        "A NASDAQ direct listing engagement: listing readiness, SEC registration and Edgarization, and exchange application managed end to end.",
    },
    {
      type: "ELOC" as const,
      name: "Biointra Corp.",
      slug: "vantage-mobility",
      tagline: "We develop renewable energy products and solutions.",
      industry: "Renewable Energy",
      heroColor: "#27374D",
      targetAmount: 350_000_000,
      raisedAmount: 350_000_000,
      investorCount: 1,
      pricePerUnit: 0,
      minInvestment: 0,
      status: "LIVE" as const,
      exemptionNote: "Institutional equity line of credit — committed standby equity facility.",
      description:
        "We develop renewable energy products and solutions. A committed institutional equity line of credit giving the issuer the right to draw capital as needed after listing.",
    },
  ];

  for (const o of offerings) {
    await db.offering.upsert({
      where: { slug: o.slug },
      update: {},
      create: { ...o, issuerId: issuerProfile.id },
    });
  }

  const helio = await db.offering.findUniqueOrThrow({ where: { slug: "helio-grid" } });
  const existingQuote = await db.quotation.findUnique({ where: { offeringId: helio.id } });
  if (!existingQuote) {
    await db.quotation.create({
      data: {
        offeringId: helio.id,
        issuerId: issuerProfile.id,
        flatFeeUsd: 150_000,
        equityGrantPct: 1.5,
        status: "ACCEPTED",
        notes: "Flat platform fee due at signing plus equity grant. Per-deal quotation.",
        sentAt: new Date(),
        acceptedAt: new Date(),
      },
    });
  }

  console.log("Seeded:", { admin: admin.email, issuer: issuerUser.email, investor: investorUser.email });
}

main().finally(() => db.$disconnect());
