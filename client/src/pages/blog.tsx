import { Link } from "wouter";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import SeoHead from "@/components/seo-head";
import { blogPosts } from "@/lib/blog-data";
import { seoKeywordClusters } from "@/lib/seo-keywords";
import { getBreadcrumbSchema } from "@/lib/schema";
import { ChevronRight } from "lucide-react";

export default function BlogIndex() {
  const description =
    "Mortgage insights from Mykoal DeShazo covering HELOCs, VA loan calculators, DSCR investor loans, non-QM and bank statement mortgages, private money, bridge loans, and refinance planning.";
  const schemas = [
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <SeoHead
        title="Mortgage Insights | MyKoal"
        description={description}
        path="/blog"
        ogType="website"
        schemas={schemas}
      />
      <SiteNav />
      <div className="container max-w-md mx-auto px-4 pt-24 pb-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Mortgage Insights</h1>
          <p className="text-blue-200/70 text-sm">
            Straight talk on home loans, HELOCs, DSCR, non-QM, VA, and investor financing from Mykoal DeShazo, NMLS #1912347
          </p>
        </div>

        <div className="space-y-4">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl p-5 transition-all duration-200 cursor-pointer group">
                <p className="text-[#00b4d8] text-xs font-medium mb-2 uppercase tracking-wider">
                  {post.date}
                </p>
                <h2 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-[#00b4d8] transition-colors">
                  {post.title}
                </h2>
                <p className="text-blue-200/70 text-sm leading-relaxed mb-3">{post.excerpt}</p>
                <div className="flex items-center gap-1 text-[#00b4d8] text-sm font-medium">
                  Read more <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-white text-xl font-bold text-center mb-2">Popular Mortgage Topics</h2>
          <p className="text-blue-200/60 text-sm text-center mb-5">
            Browse high-interest mortgage questions organized into plain-English guides.
          </p>
          <div className="space-y-3">
            {seoKeywordClusters.map((cluster) => {
              const content = (
                <div className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl p-4 transition-all group">
                  <h3 className="text-white font-bold text-sm mb-1 group-hover:text-[#00b4d8] transition-colors">
                    {cluster.title}
                  </h3>
                  <p className="text-blue-200/70 text-xs leading-relaxed mb-3">
                    {cluster.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cluster.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[10px] leading-none text-blue-100/70"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              );

              if (cluster.path) {
                return (
                  <Link key={cluster.id} href={cluster.path}>
                    {content}
                  </Link>
                );
              }

              return <div key={cluster.id}>{content}</div>;
            })}
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
