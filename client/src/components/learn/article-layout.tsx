import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ListTree,
} from "lucide-react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import SeoHead from "@/components/seo-head";
import AuthorBox from "@/components/learn/author-box";
import ComplianceFooter from "@/components/learn/compliance-footer";
import VaDisclaimer from "@/components/learn/va-disclaimer";
import { ArticleSlugContext } from "@/components/learn/article-content";
import { Button } from "@/components/ui/button";
import {
  getArticleSchema,
  getBreadcrumbSchema,
  getFaqPageSchema,
  type FAQ,
} from "@/lib/schema";
import { getRelatedArticles, type CategoryId } from "@/lib/learn-data";
import { funnelUrl, COMPLIANCE_REVIEW_DATE, type FunnelKey } from "@/lib/site-config";
import { articleEvent } from "@/lib/analytics";

export interface TocItem {
  id: string;
  label: string;
}

export interface ArticleCta {
  heading: string;
  body: string;
  funnel: FunnelKey;
  label: string;
}

export interface ArticleLayoutProps {
  slug: string;
  category: { id: CategoryId; name: string };
  title: string;
  /** Meta description for SEO/social. */
  description: string;
  /** ISO dates for schema. */
  datePublished: string;
  dateModified: string;
  /** Human-readable last-updated date for display. */
  displayDate: string;
  /** First two sentences answering the title question directly. */
  shortAnswer: ReactNode;
  toc: TocItem[];
  faqs: FAQ[];
  /** Slugs of related articles to cross-link. */
  related: string[];
  cta: ArticleCta;
  /** Render the VA non-affiliation disclaimer (VA pages only). */
  vaDisclaimer?: boolean;
  children: ReactNode;
}

export default function ArticleLayout({
  slug,
  category,
  title,
  description,
  datePublished,
  dateModified,
  displayDate,
  shortAnswer,
  toc,
  faqs,
  related,
  cta,
  vaDisclaimer = false,
  children,
}: ArticleLayoutProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const path = `/learn/${slug}`;
  const relatedArticles = getRelatedArticles(related);

  const schemas = [
    getArticleSchema({ path, title, description, datePublished, dateModified }),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Learn", path: "/learn" },
      { name: category.name, path: `/learn#${category.id}` },
      { name: title, path },
    ]),
    getFaqPageSchema(faqs),
  ];

  const toggleFaq = (i: number) => {
    const next = openFaq === i ? null : i;
    setOpenFaq(next);
    if (next === i) {
      articleEvent(slug, "faq", "expand", { question: faqs[i].question });
    }
  };

  const ctaHref = funnelUrl(cta.funnel);

  return (
    <ArticleSlugContext.Provider value={slug}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <SeoHead title={title} description={description} path={path} schemas={schemas} />
        <SiteNav />
        <article className="container max-w-2xl mx-auto px-4 pt-24 pb-6">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-1 text-xs text-blue-300/60 mb-5"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/learn" className="hover:text-white transition-colors">
              Learn
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/learn#${category.id}`} className="hover:text-white transition-colors">
              {category.name}
            </Link>
          </nav>

          {/* H1 */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-5">
            {title}
          </h1>

          {/* Short answer block */}
          <div className="bg-[#0077a8]/25 border border-[#00b4d8]/30 rounded-xl p-5 mb-6">
            <p className="text-[#00b4d8] text-xs font-bold uppercase tracking-wider mb-2">
              Short answer
            </p>
            <div className="text-blue-50 text-sm leading-relaxed">{shortAnswer}</div>
          </div>

          {/* Author / reviewer block */}
          <div className="mb-6">
            <AuthorBox dateModified={displayDate} reviewDate={COMPLIANCE_REVIEW_DATE} />
          </div>

          {/* Table of contents */}
          {toc.length > 0 && (
            <nav className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
              <p className="text-white text-sm font-semibold flex items-center gap-2 mb-3">
                <ListTree className="h-4 w-4 text-[#00b4d8]" /> On this page
              </p>
              <ol className="space-y-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-blue-200/80 hover:text-white text-sm transition-colors inline-flex items-start gap-1.5"
                    >
                      <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-[#00b4d8] flex-shrink-0" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* VA disclaimer (VA pages only) */}
          {vaDisclaimer && (
            <div className="mb-8">
              <VaDisclaimer />
            </div>
          )}

          {/* Body */}
          <div className="mb-6">{children}</div>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-white text-xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/20 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-white text-sm font-medium">{faq.question}</span>
                    {openFaq === i ? (
                      <ChevronUp className="h-4 w-4 text-[#00b4d8] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-blue-300/60 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4">
                      <p className="text-blue-200/80 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <section className="mb-10">
              <h2 className="text-white text-xl font-bold mb-4">Related reading</h2>
              <div className="space-y-3">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/learn/${a.slug}`}
                    onClick={() => articleEvent(slug, "related", "click", { target: a.slug })}
                  >
                    <div className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl p-4 transition-all group cursor-pointer">
                      <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#00b4d8] transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-blue-200/70 text-xs leading-relaxed">{a.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA → smartr8.com funnel (UTM-tagged) */}
          <div className="bg-[#0077a8]/30 border border-[#00b4d8]/30 rounded-xl p-6 text-center">
            <h2 className="text-white font-bold text-lg mb-2">{cta.heading}</h2>
            <p className="text-blue-200/70 text-sm mb-4">{cta.body}</p>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                articleEvent(slug, "cta", "click", { funnel: cta.funnel, href: ctaHref })
              }
            >
              <Button className="w-full bg-[#00b4d8] hover:bg-[#0099bb] text-white font-semibold flex items-center justify-center gap-2">
                {cta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Compliance footer */}
          <ComplianceFooter />
        </article>
        <SiteFooter />
      </div>
    </ArticleSlugContext.Provider>
  );
}
