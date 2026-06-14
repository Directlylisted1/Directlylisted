import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Back Office — Directly Listed" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/signin?next=/admin");
  if (user.role !== "ADMIN") redirect(user.role === "ISSUER" ? "/issuer" : "/portal");

  return (
    <AppShell
      title="Platform Back Office"
      userName={`${user.firstName} ${user.lastName}`}
      nav={[
        { href: "/admin", label: "Overview" },
        { href: "/admin/offerings", label: "Offerings & Quotes" },
        { href: "/admin/investments", label: "Investments & Payments" },
        { href: "/admin/users", label: "Users & Accreditation" },
        { href: "/admin/leads", label: "Leads" },
        { href: "/admin/crm", label: "CRM" },
        { href: "/admin/integrations", label: "eSign & Integrations" },
        { href: "/admin/blog", label: "Blog" },
        { href: "/admin/settings", label: "Settings" },
      ]}
    >
      {children}
    </AppShell>
  );
}
