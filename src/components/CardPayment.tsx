"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { payByCard } from "@/lib/invest-actions";

declare global {
  interface Window {
    braintree?: {
      dropin: {
        create(opts: object): Promise<{
          requestPaymentMethod(): Promise<{ nonce: string }>;
        }>;
      };
    };
  }
}

export function CardPayment({
  investmentId,
  amount,
  braintreeReady,
}: {
  investmentId: string;
  amount: number;
  braintreeReady: boolean;
}) {
  const [state, action, pending] = useActionState(payByCard, undefined);
  const [nonce, setNonce] = useState("");
  const [dropinError, setDropinError] = useState("");
  const instanceRef = useRef<{ requestPaymentMethod(): Promise<{ nonce: string }> } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!braintreeReady) return;
    const script = document.createElement("script");
    script.src = "https://js.braintreegateway.com/web/dropin/1.43.0/js/dropin.min.js";
    script.onload = async () => {
      try {
        const res = await fetch(`/api/braintree/token?investmentId=${investmentId}`);
        const { clientToken } = await res.json();
        instanceRef.current = await window.braintree!.dropin.create({
          authorization: clientToken,
          container: "#braintree-dropin",
        });
      } catch {
        setDropinError("Could not load the secure payment form.");
      }
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [braintreeReady]);

  async function submitCard() {
    if (!braintreeReady) {
      // Development simulation when Braintree credentials are not configured.
      setNonce("simulated-nonce");
      setTimeout(() => formRef.current?.requestSubmit(), 0);
      return;
    }
    try {
      const { nonce } = await instanceRef.current!.requestPaymentMethod();
      setNonce(nonce);
      setTimeout(() => formRef.current?.requestSubmit(), 0);
    } catch {
      setDropinError("Please complete your card details.");
    }
  }

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <input type="hidden" name="investmentId" value={investmentId} />
      <input type="hidden" name="nonce" value={nonce} />
      {braintreeReady ? (
        <div id="braintree-dropin" />
      ) : (
        <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
          Payment processing is not configured — payment will be simulated for
          development.
        </div>
      )}
      {(state?.error || dropinError) && (
        <p role="alert" className="text-sm text-red-600">{state?.error ?? dropinError}</p>
      )}
      <button
        type="button"
        onClick={submitCard}
        disabled={pending}
        className="btn-primary w-full disabled:opacity-50"
      >
        {pending ? "Processing…" : `Pay $${amount.toLocaleString()} by Card`}
      </button>
    </form>
  );
}
