import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ExternalLink, Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-12 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/privacy-policy">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Privacy Policy
              </Button>
            </Link>
          </div>

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
                <div>
                  <h4 className="font-semibold mb-2">Loan Origination Services</h4>
                  <p className="text-gray-700">
                    We provide mortgage loan origination services including DSCR loans, HELOC, personal loans, 
                    and debt consolidation financing. All loan applications are subject to credit approval 
                    and underwriting guidelines.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Educational Resources</h4>
                  <p className="text-gray-700">
                    Our website provides educational content, calculators, and market information for 
                    informational purposes only. This content should not be considered financial advice.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Pre-Qualification Services</h4>
                  <p className="text-gray-700">
                    Pre-qualification results are estimates based on information provided and do not 
                    guarantee loan approval or specific terms.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">By using our services, you agree to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Update information promptly when circumstances change</li>
                  <li>Use our website and services for lawful purposes only</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not attempt to damage or interfere with our systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Terms and Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Application Process</h4>
                  <p className="text-gray-700">
                    Loan applications require complete documentation and verification. Processing times 
                    may vary based on loan type and complexity.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Rate Quotes</h4>
                  <p className="text-gray-700">
                    Interest rate quotes are subject to market conditions and may change without notice. 
                    Final rates are determined at loan approval and may differ from initial quotes.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Fees and Costs</h4>
                  <p className="text-gray-700">
                    Loan origination may involve various fees and costs. All applicable fees will be 
                    disclosed in accordance with federal regulations before loan closing.
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
                    We comply with all federal and state fair lending laws including the Equal Credit 
                    Opportunity Act (ECOA) and Fair Housing Act. We do not discriminate based on 
                    protected characteristics.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Truth in Lending</h4>
                  <p className="text-gray-700">
                    All loan disclosures comply with the Truth in Lending Act (TILA) and TILA-RESPA 
                    Integrated Disclosure (TRID) requirements.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">State Licensing</h4>
                  <p className="text-gray-700">
                    Our services are available in states where we maintain proper licensing. 
                    Loan availability may vary by location and property type.
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
                    To the fullest extent permitted by law, we limit our liability for any damages 
                    arising from use of our website or services. This includes direct, indirect, 
                    incidental, and consequential damages.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modifications and Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Terms Updates</h4>
                  <p className="text-gray-700">
                    We may update these Terms of Service periodically. Material changes will be posted 
                    on our website with an updated effective date. Continued use constitutes acceptance 
                    of modified terms.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Service Termination</h4>
                  <p className="text-gray-700">
                    We reserve the right to terminate or suspend access to our services at our discretion, 
                    particularly for violations of these terms or applicable laws.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  For questions about these Terms of Service, contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Mykoal DeShazo</strong></p>
                  <p>NMLS #1912347</p>
                  <p>Email: mdeshazo@mykoal.com</p>
                  <p>Phone: (623) 280-8351</p>
                  <p>Location: Scottsdale, Arizona</p>
                </div>
              </CardContent>
            </Card>

            {/* Equal Housing Opportunity */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
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
      </main>
      
      <Footer />
    </div>
  );
}