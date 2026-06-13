import Link from "next/link";

export default function ThanksPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-navy-950 px-6 pt-24 text-center text-white">
      <div>
        <h1 className="mb-4 text-4xl font-bold">Request Received</h1>
        <p className="mb-8 max-w-md text-white/70">
          Our team will review your deal and reach out within one business day
          with next steps and your quotation.
        </p>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    </section>
  );
}
