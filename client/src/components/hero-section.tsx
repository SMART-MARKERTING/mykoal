import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertQuickQuote } from "@shared/schema";

export default function HeroSection() {
  const [quickQuoteData, setQuickQuoteData] = useState({
    loanAmount: "",
    creditScore: "",
    propertyType: "",
    email: "",
  });

  const { toast } = useToast();

  const quickQuoteMutation = useMutation({
    mutationFn: async (data: InsertQuickQuote) => {
      const response = await apiRequest("POST", "/api/quick-quotes", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "We'll email your rate quote within 60 seconds.",
      });
      setQuickQuoteData({
        loanAmount: "",
        creditScore: "",
        propertyType: "",
        email: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit quote request.",
        variant: "destructive",
      });
    },
  });

  const handleQuickQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quickQuoteData.loanAmount || !quickQuoteData.creditScore || !quickQuoteData.propertyType || !quickQuoteData.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    quickQuoteMutation.mutate({
      loanAmount: quickQuoteData.loanAmount,
      creditScore: quickQuoteData.creditScore,
      propertyType: quickQuoteData.propertyType,
      email: quickQuoteData.email,
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background gradient and image */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Your Dream Home <span className="text-blue-200">Starts Here</span>
            </h1>
            <p className="mt-6 text-xl text-blue-100 leading-relaxed">
              Professional mortgage solutions with competitive rates and expert guidance. Get pre-approved in minutes, not days.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection("calculator")}
                className="accent-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Calculate Payment
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-700 transition-colors"
              >
                Get Free Quote
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-blue-200">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-sm text-blue-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">6.5%</div>
                <div className="text-sm text-blue-200">Starting Rate</div>
              </div>
            </div>
          </div>

          {/* Quick quote form */}
          <div className="mt-12 lg:mt-0">
            <Card className="shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Your Rate Quote</h3>
                <form onSubmit={handleQuickQuoteSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Amount
                      </Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        placeholder="400000"
                        value={quickQuoteData.loanAmount}
                        onChange={(e) => setQuickQuoteData(prev => ({ ...prev, loanAmount: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">
                          Credit Score
                        </Label>
                        <Select
                          value={quickQuoteData.creditScore}
                          onValueChange={(value) => setQuickQuoteData(prev => ({ ...prev, creditScore: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="740+">740+</SelectItem>
                            <SelectItem value="680-739">680-739</SelectItem>
                            <SelectItem value="620-679">620-679</SelectItem>
                            <SelectItem value="Below 620">Below 620</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">
                          Loan Type
                        </Label>
                        <Select
                          value={quickQuoteData.propertyType}
                          onValueChange={(value) => setQuickQuoteData(prev => ({ ...prev, propertyType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dscr-purchase">Business Purpose DSCR - Purchase</SelectItem>
                            <SelectItem value="dscr-rate-term">Business Purpose DSCR - Rate/Term Refinance</SelectItem>
                            <SelectItem value="dscr-cash-out">Business Purpose DSCR - Cash-Out Refinance</SelectItem>
                            <SelectItem value="dscr-heloc">DSCR HELOC</SelectItem>
                            <SelectItem value="startup-business">Startup Business Loan</SelectItem>
                            <SelectItem value="personal-loan">Personal Loan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={quickQuoteData.email}
                        onChange={(e) => setQuickQuoteData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={quickQuoteMutation.isPending}
                      className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {quickQuoteMutation.isPending ? "Submitting..." : "Get My Rate Quote"}
                    </Button>
                  </div>
                </form>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  No obligation. Quick and confidential.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
