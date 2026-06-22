import { FaqPage } from "@/components/FaqPage";
import { ISSUER_FAQ } from "@/lib/faq.issuer";

export const metadata = {
  title: "Issuer FAQ — Directly Listed",
  description:
    "Answers for companies raising capital or going public — platform, raise structures, NASDAQ & NYSE listings, fees, onboarding, payments, and compliance.",
  alternates: { canonical: "/faq/issuer" },
};

export default function IssuerFaqPage() {
  return (
    <FaqPage
      title="Issuer FAQ"
      subtitle="Answers for companies raising capital or going public — how the platform works, choosing a raise structure, listing on NASDAQ or NYSE, fees, onboarding, payments, and compliance."
      categories={ISSUER_FAQ}
    />
  );
}
