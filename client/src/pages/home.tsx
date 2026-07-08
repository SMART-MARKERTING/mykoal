import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExternalLink,
  Facebook,
  Phone,
  Mail,
  Megaphone,
  Star,
  Linkedin,
  Instagram,
  Youtube,
  FileText,
  Scale,
  X,
  Home as HomeIcon,
  RefreshCw,
  TrendingUp,
  Shield,
  Users,
  CheckCircle,
  Calendar,
  ChevronRight,
  BookOpen,
  HelpCircle,
  UserCircle,
} from "lucide-react";
import { useCalModal } from "@/hooks/use-cal";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import headshotImage from "@assets/IMG_0016_1751000995747.jpeg";

const LENDING_PAD_URL =
  "https://prod.lendingpad.com/adaxa-home/pos#/?loid=dabbfd28-9b5f-46b8-9029-aa478433a995";
const UNYKUE_MARKETING_URL =
  "https://unykue.marketing?utm_source=mykoal&utm_medium=hub&utm_campaign=marketing-seo-sms-imessage";
const SMARTR8_LEGAL_URL = "https://smartr8.com/legal";

export default function Home() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyLastName, setApplyLastName] = useState("");
  const openCal = useCalModal();

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyLastName.trim()) {
      setShowApplyModal(false);
      setApplyLastName("");
      window.open(LENDING_PAD_URL, "_blank");
    }
  };

  const loanTypes = [
    {
      icon: <HomeIcon className="h-7 w-7" />,
      title: "Purchase",
      description:
        "Buy your next home with confidence. Conventional, FHA, VA, DSCR, and investor loan options available.",
      href: "https://smartr8.com/apply/purchase?utm_source=mykoal&utm_medium=hub&utm_campaign=purchase-card",
    },
    {
      icon: <RefreshCw className="h-7 w-7" />,
      title: "Refinance",
      description:
        "Lower your rate, reduce your payment, or access equity. Let's find the right refi strategy for you.",
      href: "https://smartr8.com/apply/cash-out?utm_source=mykoal&utm_medium=hub&utm_campaign=refinance-card",
    },
    {
      icon: <TrendingUp className="h-7 w-7" />,
      title: "HELOC",
      description:
        "Tap into your home's equity for renovations, investments, or debt consolidation.",
      href: "https://smartr8.com/heloc/instant-options?utm_source=mykoal&utm_medium=hub&utm_campaign=heloc-card",
    },
  ];

  const trustPoints = [
    {
      icon: <Users className="h-5 w-5 text-[#D4A857]" />,
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
      icon: <CheckCircle className="h-5 w-5 text-[#D4A857]" />,
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
      icon: <Shield className="h-5 w-5 text-[#D4A857]" />,
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

  const resourceLinks = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Read the Blog",
      description: "Mortgage insights & guides",
      href: "/blog",
      color: "bg-[#0077a8] hover:bg-[#005f85]",
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      title: "Common Questions",
      description: "Browse the FAQ",
      href: "/faq",
      color: "bg-slate-700 hover:bg-slate-600",
    },
    {
      icon: <UserCircle className="h-6 w-6" />,
      title: "About Mykoal",
      description: "My story & credentials",
      href: "/about",
      color: "bg-slate-600 hover:bg-slate-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <SiteNav />
      <div className="container max-w-md mx-auto px-4 pt-20 pb-6">

        {/* ── Hero / Profile ── */}
        <div className="text-center mb-8">
          <img
            src={headshotImage}
            alt="Mykoal DeShazo"
            className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white/20 mx-auto mb-5"
          />
          <h1 className="text-3xl font-bold text-white mb-1">Mykoal DeShazo</h1>
          <p className="text-[#D4A857] font-semibold text-base mb-1 tracking-wide uppercase">
            Vice President | Senior Loan Officer
          </p>
          <p className="text-white/50 text-xs mb-3">Adaxa Home LLC</p>
          <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <p className="text-blue-200 text-xs font-medium">
              NMLS #1912347 &nbsp;|&nbsp; Adaxa Home LLC NMLS #2380533
            </p>
          </div>
        </div>

        {/* ── Primary CTAs ── */}
        <div className="space-y-3 mb-8">
          {/* HELOC + Refinance 2-col grid */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://smartr8.com/heloc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="bg-[#D4A857] hover:bg-[#C19548] border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 h-full">
                <CardContent className="p-4 flex flex-col items-start gap-1">
                  <TrendingUp className="h-5 w-5 mb-1 text-[#1A2744]" />
                  <p className="font-bold text-sm leading-tight text-[#1A2744]">Apply for HELOC</p>
                  <p className="text-[#1A2744]/70 text-xs">Tap your home equity</p>
                </CardContent>
              </Card>
            </a>
            <div className="flex flex-col gap-1.5">
              <a
                href="https://smartr8.com/apply/cash-out"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Card className="bg-[#D4A857] hover:bg-[#C19548] border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 h-full">
                  <CardContent className="p-4 flex flex-col items-start gap-1">
                    <RefreshCw className="h-5 w-5 mb-1 text-[#1A2744]" />
                    <p className="font-bold text-sm leading-tight text-[#1A2744]">Apply for Refinance</p>
                    <p className="text-[#1A2744]/70 text-xs">Cash-out or rate reduction</p>
                  </CardContent>
                </Card>
              </a>
              <a
                href="https://smartr8.com/apply/rate-reduction"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-blue-300/60 hover:text-blue-200 text-xs transition-colors underline"
              >
                Rate reduction instead →
              </a>
            </div>
          </div>

          <button
            onClick={openCal}
            className="w-full flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200"
          >
            <Calendar className="h-5 w-5" />
            Schedule a Call
          </button>

          <a
            href={UNYKUE_MARKETING_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Unykue Marketing for marketing, SEO, SMS, and iMessage"
            className="w-full flex items-center justify-between gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <Megaphone className="h-5 w-5 flex-shrink-0" />
              <span className="min-w-0 text-left">
                <span className="block text-sm leading-tight">Marketing, SEO, SMS & iMessage</span>
                <span className="block text-xs font-medium text-white/75">Unykue Marketing</span>
              </span>
            </span>
            <ExternalLink className="h-4 w-4 flex-shrink-0 text-white/75" />
          </a>

          <a
            href={SMARTR8_LEGAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Smartr8 Legal for LLCs, wills, trusts, and trademarks"
            className="w-full flex items-center justify-between gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <Scale className="h-5 w-5 flex-shrink-0" />
              <span className="min-w-0 text-left">
                <span className="block text-sm leading-tight">LLCs, Wills, Trusts & Trademarks</span>
                <span className="block text-xs font-medium text-white/75">Smartr8 Legal</span>
              </span>
            </span>
            <ExternalLink className="h-4 w-4 flex-shrink-0 text-white/75" />
          </a>

          <a
            href="/testimonials"
            className="flex items-center justify-center gap-1.5 text-white/70 hover:text-white transition-colors"
          >
            <Star className="h-4 w-4 text-[#D4A857] fill-[#D4A857]" />
            <span className="text-sm">4.91 / 5 · 54+ Google Reviews</span>
          </a>
        </div>

        {/* ── Loan Types ── */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-bold text-center mb-5">Loan Options</h2>
          <div className="space-y-3">
            {loanTypes.map((loan, i) => (
              <a
                key={i}
                href={loan.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <div className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 hover:shadow-[0_0_16px_rgba(255,255,255,0.08)] rounded-xl p-4 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.99]">
                  <div className="flex items-start space-x-4">
                    <div className="text-[#D4A857] mt-0.5 flex-shrink-0">{loan.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold text-base mb-1">{loan.title}</h3>
                      <p className="text-blue-200/80 text-sm leading-relaxed">{loan.description}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Trust Section ── */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-bold text-center mb-5">Why Mykoal?</h2>
          <div className="space-y-4">
            {trustPoints.map((section, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-5">
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
                <div
                  className={`${link.color} text-white rounded-xl p-3 text-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                >
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
              href="tel:+14802069290"
              className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5 flex-shrink-0" />
              <span>(480) 206-9290</span>
            </a>
            <a
              href="mailto:mdeshazo@mykoal.com"
              className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5 flex-shrink-0" />
              <span>mdeshazo@mykoal.com</span>
            </a>
          </div>
          <div className="text-center text-blue-200/70 text-xs leading-relaxed">
            <div>16767 N Perimeter Dr., Ste 150</div>
            <div>Scottsdale, AZ 85260</div>
          </div>
        </div>

        {/* ── Resources & Insights ── */}
        <div className="mb-6">
          <h2 className="text-white text-lg font-semibold text-center mb-4">Resources & Insights</h2>
          <div className="space-y-3">
            {resourceLinks.map((r, i) => (
              <Link key={i} href={r.href} className="block w-full">
                <div
                  className={`${r.color} text-white rounded-xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200`}
                >
                  <div className="flex items-center gap-3">
                    {r.icon}
                    <div>
                      <p className="font-bold text-sm">{r.title}</p>
                      <p className="text-white/75 text-xs">{r.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/60 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />

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
                disabled={!applyLastName.trim()}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3"
              >
                Continue to Application
              </Button>
            </form>

            <p className="text-blue-300/60 text-xs text-center mt-4 leading-relaxed">
              By submitting, you consent to be contacted regarding mortgage options. Mortgage
              services are provided through Adaxa Home LLC (NMLS #2380533).{" "}
              <a
                href="https://adaxahome.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-200"
              >
                Privacy Policy
              </a>{" "}
              ·{" "}
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
