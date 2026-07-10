export interface SeoKeywordCluster {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  path?: string;
}

export const seoKeywordClusters: SeoKeywordCluster[] = [
  {
    id: "private-hard-money",
    title: "Private Money & Hard Money Loans",
    description:
      "Educational guides for investors comparing private money lenders, hard money loans, and asset-based real estate lending.",
    keywords: [
      "private money lenders",
      "private money lenders near me",
      "private money lenders for real estate",
      "private money real estate loans",
      "hard money lenders near me",
      "private hard money loans",
      "hard money loan definition",
    ],
  },
  {
    id: "dscr-investor",
    title: "DSCR & Investor Loans",
    description:
      "Rental-property financing topics including DSCR rental loans, investor cash-out, and LLC-owned property questions.",
    path: "/learn/dscr-loan-requirements-arizona",
    keywords: [
      "what is a DSCR mortgage loan",
      "DSCR rental loans",
      "DSCR loan Arizona",
      "DSCR loan Oregon",
      "DSCR loan Virginia",
      "commercial DSCR loan",
      "DSCR loan for LLC",
      "how to qualify for DSCR loan",
    ],
  },
  {
    id: "non-qm-bank-statement",
    title: "Non-QM & Bank Statement Mortgages",
    description:
      "Alternative-documentation mortgage topics for self-employed borrowers, P&L loans, and bank statement programs.",
    keywords: [
      "non qualified mortgage lenders",
      "non-QM loans meaning",
      "non-QM mortgage lenders",
      "bank statement mortgage",
      "bank statement mortgage loans",
      "stated income loans",
      "P&L loan",
      "P&L mortgage loan",
    ],
  },
  {
    id: "home-equity-heloc",
    title: "HELOC & Home Equity",
    description:
      "Home equity line of credit comparisons, HELOC versus home equity loan questions, and second-mortgage basics.",
    path: "/learn/heloc-vs-cash-out-refinance",
    keywords: [
      "home equity line of credit",
      "HELOC versus home equity loan",
      "home equity line interest rates",
      "how does a HELOC loan work",
      "fixed rate HELOC",
      "HELOC on investment property",
      "2nd mortgage vs HELOC",
    ],
  },
  {
    id: "va-loan-calculators",
    title: "VA Loans & Payment Calculators",
    description:
      "VA loan calculator topics, VA home loan requirements, payment estimates, and VA cash-out refinance education.",
    path: "/learn/va-cash-out-refinance",
    keywords: [
      "VA loan calculator",
      "VA home loan calculator",
      "estimate VA loan payment",
      "VA loan requirements",
      "VA home loan requirements",
      "VA home loan lenders",
      "VA mortgage calculator",
      "VA loan pre approval",
    ],
  },
  {
    id: "mortgage-calculators",
    title: "Mortgage Calculators",
    description:
      "Calculator-intent topics for mortgage payoff, affordability, approval, and pay-down planning.",
    path: "/#calculator",
    keywords: [
      "mortgage loan payoff calculator",
      "estimated mortgage payoff calculator",
      "pay down mortgage calculator",
      "home loan affordability calculator",
      "mortgage calculator what can I afford",
      "mortgage loan calculator how much can I afford",
      "home loan approval calculator",
    ],
  },
  {
    id: "foreign-national-asset-based",
    title: "Foreign National & Asset-Based Loans",
    description:
      "Financing topics for non-US citizens, foreign national mortgage loans, and asset-based mortgage scenarios.",
    keywords: [
      "foreign national loans",
      "foreign national mortgage loans",
      "foreign nationals mortgage",
      "home loan for non US citizen",
      "asset based real estate loans",
      "asset based mortgage",
      "asset-based lending for individuals",
      "asset-based lending mortgage",
    ],
  },
  {
    id: "bridge-blanket-loans",
    title: "Bridge, Blanket & Portfolio Loans",
    description:
      "Investor and transition-financing topics including blanket loans, bridge lending, and residential transition loans.",
    keywords: [
      "blanket loan",
      "blanket mortgage",
      "blanket loan lenders",
      "bridge loan",
      "bridge lending",
      "swing loan",
      "residential transition loans",
      "real estate portfolio",
    ],
  },
  {
    id: "fha-usda-first-time",
    title: "FHA, USDA & First-Time Buyer Loans",
    description:
      "Government-backed and first-time-buyer topics including FHA requirements, USDA lenders, and program basics.",
    keywords: [
      "USDA lenders",
      "USDA loan Oregon",
      "USDA loans CT",
      "what is a USDA home loan",
      "FHA loan requirements",
      "FHA streamline refinance",
      "FHA loan down payment",
      "FHA lenders Michigan",
    ],
  },
  {
    id: "mortgage-tax-basics",
    title: "Mortgage Tax & Closing Basics",
    description:
      "Educational mortgage-adjacent topics around APR, SALT deduction basics, capital gains, cost segregation, and funding states.",
    keywords: [
      "APR vs interest rate",
      "interest rate vs APR",
      "what does APR stand for",
      "SALT tax deduction",
      "capital gains tax on real estate",
      "property gain tax calculator",
      "cost segregation study",
      "wet funding states",
    ],
  },
];
