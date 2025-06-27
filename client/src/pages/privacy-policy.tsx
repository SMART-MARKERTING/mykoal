import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import equalHousingLogo from "@assets/Equal-Housing-Logo_1751007456918.png";

export default function PrivacyPolicyPage() {
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
            <Link href="/terms-of-service">
              <Button variant="outline" className="flex items-center gap-2">
                Terms of Service
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>

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
                  <li>Provide loan quotes and pre-qualification services</li>
                  <li>Communicate about your loan application and status</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Send marketing communications (with your consent)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Lenders and financial institutions for loan processing</li>
                  <li>Service providers who assist with our operations</li>
                  <li>Government agencies as required by law</li>
                  <li>Credit reporting agencies for verification purposes</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  We do not sell your personal information to third parties for marketing purposes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We implement appropriate technical and organizational security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
                  the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Request deletion of your information (subject to legal requirements)</li>
                  <li>Opt out of marketing communications</li>
                  <li>File a complaint with regulatory authorities</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  For privacy-related questions or to exercise your rights, contact us:
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

            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">NMLS Licensing</h4>
                  <p className="text-gray-700">
                    As a licensed mortgage loan originator (NMLS #1912347), we comply with all applicable 
                    state and federal privacy regulations including the Gramm-Leach-Bliley Act (GLBA).
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Updates to This Policy</h4>
                  <p className="text-gray-700">
                    We may update this Privacy Policy periodically. We will notify you of any material changes 
                    by posting the new policy on our website with an updated effective date.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Equal Housing Opportunity */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img 
                  src={equalHousingLogo} 
                  alt="Equal Housing Opportunity Logo" 
                  className="w-6 h-6 object-contain"
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
      </main>
      
      <Footer />
    </div>
  );
}