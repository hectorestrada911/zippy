import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Zippy works with QuickBooks | Zippy",
  description: "What Zippy syncs from QuickBooks, how we use your data, and how to disconnect. Built for QuickBooks Online.",
};

export default function QuickBooksPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <Link href="/" className="text-sm text-[var(--muted)] hover:text-white transition-colors">
        ← Back to home
      </Link>
      <h1 className="page-title mt-6 text-3xl md:text-4xl">How Zippy works with QuickBooks</h1>
      <p className="text-[var(--muted)] mt-2">
        We connect to QuickBooks Online so you can run invoice follow-ups without re-entering data. Here’s what we sync, how we use it, and how to disconnect.
      </p>

      <div className="mt-10 space-y-8 text-[var(--muted)] text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">What we sync</h2>
          <p>
            After you connect QuickBooks (via Intuit’s secure OAuth flow), Zippy syncs the data we need to run your
            follow-ups and show you who owes what:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Customers (name, contact info) so we can send reminder emails</li>
            <li>Open invoices (amount, due date, status) so we know what’s overdue</li>
            <li>Payment status so we can stop nudging when an invoice is paid</li>
          </ul>
          <p className="mt-3">
            We keep this in sync by running periodic syncs. You can also trigger a sync anytime from Settings →
            Integrations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">How we use your data</h2>
          <p>
            We use your QuickBooks data only to provide Zippy: to send reminder emails at the times you choose, to show
            you a list of who owes what and what’s overdue, and to capture when a customer reports an issue (wrong
            amount, need PO, etc.). We do not sell your data or use it for advertising. We do not store your QuickBooks
            password; we use OAuth tokens that you can revoke anytime. For full details, see our{" "}
            <Link href="/privacy" className="text-[var(--accent)] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">How to disconnect</h2>
          <p>
            You can disconnect QuickBooks at any time from Zippy: go to Settings → Integrations and revoke the
            connection. You can also revoke Zippy’s access from your QuickBooks or Intuit account settings. After you
            disconnect, we stop syncing and stop using your QuickBooks data for new processing; we’ll delete or
            anonymize it in line with our retention policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">QuickBooks Online only</h2>
          <p>
            Zippy works with QuickBooks Online. We do not support QuickBooks Desktop or other Intuit products for this
            integration. Your use of QuickBooks is subject to Intuit’s terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Questions</h2>
          <p>
            For support or privacy questions, see our{" "}
            <Link href="/help" className="text-[var(--accent)] hover:underline">
              Help & FAQ
            </Link>{" "}
            or{" "}
            <Link href="/support" className="text-[var(--accent)] hover:underline">
              Contact support
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
