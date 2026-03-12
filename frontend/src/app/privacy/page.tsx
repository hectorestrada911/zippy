import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Zippy",
  description: "Zippy Privacy Policy. How we collect, use, and protect your information. California privacy rights (CCPA).",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <Link href="/" className="text-sm text-[var(--muted)] hover:text-white transition-colors">
        ← Back to home
      </Link>
      <h1 className="page-title mt-6 text-3xl md:text-4xl">Privacy Policy</h1>
      <p className="text-sm text-[var(--muted)] mt-2">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="mt-10 space-y-8 text-[var(--muted)] text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">1. Introduction</h2>
          <p>
            Zippy (“we,” “our,” or “us”) provides invoice resolution and accounts receivable tools. This Privacy Policy
            describes how we collect, use, disclose, and protect your information when you use our website and
            services. We are committed to protecting your privacy and complying with applicable law, including the
            California Consumer Privacy Act (CCPA) where applicable.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">2. Information We Collect</h2>
          <p className="mb-3">We may collect:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong className="text-white">Account and contact information:</strong> Email address, name, and
              organization details when you sign up or use our services.
            </li>
            <li>
              <strong className="text-white">Integration data:</strong> Information from connected services (e.g.,
              QuickBooks) such as customer and invoice data that you authorize us to access.
            </li>
            <li>
              <strong className="text-white">Usage and device information:</strong> Log data, IP address, browser type,
              and how you interact with our product.
            </li>
            <li>
              <strong className="text-white">Communications:</strong> Emails and support messages you send to us.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">3. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, operate, and improve our services; to authenticate you and
            manage your account; to sync and display your accounting data (e.g., customers and invoices); to send
            transactional and product-related communications (including magic-link sign-in and invoice reminders); and
            to comply with legal obligations and protect our rights.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">4. Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share information with service providers who assist us
            (e.g., hosting, email delivery, analytics), with your connected integrations (e.g., QuickBooks) as
            authorized by you, and when required by law or to protect our rights. We require our service providers to
            use your information only as necessary to perform services for us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">5. Data Retention and Security</h2>
          <p>
            We retain your information for as long as your account is active or as needed to provide services and
            comply with legal obligations. We implement reasonable technical and organizational measures to protect
            your data against unauthorized access, loss, or misuse.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">6. Your Rights (Including California)</h2>
          <p className="mb-3">
            Depending on where you live, you may have the right to access, correct, delete, or port your personal
            information, or to opt out of certain uses. If you are a California resident, the CCPA may provide you with
            the right to:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-3">
            <li>Know what personal information we collect, use, and disclose</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of the “sale” of your personal information (we do not sell personal information)</li>
            <li>Non-discrimination for exercising your privacy rights</li>
          </ul>
          <p>
            To exercise these rights, contact us at the email or address below. We will verify your identity and
            respond in accordance with applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">7. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar technologies to maintain your session, remember preferences, and understand how
            you use our services. You can manage cookie settings in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the updated policy on this page and
            update the “Last updated” date. Continued use of our services after changes constitutes acceptance of the
            updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">9. Contact Us</h2>
          <p>
            For questions about this Privacy Policy or to exercise your privacy rights, contact us at:
          </p>
          <p className="mt-2 text-white">
            Zippy
          </p>
          <p className="mt-2">
            Email: privacy@zippy.com (or your preferred contact email)
          </p>
        </section>
      </div>

      <p className="mt-12 pt-8 border-t border-[var(--border)] text-xs text-[var(--muted-soft)]">
        This privacy policy is provided for informational purposes. You may wish to have it reviewed by legal counsel
        and to replace placeholder contact information with your actual details.
      </p>
    </div>
  );
}
