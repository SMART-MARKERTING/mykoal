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
          <div className="flex items-center min-w-0 flex-shrink-0">
            <div className="flex-shrink-0">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-700 leading-tight">
                Mykoal DeShazo
                <span className="text-xs md:text-sm text-gray-600 block">Independence Home Loans</span>
              </h1>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-4 flex items-baseline space-x-4 xl:space-x-6">
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
              <a
                href="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </a>
              <a
                href="/join-team"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Join Team
              </a>
              <a
                href="/debt-consolidation"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Debt Consolidation
              </a>
              <a
                href="https://independencehl.com/mykoal-deshazo/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Get Quote
              </a>
            </div>
          </div>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
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
            <a
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left"
            >
              About
            </a>
            <a
              href="/join-team"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left"
            >
              Join Team
            </a>
            <a
              href="/debt-consolidation"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left"
            >
              Debt Consolidation
            </a>
            <a
              href="https://independencehl.com/mykoal-deshazo/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md w-full text-center"
            >
              Get Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
