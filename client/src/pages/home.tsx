import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExternalLink,
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  Star,
  Linkedin,
  FileText,
  X,
  Home as HomeIcon,
  RefreshCw,
  TrendingUp,
  Shield,
  Users,
  CheckCircle,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import headshotImage from "@assets/IMG_0016_1751000995747.jpeg";
import equalHousingLogo from "@assets/Equal-Housing-Logo_1751007456918.png";
import ecoaLogo from "@assets/image_1772497699846.png";

const LENDING_PAD_URL =
  "https://prod.lendingpad.com/adaxa-home/pos#/?loid=dabbfd28-9b5f-46b8-9029-aa478433a995";
const SCHEDULE_URL = "https://calendly.com/adaxa-mortgage/quote-review";

export default function Home() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyLastName, setApplyLastName] = useState("");

  const applyMutation = useMutation({
    mutationFn: async (data: { lastName: string }) => {
      const res = await apiRequest("POST", "/api/leads", data);
      return res.json();
    },
    onSuccess: () => {
      setShowApplyModal(false);
      setApplyLastName("");
      window.open(LENDING_PAD_URL, "_blank");
    },
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyLastName.trim()) {
      applyMutation.mutate({ lastName: applyLastName.trim() });
    }
  };

  const loanTypes = [
    {
      icon: <HomeIcon className="h-7 w-7" />,
      title: "Purchase",
      description: "Buy your next home with confidence. Conventional, FHA, VA, DSCR, and investor loan options available.",
    },
    {
      icon: <RefreshCw className="h-7 w-7" />,
      title: "Refinance",
      description: "Lower your rate, reduce your payment, or access equity. Let's find the right refi strategy for you.",
    },
    {
      icon: <TrendingUp className="h-7 w-7" />,
      title: "HELOC",
      description: "Tap into your home's equity for renovations, investments, or debt consolidation.",
    },
  ];

  const trustPoints = [
    {
      icon: <Users className="h-5 w-5 text-blue-300" />,
      title: "Who I Help",
      items: [
        "First-time homebuyers",
        "Move-up buyers and downsizers",
        "Real estate investors",
        "Self-employed borrowers",
        "Veterans using VA benefits",
      ],
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-blue-300" />,
      title: "Loan Scenarios",
      items: [
        "Conventional & Jumbo",
        "FHA & VA Loans",
        "DSCR & Investor Loans",
        "Bank Statement Programs",
        "HELOC & Cash-Out Refi",
      ],
    },
    {
      icon: <Shield className="h-5 w-5 text-blue-300" />,
      title: "Why Work With Me",
      items: [
        "4.91/5 stars — 54+ verified reviews",
        "Direct access — no call centers",
        "Fast, transparent communication",
        "Creative solutions for complex files",
        "Licensed in multiple states",
      ],
    },
  ];

  const socialLinks = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/mykoal-deshazo-48134616a",
      icon: <Linkedin className="h-5 w-5" />,
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      title: "Facebook",
      url: "https://www.facebook.com/VALoans.FHALoans.DSCRLoans.MortgageLoans/",
      icon: <Facebook className="h-5 w-5" />,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com/themlomykoal?igsh=MW9sejNyZ3FjMjF0NQ%3D%3D&utm_source=qr",
      icon: <Instagram className="h-5 w-5" />,
      color: "bg-pink-600 hover:bg-pink-700",
    },
    {
      title: "YouTube",
      url: "https://www.youtube.com/@mykoaldeshazo",
      icon: <Youtube className="h-5 w-5" />,
      color: "bg-red-600 hover:bg-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container max-w-md mx-auto px-4 pt-10 pb-6">

        {/* ── Hero / Profile ── */}
        <div className="text-center mb-8">
          <img
            src={headshotImage}
            alt="Mykoal DeShazo"
            className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white/20 mx-auto mb-5"
          />
          <h1 className="text-3xl font-bold text-white mb-1">
            Mykoal DeShazo
          </h1>
          <p className="text-[#00b4d8] font-semibold text-base mb-1 tracking-wide uppercase">
            Mortgage Loan Originator
          </p>
          <p className="text-white/60 text-xs mb-3">Vice President — Adaxa Home LLC</p>
          <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <p className="text-blue-200 text-xs font-medium">
              NMLS #1912347 &nbsp;|&nbsp; Adaxa Home LLC NMLS #2380533
            </p>
          </div>
        </div>

        {/* ── Primary CTAs ── */}
        <div className="space-y-3 mb-8">
          <button
            onClick={() => setShowApplyModal(true)}
            className="block w-full text-left"
          >
            <Card className="bg-orange-600 hover:bg-orange-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-base leading-tight">Apply Now</p>
                      <p className="text-white/80 text-sm">Purchase, Refinance, or HELOC</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/60 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </button>

          <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer" className="block w-full">
            <Card className="bg-[#0077a8] hover:bg-[#005f85] text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-base leading-tight">Schedule a Call</p>
                      <p className="text-white/80 text-sm">Talk directly with Mykoal</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/60 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </a>

          <a
            href="https://www.experience.com/reviews/mykoal-deshazo"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Card className="bg-yellow-600 hover:bg-yellow-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Star className="h-6 w-6 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-base leading-tight">Client Reviews</p>
                      <p className="text-white/80 text-sm">4.91 / 5 Stars — 54+ Reviews</p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-white/60 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* ── Loan Types ── */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-bold text-center mb-5">
            Loan Options
          </h2>
          <div className="space-y-3">
            {loanTypes.map((loan, i) => (
              <button
                key={i}
                onClick={() => setShowApplyModal(true)}
                className="block w-full text-left"
              >
                <div className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl p-4 transition-all duration-200 hover:border-white/30">
                  <div className="flex items-start space-x-4">
                    <div className="text-[#00b4d8] mt-0.5 flex-shrink-0">{loan.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold text-base mb-1">{loan.title}</h3>
                      <p className="text-blue-200/80 text-sm leading-relaxed">{loan.description}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Trust Section ── */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-bold text-center mb-5">
            Why Mykoal?
          </h2>
          <div className="space-y-4">
            {trustPoints.map((section, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/20 rounded-xl p-5"
              >
                <div className="flex items-center space-x-2 mb-3">
                  {section.icon}
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-center space-x-2 text-blue-200 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Social Links ── */}
        <div className="mb-8">
          <h2 className="text-white text-lg font-semibold text-center mb-4">Connect</h2>
          <div className="grid grid-cols-4 gap-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className={`${link.color} text-white rounded-xl p-3 text-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}>
                  <div className="flex flex-col items-center space-y-1.5">
                    {link.icon}
                    <span className="text-xs font-medium">{link.title}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Contact ── */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
          <h2 className="text-white text-lg font-semibold text-center mb-4">Get In Touch</h2>
          <div className="space-y-3 mb-4">
            <a
              href="tel:623-280-8351"
              className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5 flex-shrink-0" />
              <span>(623) 280-8351</span>
            </a>
            <a
              href="mailto:mykoal@adaxahome.com"
              className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5 flex-shrink-0" />
              <span>mykoal@adaxahome.com</span>
            </a>
          </div>
          <div className="text-center text-blue-200/70 text-xs leading-relaxed">
            <div>16767 N Perimeter Dr., Ste 150</div>
            <div>Scottsdale, AZ 85260</div>
          </div>
        </div>

        {/* ── Compliance Footer ── */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <img src={equalHousingLogo} alt="Equal Housing Lender" className="h-10 w-auto" />
            <img src={ecoaLogo} alt="Equal Credit Opportunity Act" className="h-10 w-auto" />
          </div>

          <p className="text-white text-sm font-semibold mb-0.5">Mykoal DeShazo</p>
          <p className="text-blue-200 text-xs mb-0.5">Mortgage Loan Originator · NMLS #1912347</p>
          <p className="text-blue-200 text-xs mb-0.5">Adaxa Home LLC · NMLS #2380533</p>
          <p className="text-blue-300/60 text-xs mb-4">Equal Housing Opportunity · Licensed in AZ and additional states</p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs mb-4">
            <a
              href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/1912347"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white underline transition-colors"
            >
              NMLS Consumer Access
            </a>
            <a
              href="https://adaxahome.com/licensing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white underline transition-colors"
            >
              Licensing
            </a>
            <a
              href="https://adaxahome.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white underline transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://adaxahome.com/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white underline transition-colors"
            >
              Terms of Use
            </a>
          </div>

          <p className="text-blue-200/60 text-xs leading-relaxed px-2 mb-4">
            Adaxa Home LLC is an Equal Housing Lender. We do not discriminate on the basis of race, color, religion, national origin, sex, marital status, age, or any other characteristic protected by federal law.
          </p>

          <p className="text-blue-300/50 text-xs italic">
            "Trust in the Lord with all your heart" — Proverbs 3:5
          </p>
        </div>

        <div className="h-6" />
      </div>

      {/* ── Apply Modal ── */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
            <button
              onClick={() => {
                setShowApplyModal(false);
                setApplyLastName("");
              }}
              className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <FileText className="h-10 w-10 text-orange-400 mx-auto mb-3" />
              <h3 className="text-white text-xl font-bold">Start Your Application</h3>
              <p className="text-blue-200 text-sm mt-1">
                Enter your last name to continue to LendingPad
              </p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Last Name"
                value={applyLastName}
                onChange={(e) => setApplyLastName(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-blue-300/50 focus:border-orange-400 focus:ring-orange-400"
                required
                autoFocus
              />
              <Button
                type="submit"
                disabled={applyMutation.isPending || !applyLastName.trim()}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3"
              >
                {applyMutation.isPending ? "Submitting..." : "Continue to Application"}
              </Button>
            </form>

            <p className="text-blue-300/60 text-xs text-center mt-4 leading-relaxed">
              By submitting your information, you consent to be contacted regarding mortgage options. Mortgage services are provided through Adaxa Home LLC (NMLS #2380533). We respect your privacy —{" "}
              <a
                href="https://adaxahome.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-200"
              >
                Privacy Policy
              </a>
              {" "}·{" "}
              <a
                href="https://adaxahome.com/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-200"
              >
                Terms of Use
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
