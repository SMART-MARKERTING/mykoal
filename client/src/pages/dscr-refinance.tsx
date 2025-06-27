import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowLeft, Percent, Clock, TrendingDown, RefreshCw, Mail } from "lucide-react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { InsertQuickQuote } from "@shared/schema";

export default function DSCRRefinancePage() {
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
        description: "We'll contact you soon with your DSCR refinance options.",
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
      propertyType: "Refinance",
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
            Business Purpose DSCR Refinance Loans
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Optimize your investment property portfolio with DSCR refinance loans. Lower your payments, 
            access equity, or consolidate debt with our streamlined refinancing solutions.
          </p>
        </div>
      </section>

      {/* Types of Refinance */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Refinance Options Available</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Percent className="w-6 h-6 mr-3" />
                  Rate & Term Refinance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Lower your interest rate and monthly payments without taking cash out. 
                  Perfect for improving cash flow on your investment properties.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Reduce monthly payments
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Lower interest rates
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Improve cash flow
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-900">
                  <TrendingDown className="w-6 h-6 mr-3" />
                  Cash-Out Refinance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Access your property's equity to fund new investments, improvements, 
                  or other business opportunities while refinancing your existing loan.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Access property equity
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Fund new investments
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Consolidate debt
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Refinance with DSCR Loans?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  Fast Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Close your refinance in 30-45 days with minimal documentation. 
                  No tax returns or employment verification required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="w-6 h-6 mr-3 text-blue-600" />
                  Portfolio Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Refinance multiple properties efficiently to optimize your entire 
                  investment portfolio's performance and cash flow.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* When to Refinance */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">When Should You Refinance?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Percent className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Lower Interest Rates</h3>
                <p className="text-gray-600 text-sm">
                  Market rates have dropped significantly since your original loan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingDown className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Access Equity</h3>
                <p className="text-gray-600 text-sm">
                  Property values have increased and you want to access equity
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <RefreshCw className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Improve Terms</h3>
                <p className="text-gray-600 text-sm">
                  Switch from adjustable to fixed rate or extend loan term
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loan Details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Refinance Program Details</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate & Term Refinance</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Loan amounts up to $5M</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>No cash out limitation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Same loan amount or lower</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Improved rate or terms</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash-Out Refinance</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Up to 75% loan-to-value</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Cash out for any purpose</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Fund new investments</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Debt consolidation</span>
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
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Investment Portfolio?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a personalized DSCR refinance quote in minutes. Enter your information below for instant pre-qualification.
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
                    <Label htmlFor="loanAmount" className="text-blue-100">Current Loan Amount</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="400000"
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
                className="border-2 border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200 px-8 py-4 text-lg font-semibold"
              >
                Calculate Savings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}