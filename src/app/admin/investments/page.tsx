import { db } from "@/lib/db";
import { StatusBadge } from "@/components/AppShell";
import { confirmFundsReceived, countersignInvestment } from "@/lib/admin-actions";

export default async function AdminInvestments() {
  const investments = await db.investment.findMany({
    include: { offering: true, investor: true, payment: true, agreement: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="card overflow-x-auto !p-0">
      <table className="w-full text-sm">
        <thead className="border-b border-navy-900/10 text-left text-xs uppercase text-navy-900/70">
          <tr>
            <th scope="col" className="px-5 py-3">Investor</th>
            <th scope="col" className="px-5 py-3">Offering</th>
            <th scope="col" className="px-5 py-3">Amount</th>
            <th scope="col" className="px-5 py-3">Docs</th>
            <th scope="col" className="px-5 py-3">Payment</th>
            <th scope="col" className="px-5 py-3">Reference</th>
            <th scope="col" className="px-5 py-3">Status</th>
            <th scope="col" className="px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((i) => (
            <tr key={i.id} className="border-b border-navy-900/5 align-top">
              <td className="px-5 py-3">
                <div className="font-medium">{i.investor.firstName} {i.investor.lastName}</div>
                <div className="text-xs text-navy-900/70">{i.investor.email}</div>
              </td>
              <td className="px-5 py-3">{i.offering.name}</td>
              <td className="px-5 py-3 font-semibold">${i.amount.toLocaleString()}</td>
              <td className="px-5 py-3">
                {i.agreement ? <StatusBadge value={i.agreement.status} /> : "—"}
              </td>
              <td className="px-5 py-3">
                {i.payment ? (
                  <>
                    <StatusBadge value={i.payment.status} />
                    <div className="mt-1 text-xs text-navy-900/70">
                      {i.payment.method}
                      {i.payment.braintreeTxnId && ` · ${i.payment.braintreeTxnId}`}
                    </div>
                  </>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-5 py-3 text-xs">{i.payment?.wireReference ?? "—"}</td>
              <td className="px-5 py-3"><StatusBadge value={i.status} /></td>
              <td className="px-5 py-3">
                <div className="flex flex-col gap-2">
                  {i.status === "PAYMENT_PENDING" && (
                    <form action={confirmFundsReceived}>
                      <input type="hidden" name="investmentId" value={i.id} />
                      <button className="btn-primary !px-4 !py-2.5 text-[11px]">
                        Confirm Funds Received
                      </button>
                    </form>
                  )}
                  {i.status === "FUNDS_RECEIVED" && (
                    <form action={countersignInvestment}>
                      <input type="hidden" name="investmentId" value={i.id} />
                      <button className="btn-dark !px-4 !py-2.5 text-[11px]">
                        Countersign &amp; Complete
                      </button>
                    </form>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {investments.length === 0 && (
            <tr><td colSpan={8} className="px-5 py-8 text-center text-navy-900/70">No investments yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
