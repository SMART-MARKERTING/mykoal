import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, CreditCard, TrendingUp, DollarSign, Check, Calculator } from "lucide-react";
import { Link } from "wouter";

const loanProducts = [
  {
    name: "Investment Purpose DSCR",
    subtitle: "Investment Properties",
    icon: Building2,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    link: "/dscr-refinance",
    features: [
      "Purchase & rate/term refinance",
      "Cash-out refinance available",
      "No personal income verification",
      "Rental income qualification"
    ]
  },
  {
    name: "DSCR HELOC",
    subtitle: "Investment Property Equity",
    icon: TrendingUp,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    buttonColor: "bg-green-500 hover:bg-green-600",
    link: "/dscr-heloc",
    features: [
      "Access property equity",
      "Revolving credit line",
      "Interest-only payments",
      "No personal income docs"
    ]
  },

  {
    name: "Personal Loan",
    subtitle: "Individual Financing",
    icon: DollarSign,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
    link: "/personal-loan",
    features: [
      "Home improvements",
      "Personal expenses",
      "Medical bills",
      "Fixed rate options"
    ]
  },
  {
    name: "Debt Consolidation",
    subtitle: "Simplify Your Payments",
    icon: Calculator,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    buttonColor: "bg-teal-600 hover:bg-teal-700",
    link: "/debt-consolidation",
    features: [
      "Combine multiple debts",
      "One monthly payment",
      "Potentially lower rates",
      "Improved cash flow"
    ]
  }
];



export default function LoanProducts() {
  return (
    <section id="loans" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Christ-Centered Financing Solutions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Specialized property financing for investors with integrity and biblical values - we also have many more options available</p>
          <div className="text-lg text-blue-600 mt-3 font-medium italic">
            "The plans of the diligent lead to profit" - Proverbs 21:5
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {loanProducts.map((product) => {
            const IconComponent = product.icon;
            return (
              <Card key={product.name} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className={`${product.iconBg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className={`${product.iconColor} h-6 w-6`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className={`${product.iconColor} text-sm font-medium`}>{product.subtitle}</p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="text-green-500 mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <Link href={product.link}>
                      <Button variant="outline" className="w-full text-sm border-gray-200 hover:bg-gray-50">
                        Learn More
                      </Button>
                    </Link>
                    <a href="https://independencehl.com/mykoal-deshazo/" target="_blank" rel="noopener noreferrer">
                      <div className={`w-full ${product.buttonColor} text-white px-4 py-2 rounded-md font-medium transition-colors text-center`}>
                        Get Quote
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>


      </div>
    </section>
  );
}
