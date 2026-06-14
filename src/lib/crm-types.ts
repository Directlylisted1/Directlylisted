// Bookable appointment types offered on the public /book funnel.
export type AppointmentType = {
  id: string;
  label: string;
  durationMin: number;
  blurb: string;
};

export const APPOINTMENT_TYPES: AppointmentType[] = [
  {
    id: "listing-consult",
    label: "Listing Consultation",
    durationMin: 30,
    blurb: "Explore a NASDAQ or NYSE listing — conventional or direct.",
  },
  {
    id: "capital-strategy",
    label: "Capital Raise Strategy Call",
    durationMin: 30,
    blurb: "Scope a Reg A+, Reg D, Reg S, or PIPE raise for your company.",
  },
  {
    id: "investor-onboarding",
    label: "Investor Onboarding Call",
    durationMin: 15,
    blurb: "Get help investing in a live offering on the platform.",
  },
];

export const appointmentType = (id: string) =>
  APPOINTMENT_TYPES.find((t) => t.id === id);

export const CRM_STAGES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "MEETING_SCHEDULED",
  "PROPOSAL",
  "WON",
  "LOST",
] as const;

export const STAGE_LABELS: Record<(typeof CRM_STAGES)[number], string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  MEETING_SCHEDULED: "Meeting Scheduled",
  PROPOSAL: "Proposal",
  WON: "Won",
  LOST: "Lost",
};
