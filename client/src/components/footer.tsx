import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Mykoal DeShazo</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted investor financing specialist, helping investors grow their portfolios with personalized service and competitive rates.
            </p>
            
            {/* Social media */}
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button 
                  onClick={() => scrollToSection("calculator")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Mortgage Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("loans")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Lending Solutions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("blog")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Resources
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>(623) 280-8351</li>
              <li>mdeshazo@mykoal.com</li>
              <li>
                Scottsdale, Arizona<br />
                Serving nationwide investors
              </li>
            </ul>
          </div>
        </div>

        {/* Legal section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-sm text-gray-400">
              <p className="mb-2">
                <strong>Mykoal DeShazo NMLS:</strong> #1912347
              </p>
              <p className="mb-2">
                Licensed Mortgage Professional, Scottsdale, Arizona. Equal Housing Opportunity. 
              </p>
              <p>
                All loans subject to credit approval. This is not a commitment to lend.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                <img 
                  src="/equal-housing-logo.png" 
                  alt="Equal Housing Opportunity Logo" 
                  className="w-6 h-6 object-contain filter brightness-0 invert"
                />
                <span className="text-xs text-gray-400">Equal Housing Opportunity</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-400 md:text-right">
              <div className="flex md:justify-end space-x-6">
                <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
                <a href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/1912347" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Licensing</a>
              </div>
              <p className="mt-4">© 2025 Mykoal DeShazo. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
