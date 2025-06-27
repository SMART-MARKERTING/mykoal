import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  BookOpen, 
  Calculator, 
  FileText, 
  Download, 
  Video, 
  TrendingUp,
  Building,
  Home,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { Link } from "wouter";

export default function ResourcesPage() {
  const blogArticles = [
    {
      id: 1,
      title: "Complete Guide to DSCR Loans",
      description: "Everything you need to know about Debt Service Coverage Ratio loans for investment properties.",
      category: "Investment Property",
      readTime: "8 min read",
      link: "/blog/dscr-guide",
      featured: true
    },
    {
      id: 2,
      title: "Business Loan Fundamentals",
      description: "Essential guide to securing business financing for startups and growing companies.",
      category: "Business Loans",
      readTime: "6 min read",
      link: "/blog/business-loans",
      featured: true
    },
    {
      id: 3,
      title: "Personal Loan Best Practices",
      description: "Smart strategies for using personal loans and debt consolidation effectively.",
      category: "Personal Finance",
      readTime: "5 min read",
      link: "/blog/personal-loans",
      featured: true
    }
  ];

  const calculators = [
    {
      id: 1,
      title: "Mortgage Payment Calculator",
      description: "Calculate monthly payments, total interest, and payoff schedules with extra payments.",
      icon: Calculator,
      link: "/#calculator"
    },
    {
      id: 2,
      title: "Debt Consolidation Calculator",
      description: "Compare your current debts vs. a consolidated loan to see potential savings.",
      icon: TrendingUp,
      link: "/debt-consolidation"
    },
    {
      id: 3,
      title: "Investment Property ROI",
      description: "Analyze rental property returns and cash flow scenarios.",
      icon: Building,
      link: "/dscr-purchase"
    }
  ];

  const loanTypes = [
    {
      id: 1,
      title: "DSCR Purchase Loans",
      description: "Financing for investment property purchases based on rental income.",
      features: ["No personal income verification", "Quick approval process", "Competitive rates"],
      link: "/dscr-purchase"
    },
    {
      id: 2,
      title: "DSCR Refinance",
      description: "Refinance existing investment properties to improve cash flow.",
      features: ["Lower payment options", "Cash-out refinancing", "Portfolio lending"],
      link: "/dscr-refinance"
    },
    {
      id: 3,
      title: "HELOC Programs",
      description: "Home Equity Lines of Credit for investment opportunities.",
      features: ["Flexible draw periods", "Interest-only payments", "No prepayment penalties"],
      link: "/dscr-heloc"
    },
    {
      id: 4,
      title: "Personal Loans",
      description: "Unsecured financing for various personal and business needs.",
      features: ["Fast approval", "No collateral required", "Flexible terms"],
      link: "/personal-loan"
    }
  ];

  const marketResources = [
    {
      id: 1,
      title: "Live Market Updates",
      description: "Real-time mortgage rates and market analysis with expert insights.",
      icon: TrendingUp,
      link: "/market-updates"
    },
    {
      id: 2,
      title: "Rate Tracking",
      description: "Current rates from Federal Reserve and market data sources.",
      icon: DollarSign,
      link: "/market-updates"
    }
  ];

  const tools = [
    {
      id: 1,
      title: "Pre-Qualification Tool",
      description: "Get pre-qualified for loans with our simplified online process.",
      icon: CheckCircle,
      link: "/pre-qualification"
    },
    {
      id: 2,
      title: "Debt Consolidation Planner",
      description: "Interactive tool to plan your debt consolidation strategy.",
      icon: FileText,
      link: "/debt-consolidation"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="text-lg font-semibold text-blue-600">Mykoal DeShazo, NMLS #1912347</div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-12 w-12 mr-4" />
            <h1 className="text-4xl lg:text-5xl font-bold">Lending Resources</h1>
          </div>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Comprehensive guides, calculators, and tools to help you make informed financing decisions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Educational Guides
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Financial Calculators
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Market Data
            </Badge>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Links Navigation */}
        <section className="mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="grid md:grid-cols-5 gap-4">
              <Link href="/#calculator" className="flex items-center justify-center bg-white border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                <span className="text-sm font-medium text-gray-700">Mortgage Calculator</span>
              </Link>
              <Link href="/#loans" className="flex items-center justify-center bg-white border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                <span className="text-sm font-medium text-gray-700">Lending Solutions</span>
              </Link>
              <Link href="/about" className="flex items-center justify-center bg-white border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                <span className="text-sm font-medium text-gray-700">About Us</span>
              </Link>
              <Link href="/pre-qualification" className="flex items-center justify-center bg-white border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                <span className="text-sm font-medium text-gray-700">Pre-Qualify</span>
              </Link>
              <Link href="/#contact" className="flex items-center justify-center bg-white border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                <span className="text-sm font-medium text-gray-700">Contact</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Articles</h2>
            <p className="text-lg text-gray-600">Expert insights and comprehensive guides</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    {article.featured && <Badge className="bg-blue-600">Featured</Badge>}
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                    <Link href={article.link}>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Financial Calculators */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Calculators</h2>
            <p className="text-lg text-gray-600">Interactive tools for loan planning and analysis</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {calculators.map((calc) => (
              <Card key={calc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <calc.icon className="h-6 w-6 mr-3 text-blue-600" />
                    {calc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{calc.description}</p>
                  <Link href={calc.link}>
                    <Button className="w-full">
                      Use Calculator
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Loan Products Guide */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Loan Products Guide</h2>
            <p className="text-lg text-gray-600">Detailed information about our financing solutions</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loanTypes.map((loan) => (
              <Card key={loan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{loan.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{loan.description}</p>
                  <ul className="space-y-2 mb-4">
                    {loan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={loan.link}>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Market Data & Tools */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Market Resources */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Intelligence</h2>
            <div className="space-y-4">
              {marketResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <resource.icon className="h-8 w-8 text-blue-600 mr-4 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                        <p className="text-gray-600 mb-4">{resource.description}</p>
                        <Link href={resource.link}>
                          <Button variant="outline" size="sm">
                            View Data
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Online Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Online Tools</h2>
            <div className="space-y-4">
              {tools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <tool.icon className="h-8 w-8 text-green-600 mr-4 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                        <p className="text-gray-600 mb-4">{tool.description}</p>
                        <Link href={tool.link}>
                          <Button size="sm">
                            Start Tool
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Quick Access Section */}
        <section className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Personal Guidance?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Connect with Mykoal DeShazo for personalized lending solutions and expert advice
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#contact">
              <Button size="lg">
                Contact Mykoal
              </Button>
            </Link>
            <Link href="/pre-qualification">
              <Button variant="outline" size="lg">
                Get Pre-Qualified
              </Button>
            </Link>
          </div>
        </section>

        {/* Equal Housing Opportunity */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/equal-housing-logo.png" 
              alt="Equal Housing Opportunity Logo" 
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm font-semibold text-gray-700">Equal Housing Opportunity</span>
          </div>
          <p className="text-xs text-gray-600 max-w-3xl mx-auto">
            We are committed to equal housing opportunity. All loans subject to credit approval. 
            This is not a commitment to lend. Licensed mortgage loan originator NMLS #1912347.
          </p>
        </div>
      </div>
    </div>
  );
}