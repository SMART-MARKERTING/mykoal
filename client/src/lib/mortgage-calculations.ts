interface MortgageInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  extraPayment?: number;
}

interface MortgageResults {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  effectiveInterestRate: number;
  payoffTime: number; // in months
  interestSavings: number;
  totalPaymentsWithExtra: number;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const { loanAmount, interestRate, loanTerm, extraPayment = 0 } = inputs;

  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  // Calculate standard monthly payment using mortgage formula
  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    monthlyPayment = loanAmount / numPayments;
  }

  // Calculate standard loan without extra payments
  const totalPayments = monthlyPayment * numPayments;
  const totalInterest = totalPayments - loanAmount;

  // Calculate with extra payments using amortization schedule
  const { 
    totalInterestWithExtra, 
    payoffTimeMonths, 
    totalPaymentsWithExtra 
  } = calculateAmortizationWithExtra(loanAmount, monthlyRate, monthlyPayment, extraPayment);

  // Calculate effective interest rate based on total interest paid vs standard
  const effectiveRate = extraPayment > 0 
    ? calculateEffectiveInterestRate(loanAmount, totalInterestWithExtra, payoffTimeMonths)
    : interestRate;

  const interestSavings = totalInterest - totalInterestWithExtra;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayments: Math.round(totalPayments),
    totalInterest: Math.round(extraPayment > 0 ? totalInterestWithExtra : totalInterest),
    effectiveInterestRate: Math.round(effectiveRate * 100) / 100, // Round to 2 decimal places
    payoffTime: payoffTimeMonths,
    interestSavings: Math.round(interestSavings),
    totalPaymentsWithExtra: Math.round(totalPaymentsWithExtra),
  };
}

function calculateAmortizationWithExtra(
  principal: number, 
  monthlyRate: number, 
  monthlyPayment: number, 
  extraPayment: number
) {
  let balance = principal;
  let totalInterestPaid = 0;
  let totalPaymentsMade = 0;
  let monthCount = 0;
  const maxMonths = 360; // 30 years maximum

  while (balance > 0.01 && monthCount < maxMonths) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    const totalMonthlyPayment = monthlyPayment + extraPayment;
    
    // Ensure we don't overpay
    const actualPayment = Math.min(totalMonthlyPayment, balance + interestPayment);
    const actualPrincipalPayment = actualPayment - interestPayment;
    
    balance -= actualPrincipalPayment;
    totalInterestPaid += interestPayment;
    totalPaymentsMade += actualPayment;
    monthCount++;
    
    if (balance <= 0) break;
  }

  return {
    totalInterestWithExtra: totalInterestPaid,
    payoffTimeMonths: monthCount,
    totalPaymentsWithExtra: totalPaymentsMade,
  };
}

function calculateEffectiveInterestRate(
  principal: number, 
  totalInterestPaid: number, 
  payoffMonths: number
): number {
  if (payoffMonths <= 0 || totalInterestPaid <= 0) return 0;
  
  // Calculate what interest rate would result in the same total interest over the original loan term
  // We use the standard loan term (not the accelerated payoff time) for comparison
  const standardLoanTermMonths = 360; // 30 years for comparison
  
  // Use Newton-Raphson method to find the rate that produces the same total interest
  // Total Interest = (Monthly Payment * n) - Principal
  // Monthly Payment = P * [r(1+r)^n] / [(1+r)^n - 1]
  // So: Total Interest = P * [r(1+r)^n] / [(1+r)^n - 1] * n - P
  
  let rate = 0.002; // Initial guess (2.4% annual)
  const tolerance = 0.0000001;
  const maxIterations = 100;
  
  for (let i = 0; i < maxIterations; i++) {
    const onePlusR = 1 + rate;
    const onePlusRToN = Math.pow(onePlusR, standardLoanTermMonths);
    
    // Calculate monthly payment for this rate
    const monthlyPayment = principal * (rate * onePlusRToN) / (onePlusRToN - 1);
    const calculatedTotalInterest = (monthlyPayment * standardLoanTermMonths) - principal;
    
    // Function: difference between calculated and target interest
    const f = calculatedTotalInterest - totalInterestPaid;
    
    // Derivative (approximate)
    const deltaRate = 0.0001;
    const onePlusRDelta = 1 + rate + deltaRate;
    const onePlusRDeltaToN = Math.pow(onePlusRDelta, standardLoanTermMonths);
    const monthlyPaymentDelta = principal * ((rate + deltaRate) * onePlusRDeltaToN) / (onePlusRDeltaToN - 1);
    const calculatedTotalInterestDelta = (monthlyPaymentDelta * standardLoanTermMonths) - principal;
    const df = (calculatedTotalInterestDelta - calculatedTotalInterest) / deltaRate;
    
    if (Math.abs(df) < tolerance) break;
    
    const newRate = rate - f / df;
    
    if (Math.abs(newRate - rate) < tolerance) {
      rate = newRate;
      break;
    }
    
    rate = newRate;
    
    // Ensure rate stays positive and reasonable
    if (rate < 0) rate = 0.001;
    if (rate > 0.5) rate = 0.5; // Cap at 50% to prevent overflow
  }
  
  // Convert monthly rate to annual percentage
  return (Math.pow(1 + rate, 12) - 1) * 100;
}
