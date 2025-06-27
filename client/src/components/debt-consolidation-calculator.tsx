import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calculateMortgage } from "@/lib/mortgage-calculations";
import { Calculator, TrendingDown, Clock, DollarSign } from "lucide-react";

interface DebtConsolidationCalculatorProps {
  totalDebtBalance: number;
  totalMonthlyPayments: number;
}

export default function DebtConsolidationCalculator({ 
  totalDebtBalance, 
  totalMonthlyPayments 
}: DebtConsolidationCalculatorProps) {
  const [inputs, setInputs] = useState({
    loanAmount: totalDebtBalance,
    interestRate: 7.5,
    loanTerm: 30,
    extraPayment: 0,
  });

  const [useExtraPayment, setUseExtraPayment] = useState(false);

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayments: 0,
    totalInterest: 0,
    effectiveInterestRate: 0,
    payoffTime: 0,
    interestSavings: 0,
    totalPaymentsWithExtra: 0,
  });

  const [savingsAnalysis, setSavingsAnalysis] = useState({
    yearsEarlierPayoff: 0,
    interestSaved: 0,
    monthlySavings: 0,
    totalSavings: 0,
  });

  // Update loan amount when total debt changes
  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      loanAmount: totalDebtBalance,
    }));
  }, [totalDebtBalance]);

  useEffect(() => {
    const calculation = calculateMortgage(inputs);
    setResults(calculation);

    // Calculate monthly savings: current total payments minus new consolidated payment
    const monthlySavings = Math.max(0, totalMonthlyPayments - calculation.monthlyPayment);
    
    // Calculate what happens if they apply the monthly savings as extra payment
    const inputsWithSavingsAsExtra = {
      ...inputs,
      extraPayment: monthlySavings
    };
    const calculationWithExtra = calculateMortgage(inputsWithSavingsAsExtra);
    
    // Calculate interest savings properly
    let interestSaved = 0;
    
    if (inputs.extraPayment > 0) {
      // If user has already applied extra payments, show the built-in interest savings
      interestSaved = calculation.interestSavings;
    } else {
      // Show potential interest savings if they apply the monthly savings as extra payment
      const standardTotalInterest = calculation.totalInterest;
      const acceleratedTotalInterest = calculationWithExtra.totalInterest;
      interestSaved = Math.max(0, standardTotalInterest - acceleratedTotalInterest);
    }
    
    // Calculate payoff acceleration - use the actual calculation results
    const standardPayoffMonths = inputs.loanTerm * 12;
    const acceleratedPayoffMonths = calculationWithExtra.payoffTime;
    const yearsEarlier = (standardPayoffMonths - acceleratedPayoffMonths) / 12;

    // Calculate total savings vs current high-interest debt situation
    // Estimate what they would pay on current debts (using average 18% APR for credit cards)
    const avgCurrentInterestRate = 0.18; // 18% average for credit cards
    const avgCurrentMonthlyRate = avgCurrentInterestRate / 12;
    const currentDebtTermMonths = inputs.loanTerm * 12;
    
    // Calculate what current debt would cost over the same term with minimum payments
    let estimatedCurrentTotalInterest = 0;
    if (avgCurrentMonthlyRate > 0 && totalMonthlyPayments > 0) {
      // Estimate remaining balance and interest using current payment structure
      const estimatedCurrentTotalPayments = totalMonthlyPayments * currentDebtTermMonths;
      estimatedCurrentTotalInterest = Math.max(0, estimatedCurrentTotalPayments - totalDebtBalance);
    }

    // Total potential savings: current debt interest vs consolidated loan interest
    const totalPotentialSavings = Math.max(0, estimatedCurrentTotalInterest - calculation.totalInterest);

    setSavingsAnalysis({
      yearsEarlierPayoff: Math.max(0, yearsEarlier),
      interestSaved,
      monthlySavings,
      totalSavings: totalPotentialSavings,
    });
  }, [inputs, totalMonthlyPayments, totalDebtBalance]);

  const updateInput = (key: string, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const goToContact = () => {
    window.location.href = "/#contact";
  };

  if (totalDebtBalance === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Calculator className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Enter Your Debts Above</h3>
          <p className="text-gray-500">
            Add your current debts to see consolidation loan calculations and potential savings.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Consolidation Loan Calculator
          </CardTitle>
          <p className="text-sm text-gray-600">
            Pre-filled with your debt totals. Adjust rate and terms to explore options.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="loanAmount">Consolidation Loan Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={inputs.loanAmount}
                    onChange={(e) => updateInput('loanAmount', Number(e.target.value))}
                    className="pl-8 text-lg font-semibold"
                  />
                </div>
                <Badge variant="secondary" className="mt-1 text-xs">
                  Auto-filled from total debt balance
                </Badge>
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
                  <Label>Loan Term</Label>
                  <Select
                    value={inputs.loanTerm.toString()}
                    onValueChange={(value) => updateInput('loanTerm', Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 years</SelectItem>
                      <SelectItem value="15">15 years</SelectItem>
                      <SelectItem value="20">20 years</SelectItem>
                      <SelectItem value="25">25 years</SelectItem>
                    </SelectContent>
                  </Select>
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
                  Add extra payments to pay off the loan faster
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Consolidation Loan Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">New Monthly Payment:</span>
                  <span className="font-bold text-blue-900">${results.monthlyPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-blue-700">Current Total Payments:</span>
                  <span className="font-bold text-blue-900">${totalMonthlyPayments.toLocaleString()}</span>
                </div>
                <div className="bg-green-100 p-3 rounded">
                  <div className="flex justify-between mb-2">
                    <span className="text-green-700 font-medium">Monthly Savings:</span>
                    <span className="font-bold text-green-800">${savingsAnalysis.monthlySavings.toLocaleString()}</span>
                  </div>
                  {savingsAnalysis.monthlySavings > 0 && (
                    <Button
                      onClick={() => updateInput('extraPayment', savingsAnalysis.monthlySavings)}
                      size="sm"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Apply Savings as Extra Payment
                    </Button>
                  )}
                </div>
                {inputs.extraPayment > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Total with Extra Payments:</span>
                      <span className="font-bold text-blue-900">${results.totalPaymentsWithExtra.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Payoff Time (with extra):</span>
                      <span className="font-bold text-blue-900">{Math.round(results.payoffTime)} months</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Analysis */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <TrendingDown className="w-6 h-6 mr-2" />
            Your Debt Consolidation Savings
          </CardTitle>
          <p className="text-green-700">
            See the powerful impact of consolidating your debts and applying your current payments
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Clock className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-800">
                {savingsAnalysis.yearsEarlierPayoff.toFixed(1)} years
              </div>
              <div className="text-sm text-green-600">Earlier Payoff</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <DollarSign className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-800">
                ${savingsAnalysis.interestSaved.toLocaleString()}
              </div>
              <div className="text-sm text-blue-600">Interest Saved</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <TrendingDown className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-800">
                ${savingsAnalysis.monthlySavings.toLocaleString()}
              </div>
              <div className="text-sm text-purple-600">Monthly Cash Flow Improvement</div>
            </div>
          </div>

          {/* Detailed Explanation */}
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How Debt Consolidation Works for You</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Current Situation:</strong> You're paying ${totalMonthlyPayments.toLocaleString()} per month 
                across multiple debts totaling ${totalDebtBalance.toLocaleString()}.
              </p>
              
              <p>
                <strong>With Consolidation:</strong> Your new consolidated loan payment would be ${results.monthlyPayment.toLocaleString()} per month, 
                which is ${savingsAnalysis.monthlySavings.toLocaleString()} less than your current total payments.
              </p>
              
              <p>
                <strong>Two Options for Your Monthly Savings:</strong>
              </p>
              <div className="ml-4 space-y-2">
                <p>
                  <strong>Option 1 - Keep the Savings:</strong> Enjoy ${savingsAnalysis.monthlySavings.toLocaleString()} extra cash flow each month
                </p>
                <p>
                  <strong>Option 2 - Accelerate Payoff:</strong> Apply the ${savingsAnalysis.monthlySavings.toLocaleString()} monthly savings 
                  as extra payment to pay off your loan faster
                </p>
              </div>
              
              {inputs.extraPayment > 0 && (
                <p>
                  <strong>With ${inputs.extraPayment.toLocaleString()} Extra Payment Applied:</strong> 
                  You'll accelerate your loan payoff and save significantly on interest:
                </p>
              )}
              
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <ul className="space-y-2 text-green-800">
                  {savingsAnalysis.yearsEarlierPayoff > 0 && (
                    <li>• Pay off your debt <strong>{savingsAnalysis.yearsEarlierPayoff.toFixed(1)} years earlier</strong></li>
                  )}
                  <li>• Save <strong>${savingsAnalysis.interestSaved.toLocaleString()} in interest</strong></li>
                  <li>• Improve monthly cash flow by <strong>${savingsAnalysis.monthlySavings.toLocaleString()}</strong></li>
                  <li>• Simplify to just <strong>one monthly payment</strong></li>
                  {results.effectiveInterestRate < inputs.interestRate && (
                    <li>• Reduce your effective interest rate to <strong>{results.effectiveInterestRate.toFixed(2)}%</strong></li>
                  )}
                </ul>
              </div>
              
              <p className="text-sm text-gray-600 italic">
                *Savings calculations assume you maintain the same total monthly payment amount as extra payments. 
                Actual results may vary based on loan terms and payment consistency.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={goToContact}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
            >
              Get Your Consolidation Loan Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}