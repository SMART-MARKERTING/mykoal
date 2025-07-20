import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, Star, Award, Users, Heart, Calculator, Home as HomeIcon, TrendingUp, DollarSign, Percent, Clock } from "lucide-react";
import headshotImage from "@assets/IMG_0016_1751000995747.jpeg";
import ehoLogoPath from "@assets/Equal-Housing-Logo_1751007456918.png";
import type { InsertContact, Testimonial } from "@shared/schema";

export default function Home() {
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const { toast } = useToast();

  // Fetch testimonials
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. I'll get back to you soon.",
      });
      setContactData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message.",
        variant: "destructive",
      });
    },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate({
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      phone: contactData.phone,
      loanType: "General Inquiry",
      timeline: "ASAP",
      message: contactData.message,
    });
  };

  const loanOptions = [
    "DSCR (Debt Service Coverage Ratio) Loans",
    "Investment Property Purchase Loans",
    "Investment Property Refinance",
    "HELOC (Home Equity Line of Credit)",
    "Personal Loans",
    "Debt Consolidation Loans",
    "Commercial Real Estate Loans",
    "Fix and Flip Loans",
    "Other - Please specify in message"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Professional intro with headshot */}
            <div className="text-center lg:text-left">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src={headshotImage} 
                    alt="Mykoal DeShazo - Mortgage Professional" 
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-2xl border-4 border-white/20"
                  />
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
                    Hi, I'm <span className="text-blue-200">Mykoal DeShazo</span>
                  </h1>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-blue-200 text-sm">NMLS #1912347</span>
                  </div>
                  
                  <p className="text-lg text-blue-100 leading-relaxed mb-6">
                    Professional mortgage lending with integrity and excellence. Specializing in investor loans, DSCR financing, and investment property financing. 
                    I help investors and families secure the capital they need to build their financial futures.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <a href="https://independencehl.com/mykoal-deshazo/" target="_blank" rel="noopener noreferrer" className="flex-1">
                      <div className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all text-center">
                        Get Pre-Qualified
                      </div>
                    </a>
                    
                    <a
                      href="tel:623-280-8351"
                      className="flex-1 border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 px-6 py-3 rounded-lg font-semibold backdrop-blur-sm transition-all flex items-center justify-center"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Contact form */}
            <div>
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-center text-gray-900">Get In Touch</CardTitle>
                  <p className="text-center text-gray-600">Tell me about your loan needs</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={contactData.firstName}
                          onChange={(e) => setContactData(prev => ({ ...prev, firstName: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={contactData.lastName}
                          onChange={(e) => setContactData(prev => ({ ...prev, lastName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactData.email}
                        onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={contactData.phone}
                        onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">What type of loan are you looking for? *</Label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your loan needs. Our loan options include: DSCR loans, Investment property loans, HELOC, Personal loans, Debt consolidation, Commercial real estate loans, Fix and flip loans, and more..."
                        value={contactData.message}
                        onChange={(e) => setContactData(prev => ({ ...prev, message: e.target.value }))}
                        rows={4}
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Mykoal</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional mortgage specialist with extensive experience serving clients with integrity, honesty, and ethical business practices.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Excellence in Service</h3>
                <p className="text-sm text-gray-600">UWM Breakthrough Award Winner with proven track record of exceptional results</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Client-Focused Approach</h3>
                <p className="text-sm text-gray-600">4.91/5 star rating from verified client reviews on Experience.com</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Professional Integrity</h3>
                <p className="text-sm text-gray-600">Leading with transparency and putting clients' best interests first</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Experience</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Mykoal DeShazo brings extensive experience in mortgage lending, specializing in investment property financing, DSCR loans, and alternative lending solutions. 
              His commitment to professional excellence has earned recognition as a UWM Breakthrough Award Winner and maintains a stellar 4.91/5 rating from verified client reviews.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-blue-600 mr-2" />
                <span>(623) 280-8351</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-blue-600 mr-2" />
                <span>mdeshazo@mykoal.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                <span>Scottsdale, Arizona</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lending Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financing options for investors and homeowners
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <HomeIcon className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">DSCR Loans</h3>
                <p className="text-gray-600 mb-4">Debt Service Coverage Ratio loans based on property cash flow, not personal income</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• No income verification required</li>
                  <li>• Based on rental income potential</li>
                  <li>• Up to 80% LTV available</li>
                </ul>
                <a href="https://independencehl.com/mykoal-deshazo/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Quote</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Investment Property Loans</h3>
                <p className="text-gray-600 mb-4">Purchase or refinance investment properties with competitive rates</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Purchase or refinance options</li>
                  <li>• Single family to 4-plex properties</li>
                  <li>• Portfolio lending available</li>
                </ul>
                <a href="https://independencehl.com/mykoal-deshazo/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Quote</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <DollarSign className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">HELOC</h3>
                <p className="text-gray-600 mb-4">Home Equity Line of Credit for flexible access to your home's equity</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Flexible draw period</li>
                  <li>• Interest-only payment options</li>
                  <li>• Use for any purpose</li>
                </ul>
                <a href="https://independencehl.com/mykoal-deshazo/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Quote</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Percent className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Loans</h3>
                <p className="text-gray-600 mb-4">Unsecured personal loans for various financial needs</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• No collateral required</li>
                  <li>• Fixed rates and payments</li>
                  <li>• Quick approval process</li>
                </ul>
                <a href="https://independencehl.com/mykoal-deshazo/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Quote</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Calculator className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Debt Consolidation</h3>
                <p className="text-gray-600 mb-4">Combine multiple debts into one manageable monthly payment</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Lower monthly payments</li>
                  <li>• Simplified finances</li>
                  <li>• Potential interest savings</li>
                </ul>
                <a href="https://independencehl.com/mykoal-deshazo/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Quote</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Clock className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fix & Flip Loans</h3>
                <p className="text-gray-600 mb-4">Short-term financing for real estate investors flipping properties</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Fast closing times</li>
                  <li>• Interest-only payments</li>
                  <li>• Rehab funds available</li>
                </ul>
                <a href="https://independencehl.com/mykoal-deshazo/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Quote</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
              <p className="text-xl text-gray-600">See what my clients have to say</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 6).map((testimonial) => (
                <Card key={testimonial.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({testimonial.rating}/5)</span>
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                    <div className="text-sm text-gray-600">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p>{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                4.91/5 star rating from 54 verified reviews on Experience.com
              </p>
              <a
                href="https://www.experience.com/mykoal-deshazo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all reviews →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  (623) 280-8351
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  mdeshazo@mykoal.com
                </p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  4343 N Scottsdale Rd, Scottsdale, AZ 85251
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Professional Details</h3>
              <div className="space-y-2 text-sm">
                <p>Executive Loan Officer</p>
                <p>NMLS #1912347</p>
                <p>UWM Breakthrough Award Winner 2023</p>
                <p>Company NMLS 2524174</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Equal Housing Opportunity</h3>
              <div className="flex items-center space-x-4">
                <img 
                  src={ehoLogoPath} 
                  alt="Equal Housing Opportunity" 
                  className="h-12 w-12 brightness-0 invert"
                />
                <p className="text-sm">
                  We are committed to providing equal housing opportunities regardless of race, religion, sex, or national origin.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-8 text-center">
            <p className="text-sm text-gray-400 italic mb-2">
              "Trust in the Lord with all your heart" - Proverbs 3:5
            </p>
            <p className="text-xs text-gray-500">
              This is not a commitment to lend. All loans subject to credit approval and property verification.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
