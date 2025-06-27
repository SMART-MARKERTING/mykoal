import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, CreditCard, TrendingUp, DollarSign, Check } from "lucide-react";
import { Link } from "wouter";

const loanProducts = [
  {
    name: "Business Purpose DSCR",
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
    name: "Startup Business Loan",
    subtitle: "New Business Funding",
    icon: CreditCard,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    link: "/startup-business-loan",
    features: [
      "New business funding",
      "Equipment & working capital",
      "Flexible qualification",
      "Quick approval process"
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
      "Debt consolidation",
      "Home improvements",
      "Personal expenses",
      "Fixed rate options"
    ]
  }
];



export default function LoanProducts() {
  return (
    <section id="loans" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Lending Solutions</h2>
          <p className="text-xl text-gray-600">Specialized financing for investors and business owners</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {loanProducts.map((product) => {
            const IconComponent = product.icon;
            return (
              <Card key={product.name} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className={`${product.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`${product.iconColor} h-8 w-8`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                    <p className={`${product.iconColor} font-semibold`}>{product.subtitle}</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="text-green-500 mr-3 h-5 w-5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href={product.link}>
                    <Button className={`w-full ${product.buttonColor} text-white`}>
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>


      </div>
    </section>
  );
}
