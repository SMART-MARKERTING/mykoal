import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import { Link, useLocation } from "wouter";
import equalHousingLogo from "@assets/Equal-Housing-Logo_1751007456918.png";
import ecoaLogo from "@assets/image_1772497699846.png";

export default function Footer() {
  const [location, setLocation] = useLocation();
  
  const navigateToSection = (sectionId: string) => {
    if (location === '/') {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Navigate to home page and then scroll
      setLocation('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Mykoal DeShazo</h3>
            <p className="text-blue-200 mb-2 font-medium italic">
              "Trust in the Lord with all your heart" - Proverbs 3:5
            </p>
            <p className="text-gray-300 mb-6 max-w-md">
              Christ-centered mortgage lending with integrity and excellence. Your trusted investor financing specialist, helping investors and families grow their portfolios while honoring God through honest, transparent service.
            </p>
            
            {/* Social media */}
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/61577360476457" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Follow Mykoal on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mykoal-deshazo-48134616a" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Connect with Mykoal on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/realmykoal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Follow Mykoal on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors cursor-pointer underline-offset-2 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors cursor-pointer underline-offset-2 hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/debt-consolidation" className="hover:text-blue-400 transition-colors cursor-pointer underline-offset-2 hover:underline">
                  Debt Consolidation
                </Link>
              </li>
              <li>
                <Link href="/join-team" className="hover:text-blue-400 transition-colors cursor-pointer underline-offset-2 hover:underline">
                  Join Our Team
                </Link>
              </li>
              <li>
                <a 
                  href="https://adaxahome.com/contact/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors cursor-pointer underline-offset-2 hover:underline"
                >
                  Get Quote
                </a>
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
                16767 N Perimeter Dr., Ste 150<br />
                Scottsdale, AZ 85260<br />
                Serving nationwide investors
              </li>
            </ul>
          </div>
        </div>

        {/* Legal section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="space-y-6">
            {/* Company information */}
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">
                <strong>Mykoal DeShazo NMLS:</strong> 1912347 | <strong>Adaxa Home NMLS:</strong> 2380533
              </p>
              <p className="text-sm text-gray-400 mb-2">
                16767 N Perimeter Dr., Ste 150 Scottsdale, AZ 85260
              </p>
              <p className="text-sm text-gray-400">
                Licensed Mortgage Professional • Equal Housing Opportunity
              </p>
            </div>

            {/* Compliance disclaimer */}
            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed max-w-4xl mx-auto">
                The content provided within this website is presented for information purposes only. This is not a commitment to lend or extend credit. Information and/or dates are subject to change without notice. All loans are subject to credit approval. Other restrictions may apply. Mortgage loans may be arranged through third party providers.
              </p>
            </div>

            {/* Links and compliance */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center gap-3">
                <img 
                  src={equalHousingLogo} 
                  alt="Equal Housing Opportunity Logo" 
                  className="w-6 h-6 object-contain filter brightness-0 invert"
                />
                <img 
                  src={ecoaLogo} 
                  alt="Equal Housing Opportunity" 
                  className="w-6 h-6 object-contain filter brightness-0 invert"
                />
              </div>
              
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/1912347" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Licensing</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
