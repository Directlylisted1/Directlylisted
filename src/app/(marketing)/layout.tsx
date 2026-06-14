import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SOCIAL_LINKS } from "@/lib/social";

// Organization structured data for search engines and AI answer engines.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Directly Listed",
  legalName: "Adamson Brothers Corp.",
  url: "https://www.directlylisted.com",
  email: "info@directlylisted.com",
  telephone: "+1-949-529-2500",
  description:
    "B2B institutional technology platform for going public without an IPO: Reg D 506(b)/506(c), Reg A+, NASDAQ and NYSE direct listings, and equity lines of credit.",
  sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.x, "https://www.sec.gov/edgar/search/"],
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <SiteNav />
      <main id="content">{children}</main>
      <SiteFooter />
    </>
  );
}
