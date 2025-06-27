import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Shield, Flag, Check } from "lucide-react";

const loanProducts = [
  {
    name: "Conventional",
    subtitle: "Most Popular",
    icon: Home,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    features: [
      "3% down payment options",
      "Competitive interest rates", 
      "No upfront mortgage insurance",
      "Primary & secondary homes"
    ]
  },
  {
    name: "FHA",
    subtitle: "Low Down Payment",
    icon: Shield,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    buttonColor: "bg-green-500 hover:bg-green-600",
    features: [
      "3.5% down payment",
      "Lower credit score requirements",
      "Government-backed security",
      "First-time buyer friendly"
    ]
  },
  {
    name: "VA",
    subtitle: "Veterans & Military",
    icon: Flag,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    features: [
      "$0 down payment",
      "No private mortgage insurance",
      "Competitive rates",
      "For eligible veterans"
    ]
  }
];



export default function LoanProducts() {
  return (
    <section id="loans" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Loan Products</h2>
          <p className="text-xl text-gray-600">Find the perfect mortgage solution for your needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                  
                  <Button className={`w-full ${product.buttonColor} text-white`}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>


      </div>
    </section>
  );
}
