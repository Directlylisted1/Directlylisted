import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { getCurrentUser, getActiveRole } from "@/lib/session";

export const metadata = { title: "Issuer Dashboard — Directly Listed" };

export default async function IssuerLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/signin?next=/issuer");
  const active = await getActiveRole();
  if (active !== "ISSUER") redirect(active === "ADMIN" ? "/admin" : "/portal");

  return (
    <AppShell
      title={user.issuerProfile?.companyName ?? "Issuer Dashboard"}
      userName={`${user.firstName} ${user.lastName}`}
      switchTo="INVESTOR"
      nav={[
        { href: "/issuer", label: "Dashboard" },
        { href: "/issuer/offerings/new", label: "New Offering" },
        { href: "/issuer/account", label: "Account" },
      ]}
    >
      {children}
    </AppShell>
  );
}
