import { Link } from "wouter";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import SeoHead from "@/components/seo-head";
import { blogPosts } from "@/lib/blog-data";
import { getBreadcrumbSchema } from "@/lib/schema";
import { ChevronRight } from "lucide-react";

export default function BlogIndex() {
  const description =
    "Mortgage insights from Mykoal DeShazo covering home equity, HELOCs, refinance options, VA loans, and investor financing.";
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
            Straight talk on home loans from Mykoal DeShazo, NMLS #1912347
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
      </div>
      <SiteFooter />
    </div>
  );
}
