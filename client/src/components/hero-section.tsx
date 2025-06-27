import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { Phone, Mail, Star, CheckCircle } from "lucide-react";
import headshotImage from "@assets/IMG_0016_1751000995747.jpeg";
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
    <section id="home" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 min-h-screen flex items-center">
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
                  Specializing in investor loans, DSCR financing, and investment property financing. 
                  I help investors secure the capital they need to grow their portfolios. We also have many more options available.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Link href="/pre-qualification" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all">
                      Get Pre-Qualified
                    </Button>
                  </Link>
                  
                  <Button
                    onClick={() => scrollToSection("contact")}
                    variant="outline"
                    className="flex-1 border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 px-6 py-3 rounded-lg font-semibold backdrop-blur-sm"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
                
                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 text-center lg:text-left">
                  <div>
                    <div className="text-2xl font-bold text-white">20+</div>
                    <div className="text-sm text-blue-200">Team Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-sm text-blue-200">Loans Funded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Streamlined contact form */}
          <div>
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6 lg:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Quote</h3>
                  <p className="text-gray-600">Quick response guaranteed</p>
                </div>
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
                            <SelectItem value="dscr-purchase">Investment DSCR - Purchase</SelectItem>
                            <SelectItem value="dscr-rate-term">Investment DSCR - Rate/Term Refinance</SelectItem>
                            <SelectItem value="dscr-cash-out">Investment DSCR - Cash-Out Refinance</SelectItem>
                            <SelectItem value="dscr-heloc">DSCR HELOC</SelectItem>
                            <SelectItem value="personal-loan">Personal Loan</SelectItem>
                            <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
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
