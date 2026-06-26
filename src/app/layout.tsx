import type { Metadata } from "next";
import "./globals.css";
import { EXTENDED_SEO_KEYWORDS } from "@/lib/seo-keywords";

const SITE = "https://www.directlylisted.com";

// Priority keywords first, then the extended background taxonomy (deduped). This
// inherits to every page that doesn't set its own keywords; product pages and
// the homepage layer their own on top via buildMetadata.
const PRIORITY_KEYWORDS = [
  "direct listing",
  "NASDAQ direct listing",
  "NYSE direct listing",
  "Reg A+",
  "Regulation D 506(c)",
  "Regulation D 506(b)",
  "equity line of credit",
  "ELOC",
  "going public without an IPO",
  "capital raising platform",
];
const SITE_KEYWORDS = Array.from(
  new Map(
    [...PRIORITY_KEYWORDS, ...EXTENDED_SEO_KEYWORDS].map((k) => [k.toLowerCase(), k]),
  ).values(),
);

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Directly Listed — The Future of Going Public. List Boldly.",
  description:
    "Raise capital and go public on your terms: Reg D 506(b)/506(c), Reg A+, NASDAQ & NYSE direct listings, and institutional equity lines of credit.",
  keywords: SITE_KEYWORDS,
  openGraph: {
    siteName: "Directly Listed",
    type: "website",
    locale: "en_US",
    url: SITE,
    title: "Directly Listed — The Future of Going Public. List Boldly.",
    description:
      "Reg D 506(b)/506(c), Reg A+, NASDAQ & NYSE direct listings, and institutional equity lines of credit — one platform.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Directly Listed — The Future of Going Public",
    description:
      "Go public without the IPO: direct listings, Reg A+, Reg D, and equity lines of credit.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
