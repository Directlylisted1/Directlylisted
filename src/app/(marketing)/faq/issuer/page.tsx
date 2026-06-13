import { FaqPage } from "@/components/FaqPage";

export const metadata = {
  title: "Issuer FAQ — Directly Listed",
  description: "Answers for companies raising capital or listing on Directly Listed.",
  alternates: { canonical: "/faq/issuer" },
};

const FAQS = [
  [
    "What does Directly Listed charge?",
    "Every deal is quoted individually: a flat platform fee plus an equity grant at signing, both set by the scope of services and your company's stage. Our SEC-licensed attorneys, consultants, and listing advisors are paid out of the flat fee — there are no separate legal bills, only third-party costs such as audits, legal opinions, transfer agent and DTC fees, and exchange fees.",
  ],
  [
    "Is Directly Listed a broker-dealer?",
    "No. Directly Listed is a B2B institutional technology platform — not a registered broker-dealer, investment advisor, or funding portal. Offerings are conducted by issuers in reliance on their own securities exemptions, with compliance workflows built into the software.",
  ],
  [
    "Which raise structures do you support?",
    "Reg D 506(b) and 506(c), Reg A+, Reg S, PIPE placements after listing, NASDAQ and NYSE conventional and direct listings, and institutional equity lines of credit (ELOC).",
  ],
  [
    "How long does a direct listing take?",
    "It depends on audit readiness and SEC review cycles. Typical engagements run several months from kickoff through effectiveness and exchange approval; we scope a timeline during your quotation.",
  ],
  [
    "Can I embed my offering on my own website?",
    "Yes. Your offering page carries its own Invest Now flow, and you can link or embed it directly from your site while we handle investor onboarding, eSignature, and payments behind it.",
  ],
  [
    "How do investors pay?",
    "Card payments (processed by Braintree, a PayPal service) for amounts under $5,000; wire or ACH above that, reconciled with a unique reference code per subscription.",
  ],
] as const;

export default function IssuerFaqPage() {
  return (
    <FaqPage
      title="Issuer FAQ"
      subtitle="Answers for companies raising capital or going public."
      faqs={FAQS}
    />
  );
}
