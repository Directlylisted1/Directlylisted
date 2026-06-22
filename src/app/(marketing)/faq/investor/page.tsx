import { FaqPage } from "@/components/FaqPage";
import { INVESTOR_FAQ } from "@/lib/faq.investor";

export const metadata = {
  title: "Investor FAQ — Directly Listed",
  description:
    "Answers for investors participating in offerings on Directly Listed — eligibility, accreditation, payments, eSignatures, risks, and how the platform works.",
  alternates: { canonical: "/faq/investor" },
};

export default function InvestorFaqPage() {
  return (
    <FaqPage
      title="Investor FAQ"
      subtitle="Answers for investors participating in offerings on the platform — who can invest, accreditation, paying for an investment, eSignatures, risk, and your portfolio."
      categories={INVESTOR_FAQ}
    />
  );
}
