export type NavItem = { href: string; label: string; description?: string };
export type NavGroup = { label: string; href?: string; items: NavItem[] };

// Top navigation per the rebuild spec.
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "NASDAQ & NYSE Listings",
    items: [
      { href: "/products/nasdaq-conventional-listing", label: "NASDAQ Conventional Listing" },
      { href: "/products/nasdaq-direct-listing", label: "NASDAQ Direct Listing" },
      { href: "/products/nyse-conventional-listing", label: "NYSE Conventional Listing" },
      { href: "/products/nyse-direct-listing", label: "NYSE Direct Listing" },
    ],
  },
  {
    label: "Raise Capital",
    href: "/raise-capital",
    items: [
      { href: "/products/reg-a-plus", label: "Reg A+" },
      { href: "/products/reg-d-506c", label: "Reg D 506(c)" },
      { href: "/products/reg-d-506b", label: "Reg D 506(b)" },
      { href: "/products/reg-s", label: "Reg S" },
      { href: "/products/pipe", label: "PIPE (Post-Listing)" },
    ],
  },
  {
    label: "Strategic & Large Investors",
    href: "/strategic-investors",
    items: [
      { href: "/strategic-investors", label: "Family Offices, VC, PE & Hedge Funds" },
      { href: "/products/eloc", label: "ELOC — Post-Listing Financing" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    items: [
      { href: "/products/capital-raise-tech", label: "Capital Raise Tech" },
      { href: "/products/investor-services", label: "Investor Services" },
      { href: "/products/campaign-marketing", label: "Campaign Marketing" },
    ],
  },
  {
    label: "Resources",
    items: [
      { href: "/about", label: "About Us" },
      { href: "/guides", label: "Guides" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/faq/issuer", label: "Issuer FAQ" },
      { href: "/faq/investor", label: "Investor FAQ" },
    ],
  },
];
