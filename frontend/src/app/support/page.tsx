import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support | Zippy",
  description: "Contact Zippy support. Get help with your account, QuickBooks, or invoice follow-ups.",
};

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-2xl py-10">
      <Link href="/" className="text-sm text-[var(--muted)] hover:text-white transition-colors">
        ← Back to home
      </Link>
      <h1 className="page-title mt-6 text-3xl md:text-4xl">Support</h1>
      <p className="text-[var(--muted)] mt-2">
        We’re here to help with your account, QuickBooks connection, or anything else.
      </p>

      <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--card)]/50 p-6">
        <p className="text-sm text-[var(--muted)] mb-2">Email us at</p>
        <a
          href="mailto:zippysupport@gmail.com"
          className="text-xl font-medium text-[var(--accent)] hover:underline"
        >
          zippysupport@gmail.com
        </a>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Click the address above to open your email app, or copy it and send a message from any email client. We’ll get
          back to you as soon as we can.
        </p>
        <p className="mt-6">
          <Link href="/help" className="text-sm text-[var(--accent)] hover:underline">
            See Help & FAQ →
          </Link>
        </p>
      </div>
    </div>
  );
}
