import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: June 27, 2025</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <p className="text-gray-700">
                  We collect personal information you provide when you contact us, request quotes, or apply for pre-qualification, including:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                  <li>Name, email address, and phone number</li>
                  <li>Property and loan information</li>
                  <li>Financial information for loan applications</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Automatically Collected Information</h4>
                <p className="text-gray-700">
                  When you visit our website, we may automatically collect certain information including:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide mortgage and lending services</li>
                <li>Process loan applications and pre-qualifications</li>
                <li>Communicate with you about your inquiries</li>
                <li>Send market updates and rate information (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Service Providers</h4>
                <p className="text-gray-700">
                  We may share your information with trusted third-party service providers who assist us in operating our business, including lenders, underwriters, and technology providers.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Legal Requirements</h4>
                <p className="text-gray-700">
                  We may disclose your information when required by law, regulation, or legal process, or when necessary to protect our rights or the safety of others.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Business Transfers</h4>
                <p className="text-gray-700">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your personal information</li>
                <li>Lodge a complaint with regulatory authorities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our website uses cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie preferences through your browser settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Mykoal DeShazo</strong></p>
                <p>Email: mdeshazo@mykoal.com</p>
                <p>Phone: (623) 280-8351</p>
                <p>Scottsdale, Arizona</p>
              </div>
            </CardContent>
          </Card>

          {/* Equal Housing Opportunity */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/equal-housing-logo.png" 
                alt="Equal Housing Opportunity Logo" 
                className="w-6 h-6 object-contain filter brightness-0 invert"
              />
              <span className="text-sm font-semibold text-gray-700">Equal Housing Opportunity</span>
            </div>
            <p className="text-xs text-gray-600 max-w-3xl mx-auto">
              We are committed to equal housing opportunity. All loans subject to credit approval. 
              This is not a commitment to lend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}