import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, CreditCard, Zap, TrendingUp, Banknote } from "lucide-react";
import { Link } from "wouter";

export default function DSCRHELOCPage() {
  const goToContact = () => {
    window.location.href = "/#contact";
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
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
            DSCR HELOC - Home Equity Line of Credit
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Access your investment property equity with flexible DSCR HELOC solutions. 
            Draw funds as needed for new investments, renovations, or business opportunities.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">DSCR HELOC Advantages</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                  Access Funds On-Demand
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Draw funds only when you need them during the 10-year draw period. 
                  Pay interest only on the amount you use, maximizing your financial flexibility.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-blue-600" />
                  Fast Access to Capital
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Once approved, access your equity quickly for time-sensitive investment opportunities. 
                  No need to requalify for each draw during the access period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                  Competitive Interest Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Enjoy competitive variable interest rates typically lower than credit cards 
                  or unsecured loans, backed by your real estate equity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Banknote className="w-6 h-6 mr-3 text-blue-600" />
                  Interest-Only Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  During the draw period, make interest-only payments to preserve cash flow 
                  for other investments and business opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How DSCR HELOC Works</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Property Evaluation</h3>
                <p className="text-gray-600">
                  We assess your investment property's value and rental income potential to determine 
                  your available equity and credit line amount.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Credit Line Approval</h3>
                <p className="text-gray-600">
                  Get approved for a credit line based on DSCR qualification - no personal income verification required. 
                  Approval based on property performance, not personal finances.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Draw Period Access</h3>
                <p className="text-gray-600">
                  Access funds during the 10-year draw period via check, online transfer, or debit card. 
                  Use funds for any purpose - new properties, renovations, or business needs.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Repayment Phase</h3>
                <p className="text-gray-600">
                  After the draw period, enter the 20-year repayment phase with principal and interest payments. 
                  Option to pay down principal during draw period to maintain available credit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Uses for DSCR HELOC</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">New Property Purchases</h3>
                <p className="text-gray-600 text-sm">
                  Use equity to fund down payments on additional investment properties
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Banknote className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Property Improvements</h3>
                <p className="text-gray-600 text-sm">
                  Finance renovations and upgrades to increase property value and rental income
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Business Opportunities</h3>
                <p className="text-gray-600 text-sm">
                  Access capital quickly for time-sensitive business investments and opportunities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loan Details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">DSCR HELOC Program Details</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Line Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Credit lines up to $2M</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Up to 80% combined loan-to-value</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>10-year draw period</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>20-year repayment period</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualification Requirements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>DSCR of 1.0 or higher</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>No personal income verification</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Investment property only</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>1-4 unit properties</span>
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
          <h2 className="text-3xl font-bold mb-6">Unlock Your Property's Potential</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact Mykoal DeShazo to explore DSCR HELOC options and access your investment property equity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={goToContact}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
            >
              Apply for HELOC
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200 px-8 py-4 text-lg font-semibold"
              >
                Calculate Equity
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}