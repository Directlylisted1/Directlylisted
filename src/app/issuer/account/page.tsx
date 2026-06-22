import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import { IssuerPaymentSettings } from "@/components/IssuerPaymentSettings";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = { title: "Account — Directly Listed" };

export default async function IssuerAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const user = await getCurrentUser();
  if (!user?.issuerProfile) redirect("/signin");
  const issuer = user.issuerProfile;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <IssuerPaymentSettings
        merchantId={issuer.braintreeMerchantId}
        publicKey={issuer.braintreePublicKey}
        hasPrivateKey={Boolean(issuer.braintreePrivateKey)}
        environment={issuer.braintreeEnvironment}
        adobeGroupId={issuer.adobeGroupId}
        saved={saved === "braintree"}
      />
      <ChangePasswordForm />
    </div>
  );
}
