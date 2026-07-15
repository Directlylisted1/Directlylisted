import Link from "next/link";
import { Logo } from "./Logo";
import { PRODUCTS } from "@/lib/offering-types";
import { SOCIAL_LINKS } from "@/lib/social";
import { WhatsAppContact } from "./WhatsAppContact";

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
            <a href="mailto:info@directlylisted.com" className="hover:text-white">info@directlylisted.com</a>
            {" · "}
            <a href="tel:+19495292500" className="hover:text-white">+1 949-529-2500</a>
          </p>
          <WhatsAppContact className="!max-w-xs" />
          <div className="flex items-center gap-3 pt-1">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Directly Listed on LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-accent hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.5 0h4.4v1.9h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v7.48h-4.6v-6.63c0-1.58-.03-3.62-2.2-3.62-2.2 0-2.54 1.72-2.54 3.5V22H7.7V8z" />
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Directly Listed on X"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-accent hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Directly Listed on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[#25D366] hover:border-[#25D366] hover:text-[#25D366]"
            >
              <svg viewBox="0 0 32 32" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.5 1.128 6.744 3.046 9.376L1.05 31.2l6.024-1.926A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.826 32 16S24.83 0 16.004 0Zm9.318 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.602-1.202-4.7-1.948-7.726-6.724-7.962-7.034-.226-.31-1.9-2.528-1.9-4.822 0-2.294 1.166-3.422 1.636-3.902.386-.394.836-.574 1.31-.574.152 0 .29.008.414.014.376.016.564.038.812.63.308.742 1.06 2.586 1.15 2.77.092.184.184.434.06.744-.116.318-.218.458-.434.706-.218.248-.424.438-.642.704-.198.232-.422.482-.172.912.25.422 1.114 1.836 2.392 2.974 1.65 1.468 3.018 1.922 3.498 2.122.358.148.784.112 1.044-.17.33-.36.738-.956 1.152-1.544.294-.42.666-.472 1.056-.324.398.14 2.522 1.19 2.954 1.406.432.214.718.318.824.498.104.18.104 1.04-.282 2.13Z" />
              </svg>
            </a>
          </div>
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
            <li><Link href="/case-studies" className="hover:text-white">Current Deals &amp; Case Studies</Link></li>
            <li><Link href="/faq/issuer" className="hover:text-white">Issuer FAQ</Link></li>
            <li><Link href="/faq/investor" className="hover:text-white">Investor FAQ</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog/Vlog</Link></li>
            <li><Link href="/book" className="hover:text-white">Book a Call</Link></li>
            <li><Link href="/get-started" className="hover:text-white">Get Started</Link></li>
            <li><Link href="/signin" className="hover:text-white">Investor Sign In</Link></li>
            <li>
              <a
                href="mailto:support@directlylisted.com?subject=Support%20request%20%E2%80%94%20Directly%20Listed"
                className="hover:text-white"
              >
                Support
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-8">
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/terms-of-use" className="hover:text-white">Terms of Use</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
              <li><Link href="/regulatory-history" className="hover:text-white">Regulatory History</Link></li>
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
                <a href="https://www.sec.gov/search-filings" target="_blank" rel="noopener noreferrer" className="hover:text-white">
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
