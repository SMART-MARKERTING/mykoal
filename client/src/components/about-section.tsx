import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Phone, Mail } from "lucide-react";

export default function AboutSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Your Mortgage Expert</h2>
          <p className="text-xl text-gray-600">Experienced professionals dedicated to your success</p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Professional headshot */}
          <div className="text-center lg:text-left">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
              alt="Professional mortgage broker headshot" 
              className="w-80 h-80 rounded-full mx-auto lg:mx-0 object-cover shadow-xl border-8 border-white"
            />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Mykoal DeShazo</h3>
            <p className="text-xl text-blue-600 font-semibold mb-4">Senior Mortgage Advisor</p>
            
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">4.9/5 Client Rating</span>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              With over 15 years in the mortgage industry, Mykoal has helped over 500 families achieve their homeownership dreams. He specializes in first-time homebuyer programs, conventional loans, and complex financial situations.
            </p>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">NMLS</div>
                <div className="text-sm text-gray-600">#1912347</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">Licensed</div>
                <div className="text-sm text-gray-600">CA, NV, AZ</div>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <Phone className="text-blue-600 mr-3 h-5 w-5" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-blue-600 mr-3 h-5 w-5" />
                <span>mykoal@mortgagepro.com</span>
              </div>
            </div>

            <Button 
              onClick={scrollToContact}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Schedule Free Consultation
            </Button>
          </div>
        </div>

        {/* Company credentials */}
        <Card className="mt-16 bg-gray-50">
          <CardContent className="p-8">
            <h4 className="text-2xl font-bold text-gray-900 text-center mb-8">Trusted & Licensed</h4>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">NMLS</div>
                <div className="text-sm text-gray-600">#987654321</div>
                <div className="text-sm text-gray-500">Company License</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">BBB</div>
                <div className="text-sm text-gray-600">A+ Rating</div>
                <div className="text-sm text-gray-500">Better Business Bureau</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">Equal</div>
                <div className="text-sm text-gray-600">Housing</div>
                <div className="text-sm text-gray-500">Lender</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">FDIC</div>
                <div className="text-sm text-gray-600">Insured</div>
                <div className="text-sm text-gray-500">Member Bank</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
