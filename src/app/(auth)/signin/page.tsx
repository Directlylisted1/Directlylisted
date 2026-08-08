import { SignInForm } from "@/components/AuthForms";

// Auth pages carry no search value and the ?next= variants multiply URLs —
// keep them out of the index entirely (SE Ranking audit fix #4).
export const metadata = {
  title: "Sign In — Directly Listed",
  description: "Sign in to your Directly Listed investor or issuer account.",
  alternates: { canonical: "/signin" },
  robots: { index: false, follow: true },
};

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
