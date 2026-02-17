import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold text-white">Page not found</h1>
      <p className="text-[var(--muted)]">This link might be broken or the page was moved.</p>
      <Link href="/" className="btn-primary">
        Back to Zippy
      </Link>
    </div>
  );
}
