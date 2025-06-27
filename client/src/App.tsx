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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dscr-purchase" component={DSCRPurchasePage} />
      <Route path="/dscr-refinance" component={DSCRRefinancePage} />
      <Route path="/dscr-heloc" component={DSCRHELOCPage} />
      <Route path="/startup-business-loan" component={StartupBusinessLoanPage} />
      <Route path="/personal-loan" component={PersonalLoanPage} />
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
