import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Globe, Podcast, Facebook, Instagram, Youtube, Phone, Mail, Building, Star, Linkedin, FileText, CreditCard } from "lucide-react";
import headshotImage from "@assets/IMG_0016_1751000995747.jpeg";
import westCapitalLogo from "@assets/image_1756055687983.png";
import equalHousingLogo from "@assets/image_1759164152959.png";

export default function Home() {
  const businessLinks = [
    {
      title: "Apply for Purchase, Refi, or HELOC",
      description: "Start Your Loan Application",
      url: "https://prod.lendingpad.com/adaxa-home/pos#/?loid=dabbfd28-9b5f-46b8-9029-aa478433a995",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-orange-600 hover:bg-orange-700"
    },
    {
      title: "Client Reviews",
      description: "4.91/5 Stars • 54+ Reviews",
      url: "https://www.experience.com/reviews/mykoal-deshazo",
      icon: <Star className="h-6 w-6" />,
      color: "bg-yellow-600 hover:bg-yellow-700"
    },
    {
      title: "Team DeShazo",
      description: "Full Financial Services",
      url: "https://deshazowealth.com",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-blue-600 hover:bg-blue-700"
    }
  ];

  const socialLinks = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/mykoal-deshazo-48134616a",
      icon: <Linkedin className="h-5 w-5" />,
      color: "bg-blue-700 hover:bg-blue-800"
    },
    {
      title: "Facebook",
      url: "https://www.facebook.com/VALoans.FHALoans.DSCRLoans.MortgageLoans/",
      icon: <Facebook className="h-5 w-5" />,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com/themlomykoal?igsh=MW9sejNyZ3FjMjF0NQ%3D%3D&utm_source=qr",
      icon: <Instagram className="h-5 w-5" />,
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      title: "YouTube",
      url: "https://www.youtube.com/@mykoaldeshazo",
      icon: <Youtube className="h-5 w-5" />,
      color: "bg-red-600 hover:bg-red-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <img 
              src={headshotImage} 
              alt="Mykoal DeShazo" 
              className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white/20 mx-auto"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Mykoal DeShazo
          </h1>
          <p className="text-blue-200 text-lg mb-2">
            Branch Manager
          </p>
          <p className="text-blue-300 text-sm">
            NMLS #1912347 | Faith-Based Business
          </p>
        </div>

        {/* Business Links */}
        <div className="space-y-4 mb-8">
          <h2 className="text-white text-xl font-semibold text-center mb-6">My Businesses</h2>
          {businessLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Card className={`${link.color} text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {link.icon}
                      <div>
                        <h3 className="font-semibold text-lg">{link.title}</h3>
                        <p className="text-white/80 text-sm">{link.description}</p>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 text-white/60" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-semibold text-center mb-6">Follow Me</h2>
          <div className="grid grid-cols-3 gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className={`${link.color} text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}>
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      {link.icon}
                      <span className="text-xs font-medium">{link.title}</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-white text-xl font-semibold text-center mb-4">Get In Touch</h2>
          <div className="space-y-3">
            <a href="tel:623-280-8351" className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors">
              <Phone className="h-5 w-5" />
              <span>(623) 280-8351</span>
            </a>
            <a href="mailto:Mykoal@westcapitallending.com" className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
              <span>Mykoal@westcapitallending.com</span>
            </a>
          </div>
          
          <div className="mt-6 text-center">
            <div className="text-white font-semibold text-lg mb-2">Mykoal DeShazo | Branch Manager</div>
            <div className="space-y-1 text-blue-200 text-sm">
              <div>16767 N Perimeter Dr., Ste 150 Scottsdale, AZ 85260</div>
              <div>NMLS 1912347</div>
              <a href="https://adaxahome.com/contact/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors">
                adaxahome.com
              </a>
            </div>
          </div>
        </div>

        {/* Required Business Links */}
        <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="text-center space-y-3">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="https://www.nmlsconsumeraccess.org/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors underline">
                NMLS Consumer Access
              </a>
              <a href="https://adaxahome.com/licensing" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors underline">
                Licensing
              </a>
              <a href="https://adaxahome.com/contact/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors underline">
                Adaxa Home
              </a>
            </div>
            
            {/* Equal Housing Lender Disclaimer */}
            <div className="text-xs text-blue-200/80 leading-relaxed mt-4 px-2">
              Adaxa Home is an Equal Housing Lender. As prohibited by federal law, we do not engage in business practices that discriminate based on race, color, religion, national origin, sex, marital status, age (provided you have the capacity to enter into a binding contract) because all or part of your income may be derived from any public assistance program, or because you have, in good faith, exercised any right under the Consumer Credit Protection Act.
            </div>
            
            {/* Equal Housing Logo */}
            <div className="mt-4 flex justify-center">
              <img 
                src={equalHousingLogo} 
                alt="West NMLS Equal Housing Lender" 
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="text-center mt-8 text-blue-300/60 text-sm italic">
          "Trust in the Lord with all your heart" - Proverbs 3:5
        </div>
      </div>
    </div>
  );
}
