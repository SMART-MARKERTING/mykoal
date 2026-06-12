import { Link } from "wouter";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import SeoHead from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Calculator, Calendar } from "lucide-react";
import { useCalModal } from "@/hooks/use-cal";
import { learnCategories, getArticleMeta } from "@/lib/learn-data";
import {
  getPersonSchema,
  getOrganizationSchema,
  getBreadcrumbSchema,
} from "@/lib/schema";
import { track } from "@/lib/analytics";

const TITLE = "Learn: Mortgage Education Hub | MyKoal";
const DESCRIPTION =
  "Plain-English mortgage education from a licensed loan officer — HELOCs and home equity, VA loans, DSCR investor loans, refinancing, FHA, and conventional financing.";

const CALCULATOR_LINKS = [
  { label: "Debt Consolidation Calculator", href: "/debt-consolidation", external: false },
  { label: "Mortgage Payment Calculator", href: "/#calculator", external: false },
];

export default function LearnHub() {
  const openCal = useCalModal();

  const schemas = [
    getPersonSchema(),
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Learn", path: "/learn" },
    ]),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <SeoHead
        title={TITLE}
        description={DESCRIPTION}
        path="/learn"
        ogType="website"
        schemas={schemas}
      />
      <SiteNav />
      <div className="container max-w-2xl mx-auto px-4 pt-24 pb-6">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Mortgage Learning Hub</h1>
          <p className="text-blue-200/70 text-sm leading-relaxed max-w-xl mx-auto">
            Straight, borrower-first answers to the mortgage questions people actually
            ask — written and reviewed by a licensed loan officer. Start with a topic
            below.
          </p>
        </div>

        {/* Category sections */}
        <div className="space-y-8">
          {learnCategories.map((cat) => {
            const articles = cat.articleSlugs
              .map((slug) => getArticleMeta(slug))
              .filter((a) => Boolean(a));
            const isCalculators = cat.id === "calculators";

            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-20">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-white text-lg font-bold">{cat.name}</h2>
                  {cat.focus && (
                    <span className="inline-flex items-center gap-1 bg-[#00b4d8]/15 border border-[#00b4d8]/30 text-[#00b4d8] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      <Star className="h-2.5 w-2.5" /> Focus
                    </span>
                  )}
                </div>
                <p className="text-blue-200/60 text-sm mb-4">{cat.description}</p>

                {isCalculators ? (
                  <div className="space-y-3">
                    {CALCULATOR_LINKS.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => track("calculators_calculator_click", { target: c.href })}
                      >
                        <div className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl p-4 transition-all group cursor-pointer flex items-center gap-3">
                          <Calculator className="h-5 w-5 text-[#00b4d8] flex-shrink-0" />
                          <span className="text-white font-semibold text-sm group-hover:text-[#00b4d8] transition-colors">
                            {c.label}
                          </span>
                          <ChevronRight className="h-4 w-4 text-blue-300/50 ml-auto" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : articles.length > 0 ? (
                  <div className="space-y-3">
                    {articles.map((a) => (
                      <Link key={a!.slug} href={`/learn/${a!.slug}`}>
                        <div className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl p-5 transition-all group cursor-pointer">
                          <h3 className="text-white font-bold text-base leading-snug mb-1.5 group-hover:text-[#00b4d8] transition-colors">
                            {a!.title}
                          </h3>
                          <p className="text-blue-200/70 text-sm leading-relaxed mb-2">
                            {a!.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[#00b4d8] text-sm font-medium">
                            Read more <ChevronRight className="h-4 w-4" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/5 border border-dashed border-white/15 rounded-xl p-5 text-center">
                    <p className="text-blue-300/60 text-sm font-medium">
                      In-depth guides coming soon.
                    </p>
                    <p className="text-blue-300/40 text-xs mt-1">
                      Have a question on this topic now?{" "}
                      <button
                        onClick={openCal}
                        className="text-[#00b4d8] hover:text-white underline transition-colors"
                      >
                        Ask directly →
                      </button>
                    </p>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#0077a8]/30 border border-[#00b4d8]/30 rounded-xl p-6 text-center">
          <h2 className="text-white font-bold text-lg mb-2">
            Want answers on your specific situation?
          </h2>
          <p className="text-blue-200/70 text-sm mb-4">
            Talk it through with a licensed loan officer — no obligation, no pressure.
          </p>
          <Button
            onClick={openCal}
            className="bg-[#00b4d8] hover:bg-[#0099bb] text-white font-semibold px-6 flex items-center justify-center gap-2 mx-auto"
          >
            <Calendar className="h-4 w-4" />
            Book a Free Call
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
