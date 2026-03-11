import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Zippy",
  description: "Zippy Terms of Service. Terms and conditions for use of our invoice resolution and accounts receivable services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <Link href="/" className="text-sm text-[var(--muted)] hover:text-white transition-colors">
        ← Back to home
      </Link>
      <h1 className="page-title mt-6 text-3xl md:text-4xl">Terms of Service</h1>
      <p className="text-sm text-[var(--muted)] mt-2">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="mt-10 space-y-8 text-[var(--muted)] text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">1. Agreement to Terms</h2>
          <p>
            By accessing or using Zippy (“Service”), you agree to be bound by these Terms of Service (“Terms”). If you
            are using the Service on behalf of an organization, you represent that you have authority to bind that
            organization. If you do not agree to these Terms, do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
          <p>
            Zippy provides tools for invoice resolution, accounts receivable management, and follow-up communications.
            The Service may integrate with third-party platforms (e.g., QuickBooks) that you connect at your
            discretion. We do not guarantee uninterrupted or error-free operation and may modify or discontinue
            features with reasonable notice where practicable.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">3. Account and Eligibility</h2>
          <p>
            You must provide accurate information when creating an account and keep it current. You are responsible for
            maintaining the confidentiality of your account and for all activity under your account. You must be at
            least 18 years old and able to form a binding contract. The Service is intended for business use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">4. Acceptable Use</h2>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Service in violation of any applicable law or third-party rights</li>
            <li>Transmit malicious code, spam, or content that is fraudulent or harmful</li>
            <li>Attempt to gain unauthorized access to the Service, other accounts, or our systems</li>
            <li>Resell or sublicense the Service without our written consent</li>
            <li>Use the Service in a manner that could impair or overload our infrastructure</li>
          </ul>
          <p className="mt-3">
            We may suspend or terminate your access if we reasonably believe you have violated these Terms or
            applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">5. Your Data and Privacy</h2>
          <p>
            You retain ownership of data you provide or that we process on your behalf. Our collection and use of
            personal information is described in our{" "}
            <Link href="/privacy" className="text-[var(--accent)] hover:underline">
              Privacy Policy
            </Link>
            , which is incorporated into these Terms. By using the Service, you consent to such collection and use. You
            are responsible for ensuring you have appropriate rights and consents to provide any data you submit,
            including data from connected integrations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">6. Fees and Payment</h2>
          <p>
            Certain features may be subject to fees as described on our website or in separate ordering terms. You
            agree to pay all applicable fees when due. Fees are non-refundable unless otherwise required by law or
            stated in our refund policy. We may change fees with reasonable notice; continued use after a fee change
            constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">7. Disclaimers</h2>
          <p>
            THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
            INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. WE ARE
            NOT RESPONSIBLE FOR THE ACCURACY OR RELIABILITY OF DATA FROM THIRD-PARTY INTEGRATIONS.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">8. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ZIPPY AND ITS AFFILIATES, OFFICERS, DIRECTORS,
            EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, OR FOR LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE OR
            THESE TERMS. OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE
            SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM (OR ONE HUNDRED
            DOLLARS ($100) IF GREATER). SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS; IN SUCH CASES, OUR
            LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Zippy and its affiliates and their respective officers,
            directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and
            expenses (including reasonable attorneys’ fees) arising out of or related to your use of the Service, your
            data, your violation of these Terms, or your violation of any third-party rights or applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">10. Governing Law and Disputes</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California,
            United States, without regard to its conflict of law principles. Any dispute arising out of or relating to
            these Terms or the Service shall be resolved exclusively in the state or federal courts located in
            California, and you consent to the personal jurisdiction of such courts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">11. General</h2>
          <p>
            These Terms constitute the entire agreement between you and Zippy regarding the Service. Our failure to
            enforce any right or provision shall not constitute a waiver. If any provision is held invalid or
            unenforceable, the remaining provisions shall remain in effect. We may modify these Terms from time to
            time; we will post the updated Terms on this page and update the “Last updated” date. Your continued use of
            the Service after changes constitutes acceptance of the modified Terms. You may not assign these Terms
            without our consent; we may assign our rights and obligations without restriction.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">12. Contact</h2>
          <p>
            For questions about these Terms of Service, contact us at:
          </p>
          <p className="mt-2 text-white">
            Zippy<br />
            [Your business address]<br />
            California, USA
          </p>
          <p className="mt-2">
            Email: legal@zippy.com (or your preferred contact email)
          </p>
        </section>
      </div>

      <p className="mt-12 pt-8 border-t border-[var(--border)] text-xs text-[var(--muted-soft)]">
        This terms of service is provided for informational purposes. You may wish to have it reviewed by legal counsel
        and to replace placeholder contact and address information with your actual details.
      </p>
    </div>
  );
}
