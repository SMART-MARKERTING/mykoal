import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowLeft, Calculator, DollarSign, TrendingUp, Shield, Mail } from "lucide-react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { InsertQuickQuote } from "@shared/schema";

export default function DSCRPurchasePage() {
  const [email, setEmail] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const { toast } = useToast();

  const goToContact = () => {
    window.location.href = "/#contact";
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const quickQuoteMutation = useMutation({
    mutationFn: async (data: InsertQuickQuote) => {
      const response = await apiRequest("/api/quick-quotes", "POST", data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you soon with your DSCR purchase loan options.",
      });
      setEmail("");
      setLoanAmount("");
      setCreditScore("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleQuickQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !loanAmount || !creditScore) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields for your quote.",
        variant: "destructive",
      });
      return;
    }

    quickQuoteMutation.mutate({
      loanAmount,
      creditScore,
      propertyType: "Investment Property",
      email,
    });
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
            Get a personalized DSCR purchase loan quote in minutes. Enter your information below for instant pre-qualification.
          </p>
          
          {/* Quick Quote Form */}
          <div className="max-w-md mx-auto mb-8">
            <Card className="bg-white/10 backdrop-blur border-blue-200/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Get Your Quote
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuickQuote} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-blue-100">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="bg-white/20 border-blue-200/30 text-white placeholder:text-blue-200"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanAmount" className="text-blue-100">Loan Amount</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="500000"
                      className="bg-white/20 border-blue-200/30 text-white placeholder:text-blue-200"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="creditScore" className="text-blue-100">Credit Score Range</Label>
                    <select
                      id="creditScore"
                      value={creditScore}
                      onChange={(e) => setCreditScore(e.target.value)}
                      className="w-full p-3 rounded-md bg-white/20 border border-blue-200/30 text-white"
                      required
                    >
                      <option value="">Select Credit Score Range</option>
                      <option value="Excellent (750+)">Excellent (750+)</option>
                      <option value="Good (700-749)">Good (700-749)</option>
                      <option value="Fair (650-699)">Fair (650-699)</option>
                      <option value="Poor (580-649)">Poor (580-649)</option>
                    </select>
                  </div>
                  <Button
                    type="submit"
                    disabled={quickQuoteMutation.isPending}
                    className="w-full bg-white text-blue-900 hover:bg-blue-50 py-3 text-lg font-semibold"
                  >
                    {quickQuoteMutation.isPending ? "Submitting..." : "Get My Quote"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={goToContact}
              variant="outline"
              className="border-2 border-blue-200 bg-transparent text-white hover:bg-blue-800 px-8 py-3"
            >
              Schedule Consultation
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-blue-200 bg-transparent text-white hover:bg-blue-800 px-8 py-3"
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