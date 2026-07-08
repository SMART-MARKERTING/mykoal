import { Link, useParams } from "wouter";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { getPostBySlug } from "@/lib/blog-data";
import SeoHead from "@/components/seo-head";
import { getArticleSchema, getBreadcrumbSchema, getFaqPageSchema } from "@/lib/schema";
import { Calendar, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import headshotImage from "@assets/IMG_0016_1751000995747.jpeg";
import { useCalModal } from "@/hooks/use-cal";
import { useState } from "react";

function isoDateFromDisplayDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return parsed.toISOString().slice(0, 10);
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug ?? "");
  const openCal = useCalModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <SiteNav />
        <div className="container max-w-md mx-auto px-4 pt-24 text-center">
          <h1 className="text-white text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/blog">
            <Button className="bg-[#00b4d8] hover:bg-[#0099bb] text-white">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const path = `/blog/${post.slug}`;
  const datePublished = post.datePublished ?? isoDateFromDisplayDate(post.date);
  const dateModified = post.dateModified ?? datePublished;
  const schemas = [
    getArticleSchema({
      path,
      title: post.title,
      description: post.excerpt,
      datePublished,
      dateModified,
    }),
    getFaqPageSchema(post.faqs),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path },
    ]),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <SeoHead
        title={`${post.title} | MyKoal`}
        description={post.excerpt}
        path={path}
        schemas={schemas}
      />
      <SiteNav />
      <div className="container max-w-md mx-auto px-4 pt-24 pb-6">

        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-1 text-blue-300/70 hover:text-white text-sm mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to Blog
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-bold text-white leading-snug mb-4">{post.title}</h1>

        {/* Byline */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
          <img
            src={headshotImage}
            alt="Mykoal DeShazo"
            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
          />
          <div>
            <p className="text-white text-sm font-semibold">Mykoal DeShazo, NMLS #1912347</p>
            <p className="text-blue-300/60 text-xs flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {post.date}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 mb-10">
          {post.content.map((para, i) => (
            <p key={i} className="text-blue-100/80 text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-white text-lg font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {post.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/20 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
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

        {/* CTA Card */}
        <div className="bg-[#0077a8]/30 border border-[#00b4d8]/30 rounded-xl p-6 text-center">
          <h3 className="text-white font-bold text-lg mb-2">Have questions about your situation?</h3>
          <p className="text-blue-200/70 text-sm mb-4">
            Talk it through live or jump straight into an application.
          </p>
          <Button
            onClick={openCal}
            className="w-full bg-[#00b4d8] hover:bg-[#0099bb] text-white font-semibold mb-3"
          >
            Schedule a Call
          </Button>
          <div className="flex gap-x-4 justify-center text-xs">
            <a
              href="https://smartr8.com/heloc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300/70 hover:text-white underline transition-colors"
            >
              Apply for HELOC -&gt;
            </a>
            <a
              href="https://smartr8.com/apply/cash-out"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300/70 hover:text-white underline transition-colors"
            >
              Cash-Out Refi -&gt;
            </a>
            <a
              href="https://smartr8.com/apply/rate-reduction"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300/70 hover:text-white underline transition-colors"
            >
              Rate Reduction -&gt;
            </a>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
