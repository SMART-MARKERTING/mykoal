import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Rocket, Users, Target, DollarSign } from "lucide-react";
import { Link } from "wouter";

export default function StartupBusinessLoanPage() {
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
            Startup Business Loans
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Launch your entrepreneurial dreams with specialized startup business funding. 
            Get the capital you need to start, grow, and scale your new business venture.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Startup Business Loans?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rocket className="w-6 h-6 mr-3 text-blue-600" />
                  Flexible Qualification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We understand that startups don't have extensive business history. 
                  Our flexible underwriting considers your business plan, experience, and market potential.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-6 h-6 mr-3 text-blue-600" />
                  Multiple Use Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fund equipment purchases, working capital, inventory, marketing, 
                  or any legitimate business expense to get your startup off the ground.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-6 h-6 mr-3 text-blue-600" />
                  Expert Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Work with experienced lenders who understand the startup landscape 
                  and can guide you through the funding process with personalized support.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-blue-600" />
                  Competitive Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access competitive interest rates and flexible repayment terms 
                  designed to support your business growth without overwhelming cash flow.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Startup Funding Options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900 text-center">
                  SBA Startup Loans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Government-backed funding
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Lower down payments
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Competitive rates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Longer repayment terms
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900 text-center">
                  Equipment Financing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Up to 100% financing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Equipment as collateral
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Preserve working capital
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Fast approval process
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900 text-center">
                  Working Capital Lines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Flexible access to funds
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Pay interest on usage only
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Manage cash flow gaps
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Revolving credit facility
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Application Process</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Plan Review</h3>
                <p className="text-gray-600">
                  Submit your comprehensive business plan including market analysis, financial projections, 
                  and operational strategy. We'll review your concept's viability and growth potential.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Financial Documentation</h3>
                <p className="text-gray-600">
                  Provide personal financial statements, credit history, and any existing business records. 
                  For new startups, focus on personal creditworthiness and investment capacity.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Underwriting & Approval</h3>
                <p className="text-gray-600">
                  Our team evaluates your application considering industry experience, market opportunity, 
                  and financial projections to structure the optimal loan package for your startup.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Funding & Launch</h3>
                <p className="text-gray-600">
                  Once approved, receive your funding quickly to launch your business operations. 
                  We provide ongoing support as your business grows and evolves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Industries We Support</h2>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-2xl mb-2">🏪</div>
              <h3 className="font-semibold text-gray-900">Retail & E-commerce</h3>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🍽️</div>
              <h3 className="font-semibold text-gray-900">Food & Beverage</h3>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">💻</div>
              <h3 className="font-semibold text-gray-900">Technology</h3>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🔧</div>
              <h3 className="font-semibold text-gray-900">Professional Services</h3>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🏥</div>
              <h3 className="font-semibold text-gray-900">Healthcare</h3>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🏗️</div>
              <h3 className="font-semibold text-gray-900">Construction</h3>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-semibold text-gray-900">Education</h3>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🌟</div>
              <h3 className="font-semibold text-gray-900">And Many More</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Startup Loan Program Details</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Loan amounts up to $500K</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Flexible down payment options</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Up to 10-year terms</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Fixed and variable rate options</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualification Requirements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Viable business plan required</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Good personal credit score</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Industry experience preferred</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Personal investment in business</span>
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
          <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact Mykoal DeShazo to discuss your startup funding needs and turn your business vision into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToContact}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
            >
              Apply for Funding
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200 px-8 py-4 text-lg font-semibold"
              >
                Calculate Loan Amount
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}