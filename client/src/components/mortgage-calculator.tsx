import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { calculateMortgage } from "@/lib/mortgage-calculations";
import { Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function MortgageCalculator() {
  const [inputs, setInputs] = useState({
    loanAmount: 320000,
    interestRate: 6.5,
    loanTerm: 30,
    loanType: "dscr-purchase",
    extraPayment: 0,
    propertyTax: 0,
    propertyInsurance: 0,
  });

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const { toast } = useToast();

  const emailCalculationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/email-calculation", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Calculation Emailed!",
        description: "Your mortgage analysis has been sent to your email.",
      });
      setShowEmailForm(false);
      setEmailAddress("");
    },
    onError: (error: any) => {
      console.error("Email calculation error:", error);
      toast({
        title: "Email Temporarily Unavailable",
        description: "Email service is temporarily down. Please contact Mykoal directly at (623) 280-8351 or mdeshazo@mykoal.com for your analysis.",
        variant: "destructive",
      });
    },
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayments: 0,
    totalInterest: 0,
    effectiveInterestRate: 0,
    payoffTime: 0,
    interestSavings: 0,
    totalPaymentsWithExtra: 0,
  });

  useEffect(() => {
    const calculation = calculateMortgage(inputs);
    setResults(calculation);
  }, [inputs]);

  const updateInput = (key: string, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="calculator" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Faith-Based Financial Planning</h2>
          <p className="text-lg text-gray-600">Calculate your monthly payments with transparency and godly stewardship</p>
          <div className="text-lg text-blue-600 mt-3 font-medium italic">
            "Good planning and hard work lead to prosperity" - Proverbs 21:5
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-start">
          {/* Calculator inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={inputs.loanAmount}
                    onChange={(e) => updateInput('loanAmount', Number(e.target.value))}
                    className="pl-8 text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interestRate">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      value={inputs.interestRate}
                      onChange={(e) => updateInput('interestRate', Number(e.target.value))}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    min="1"
                    max="50"
                    value={inputs.loanTerm}
                    onChange={(e) => updateInput('loanTerm', Number(e.target.value) || 30)}
                    placeholder="30"
                  />
                </div>
              </div>

              <div>
                <Label>Loan Type</Label>
                <Select
                  value={inputs.loanType}
                  onValueChange={(value) => setInputs(prev => ({ ...prev, loanType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dscr-purchase">Investment DSCR - Purchase</SelectItem>
                    <SelectItem value="dscr-rate-term">Investment DSCR - Rate/Term Refinance</SelectItem>
                    <SelectItem value="dscr-cash-out">Investment DSCR - Cash-Out Refinance</SelectItem>
                    <SelectItem value="dscr-heloc">DSCR HELOC</SelectItem>
                    <SelectItem value="personal-loan">Personal Loan</SelectItem>
                    <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Optional Tax and Insurance Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyTax">Monthly Property Tax (Optional)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="propertyTax"
                      type="number"
                      placeholder="0"
                      value={inputs.propertyTax || ''}
                      onChange={(e) => updateInput('propertyTax', Number(e.target.value) || 0)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="propertyInsurance">Monthly Property Insurance (Optional)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="propertyInsurance"
                      type="number"
                      placeholder="0"
                      value={inputs.propertyInsurance || ''}
                      onChange={(e) => updateInput('propertyInsurance', Number(e.target.value) || 0)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="extraPayment">Extra Monthly Payment (Optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="extraPayment"
                    type="number"
                    value={inputs.extraPayment || ""}
                    onChange={(e) => updateInput('extraPayment', Number(e.target.value) || 0)}
                    className="pl-8"
                    placeholder="0"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Additional payment toward principal to reduce loan term and interest
                </p>
              </div>


            </CardContent>
          </Card>

          {/* Results display */}
          <div className="mt-8 lg:mt-0">
            <Card className="bg-blue-50 border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Payment Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-4 bg-blue-50 rounded-lg px-4 border-2 border-blue-200">
                  <span className="text-lg font-semibold text-gray-900">Principal & Interest</span>
                  <span className="text-3xl font-bold text-blue-600">
                    ${results.monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                </div>

                {(inputs.propertyTax > 0 || inputs.propertyInsurance > 0) && (
                  <>
                    {inputs.propertyTax > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700">Property Tax</span>
                        <span className="text-lg font-semibold text-gray-600">
                          +${inputs.propertyTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    )}
                    {inputs.propertyInsurance > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700">Property Insurance</span>
                        <span className="text-lg font-semibold text-gray-600">
                          +${inputs.propertyInsurance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-3 bg-blue-100 rounded-lg px-4 border-2 border-blue-300">
                      <span className="text-lg font-semibold text-gray-900">Total Monthly Payment</span>
                      <span className="text-2xl font-bold text-blue-700">
                        ${(results.monthlyPayment + inputs.propertyTax + inputs.propertyInsurance).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </>
                )}

                {inputs.extraPayment > 0 && (
                  <>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-700">Extra Payment</span>
                      <span className="text-lg font-semibold text-green-600">
                        +${inputs.extraPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-green-50 rounded-lg px-4 border-2 border-green-200">
                      <span className="text-lg font-semibold text-gray-900">Total Monthly Payment</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${(results.monthlyPayment + inputs.extraPayment).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </>
                )}

                {inputs.extraPayment > 0 && (
                  <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-3">Effective Interest Rate Benefits</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Standard Rate:</span>
                        <span className="font-semibold text-gray-600">
                          {inputs.interestRate.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Effective Rate with Extra Payment:</span>
                        <span className="font-semibold text-green-700">
                          {results.effectiveInterestRate.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Rate Reduction:</span>
                        <span className="font-semibold text-green-700">
                          -{(inputs.interestRate - results.effectiveInterestRate).toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Payoff Time:</span>
                        <span className="font-semibold text-green-700">
                          {Math.floor(results.payoffTime / 12)} years, {results.payoffTime % 12} months
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Interest Savings:</span>
                        <span className="font-semibold text-green-700">
                          ${results.interestSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 p-6 bg-white rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Amount:</span>
                      <span className="font-semibold">
                        ${inputs.loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Standard Interest Rate:</span>
                      <span className="font-semibold">
                        {inputs.interestRate.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total of Payments:</span>
                      <span className="font-semibold">
                        ${(inputs.extraPayment > 0 ? results.totalPaymentsWithExtra : results.totalPayments).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold">
                        ${(inputs.extraPayment > 0 ? results.totalPayments - results.interestSavings - inputs.loanAmount : results.totalInterest).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <Button
                    onClick={() => setShowEmailForm(true)}
                    variant="outline"
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email This Calculation
                  </Button>
                  <Button
                    onClick={scrollToContact}
                    className="w-full accent-gradient text-white hover:opacity-90"
                  >
                    Get Pre-Approved Now
                  </Button>
                </div>

                {/* Email Form Modal */}
                {showEmailForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                      <h3 className="text-lg font-semibold mb-4">Email Your Mortgage Calculation</h3>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!emailAddress) {
                          toast({
                            title: "Email Required",
                            description: "Please enter your email address.",
                            variant: "destructive",
                          });
                          return;
                        }
                        emailCalculationMutation.mutate({
                          email: emailAddress,
                          calculationType: "mortgage",
                          inputs,
                          results
                        });
                      }}>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                              required
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setShowEmailForm(false);
                                setEmailAddress("");
                              }}
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              disabled={emailCalculationMutation.isPending}
                              className="flex-1"
                            >
                              {emailCalculationMutation.isPending ? "Sending..." : "Send Calculation"}
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
