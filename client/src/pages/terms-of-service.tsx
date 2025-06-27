import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: June 27, 2025</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Professional Licensing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-gray-700 mb-4">
                  Mykoal DeShazo is a licensed mortgage loan originator operating under the following credentials:
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2">NMLS ID: 1912347</p>
                  <p className="text-blue-800 mb-3">
                    Licensed mortgage loan originator regulated by state and federal authorities.
                  </p>
                  <a 
                    href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/1912347"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Verify License on NMLS Consumer Access
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                By accessing and using this website, you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services or website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services Provided</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 mb-4">We provide the following services:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Mortgage loan origination and brokerage services</li>
                <li>Investment property financing (DSCR loans)</li>
                <li>Home Equity Lines of Credit (HELOC)</li>
                <li>Personal loans and debt consolidation</li>
                <li>Loan pre-qualification and consultation</li>
                <li>Market rate information and analysis</li>
              </ul>
              
              <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                <p className="text-yellow-800 font-medium">
                  Important: All loan applications are subject to credit approval. This website and its content 
                  do not constitute a commitment to lend or guarantee of loan approval.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loan Application Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Application Submission</h4>
                <p className="text-gray-700">
                  By submitting a loan application or pre-qualification request, you represent that all information 
                  provided is true, accurate, and complete to the best of your knowledge.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Credit Authorization</h4>
                <p className="text-gray-700">
                  You authorize us to obtain credit reports and verify information provided in your application 
                  with credit bureaus, employers, financial institutions, and other relevant parties.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Loan Terms and Conditions</h4>
                <p className="text-gray-700">
                  Final loan terms, including interest rates, fees, and closing costs, will be provided in 
                  official loan documents. Rate quotes and estimates on this website are subject to change 
                  and market conditions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Website Use and Restrictions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Permitted Use</h4>
                <p className="text-gray-700">
                  You may use this website for legitimate purposes related to obtaining mortgage services 
                  and information. You agree not to use the website for any unlawful purposes.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Prohibited Activities</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Submitting false or misleading information</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Using automated tools to scrape or download content</li>
                  <li>Interfering with website functionality or security</li>
                  <li>Violating any applicable laws or regulations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Information and Market Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Rate Information</h4>
                <p className="text-gray-700">
                  Interest rates, market data, and financial information displayed on this website are for 
                  informational purposes only. Rates are subject to change without notice and may vary 
                  based on individual creditworthiness and loan characteristics.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Federal Reserve Data</h4>
                <p className="text-gray-700">
                  Economic data from the Federal Reserve Economic Data (FRED) is provided under their 
                  terms of use. We do not guarantee the accuracy or completeness of this information.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Your privacy is important to us. Please review our Privacy Policy to understand how we 
                collect, use, and protect your personal information. By using our services, you consent 
                to our data practices as described in the Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimers and Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Website Availability</h4>
                <p className="text-gray-700">
                  While we strive to maintain website availability, we do not guarantee uninterrupted 
                  access. The website may be temporarily unavailable due to maintenance or technical issues.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Information Accuracy</h4>
                <p className="text-gray-700">
                  We make reasonable efforts to ensure information accuracy but do not warrant that all 
                  content is current, complete, or error-free. You should verify important information 
                  independently.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                <p className="text-gray-700">
                  To the maximum extent permitted by law, we shall not be liable for any indirect, 
                  incidental, special, or consequential damages arising from your use of our website or services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Fair Lending Practices</h4>
                <p className="text-gray-700">
                  We are committed to fair lending practices and comply with all applicable federal and 
                  state laws, including the Equal Credit Opportunity Act, Fair Housing Act, and Truth in 
                  Lending Act.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">NMLS Compliance</h4>
                <p className="text-gray-700">
                  As a licensed mortgage loan originator, we comply with all Nationwide Multistate 
                  Licensing System (NMLS) requirements and state licensing regulations.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modification of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We reserve the right to modify these Terms of Service at any time. Changes will be 
                effective immediately upon posting on this website. Your continued use of our services 
                after changes are posted constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law and Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                These Terms of Service are governed by the laws of the State of Arizona. Any disputes 
                arising from these terms or your use of our services will be resolved in the appropriate 
                courts of Arizona.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                For questions about these Terms of Service or our lending services, contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Mykoal DeShazo</strong></p>
                <p>NMLS ID: 1912347</p>
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
              This is not a commitment to lend. Licensed mortgage loan originator NMLS #1912347.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}