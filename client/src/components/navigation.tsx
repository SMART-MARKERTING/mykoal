import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-700">Mykoal DeShazo</h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("calculator")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Calculator
              </button>
              <button
                onClick={() => scrollToSection("loans")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Lending Solutions
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("blog")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Resources
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Get Quote
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <button
              onClick={() => scrollToSection("home")}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("calculator")}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left"
            >
              Calculator
            </button>
            <button
              onClick={() => scrollToSection("loans")}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left"
            >
              Lending Solutions
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left"
            >
              Resources
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md w-full"
            >
              Get Quote
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
