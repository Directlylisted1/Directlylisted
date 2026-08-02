import Link from "next/link";
import { FaqPage } from "@/components/FaqPage";
import { ISSUER_FAQ } from "@/lib/faq.issuer";

export const metadata = {
  title: "Issuer FAQ — Directly Listed",
  description:
    "Frequently asked questions for companies raising capital and going public on Directly Listed — offering types, costs, timelines, audits, marketing rules, and the path to a NASDAQ or NYSE listing.",
  alternates: { canonical: "/faq/issuer" },
};

export default function IssuerFaqPage() {
  return (
    <FaqPage
      title="Issuer FAQ"
      subtitle="Frequently asked questions for companies raising capital and going public on Directly Listed — offering types, costs, timelines, audits, marketing rules, and the path to a NASDAQ or NYSE listing."
      categories={ISSUER_FAQ}
      crossLink={{ label: "Investor FAQ", href: "/faq/investor" }}
      closingHeading="Ready to plan your raise?"
      closingBody={
        <p>
          Tell us about your planned offering —{" "}
          <Link href="/products/reg-a-plus" className="font-medium text-brand-600 hover:underline">
            Reg A+
          </Link>
          ,{" "}
          <Link href="/products/reg-d-506c" className="font-medium text-brand-600 hover:underline">
            Reg D
          </Link>
          ,{" "}
          <Link href="/products/reg-s" className="font-medium text-brand-600 hover:underline">
            Reg S
          </Link>
          , a{" "}
          <Link href="/products/nasdaq-direct-listing" className="font-medium text-brand-600 hover:underline">
            direct listing
          </Link>
          , or a full{" "}
          <Link href="/products/nyse-conventional-listing" className="font-medium text-brand-600 hover:underline">
            conventional IPO
          </Link>
          . Every deal gets its own flat-fee quotation, and we scope the exemption, exchange, and
          timeline before any money is spent. Browse{" "}
          <Link href="/case-studies" className="font-medium text-brand-600 hover:underline">
            current deals
          </Link>
          , download our{" "}
          <Link href="/guides" className="font-medium text-brand-600 hover:underline">
            guides
          </Link>
          , or start with the{" "}
          <Link href="/faq/investor" className="font-medium text-brand-600 hover:underline">
            Investor FAQ
          </Link>{" "}
          to see the raise from your investors&apos; side.
        </p>
      }
      disclaimer="Directly Listed is a technology platform operated by Adamson Brothers Corp. and is not a registered broker-dealer, investment adviser, funding portal, or law firm. Offerings are conducted by issuers in reliance on their own securities exemptions; U.S. securities law matters are handled in co-counsel with U.S.-admitted securities attorneys. Third-party and exchange fees cited are approximate and change over time. Nothing on this page is legal, investment, or tax advice, or an offer to sell or a solicitation of an offer to buy any security. Consult your own professional advisors."
    />
  );
}
