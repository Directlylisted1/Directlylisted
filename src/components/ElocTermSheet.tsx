// Equity Line of Credit term sheet — shown only on the ELOC product page.
const TERMS: { label: string; body: string }[] = [
  {
    label: "Duration",
    body: "24 or 36 months.",
  },
  {
    label: "Determination of Purchase Price",
    body: "Generally a 5–10% discount to the volume-weighted average price (VWAP) of the company's common stock over the 10 business days following the company's delivery of a drawdown notice to the investor.",
  },
  {
    label: "Minimum Acceptable Price",
    body: "The company may specify a minimum acceptable price in connection with a drawdown notice, but is not required to do so.",
  },
  {
    label: "Investor Fee",
    body: "The investor typically receives a fee in stock upon signing the equity purchase agreement. Fees vary, but recent deals have ranged from 2–4%. The investor also typically receives a small expense reimbursement (e.g., up to $50,000).",
  },
  {
    label: "Registration Statement or Prospectus Supplement",
    body: "If the company does not have an effective registration statement on file for the investor's shares, it typically must file a new registration statement (Form S-1, S-3, F-1, or F-3) within a specified period after execution of the equity purchase agreement (e.g., 30 or 60 days) or pre-listing, and cause it to become effective as promptly as practicable (some deals impose a 90-day deadline; some, 10 business days after notice that the statement is not subject to SEC review). The registration statement must be effective before the company can draw down on the equity line. If an effective registration statement already exists, the company typically files a prospectus supplement describing the transaction before commencing sales.",
  },
  {
    label: "Representations",
    body: "The company makes a full suite of representations and warranties about its business and its SEC disclosure.",
  },
  {
    label: "Short Sales",
    body: "The investor typically represents that it does not have a net short position in the common stock and covenants that it will not enter into or effect any short sales of the company's common stock.",
  },
];

export function ElocTermSheet() {
  return (
    <section className="bg-brand-50/40 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-2 text-3xl font-bold">Equity Line of Credit — Term Sheet</h2>
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-navy-900/75">
          A $750 million equity line of credit (ELOC) can be a useful tool for our
          listed companies to raise capital, providing a flexible and
          cost-effective means of obtaining funds. An ELOC is a financial
          arrangement between our client and a referred financial institution in
          which the client can access a pre-approved equity facility — typically
          secured by the company&apos;s common stock — and draw down as needed,
          up to $750 million.
        </p>

        <dl className="space-y-3">
          {TERMS.map((t) => (
            <div key={t.label} className="card !p-5">
              <dt className="mb-1 font-bold">{t.label}</dt>
              <dd className="text-sm leading-relaxed text-navy-900/75">{t.body}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-xs leading-relaxed text-navy-900/60">
          This summary is provided for information only and does not constitute
          an offer, commitment, or legal advice. Final terms are set in the
          definitive equity purchase agreement for each engagement and are
          subject to the referred institution&apos;s approval and applicable law.
        </p>
      </div>
    </section>
  );
}
