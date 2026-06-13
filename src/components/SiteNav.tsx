import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavMenus } from "./NavMenus";
import { NAV_GROUPS } from "@/lib/nav";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";

const portalHome = (role: string) =>
  role === "ADMIN" ? "/admin" : role === "ISSUER" ? "/issuer" : "/portal";

export async function SiteNav() {
  const [user, recentPosts] = await Promise.all([
    getCurrentUser(),
    db.blogPost
      .findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 4,
        select: { slug: true, title: true, excerpt: true },
      })
      .catch(() => []),
  ]);

  const mobileLinks = [
    ...NAV_GROUPS.flatMap((g) => g.items),
    { href: "/blog", label: "Blog/Vlog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <a href="#content" className="skip-link">Skip to content</a>
      {/* Full-width bar so the logo sits hard left per the rebuild spec */}
      <nav aria-label="Main" className="relative flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="shrink-0"><Logo dark /></Link>
        <NavMenus groups={NAV_GROUPS} blogPosts={recentPosts} />
        <div className="flex items-center gap-3">
          {user ? (
            <Link href={portalHome(user.role)} className="btn-primary !py-2.5">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/signin" className="text-sm font-medium text-white/90 hover:text-white">
                Sign In
              </Link>
              <Link href="/get-started" className="btn-primary !py-2.5">
                Get Started
              </Link>
            </>
          )}
          <div className="lg:hidden">
            <MobileMenu links={mobileLinks} />
          </div>
        </div>
      </nav>
    </header>
  );
}
