import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft, ArrowRight, Calculator, User, Home, FileText } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface PreQualificationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Loan Information
  loanType: string;
  loanAmount: string;
  propertyValue: string;
  propertyType: string;
  loanTerm: string;
  
  // Additional Information
  notes: string;
}

interface QualificationResult {
  status: 'qualified' | 'conditional' | 'not-qualified';
  score: number;
  reasons: string[];
  nextSteps: string[];
  estimatedRate: string;
  maxLoanAmount: string;
}

export default function PreQualificationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PreQualificationData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    loanType: "",
    loanAmount: "",
    propertyValue: "",
    propertyType: "",
    loanTerm: "",
    notes: ""
  });

  const [qualificationResult, setQualificationResult] = useState<QualificationResult | null>(null);
  const { toast } = useToast();

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof PreQualificationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateQualification = (data: PreQualificationData): QualificationResult => {
    const reasons: string[] = [];
    const nextSteps: string[] = [];

    // Basic qualification based on loan information
    reasons.push("Complete contact information provided");
    reasons.push(`Loan type: ${data.loanType}`);
    reasons.push(`Loan amount: $${Number(data.loanAmount).toLocaleString()}`);
    
    if (data.propertyValue) {
      reasons.push(`Property value: $${Number(data.propertyValue).toLocaleString()}`);
    }

    // All pre-qualifications are conditional pending full application
    nextSteps.push("Submit complete application with documentation");
    nextSteps.push("Provide financial documentation");
    nextSteps.push("Schedule consultation to discuss loan details");

    return {
      status: 'conditional',
      score: 75,
      reasons,
      nextSteps,
      estimatedRate: "6.5-8.5%",
      maxLoanAmount: "$2,000,000"
    };
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitMutation = useMutation({
    mutationFn: async (data: PreQualificationData) => {
      // Transform data to match backend schema
      const submitData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        loanType: data.loanType,
        loanAmount: data.loanAmount,
        propertyValue: data.propertyValue || null,
        propertyType: data.propertyType || null,
        downPayment: data.loanTerm || null, // Using downPayment field to store loan term for backend compatibility
        notes: data.notes || null,
        // Add required optional fields with null values
        annualIncome: null,
        employmentType: null,
        creditScore: null,
        dateOfBirth: null,
        ssn: null,
        employmentLength: null,
        monthlyDebt: null,
        assets: null,
        bankruptcyHistory: null,
        estimatedRate: null
      };

      const response = await apiRequest("POST", "/api/pre-qualifications", submitData);
      return response.json();
    },
    onSuccess: () => {
      const result = calculateQualification(formData);
      setQualificationResult(result);
      setCurrentStep(totalSteps + 1); // Move to results step
      toast({
        title: "Pre-qualification Complete!",
        description: "Your information has been submitted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit pre-qualification.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'loanType', 'loanAmount'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof PreQualificationData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    submitMutation.mutate(formData);
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 2:
        return !!(formData.loanType && formData.loanAmount);
      case 3:
        return true; // Review step is always valid
      default:
        return false;
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return User;
      case 2: return Home;
      case 3: return FileText;
      default: return Calculator;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
              <p className="text-sm text-gray-600">
                Let's start with your basic contact information.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Loan Information
              </CardTitle>
              <p className="text-sm text-gray-600">
                Tell us about your financing needs.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Loan Type *</Label>
                <Select
                  value={formData.loanType}
                  onValueChange={(value) => updateFormData('loanType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Investment DSCR - Purchase">Investment DSCR - Purchase</SelectItem>
                    <SelectItem value="Investment DSCR - Refinance">Investment DSCR - Refinance</SelectItem>
                    <SelectItem value="Investment DSCR - Cash-Out">Investment DSCR - Cash-Out</SelectItem>
                    <SelectItem value="DSCR HELOC">DSCR HELOC</SelectItem>
                    <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                    <SelectItem value="Debt Consolidation">Debt Consolidation</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={formData.loanAmount}
                      onChange={(e) => updateFormData('loanAmount', e.target.value)}
                      className="pl-8"
                      placeholder="400000"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="propertyValue">Property Value</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="propertyValue"
                      type="number"
                      value={formData.propertyValue}
                      onChange={(e) => updateFormData('propertyValue', e.target.value)}
                      className="pl-8"
                      placeholder="500000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Property Type</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => updateFormData('propertyType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family">Single Family</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                      <SelectItem value="Townhome">Townhome</SelectItem>
                      <SelectItem value="Multi-Family (2-4 units)">Multi-Family (2-4 units)</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="loanTerm">Loan Term</Label>
                  <Input
                    id="loanTerm"
                    type="text"
                    value={formData.loanTerm}
                    onChange={(e) => updateFormData('loanTerm', e.target.value)}
                    placeholder="30 years"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Review & Submit
              </CardTitle>
              <p className="text-sm text-gray-600">
                Review your information and add any additional notes.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                    <div><strong>Email:</strong> {formData.email}</div>
                    <div><strong>Phone:</strong> {formData.phone}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Loan Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Loan Type:</strong> {formData.loanType}</div>
                    <div><strong>Loan Amount:</strong> ${formData.loanAmount ? Number(formData.loanAmount).toLocaleString() : ''}</div>
                    {formData.propertyValue && <div><strong>Property Value:</strong> ${Number(formData.propertyValue).toLocaleString()}</div>}
                    {formData.propertyType && <div><strong>Property Type:</strong> {formData.propertyType}</div>}
                    {formData.loanTerm && <div><strong>Loan Term:</strong> {formData.loanTerm}</div>}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => updateFormData('notes', e.target.value)}
                  placeholder="Any additional information you'd like to share..."
                  rows={4}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Next Steps:</strong> After submission, we'll review your information and contact you within 24 hours 
                  to discuss your financing options and next steps.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (qualificationResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">Pre-Qualification Complete!</CardTitle>
              <p className="text-green-700">
                Thank you for your submission. We'll be in touch soon.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Qualification Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      Conditional Approval Pending Documentation
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">
                      Your application shows strong potential. We'll review your complete documentation to provide final approval.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estimated Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div><strong>Est. Rate Range:</strong> {qualificationResult.estimatedRate}</div>
                      <div><strong>Max Loan Amount:</strong> {qualificationResult.maxLoanAmount}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {qualificationResult.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="text-center">
                <Link href="/#contact">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Contact Us Now
                  </Button>
                </Link>
              </div>

              {/* Compliance Footer */}
              <div className="mt-8 text-center border-t pt-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <img 
                    src="/equal-housing-logo.png" 
                    alt="Equal Housing Opportunity Logo" 
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-sm font-semibold text-gray-700">Equal Housing Opportunity</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
                  Equal Housing Opportunity. This is not a commitment to lend. All loans subject to credit approval. 
                  Rates, terms, and conditions are subject to change without notice. Mykoal DeShazo NMLS #1912347.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Quick Pre-Qualification</h1>
          <p className="text-lg text-gray-600">
            Get pre-qualified for your investment loan in just a few steps
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((step) => {
              const Icon = getStepIcon(step);
              return (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step <= currentStep ? <Icon className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-1 mx-4 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {renderStepContent()}

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button 
              onClick={nextStep} 
              disabled={!isStepValid(currentStep)}
              className="flex items-center"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={submitMutation.isPending || !isStepValid(currentStep)}
              className="flex items-center bg-green-600 hover:bg-green-700"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Pre-Qualification"}
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}