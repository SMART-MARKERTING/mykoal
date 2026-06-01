import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <SiteNav />
      <div className="container max-w-3xl mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-blue-200/70 text-sm">
            Effective Date: May 30, 2026
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-xl p-6 md:p-8 space-y-8 text-blue-100/90 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Mykoal DeShazo (NMLS #1912347), Vice President and Senior Loan Officer at Adaxa Home LLC (NMLS #2380533), collects, uses, and protects information through{" "}
              <strong className="text-white">mykoal.com</strong> (the &ldquo;Site&rdquo;).
            </p>
            <p className="mt-3">
              By using the Site, you agree to the collection, use, and sharing of your information as described in this Policy. If you do not agree, please do not use the Site. Providing personal information is voluntary; however, some features of the Site may not function without it.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">2. Information We Collect</h2>

            <h3 className="text-white/90 font-semibold mt-4 mb-2">Information You Provide</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing address</li>
              <li>Financial and loan-related details (e.g., income, assets, loan type)</li>
              <li>Any other information you submit through a form on the Site</li>
            </ul>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Information Collected Automatically</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device and operating system information</li>
              <li>Pages visited and usage activity on the Site</li>
            </ul>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Information From Third Parties</h3>
            <p>
              In the course of providing mortgage services, we may receive information about you from:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Credit bureaus</li>
              <li>Identity verification services</li>
              <li>Lenders, brokers, and service partners</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">3. Cookies & Tracking Technologies</h2>
            <p>
              The Site uses cookies, pixels, and similar technologies to improve your experience, measure traffic, run advertising, and track performance. You can disable cookies in your browser settings, but some features of the Site may not work properly if you do.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">4. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>To process and support mortgage inquiries and applications</li>
              <li>To respond to your questions</li>
              <li>To provide customer service and follow-up</li>
              <li>To send service-related updates (e.g., application status)</li>
              <li>To improve the Site and our services</li>
              <li>To send marketing communications, where you have consented</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">5. SMS Communication & A2P 10DLC Compliance</h2>

            <h3 className="text-white/90 font-semibold mt-4 mb-2">Consent to Receive SMS</h3>
            <p>
              When you submit a phone number through a form on this Site and check the consent box, you give your express written consent to receive SMS/MMS messages from Mykoal DeShazo. Examples of message content include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Application and loan status updates</li>
              <li>Appointment reminders</li>
              <li>Document requests</li>
              <li>Other service-related alerts</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">Consent is not a condition of any purchase, loan application, or service.</strong>
            </p>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Message Frequency</h3>
            <p>
              Message frequency varies depending on your interactions and application activity.
            </p>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Message & Data Rates</h3>
            <p>
              Message and data rates may apply depending on your mobile carrier plan.
            </p>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Opt-Out Instructions</h3>
            <p>
              You can opt out at any time by replying with any of the following keywords to a message you receive from us:
            </p>
            <p className="mt-2 text-white">
              <strong>STOP, END, CANCEL, UNSUBSCRIBE,</strong> or <strong>QUIT</strong>
            </p>
            <p className="mt-3">
              After opting out, you will no longer receive SMS messages from us unless you re-subscribe.
            </p>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Help</h3>
            <p>
              For assistance, reply <strong className="text-white">HELP</strong> to any message we send, or call{" "}
              <a href="tel:+14802069290" className="underline hover:text-blue-200">(480) 206-9290</a>.
            </p>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Important SMS Disclosure</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong className="text-white">We will not share mobile information with third parties for promotional or marketing purposes.</strong>
              </li>
              <li>Mobile opt-in data and consent records are not sold, rented, or transferred to third parties for their own marketing.</li>
              <li>SMS is used for service-related, transactional, and (where you have opted in) marketing communications from Mykoal DeShazo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">6. How We Share Information</h2>
            <p>We share your information only in limited situations, including:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>With service providers and partners that help us deliver mortgage services (e.g., verification, processing, CRM, communication tools)</li>
              <li>With lenders and brokers as needed to process a loan inquiry or application you have initiated</li>
              <li>To comply with legal obligations or valid legal process</li>
              <li>To protect our rights, prevent fraud, or address security issues</li>
              <li>With your explicit consent</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">We do not sell your personal information.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">7. Data Security</h2>
            <p>
              We use reasonable administrative, technical, and physical measures &mdash; including encryption in transit, access controls, and reputable hosting providers &mdash; to protect your information. No method of transmission or storage is 100% secure, so you provide information at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">8. Your Rights</h2>
            <p>You may:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Opt out of marketing communications at any time</li>
              <li>Request that we update or correct your information</li>
              <li>Request that we delete information we hold about you, subject to legal recordkeeping requirements applicable to mortgage activity</li>
            </ul>
            <p className="mt-3">
              To make a request, email{" "}
              <a href="mailto:mdeshazo@mykoal.com" className="underline hover:text-blue-200">
                mdeshazo@mykoal.com
              </a>{" "}
              or call{" "}
              <a href="tel:+14802069290" className="underline hover:text-blue-200">
                (480) 206-9290
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">9. Children&rsquo;s Privacy</h2>
            <p>
              This Site is not directed to individuals under 18, and we do not knowingly collect personal information from minors. If you believe a minor has provided information through the Site, please contact us so we can remove it.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date. Continued use of the Site after an update means you accept the revised Policy.
            </p>
          </section>

          <section className="border-t border-white/10 pt-6">
            <p className="text-blue-200/80">
              Mortgage services on this Site are provided through Adaxa Home LLC (NMLS #2380533). For more information about Adaxa Home&rsquo;s general privacy practices,{" "}
              <a
                href="https://adaxahome.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-white hover:text-blue-200"
              >
                check it out here
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
