import { SignUpForm } from "@/components/AuthForms";

export const metadata = { title: "Create Account — Directly Listed" };

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold">Create Your Account</h1>
      <SignUpForm next={next} />
    </>
  );
}
