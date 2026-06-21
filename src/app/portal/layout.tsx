import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Investor Portal — Directly Listed" };

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/signin?next=/portal");
  if (user.role !== "INVESTOR") redirect(user.role === "ADMIN" ? "/admin" : "/issuer");

  return (
    <AppShell
      title="Investor Portal"
      userName={`${user.firstName} ${user.lastName}`}
      nav={[
        { href: "/portal", label: "Dashboard" },
        { href: "/offerings", label: "Browse Offerings" },
        { href: "/portal/accreditation", label: "Accreditation" },
        { href: "/portal/account", label: "Account" },
      ]}
    >
      {children}
    </AppShell>
  );
}
