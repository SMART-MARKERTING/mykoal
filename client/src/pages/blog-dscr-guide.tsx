import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calculator, DollarSign, Building, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function DSCRGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="text-lg font-semibold text-blue-600">Mykoal DeShazo, NMLS #1912347</div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Complete Guide to DSCR Loans for Investment Properties
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Master debt service coverage ratio loans and unlock your real estate investment potential with expert guidance
          </p>
          <Link href="/dscr-purchase">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Your DSCR
            </Button>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <Card className="mb-12 border-l-4 border-l-blue-600">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a DSCR Loan?</h2>
              <p className="text-gray-700 mb-4">
                A Debt Service Coverage Ratio (DSCR) loan is a type of investment property financing that qualifies borrowers based on the property's rental income rather than personal income. This makes it ideal for real estate investors, self-employed individuals, and those looking to expand their investment portfolio.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-semibold">
                  Key Advantage: No income documentation required - the property pays for itself!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* DSCR Calculation */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="h-8 w-8 mr-3 text-blue-600" />
              How DSCR is Calculated
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-green-600">DSCR Formula</h3>
                  <div className="text-center bg-gray-50 p-4 rounded-lg">
                    <div className="text-lg font-bold">DSCR = Monthly Rental Income</div>
                    <div className="border-t-2 border-gray-400 my-2"></div>
                    <div className="text-lg font-bold">Monthly Debt Payments</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    A DSCR of 1.0 means the property breaks even. Above 1.0 means positive cash flow.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">DSCR Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span><strong>1.25+:</strong> Excellent (Best rates)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span><strong>1.0-1.24:</strong> Good (Competitive rates)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      <span><strong>0.75-0.99:</strong> Acceptable (Higher rates)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="h-8 w-8 mr-3 text-green-600" />
              Benefits of DSCR Loans
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">No Income Documentation</h3>
                  <p className="text-gray-700">Perfect for self-employed investors, retirees, or those with complex income structures.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Faster Approval</h3>
                  <p className="text-gray-700">Streamlined process focusing on property performance rather than personal finances.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Portfolio Growth</h3>
                  <p className="text-gray-700">Acquire multiple properties without traditional income limitations.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Flexible Terms</h3>
                  <p className="text-gray-700">30-year amortization with various loan term options available.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Property Types */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Building className="h-8 w-8 mr-3 text-purple-600" />
              Eligible Property Types
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Single Family Homes", desc: "1-4 unit residential properties" },
                { title: "Condominiums", desc: "Investment condos and townhomes" },
                { title: "Multi-Family", desc: "Duplex, triplex, and fourplex properties" },
                { title: "Mixed-Use", desc: "Properties with commercial and residential units" },
                { title: "Manufactured Homes", desc: "On permanent foundations" },
                { title: "Warrantable Condos", desc: "In approved condominium projects" }
              ].map((property, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                    <p className="text-gray-600 text-sm">{property.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Loan Terms */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <DollarSign className="h-8 w-8 mr-3 text-green-600" />
              DSCR Loan Terms & Requirements
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Loan Terms</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span>Loan Amount:</span>
                      <span className="font-semibold">$100K - $5M+</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Down Payment:</span>
                      <span className="font-semibold">20-25%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Interest Rates:</span>
                      <span className="font-semibold">Competitive</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Amortization:</span>
                      <span className="font-semibold">30 years</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Loan Terms:</span>
                      <span className="font-semibold">30 years, ARM options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                      <span>Property appraisal and rent roll analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                      <span>6-12 months reserves recommended</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                      <span>Credit score 620+ (varies by program)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                      <span>Property must be investment property</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                      <span>No owner-occupied restrictions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started with DSCR Financing?</h2>
              <p className="text-xl mb-6 opacity-90">
                Let's analyze your investment property and determine the best DSCR loan structure for your goals.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Link href="/#contact">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Get Free Rate Quote
                  </Button>
                </Link>
                <a href="tel:+16232808351">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Call (623) 280-8351
                  </Button>
                </a>
              </div>
              <p className="text-sm mt-4 opacity-90 font-medium">
                Mykoal DeShazo, NMLS #1912347 | Licensed Mortgage Professional
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}