import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-6 py-16">
      <main className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/"><Logo dark /></Link>
        </div>
        <div className="card !p-8">{children}</div>
      </main>
    </div>
  );
}
