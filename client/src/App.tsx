import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route } from "wouter";
import Home from "@/pages/home";
import About from "@/pages/about";
import BlogIndex from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import FAQ from "@/pages/faq";
import Contact from "@/pages/contact";
import Testimonials from "@/pages/testimonials";
import TermsOfUse from "@/pages/terms-of-use";
import Privacy from "@/pages/privacy";
import LearnHub from "@/pages/learn/index";
import HelocVsCashOutRefinance from "@/pages/learn/heloc-vs-cash-out-refinance";
import DscrLoanRequirementsArizona from "@/pages/learn/dscr-loan-requirements-arizona";
import WhenDoesRefinancingMakeSense from "@/pages/learn/when-does-refinancing-make-sense";
import VaLoanMyths from "@/pages/learn/va-loan-myths";
import VaCashOutRefinance from "@/pages/learn/va-cash-out-refinance";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/learn" component={LearnHub} />
      <Route path="/learn/heloc-vs-cash-out-refinance" component={HelocVsCashOutRefinance} />
      <Route path="/learn/dscr-loan-requirements-arizona" component={DscrLoanRequirementsArizona} />
      <Route path="/learn/when-does-refinancing-make-sense" component={WhenDoesRefinancingMakeSense} />
      <Route path="/learn/va-loan-myths" component={VaLoanMyths} />
      <Route path="/learn/va-cash-out-refinance" component={VaCashOutRefinance} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/terms-of-use" component={TermsOfUse} />
      <Route path="/privacy" component={Privacy} />
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
