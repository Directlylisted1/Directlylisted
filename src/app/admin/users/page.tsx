import { db } from "@/lib/db";
import { StatusBadge } from "@/components/AppShell";
import { setAccreditation, setUserArchived, deleteUser } from "@/lib/admin-actions";
import { getCurrentUser } from "@/lib/session";

export default async function AdminUsers() {
  const [users, current] = await Promise.all([
    db.user.findMany({
      include: { investorProfile: true, issuerProfile: true },
      orderBy: { createdAt: "desc" },
    }),
    getCurrentUser(),
  ]);

  return (
    <div className="card overflow-x-auto !p-0">
      <table className="w-full text-sm">
        <thead className="border-b border-navy-900/10 text-left text-xs uppercase text-navy-900/70">
          <tr>
            <th scope="col" className="px-5 py-3">User</th>
            <th scope="col" className="px-5 py-3">Role</th>
            <th scope="col" className="px-5 py-3">Company</th>
            <th scope="col" className="px-5 py-3">Accreditation</th>
            <th scope="col" className="px-5 py-3">Basis</th>
            <th scope="col" className="px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className={`border-b border-navy-900/5 ${u.archivedAt ? "opacity-60" : ""}`}>
              <td className="px-5 py-3">
                <div className="flex items-center gap-2 font-medium">
                  {u.firstName} {u.lastName}
                  {u.archivedAt && (
                    <span className="rounded-full bg-navy-900/10 px-2 py-0.5 text-[10px] font-semibold text-navy-900/70">
                      Archived
                    </span>
                  )}
                </div>
                <div className="text-xs text-navy-900/70">{u.email}</div>
              </td>
              <td className="px-5 py-3"><StatusBadge value={u.role} /></td>
              <td className="px-5 py-3">{u.issuerProfile?.companyName ?? "—"}</td>
              <td className="px-5 py-3">
                {u.investorProfile ? <StatusBadge value={u.investorProfile.accreditationStatus} /> : "—"}
              </td>
              <td className="px-5 py-3 text-xs">{u.investorProfile?.accreditationBasis ?? "—"}</td>
              <td className="px-5 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  {u.investorProfile &&
                    ["SELF_CERTIFIED", "PENDING_VERIFICATION"].includes(
                      u.investorProfile.accreditationStatus,
                    ) &&
                    (["VERIFIED", "REJECTED"] as const).map((s) => (
                      <form key={s} action={setAccreditation}>
                        <input type="hidden" name="profileId" value={u.investorProfile!.id} />
                        <input type="hidden" name="status" value={s} />
                        <button
                          className={`!px-4 !py-2.5 text-[11px] ${s === "VERIFIED" ? "btn-primary" : "btn-outline"}`}
                        >
                          {s === "VERIFIED" ? "Verify" : "Reject"}
                        </button>
                      </form>
                    ))}
                  {u.id !== current?.id && (
                    <>
                      <form action={setUserArchived}>
                        <input type="hidden" name="userId" value={u.id} />
                        <input type="hidden" name="archive" value={u.archivedAt ? "0" : "1"} />
                        <button className="btn-outline !px-4 !py-2.5 text-[11px]">
                          {u.archivedAt ? "Unarchive" : "Archive"}
                        </button>
                      </form>
                      <form action={deleteUser}>
                        <input type="hidden" name="userId" value={u.id} />
                        <button className="!rounded-lg !border !border-red-300 !bg-red-50 !px-4 !py-2.5 text-[11px] font-semibold text-red-700 hover:!bg-red-100">
                          Delete
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
