import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Issuer Dashboard — Directly Listed" };

export default async function IssuerLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/signin?next=/issuer");
  if (user.role !== "ISSUER") redirect(user.role === "ADMIN" ? "/admin" : "/portal");

  return (
    <AppShell
      title={user.issuerProfile?.companyName ?? "Issuer Dashboard"}
      userName={`${user.firstName} ${user.lastName}`}
      nav={[
        { href: "/issuer", label: "Dashboard" },
        { href: "/issuer/offerings/new", label: "New Offering" },
      ]}
    >
      {children}
    </AppShell>
  );
}
