import Link from "next/link";
import { FaqPage } from "@/components/FaqPage";
import { INVESTOR_FAQ } from "@/lib/faq.investor";

export const metadata = {
  title: "Investor FAQ — Directly Listed",
  description:
    "Investor FAQ — how investing works, who can invest, offering types, liquidity, and risk on the Directly Listed platform. Read before you invest.",
  alternates: { canonical: "/faq/investor" },
};

export default function InvestorFaqPage() {
  return (
    <FaqPage
      title="Investor FAQ"
      subtitle="Frequently asked questions for investors on the Directly Listed platform — how investing works, who can invest, the offering types you will see on our Live Offerings page, liquidity, and risk."
      categories={INVESTOR_FAQ}
      crossLink={{ label: "Issuer FAQ", href: "/faq/issuer" }}
      closingHeading="Planning your own raise?"
      closingBody={
        <p>
          If you are a company considering a{" "}
          <Link href="/products/reg-a-plus" className="font-medium text-brand-600 hover:underline">
            Reg A+
          </Link>{" "}
          offering, a{" "}
          <Link href="/products/reg-d-506b" className="font-medium text-brand-600 hover:underline">
            Reg D
          </Link>{" "}
          placement, or a{" "}
          <Link href="/products/nasdaq-direct-listing" className="font-medium text-brand-600 hover:underline">
            NASDAQ
          </Link>{" "}
          or{" "}
          <Link href="/products/nyse-direct-listing" className="font-medium text-brand-600 hover:underline">
            NYSE
          </Link>{" "}
          listing, start with our{" "}
          <Link href="/faq/issuer" className="font-medium text-brand-600 hover:underline">
            Issuer FAQ
          </Link>
          , explore{" "}
          <Link href="/raise-capital" className="font-medium text-brand-600 hover:underline">
            how to raise capital on Directly Listed
          </Link>
          , or tell us about your planned raise and we&apos;ll scope it with you.
        </p>
      }
      disclaimer="Directly Listed is a technology platform operated by Adamson Brothers Corp. and is not a registered broker-dealer, investment adviser, funding portal, or law firm. Offerings are conducted by issuers in reliance on their own securities exemptions. Nothing on this page is investment, legal, or tax advice, or an offer to sell or a solicitation of an offer to buy any security. Investing involves risk, including loss of principal. Please consult your own professional advisors before investing."
    />
  );
}
