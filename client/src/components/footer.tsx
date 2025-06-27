import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";

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
              Your trusted mortgage advisor, helping families achieve homeownership dreams with personalized service and competitive rates.
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
              <li>(555) 123-4567</li>
              <li>mdeshazo@mykoal.com</li>
              <li>
                123 Main Street, Suite 450<br />
                San Francisco, CA 94102
              </li>
            </ul>
          </div>
        </div>

        {/* Legal section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-sm text-gray-400">
              <p className="mb-2">
                <strong>NMLS Company ID:</strong> #987654321 | 
                <strong> Mykoal DeShazo NMLS:</strong> #1912347
              </p>
              <p className="mb-2">
                Licensed in CA, NV, AZ. Equal Housing Lender. 
              </p>
              <p>
                MortgagePro Financial is a division of Example Bank, Member FDIC.
              </p>
            </div>
            
            <div className="text-sm text-gray-400 md:text-right">
              <div className="flex md:justify-end space-x-6">
                <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Licensing</a>
              </div>
              <p className="mt-4">© 2024 MortgagePro Financial. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
