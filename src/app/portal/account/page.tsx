import { ChangePasswordForm } from "@/components/ChangePasswordForm";

export const metadata = { title: "Account — Directly Listed" };

export default function PortalAccountPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <ChangePasswordForm />
    </div>
  );
}
