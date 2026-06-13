import { FaqPage } from "@/components/FaqPage";

export const metadata = {
  title: "Investor FAQ — Directly Listed",
  description: "Answers for investors participating in offerings on Directly Listed.",
  alternates: { canonical: "/faq/investor" },
};

const FAQS = [
  [
    "Who can invest?",
    "It depends on the offering's exemption. Reg A+ offerings are open to everyone (with investment limits for non-accredited investors). Reg D 506(c) offerings are limited to verified accredited investors. Reg S tranches are for non-U.S. investors. Each offering page states its eligibility requirements.",
  ],
  [
    "How do I prove I'm accredited?",
    "You complete the accreditation questionnaire in your investor portal. For Rule 506(c) offerings, third-party verification is also required before your investment closes — for example tax returns, brokerage statements, or a verification letter from your CPA or attorney.",
  ],
  [
    "How do I pay for my investment?",
    "Amounts under $5,000 can be paid by card (processed by Braintree, a PayPal service). Larger amounts are funded by wire or ACH using instructions provided for the specific offering, with a unique reference code so your transfer is matched to your subscription.",
  ],
  [
    "How are documents signed?",
    "Subscription agreements are executed electronically through Adobe Acrobat Sign with a complete audit trail. You'll receive the countersigned copy when the issuer closes your subscription.",
  ],
  [
    "What are the risks?",
    "Investments offered on the platform are generally in small or early-stage companies. They are speculative, illiquid, and you can lose your entire investment. Read the full offering materials — especially the risk factors — and consult your own advisors before investing.",
  ],
  [
    "Is Directly Listed my broker or advisor?",
    "No. Directly Listed is a technology platform. We do not provide investment advice, endorse offerings, or act as a broker-dealer. Each offering is conducted by its issuer under the issuer's own exemption.",
  ],
] as const;

export default function InvestorFaqPage() {
  return (
    <FaqPage
      title="Investor FAQ"
      subtitle="Answers for investors participating in offerings on the platform."
      faqs={FAQS}
    />
  );
}
