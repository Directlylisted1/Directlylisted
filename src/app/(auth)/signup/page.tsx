import { SignUpForm } from "@/components/AuthForms";

// Auth pages carry no search value and the ?next= variants multiply URLs —
// keep them out of the index entirely (SE Ranking audit fix #4).
export const metadata = {
  title: "Create Account — Directly Listed",
  description: "Create your Directly Listed account to invest in live offerings.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: true },
};

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
