interface MortgageInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

interface MortgageResults {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const { loanAmount, interestRate, loanTerm } = inputs;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  // Calculate monthly payment using standard mortgage formula
  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    // If interest rate is 0, simple division
    monthlyPayment = loanAmount / numPayments;
  }

  const totalPayments = monthlyPayment * numPayments;
  const totalInterest = totalPayments - loanAmount;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayments: Math.round(totalPayments),
    totalInterest: Math.round(totalInterest),
  };
}
