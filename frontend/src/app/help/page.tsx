import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help & FAQ | Zippy",
  description: "Get help with Zippy: connecting QuickBooks, autopilot, follow-ups, billing, and support.",
};

const HELP_SECTIONS = [
  {
    title: "Getting started",
    items: [
      {
        q: "How do I sign up?",
        a: "Go to the homepage and click “Get started free” or “Log in”. Enter your email and we’ll send you a magic link—no password needed. Then connect QuickBooks to sync your customers and invoices.",
      },
      {
        q: "What do I need to use Zippy?",
        a: "A QuickBooks Online account and an email address. We sync your open invoices and customers from QuickBooks. You set your follow-up schedule and we handle the rest.",
      },
      {
        q: "How long does setup take?",
        a: "About 2 minutes to connect QuickBooks and see your first sync. You can adjust your autopilot schedule (when we send reminders) in Settings → Autopilot.",
      },
    ],
  },
  {
    title: "How Zippy works",
    items: [
      {
        q: "Will Zippy keep sending reminders if there’s a problem?",
        a: "No. When a customer reports an issue (wrong amount, need PO, W-9, etc.) from the link in the email, we stop follow-ups for that invoice. You fix it, mark it done, and we only nudge again when you’re ready.",
      },
      {
        q: "What if a customer has a question about an invoice?",
        a: "Every email includes a “Report an issue” link. They choose what’s wrong and it lands in one place for you. You fix it; we don’t send another reminder until you say so.",
      },
      {
        q: "Does Zippy change anything in QuickBooks?",
        a: "We read your customers and invoices to send reminders and show you who’s paid and who’s overdue. We don’t create or edit invoices in QuickBooks unless you do that yourself.",
      },
    ],
  },
  {
    title: "QuickBooks & data",
    items: [
      {
        q: "Is my data secure?",
        a: "Yes. We use industry-standard encryption and don’t store card details. You can disconnect QuickBooks anytime from Settings → Integrations.",
      },
      {
        q: "Which QuickBooks products work with Zippy?",
        a: "Zippy connects to QuickBooks Online. We sync your customers and open invoices so follow-ups stay in sync with your books.",
      },
    ],
  },
  {
    title: "Billing & account",
    items: [
      {
        q: "Can I try Zippy before paying?",
        a: "Yes. Sign up with email, connect QuickBooks, and start using autopilot. No credit card required to start.",
      },
      {
        q: "How do I cancel?",
        a: "You can stop or change your plan from your account settings. Disconnecting QuickBooks stops syncing and reminders.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <Link href="/" className="text-sm text-[var(--muted)] hover:text-white transition-colors">
        ← Back to home
      </Link>
      <h1 className="page-title mt-6 text-3xl md:text-4xl">Help & FAQ</h1>
      <p className="text-sm text-[var(--muted)] mt-2">
        Answers to common questions about Zippy. Can’t find what you need? Contact us below.
      </p>

      <div className="mt-10 space-y-12">
        {HELP_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-white mb-6">{section.title}</h2>
            <dl className="space-y-6">
              {section.items.map((faq) => (
                <div key={faq.q}>
                  <dt className="text-base font-medium text-white">{faq.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <section className="mt-14 pt-10 border-t border-[var(--border)]">
        <h2 className="text-lg font-semibold text-white">Still need help?</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Email us at{" "}
          <a href="mailto:zippysupport@gmail.com" className="text-[var(--accent)] hover:underline">
            zippysupport@gmail.com
          </a>{" "}
          and we’ll get back to you as soon as we can.
        </p>
        <p className="mt-4">
          <Link href="/quickbooks" className="text-sm text-[var(--accent)] hover:underline">
            How Zippy works with QuickBooks →
          </Link>
        </p>
      </section>
    </div>
  );
}
