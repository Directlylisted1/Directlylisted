import Link from "next/link";
import { db } from "@/lib/db";
import { CrmSubnav } from "@/components/CrmSubnav";
import { StatusBadge } from "@/components/AppShell";
import { createContact } from "@/lib/crm-actions";

export default async function CrmContactsPage() {
  const contacts = await db.crmContact.findMany({
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { appointments: true } } },
  });

  return (
    <div>
      <CrmSubnav active="/admin/crm/contacts" />

      <details className="card mb-6 !p-5">
        <summary className="cursor-pointer text-sm font-bold">+ Add a contact manually</summary>
        <form action={createContact} className="mt-4 grid items-end gap-3 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          <div>
            <label htmlFor="c-name" className="label">Name</label>
            <input id="c-name" name="name" required className="input" />
          </div>
          <div>
            <label htmlFor="c-email" className="label">Email</label>
            <input id="c-email" name="email" type="email" required className="input" />
          </div>
          <div>
            <label htmlFor="c-phone" className="label">Phone</label>
            <input id="c-phone" name="phone" className="input" />
          </div>
          <div>
            <label htmlFor="c-company" className="label">Company</label>
            <input id="c-company" name="company" className="input" />
          </div>
          <button className="btn-dark !py-2.5 text-xs">Add</button>
        </form>
      </details>

      <div className="card overflow-x-auto !p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-navy-900/10 text-left text-xs uppercase text-navy-900/70">
            <tr>
              <th scope="col" className="px-5 py-3">Contact</th>
              <th scope="col" className="px-5 py-3">Company</th>
              <th scope="col" className="px-5 py-3">Stage</th>
              <th scope="col" className="px-5 py-3">Source</th>
              <th scope="col" className="px-5 py-3">Appts</th>
              <th scope="col" className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b border-navy-900/5">
                <td className="px-5 py-3">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-navy-900/70">{c.email}</div>
                </td>
                <td className="px-5 py-3">{c.company ?? "—"}</td>
                <td className="px-5 py-3"><StatusBadge value={c.stage} /></td>
                <td className="px-5 py-3 text-xs">{c.source}</td>
                <td className="px-5 py-3">{c._count.appointments}</td>
                <td className="px-5 py-3">
                  <Link href={`/admin/crm/contacts/${c.id}`} className="font-semibold text-brand-600">
                    Open →
                  </Link>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-navy-900/70">No contacts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
