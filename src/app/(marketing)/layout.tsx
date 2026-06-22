import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { rootGraph } from "@/lib/jsonld";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Site-wide structured data: Organization + Person (Andy Altahawi) +
          WebSite + Service catalog — rendered once for search & AI engines. */}
      <JsonLd data={rootGraph()} id="ld-root" />
      <SiteNav />
      <main id="content">{children}</main>
      <SiteFooter />
    </>
  );
}
