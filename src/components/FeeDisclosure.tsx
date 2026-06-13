export function FeeDisclosure({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "rounded-xl border border-navy-900/10 bg-brand-50 p-4 text-xs leading-relaxed text-navy-900/80"
          : "rounded-2xl border border-navy-900/10 bg-brand-50 p-6 text-sm leading-relaxed text-navy-900/80"
      }
    >
      <h3 className={`mb-2 font-bold text-navy-900 ${compact ? "text-xs uppercase tracking-wide" : "text-base"}`}>
        Flat Fee Disclosure
      </h3>
      <p className="mb-2">
        Our SEC-licensed attorneys, consultants, and listing advisors are all
        paid out of the flat fee we charge. There are no separate legal
        bills—only third-party costs, such as legal opinions, valuation
        reports, audits, transfer agent and DTC fees, exchange application
        fees, and any annual exchange fees.
      </p>
      <p>
        The flat fee is determined by the scope of services provided and your
        company&apos;s stage, along with an equity grant that is likewise set
        according to your startup&apos;s stage and needs. Every deal is quoted
        individually.
      </p>
    </div>
  );
}
