import { SignInForm } from "@/components/AuthForms";

export const metadata = { title: "Sign In — Directly Listed" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold">Welcome Back</h1>
      <SignInForm next={next} />
    </>
  );
}
