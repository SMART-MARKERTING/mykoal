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
import { CheckCircle, ArrowLeft, ArrowRight, Calculator, User, DollarSign, Home, FileText, Shield } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface PreQualificationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  
  // Financial Information
  annualIncome: string;
  employmentType: string;
  employmentLength: string;
  creditScore: string;
  monthlyDebt: string;
  assets: string;
  
  // Loan Information
  loanType: string;
  loanAmount: string;
  propertyValue: string;
  propertyType: string;
  downPayment: string;
  
  // Additional Information
  bankruptcyHistory: string;
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
    dateOfBirth: "",
    ssn: "",
    annualIncome: "",
    employmentType: "",
    employmentLength: "",
    creditScore: "",
    monthlyDebt: "",
    assets: "",
    loanType: "",
    loanAmount: "",
    propertyValue: "",
    propertyType: "",
    downPayment: "",
    bankruptcyHistory: "",
    notes: ""
  });

  const [qualificationResult, setQualificationResult] = useState<QualificationResult | null>(null);
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof PreQualificationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateQualification = (data: PreQualificationData): QualificationResult => {
    let score = 0;
    const reasons: string[] = [];
    const nextSteps: string[] = [];

    // Credit Score Analysis
    const creditScore = parseInt(data.creditScore.split('-')[0] || data.creditScore);
    if (creditScore >= 740) {
      score += 30;
      reasons.push("Excellent credit score");
    } else if (creditScore >= 680) {
      score += 25;
      reasons.push("Good credit score");
    } else if (creditScore >= 620) {
      score += 15;
      reasons.push("Fair credit score");
      nextSteps.push("Consider credit improvement strategies");
    } else {
      score += 5;
      reasons.push("Credit score needs improvement");
      nextSteps.push("Work on improving credit score before applying");
    }

    // Income Analysis
    const income = parseFloat(data.annualIncome) || 0;
    const monthlyIncome = income / 12;
    const monthlyDebt = parseFloat(data.monthlyDebt) || 0;
    const dti = monthlyDebt / monthlyIncome;

    if (dti <= 0.28) {
      score += 25;
      reasons.push("Excellent debt-to-income ratio");
    } else if (dti <= 0.36) {
      score += 20;
      reasons.push("Good debt-to-income ratio");
    } else if (dti <= 0.43) {
      score += 10;
      reasons.push("Acceptable debt-to-income ratio");
    } else {
      score += 0;
      reasons.push("High debt-to-income ratio");
      nextSteps.push("Consider debt reduction before applying");
    }

    // Employment Stability
    if (data.employmentType === "full-time" || data.employmentType === "self-employed") {
      score += 15;
      reasons.push("Stable employment status");
    } else {
      score += 5;
      nextSteps.push("Provide additional income documentation");
    }

    // Assets
    const assets = parseFloat(data.assets) || 0;
    const loanAmount = parseFloat(data.loanAmount) || 0;
    const assetRatio = assets / loanAmount;

    if (assetRatio >= 0.25) {
      score += 15;
      reasons.push("Strong asset position");
    } else if (assetRatio >= 0.10) {
      score += 10;
      reasons.push("Adequate asset reserves");
    } else {
      score += 5;
      nextSteps.push("Consider increasing down payment or reserves");
    }

    // Bankruptcy History
    if (data.bankruptcyHistory === "none") {
      score += 15;
    } else if (data.bankruptcyHistory === "over-7-years") {
      score += 10;
      reasons.push("Previous bankruptcy is sufficiently aged");
    } else {
      score += 0;
      nextSteps.push("Recent bankruptcy may affect qualification");
    }

    // Determine status
    let status: 'qualified' | 'conditional' | 'not-qualified';
    let estimatedRate = "6.5-7.5%";
    let maxLoanAmount = data.loanAmount;

    if (score >= 80) {
      status = 'qualified';
      estimatedRate = "6.0-6.5%";
      nextSteps.unshift("Ready to proceed with full application");
    } else if (score >= 60) {
      status = 'conditional';
      estimatedRate = "6.5-7.5%";
      nextSteps.unshift("Additional documentation may be required");
    } else {
      status = 'not-qualified';
      estimatedRate = "7.5-8.5%";
      maxLoanAmount = (parseFloat(data.loanAmount) * 0.8).toString();
      nextSteps.unshift("Consider improving financial profile before applying");
    }

    return {
      status,
      score,
      reasons,
      nextSteps,
      estimatedRate,
      maxLoanAmount
    };
  };

  const preQualificationMutation = useMutation({
    mutationFn: async (data: PreQualificationData) => {
      // Calculate qualification locally
      const result = calculateQualification(data);
      
      // Transform data to match backend schema, converting empty strings to null
      const transformValue = (value: string) => value === "" ? null : value;
      
      const backendData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        dateOfBirth: transformValue(data.dateOfBirth),
        ssn: transformValue(data.ssn),
        annualIncome: data.annualIncome,
        employmentType: data.employmentType,
        employmentLength: transformValue(data.employmentLength),
        creditScore: data.creditScore,
        monthlyDebt: transformValue(data.monthlyDebt),
        assets: transformValue(data.assets),
        loanType: data.loanType,
        loanAmount: data.loanAmount,
        propertyValue: transformValue(data.propertyValue),
        propertyType: transformValue(data.propertyType),
        downPayment: transformValue(data.downPayment),
        bankruptcyHistory: transformValue(data.bankruptcyHistory),
        notes: transformValue(data.notes),
        qualificationStatus: result.status,
        qualificationScore: result.score,
        estimatedRate: result.estimatedRate
      };
      
      // Save to backend
      const response = await apiRequest("POST", "/api/pre-qualifications", backendData);
      
      return { ...response, result };
    },
    onSuccess: (data) => {
      setQualificationResult(data.result);
      setCurrentStep(5); // Results step
      toast({
        title: "Pre-qualification Complete!",
        description: "Your results are ready to review.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to process pre-qualification.",
        variant: "destructive",
      });
    },
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the form
      preQualificationMutation.mutate(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.annualIncome && formData.employmentType && formData.creditScore;
      case 3:
        return formData.loanType && formData.loanAmount;
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  const goToContact = () => {
    window.location.href = "/#contact";
  };

  if (currentStep === 5 && qualificationResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                qualificationResult.status === 'qualified' ? 'bg-green-100' : 
                qualificationResult.status === 'conditional' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <CheckCircle className={`w-8 h-8 ${
                  qualificationResult.status === 'qualified' ? 'text-green-600' : 
                  qualificationResult.status === 'conditional' ? 'text-yellow-600' : 'text-red-600'
                }`} />
              </div>
              <CardTitle className="text-3xl">Pre-Qualification Results</CardTitle>
              <Badge variant={
                qualificationResult.status === 'qualified' ? 'default' : 
                qualificationResult.status === 'conditional' ? 'secondary' : 'destructive'
              } className="text-lg px-4 py-2">
                {qualificationResult.status === 'qualified' ? 'Qualified' :
                 qualificationResult.status === 'conditional' ? 'Conditionally Qualified' : 'Not Qualified'}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Qualification Score</h3>
                  <div className="flex items-center space-x-4">
                    <Progress value={qualificationResult.score} className="flex-1" />
                    <span className="font-bold text-xl">{qualificationResult.score}/100</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Estimated Rate</h3>
                  <p className="text-2xl font-bold text-blue-600">{qualificationResult.estimatedRate}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Positive Factors</h3>
                <ul className="space-y-2">
                  {qualificationResult.reasons.map((reason, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Next Steps</h3>
                <ul className="space-y-2">
                  {qualificationResult.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-center">
                      <ArrowRight className="w-5 h-5 text-blue-600 mr-2" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  onClick={goToContact}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                >
                  Contact Mykoal to Proceed
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="flex-1"
                >
                  Start New Application
                </Button>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Online Pre-Qualification
          </h1>
          <p className="text-xl text-gray-600">
            Get pre-qualified in minutes with our secure online application
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <span className={currentStep >= 1 ? "text-blue-600 font-medium" : ""}>Personal Info</span>
              <span className={currentStep >= 2 ? "text-blue-600 font-medium" : ""}>Financial Info</span>
              <span className={currentStep >= 3 ? "text-blue-600 font-medium" : ""}>Loan Details</span>
              <span className={currentStep >= 4 ? "text-blue-600 font-medium" : ""}>Review</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {currentStep === 1 && <><User className="w-5 h-5 mr-2" />Personal Information</>}
              {currentStep === 2 && <><DollarSign className="w-5 h-5 mr-2" />Financial Information</>}
              {currentStep === 3 && <><Home className="w-5 h-5 mr-2" />Loan Details</>}
              {currentStep === 4 && <><FileText className="w-5 h-5 mr-2" />Review Your Information</>}
            </CardTitle>
            <div className="flex items-center text-sm text-gray-600">
              <Shield className="w-4 h-4 mr-1" />
              All information is encrypted and secure
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ssn">Last 4 digits of SSN</Label>
                    <Input
                      id="ssn"
                      maxLength={4}
                      value={formData.ssn}
                      onChange={(e) => updateFormData('ssn', e.target.value)}
                      placeholder="1234"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Financial Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="annualIncome">Annual Income *</Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      value={formData.annualIncome}
                      onChange={(e) => updateFormData('annualIncome', e.target.value)}
                      placeholder="75000"
                    />
                  </div>
                  <div>
                    <Label>Employment Type *</Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(value) => updateFormData('employmentType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time Employee</SelectItem>
                        <SelectItem value="part-time">Part-time Employee</SelectItem>
                        <SelectItem value="self-employed">Self-employed</SelectItem>
                        <SelectItem value="contractor">Independent Contractor</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Credit Score Range *</Label>
                    <Select
                      value={formData.creditScore}
                      onValueChange={(value) => updateFormData('creditScore', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select credit score range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="800+">800+ (Excellent)</SelectItem>
                        <SelectItem value="740-799">740-799 (Very Good)</SelectItem>
                        <SelectItem value="680-739">680-739 (Good)</SelectItem>
                        <SelectItem value="620-679">620-679 (Fair)</SelectItem>
                        <SelectItem value="580-619">580-619 (Poor)</SelectItem>
                        <SelectItem value="Below 580">Below 580</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="monthlyDebt">Monthly Debt Payments</Label>
                    <Input
                      id="monthlyDebt"
                      type="number"
                      value={formData.monthlyDebt}
                      onChange={(e) => updateFormData('monthlyDebt', e.target.value)}
                      placeholder="1500"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Employment Length</Label>
                    <Select
                      value={formData.employmentLength}
                      onValueChange={(value) => updateFormData('employmentLength', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="assets">Liquid Assets</Label>
                    <Input
                      id="assets"
                      type="number"
                      value={formData.assets}
                      onChange={(e) => updateFormData('assets', e.target.value)}
                      placeholder="50000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Loan Details */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
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
                        <SelectItem value="dscr-purchase">Business Purpose DSCR - Purchase</SelectItem>
                        <SelectItem value="dscr-refinance">Business Purpose DSCR - Refinance</SelectItem>
                        <SelectItem value="dscr-cash-out">Business Purpose DSCR - Cash-Out</SelectItem>
                        <SelectItem value="dscr-heloc">DSCR HELOC</SelectItem>
                        <SelectItem value="startup-business">Startup Business Loan</SelectItem>
                        <SelectItem value="personal-loan">Personal Loan</SelectItem>
                        <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount *</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={formData.loanAmount}
                      onChange={(e) => updateFormData('loanAmount', e.target.value)}
                      placeholder="400000"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyValue">Property Value</Label>
                    <Input
                      id="propertyValue"
                      type="number"
                      value={formData.propertyValue}
                      onChange={(e) => updateFormData('propertyValue', e.target.value)}
                      placeholder="500000"
                    />
                  </div>
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
                        <SelectItem value="single-family">Single Family</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                        <SelectItem value="triplex">Triplex</SelectItem>
                        <SelectItem value="fourplex">Fourplex</SelectItem>
                        <SelectItem value="condo">Condominium</SelectItem>
                        <SelectItem value="townhome">Townhome</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="downPayment">Down Payment</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      value={formData.downPayment}
                      onChange={(e) => updateFormData('downPayment', e.target.value)}
                      placeholder="100000"
                    />
                  </div>
                  <div>
                    <Label>Bankruptcy History</Label>
                    <Select
                      value={formData.bankruptcyHistory}
                      onValueChange={(value) => updateFormData('bankruptcyHistory', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select bankruptcy history" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No bankruptcy</SelectItem>
                        <SelectItem value="over-7-years">Over 7 years ago</SelectItem>
                        <SelectItem value="4-7-years">4-7 years ago</SelectItem>
                        <SelectItem value="2-4-years">2-4 years ago</SelectItem>
                        <SelectItem value="under-2-years">Under 2 years ago</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    placeholder="Any additional information you'd like to share..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Financial Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>Annual Income:</strong> ${parseInt(formData.annualIncome || '0').toLocaleString()}</p>
                    <p><strong>Employment:</strong> {formData.employmentType}</p>
                    <p><strong>Credit Score:</strong> {formData.creditScore}</p>
                    <p><strong>Monthly Debt:</strong> ${parseInt(formData.monthlyDebt || '0').toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Loan Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>Loan Type:</strong> {formData.loanType}</p>
                    <p><strong>Loan Amount:</strong> ${parseInt(formData.loanAmount || '0').toLocaleString()}</p>
                    <p><strong>Property Value:</strong> ${parseInt(formData.propertyValue || '0').toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isStepValid() || preQualificationMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentStep === totalSteps ? (
                  preQualificationMutation.isPending ? "Processing..." : "Get Pre-Qualified"
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}