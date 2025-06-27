import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import DSCRPurchasePage from "@/pages/dscr-purchase";
import DSCRRefinancePage from "@/pages/dscr-refinance";
import DSCRHELOCPage from "@/pages/dscr-heloc";
import StartupBusinessLoanPage from "@/pages/startup-business-loan";
import PersonalLoanPage from "@/pages/personal-loan";
import DSCRGuidePage from "@/pages/blog-dscr-guide";
import BusinessLoansGuidePage from "@/pages/blog-business-loans";
import PersonalLoansGuidePage from "@/pages/blog-personal-loans";
import DebtConsolidationPage from "@/pages/debt-consolidation";
import PreQualificationPage from "@/pages/pre-qualification";
import MarketUpdatesPage from "@/pages/market-updates";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import TermsOfServicePage from "@/pages/terms-of-service";
import ResourcesPage from "@/pages/resources";
import AboutPage from "@/pages/about";
import AdminPage from "@/pages/admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/dscr-purchase" component={DSCRPurchasePage} />
      <Route path="/dscr-refinance" component={DSCRRefinancePage} />
      <Route path="/dscr-heloc" component={DSCRHELOCPage} />
      <Route path="/startup-business-loan" component={StartupBusinessLoanPage} />
      <Route path="/personal-loan" component={PersonalLoanPage} />
      <Route path="/debt-consolidation" component={DebtConsolidationPage} />
      <Route path="/pre-qualification" component={PreQualificationPage} />
      <Route path="/market-updates" component={MarketUpdatesPage} />
      <Route path="/blog/dscr-guide" component={DSCRGuidePage} />
      <Route path="/blog/business-loans" component={BusinessLoansGuidePage} />
      <Route path="/blog/personal-loans" component={PersonalLoansGuidePage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/terms-of-service" component={TermsOfServicePage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
