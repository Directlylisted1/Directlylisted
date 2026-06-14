import Link from "next/link";

const TABS = [
  { href: "/admin/crm", label: "Overview" },
  { href: "/admin/crm/contacts", label: "Contacts" },
  { href: "/admin/crm/appointments", label: "Appointments" },
  { href: "/admin/crm/availability", label: "Availability" },
];

export function CrmSubnav({ active }: { active: string }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2 border-b border-navy-900/10 pb-4">
      {TABS.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            active === t.href
              ? "bg-navy-900 text-white"
              : "text-navy-900/70 hover:bg-brand-50"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}
