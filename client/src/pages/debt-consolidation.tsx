import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowLeft, Calculator, Plus, Trash2, CreditCard, Home, DollarSign, Mail } from "lucide-react";
import { Link } from "wouter";
import DebtConsolidationCalculator from "@/components/debt-consolidation-calculator";
import equalHousingLogo from "@assets/Equal-Housing-Logo_1751007456918.png";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { InsertQuickQuote } from "@shared/schema";

interface Debt {
  id: number;
  creditor: string;
  balance: string;
  currentPayment: string;
  type: string;
}

export default function DebtConsolidationPage() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, creditor: "", balance: "", currentPayment: "", type: "Mortgage" },
    { id: 2, creditor: "", balance: "", currentPayment: "", type: "Credit Cards" },
    { id: 3, creditor: "", balance: "", currentPayment: "", type: "Personal Loans" }
  ]);
  const [nextId, setNextId] = useState(4);
  const [email, setEmail] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [showEmailQuote, setShowEmailQuote] = useState(false);
  const [quoteEmail, setQuoteEmail] = useState("");
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
        description: "We'll contact you soon with your personalized debt consolidation quote.",
      });
      setEmail("");
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

  const emailQuoteMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("/api/email-debt-quote", "POST", data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Quote Emailed Successfully!",
        description: "Your debt consolidation analysis has been sent to your email.",
      });
      setShowEmailQuote(false);
      setQuoteEmail("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to email quote. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleQuickQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !creditScore) {
      toast({
        title: "Missing Information",
        description: "Please provide your email and credit score range.",
        variant: "destructive",
      });
      return;
    }

    const totalDebt = debts.reduce((sum, debt) => sum + parseFloat(debt.balance || "0"), 0);
    
    quickQuoteMutation.mutate({
      loanAmount: totalDebt.toString(),
      creditScore,
      propertyType: "Debt Consolidation",
      email,
    });
  };

  const handleEmailQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to receive the quote.",
        variant: "destructive",
      });
      return;
    }

    const validDebts = debts.filter(debt => debt.creditor && debt.balance && debt.currentPayment);
    if (validDebts.length === 0) {
      toast({
        title: "No Debt Information",
        description: "Please enter at least one debt to generate a quote.",
        variant: "destructive",
      });
      return;
    }

    const totalDebt = validDebts.reduce((sum, debt) => sum + parseFloat(debt.balance), 0);
    const totalPayments = validDebts.reduce((sum, debt) => sum + parseFloat(debt.currentPayment), 0);

    emailQuoteMutation.mutate({
      email: quoteEmail,
      debts: validDebts,
      totalDebt,
      totalPayments
    });
  };

  const addDebt = () => {
    const newDebt: Debt = {
      id: nextId,
      creditor: "",
      balance: "",
      currentPayment: "",
      type: "Other"
    };
    setDebts([...debts, newDebt]);
    setNextId(nextId + 1);
  };

  const removeDebt = (id: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter(debt => debt.id !== id));
    }
  };

  const updateDebt = (id: number, field: keyof Debt, value: string) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const getTotalBalance = () => {
    return debts.reduce((total, debt) => {
      const balance = parseFloat(debt.balance) || 0;
      return total + balance;
    }, 0);
  };

  const getTotalPayments = () => {
    return debts.reduce((total, debt) => {
      const payment = parseFloat(debt.currentPayment) || 0;
      return total + payment;
    }, 0);
  };

  const getDebtIcon = (type: string) => {
    switch (type) {
      case "Mortgage":
        return <Home className="w-5 h-5" />;
      case "Credit Cards":
        return <CreditCard className="w-5 h-5" />;
      case "Personal Loans":
        return <DollarSign className="w-5 h-5" />;
      default:
        return <DollarSign className="w-5 h-5" />;
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
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Debt Consolidation Loans
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Simplify your finances by combining multiple debts into one manageable monthly payment with potentially lower interest rates.
            </p>
            <div className="flex justify-center">
              <Calculator className="w-16 h-16 text-blue-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Debt Consolidation?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform multiple monthly payments into one simple solution with these key benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Lower Interest Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Potentially reduce your overall interest rate by consolidating high-interest credit cards and loans.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>One Monthly Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Simplify your budget with just one monthly payment instead of juggling multiple due dates.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Improved Cash Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Free up monthly cash flow with potentially lower combined payments and better terms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Debt Calculator */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Debt Consolidation Calculator
            </h2>
            <p className="text-lg text-gray-600">
              Enter your current debts to see how consolidation could benefit you.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Your Current Debts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {debts.map((debt, index) => (
                <div key={debt.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {getDebtIcon(debt.type)}
                      <h3 className="ml-2 font-semibold text-gray-900">
                        {debt.type} #{index + 1}
                      </h3>
                    </div>
                    {debts.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDebt(debt.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`creditor-${debt.id}`}>Creditor/Lender</Label>
                      <Input
                        id={`creditor-${debt.id}`}
                        placeholder="e.g., Chase Bank"
                        value={debt.creditor}
                        onChange={(e) => updateDebt(debt.id, 'creditor', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`balance-${debt.id}`}>Current Balance</Label>
                      <Input
                        id={`balance-${debt.id}`}
                        type="number"
                        placeholder="$25,000"
                        value={debt.balance}
                        onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`payment-${debt.id}`}>Monthly Payment</Label>
                      <Input
                        id={`payment-${debt.id}`}
                        type="number"
                        placeholder="$450"
                        value={debt.currentPayment}
                        onChange={(e) => updateDebt(debt.id, 'currentPayment', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={addDebt}
                variant="outline"
                className="w-full border-dashed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Debt
              </Button>

              {/* Summary */}
              <div className="bg-blue-50 rounded-lg p-6 mt-6">
                <h3 className="font-semibold text-blue-900 mb-4">Current Debt Summary</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-700">Total Debt Balance</p>
                    <p className="text-2xl font-bold text-blue-900">
                      ${getTotalBalance().toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">Total Monthly Payments</p>
                    <p className="text-2xl font-bold text-blue-900">
                      ${getTotalPayments().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integrated Debt Consolidation Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Consolidation Loan Calculator & Savings Analysis
            </h2>
            <p className="text-lg text-gray-600">
              See your potential savings and payoff acceleration with debt consolidation.
            </p>
          </div>
          <DebtConsolidationCalculator 
            totalDebtBalance={getTotalBalance()}
            totalMonthlyPayments={getTotalPayments()}
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Debt Consolidation Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply for Consolidation Loan</h3>
              <p className="text-gray-600">
                Get approved for a loan amount that covers all your existing debts.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pay Off Existing Debts</h3>
              <p className="text-gray-600">
                Use the loan funds to completely pay off all your current debts.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make One Payment</h3>
              <p className="text-gray-600">
                Enjoy the simplicity of just one monthly payment at a potentially lower rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Qualification Requirements
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Credit Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span>Credit scores starting at 580+</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span>Stable credit history preferred</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span>Debt-to-income ratio considerations</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income & Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span>Verifiable income documentation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span>Bank statements (2-3 months)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span>List of current debts and balances</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Consolidate Your Debt?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a personalized debt consolidation quote in minutes. Enter your information below for instant pre-qualification.
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
                    <Label htmlFor="creditScore" className="text-blue-100">Credit Score Range</Label>
                    <select
                      id="creditScore"
                      value={creditScore}
                      onChange={(e) => setCreditScore(e.target.value)}
                      className="w-full p-3 rounded-md bg-white/20 border border-blue-200/30 text-white [&>option]:text-black [&>option]:bg-white"
                      required
                    >
                      <option value="">Select Credit Score Range</option>
                      <option value="Excellent (750+)">Excellent (750+)</option>
                      <option value="Good (700-749)">Good (700-749)</option>
                      <option value="Fair (650-699)">Fair (650-699)</option>
                      <option value="Poor (580-649)">Poor (580-649)</option>
                      <option value="Below 580">Below 580</option>
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
                Calculate Savings
              </Button>
            </Link>
          </div>

          {/* Compliance Footer */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src={equalHousingLogo} 
                alt="Equal Housing Opportunity Logo" 
                className="w-6 h-6 object-contain filter brightness-0 invert"
              />
              <span className="text-sm font-semibold text-white">Equal Housing Opportunity</span>
            </div>
            <p className="text-xs text-white opacity-80 leading-relaxed max-w-3xl mx-auto">
              Equal Housing Opportunity. All loans subject to credit approval. This is not a commitment to lend. 
              Rates, terms, and conditions are subject to change without notice. Mykoal DeShazo NMLS #1912347.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}