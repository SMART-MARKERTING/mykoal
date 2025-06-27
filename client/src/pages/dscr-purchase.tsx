import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Calculator, DollarSign, TrendingUp, Shield } from "lucide-react";
import { Link } from "wouter";

export default function DSCRPurchasePage() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Business Purpose DSCR Purchase Loans
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Acquire investment properties with our streamlined DSCR (Debt Service Coverage Ratio) purchase loans. 
            Perfect for real estate investors looking to expand their portfolio with minimal documentation requirements.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose DSCR Purchase Loans?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-6 h-6 mr-3 text-blue-600" />
                  No Personal Income Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Qualify based on the property's rental income potential, not your personal income. 
                  Perfect for self-employed investors or those with complex tax situations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                  Fast Closing Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Close in as little as 30 days with our streamlined process. 
                  Minimal documentation means faster approvals and quicker property acquisitions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-blue-600" />
                  Competitive Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access competitive interest rates for investment properties. 
                  Our extensive lender network ensures you get the best terms available.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  Flexible Property Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Single family homes, condos, townhomes, and multi-family properties up to 4 units. 
                  We work with various property types to fit your investment strategy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How DSCR Purchase Loans Work</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Property Analysis</h3>
                <p className="text-gray-600">
                  We analyze the property's rental income potential using market rents and comparable properties. 
                  The debt service coverage ratio must typically be 1.0 or higher.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Minimal Documentation</h3>
                <p className="text-gray-600">
                  Submit basic financial documents and property information. No tax returns or employment verification required. 
                  We focus on the asset, not your personal income.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Approval</h3>
                <p className="text-gray-600">
                  Get pre-approved quickly and close on your investment property in 30 days or less. 
                  Our streamlined process keeps your deals moving forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Loan Program Details</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Loan amounts up to $5M</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Down payment as low as 20%</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>30-year amortization available</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Fixed and adjustable rate options</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Types</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Single family residences</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Condominiums</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Townhomes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>2-4 unit properties</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Expand Your Investment Portfolio?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact Mykoal DeShazo today to discuss your DSCR purchase loan options and get pre-approved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToContact}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
            >
              Get Started Today
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200 px-8 py-4 text-lg font-semibold"
              >
                Calculate Payment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}