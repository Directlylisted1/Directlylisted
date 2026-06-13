import Link from "next/link";
import { Logo } from "./Logo";
import { PRODUCTS } from "@/lib/offering-types";

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <Logo dark />
          <p className="text-sm text-white/60">
            Industry-leading exchange direct listing advisors. The future of
            going public — without the IPO.
          </p>
          <p className="text-xs text-white/60">
            info@directlylisted.com · +1 949-529-2500
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white/80">Products</h4>
          <ul className="space-y-2 text-sm text-white/60">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="hover:text-white">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white/80">Platform</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/offerings" className="hover:text-white">Live Offerings</Link></li>
            <li><Link href="/raise-capital" className="hover:text-white">Raise Capital</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
            <li><Link href="/case-studies" className="hover:text-white">Case Studies</Link></li>
            <li><Link href="/faq/issuer" className="hover:text-white">Issuer FAQ</Link></li>
            <li><Link href="/faq/investor" className="hover:text-white">Investor FAQ</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog/Vlog</Link></li>
            <li><Link href="/get-started" className="hover:text-white">Get Started</Link></li>
            <li><Link href="/signin" className="hover:text-white">Investor Sign In</Link></li>
          </ul>
        </div>
        <div className="space-y-8">
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/terms-of-use" className="hover:text-white">Terms of Use</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">SEC Resources</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="https://www.sec.gov" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  SEC.gov<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  EDGAR Company Search<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href="https://www.sec.gov/edgar/search/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  EDGAR Full-Text Search<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href="https://www.investor.gov" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Investor.gov<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Adamson Brothers Corp. d/b/a Directly Listed.
        Directly Listed is a technology platform, not a registered broker-dealer or
        funding portal. Offerings are conducted by issuers in reliance on their own
        securities exemptions. Investing involves risk, including loss of principal.
      </div>
    </footer>
  );
}
