import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Globe, Podcast, Facebook, Instagram, Youtube, Phone, Mail, Building } from "lucide-react";
import headshotImage from "@assets/IMG_0016_1751000995747.jpeg";

export default function Home() {
  const businessLinks = [
    {
      title: "Mykoal DeShazo – Independence Home Loans",
      description: "Professional Mortgage Services",
      url: "https://independencehl.com/mykoal-deshazo/",
      icon: <Building className="h-6 w-6" />,
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "Team DeShazo",
      description: "Full Financial Services",
      url: "https://deshazowealth.com",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Unykue Podcast",
      description: "Faith-Based Podcast",
      url: "https://unykue.com",
      icon: <Podcast className="h-6 w-6" />,
      color: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  const socialLinks = [
    {
      title: "Facebook",
      url: "https://www.facebook.com/61577360476457",
      icon: <Facebook className="h-5 w-5" />,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com/realmykoal/",
      icon: <Instagram className="h-5 w-5" />,
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      title: "YouTube",
      url: "https://youtube.com/@mykoaldeshazo",
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
            Entrepreneur & Content Creator
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
            <a href="mailto:mdeshazo@mykoal.com" className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
              <span>mdeshazo@mykoal.com</span>
            </a>
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
