import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <SiteNav />
      <div className="container max-w-3xl mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Terms of Use</h1>
          <p className="text-blue-200/70 text-sm">
            Effective Date: May 30, 2026
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-xl p-6 md:p-8 space-y-8 text-blue-100/90 text-sm leading-relaxed">
          <p>
            These Terms of Use govern your access to and use of <strong className="text-white">mykoal.com</strong> (the &ldquo;Site&rdquo;), operated by <strong className="text-white">DeShazo Wealth LLC d/b/a Mykoal DeShazo</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) as the public web presence for Mykoal DeShazo (NMLS #1912347), a Vice President and Senior Loan Officer affiliated with Adaxa Home LLC (NMLS #2380533). Mortgage services referenced on this Site are provided through Adaxa Home LLC. By using this Site, you agree to these Terms. If you do not agree, please do not use the Site.
          </p>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">1. Website Use & Your Responsibility</h2>
            <p>
              You are responsible for providing and maintaining all hardware, software, internet connectivity, and telecommunications service required to access and use the Site. The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
            </p>
            <p className="mt-3">
              While we work to keep the Site online and current, it may be unavailable from time to time for maintenance, due to system issues, traffic, or events outside our control. We are not liable for any losses, damages, or expenses arising from downtime, delays, or your inability to access the Site.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">2. Access Restrictions & Jurisdiction</h2>
            <p>
              We may restrict, suspend, or terminate your access to the Site at any time, without notice. The Site is intended for users located in jurisdictions where Mykoal DeShazo and Adaxa Home LLC are authorized to offer mortgage-related services. As of the effective date above, this includes the following states: Arizona, Colorado, Connecticut, Florida, Michigan, Minnesota, Oregon, Pennsylvania, Texas, Virginia, and Washington. You are responsible for complying with the laws and regulations of your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">3. Security & Unauthorized Use</h2>
            <p>
              We may require identity verification before processing certain actions in order to protect your information. If you believe your information has been used without your authorization, contact us immediately:
            </p>
            <p className="mt-3 text-white">
              📞 <a href="tel:+14802069290" className="underline hover:text-blue-200">(480) 206-9290</a>
            </p>
            <p className="mt-3">
              Failure to promptly report unauthorized activity may affect your ability to dispute resulting actions.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">4. SMS Consent & Communication Policy (A2P 10DLC)</h2>

            <h3 className="text-white/90 font-semibold mt-4 mb-2">Express Consent</h3>
            <p>
              When you provide a phone number through a form on this Site and check the consent box, you give your express written consent (opt-in) to receive recurring SMS/MMS messages from DeShazo Wealth LLC d/b/a Mykoal DeShazo, sent from{" "}
              <a href="tel:+16197826916" className="underline hover:text-blue-200">(619) 782-6916</a>, regarding:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Account and application updates</li>
              <li>Loan processing status</li>
              <li>Document requests</li>
              <li>Appointment reminders</li>
              <li>Other service-related notifications</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">Consent is not a condition of any purchase, loan application, or service.</strong>
            </p>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Message Frequency</h3>
            <p>
              Message frequency varies based on your interactions, application status, and service activity.
            </p>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Message & Data Rates</h3>
            <p>
              Message and data rates may apply depending on your mobile carrier plan.
            </p>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Opt-Out</h3>
            <p>
              You can opt out of SMS messages from us at any time by replying with any of the following keywords to any message you receive from us:
            </p>
            <p className="mt-2 text-white">
              <strong>STOP, END, CANCEL, UNSUBSCRIBE,</strong> or <strong>QUIT</strong>
            </p>
            <p className="mt-3">
              After you opt out, you will no longer receive SMS messages from us unless you re-subscribe.
            </p>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Help</h3>
            <p>
              Reply <strong className="text-white">HELP</strong> to any message for assistance, or call{" "}
              <a href="tel:+14802069290" className="underline hover:text-blue-200">(480) 206-9290</a>.
            </p>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Carrier Disclaimer</h3>
            <p>
              Wireless carriers are not liable for delayed or undelivered messages.
            </p>

            <h3 className="text-white/90 font-semibold mt-5 mb-2">Technical Requirements</h3>
            <p>To receive SMS messages from us, you must have:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>A text-enabled mobile device</li>
              <li>Active service with a supported mobile carrier</li>
              <li>Sufficient device storage to receive messages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">5. Privacy</h2>
            <p>
              Information you provide is handled as described in our{" "}
              <a href="/privacy" className="underline hover:text-blue-200">Privacy Policy</a>. We do not sell personal information.{" "}
              <strong className="text-white">We will not share mobile information with third parties for promotional or marketing purposes.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">6. Communication & Verification</h2>
            <p>
              By submitting your information, you authorize us to contact you using the contact details you provide and, where reasonably necessary, to verify those details with third parties in order to provide the services you request.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">7. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Updates will be posted on this page with a revised effective date. Your continued use of the Site after an update means you accept the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">8. Acknowledgment</h2>
            <p>
              By using this Site, you confirm that you have read, understood, and agree to these Terms of Use and the SMS policy described above.
            </p>
          </section>

          <section className="border-t border-white/10 pt-6">
            <p className="text-blue-200/80">
              Mortgage services on this Site are provided through Adaxa Home LLC (NMLS #2380533). For more information about Adaxa Home&rsquo;s general terms,{" "}
              <a
                href="https://adaxahome.com/terms-of-use"
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
