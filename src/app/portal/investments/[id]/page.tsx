import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { StatusBadge } from "@/components/AppShell";
import { CardPayment } from "@/components/CardPayment";
import {
  chooseBankTransfer,
  confirmDocsSigned,
  sendInvestmentDocs,
} from "@/lib/invest-actions";
import {
  allowedPaymentMethods,
  investmentBraintreeReady,
  CARD_LIMIT_USD,
} from "@/lib/payments";
import { isAdobeSignConfigured } from "@/lib/adobe-sign";

const STEP_ORDER = [
  "STARTED",
  "DOCS_SENT",
  "DOCS_SIGNED",
  "PAYMENT_PENDING",
  "FUNDS_RECEIVED",
  "COUNTERSIGNED",
  "COMPLETED",
];

export default async function InvestmentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = (await getCurrentUser())!;
  const investment = await db.investment.findUnique({
    where: { id },
    include: { offering: true, payment: true, agreement: true },
  });
  if (!investment || investment.investorId !== user.id) notFound();

  const stepIdx = STEP_ORDER.indexOf(investment.status);
  const methods = allowedPaymentMethods(investment.amount);
  const signStep = stepIdx < 2;
  const payStep = stepIdx === 2;
  const done = stepIdx >= 4;
  const adobeConfigured = await isAdobeSignConfigured();
  const braintreeReady = await investmentBraintreeReady(id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/portal" className="text-sm text-brand-600">← Back to dashboard</Link>

      <div className="card flex items-center justify-between !p-6">
        <div>
          <div className="text-xs uppercase tracking-wide text-navy-900/70">Investment</div>
          <div className="text-xl font-bold">{investment.offering.name}</div>
          <div className="text-sm text-navy-900/60">
            ${investment.amount.toLocaleString()}
            {investment.units > 0 && ` · ${investment.units.toLocaleString()} ${investment.offering.unitName}s`}
          </div>
        </div>
        <StatusBadge value={investment.status} />
      </div>

      {/* Progress */}
      <div className="card !p-6">
        <ol className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
          {["Sign Documents", "Fund Investment", "Closing"].map((label, i) => {
            const reached = stepIdx >= [0, 2, 4][i];
            const active = (i === 0 && signStep) || (i === 1 && payStep) || (i === 2 && done);
            return (
              <li
                key={label}
                aria-current={active ? "step" : undefined}
                className={`rounded-full px-2 py-2 ${
                  active ? "bg-navy-900 text-white" : reached ? "bg-accent/20 text-navy-900" : "bg-slate-100 text-navy-900/60"
                }`}
              >
                {i + 1}. {label}
              </li>
            );
          })}
        </ol>
      </div>

      {/* STEP 1 — eSign via Acrobat Sign */}
      {signStep && (
        <div className="card space-y-4 !p-8">
          <h2 className="text-lg font-bold">Step 1 — Sign Your Subscription Agreement</h2>
          <p className="text-sm text-navy-900/60">
            Your subscription documents are executed electronically through
            Adobe Acrobat Sign with a full audit trail.
          </p>
          {!investment.agreement ? (
            <form action={sendInvestmentDocs}>
              <input type="hidden" name="investmentId" value={id} />
              <button className="btn-dark w-full">Send Documents for Signature</button>
              {!adobeConfigured && (
                <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
                  Acrobat Sign integration key not configured — signature will
                  be simulated for development.
                </p>
              )}
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-navy-900/10 p-4 text-sm">
                <span className="font-medium">{investment.agreement.name}</span>
                <StatusBadge value={investment.agreement.status} />
              </div>
              {investment.agreement.signingUrl && (
                <a
                  href={investment.agreement.signingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  Open Signing Session
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              <form action={confirmDocsSigned}>
                <input type="hidden" name="investmentId" value={id} />
                <button className="btn-outline w-full">I&apos;ve Signed — Continue</button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* STEP 2 — payment */}
      {payStep && (
        <div className="card space-y-6 !p-8">
          <div>
            <h2 className="text-lg font-bold">Step 2 — Fund Your Investment</h2>
            <p className="text-sm text-navy-900/60">
              {methods.includes("CARD")
                ? `Amounts under $${CARD_LIMIT_USD.toLocaleString()} may be paid by card. Wire and ACH are always available.`
                : `This amount is $${CARD_LIMIT_USD.toLocaleString()} or more, so it must be funded by ACH or wire.`}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-navy-900/60">
              Funds are handled directly from you to the issuer — card payments
              under ${CARD_LIMIT_USD.toLocaleString()}, or ACH or wire transfers
              straight to the issuer&apos;s bank account. Directly Listed never
              holds the funds.
            </p>
          </div>

          {methods.includes("CARD") && (
            <div className="rounded-xl border border-navy-900/10 p-5">
              <h3 className="mb-3 text-sm font-bold">Pay by Card</h3>
              <CardPayment
                investmentId={id}
                amount={investment.amount}
                braintreeReady={braintreeReady}
              />
            </div>
          )}

          <div className="rounded-xl border border-navy-900/10 p-5">
            <h3 className="mb-3 text-sm font-bold">Pay by Wire or ACH</h3>
            <p className="mb-4 rounded-lg bg-brand-50 p-4 text-xs leading-relaxed text-navy-900/80">
              Choose your transfer method below. You&apos;ll receive a unique
              reference code, and the banking instructions for this offering
              will be sent to you by the issuer&apos;s payment agent.
            </p>
            <div className="flex gap-3">
              {(["WIRE", "ACH"] as const).map((m) => (
                <form key={m} action={chooseBankTransfer} className="flex-1">
                  <input type="hidden" name="investmentId" value={id} />
                  <input type="hidden" name="method" value={m} />
                  <button className="btn-outline w-full !py-2.5 text-xs">
                    I&apos;ll pay by {m}
                  </button>
                </form>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Awaiting funds */}
      {investment.status === "PAYMENT_PENDING" && investment.payment && (
        <div className="card space-y-3 !p-8">
          <h2 className="text-lg font-bold">Awaiting Your {investment.payment.method} Transfer</h2>
          <p className="text-sm text-navy-900/60">
            Send <strong>${investment.amount.toLocaleString()}</strong> using
            the banking instructions provided by the issuer&apos;s payment
            agent, and include your reference code with the transfer.
            We&apos;ll confirm once funds arrive.
          </p>
          <div className="rounded-lg bg-brand-50 p-4 text-sm">
            <div className="mb-2 text-xs text-navy-900/70">Reference code (required)</div>
            <div className="text-xl font-bold tracking-wider">{investment.payment.wireReference}</div>
          </div>
        </div>
      )}

      {/* Done */}
      {done && (
        <div className="card space-y-3 !p-8 text-center">
          <div className="text-4xl" aria-hidden="true">🎉</div>
          <h2 className="text-xl font-bold">Funds Received</h2>
          <p className="text-sm text-navy-900/60">
            Your investment is funded and awaiting issuer countersignature at
            closing. You&apos;ll be notified when your securities are issued.
          </p>
          <Link href="/offerings" className="btn-dark">Browse More Offerings</Link>
        </div>
      )}
    </div>
  );
}
