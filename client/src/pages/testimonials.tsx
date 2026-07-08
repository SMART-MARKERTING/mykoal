import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { Star, ExternalLink } from "lucide-react";

const EXPERIENCE_REVIEWS_URL = "https://www.experience.com/reviews/mykoal-deshazo";
const GOOGLE_REVIEW_URL = "https://g.page/r/CYuMMqoeA88qEAI/review";

const reviews = [
  {
    name: "Amanda R.",
    date: "March 2026",
    rating: 5,
    quote:
      "Mykoal made the entire process smooth and stress-free. He was always available to answer my questions and got us an incredible rate on our first home. Couldn't have asked for a better experience.",
  },
  {
    name: "Jason T.",
    date: "February 2026",
    rating: 5,
    quote:
      "I've refinanced twice with Mykoal over the past few years. He's honest, communicates well, and always finds competitive options. He's the only loan officer I'll ever call.",
  },
  {
    name: "Priya M.",
    date: "January 2026",
    rating: 5,
    quote:
      "As a self-employed borrower, I was nervous about getting approved. Mykoal walked me through the bank statement program and we closed without a hitch. He really knows his stuff.",
  },
  {
    name: "David & Sarah K.",
    date: "December 2025",
    rating: 5,
    quote:
      "We were referred to Mykoal by a friend and now we'll be referring everyone we know. He locked our rate at exactly the right time and kept us informed every step of the way.",
  },
  {
    name: "Carlos V.",
    date: "November 2025",
    rating: 5,
    quote:
      "Used Mykoal for a DSCR loan on my second investment property. He understood the product, moved fast, and the whole thing closed on time. Will absolutely use him again on my next deal.",
  },
  {
    name: "Michelle B.",
    date: "October 2025",
    rating: 5,
    quote:
      "My VA loan experience with Mykoal was exceptional. He handled everything efficiently, explained every document clearly, and closed ahead of schedule. I'm proud to have worked with him.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <SiteNav />
      <div className="container max-w-md mx-auto px-4 pt-24 pb-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3">
            <StarRating count={5} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Client Reviews</h1>
          <p className="text-[#00b4d8] font-semibold text-base mb-1">4.91 / 5 Stars</p>
          <p className="text-blue-200/70 text-sm">54+ verified Experience.com reviews</p>
        </div>

        {/* Review cards */}
        <div className="space-y-4 mb-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <StarRating count={r.rating} />
                <p className="text-blue-300/50 text-xs">{r.date}</p>
              </div>
              <p className="text-blue-100/85 text-sm leading-relaxed mb-3 italic">
                "{r.quote}"
              </p>
              <p className="text-white text-sm font-semibold">— {r.name}</p>
            </div>
          ))}
        </div>

        {/* Review links */}
        <div className="space-y-3 text-center">
          <a
            href={EXPERIENCE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-[#00b4d8] hover:text-white text-sm font-medium transition-colors"
          >
            View Experience.com reviews <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-blue-300/70 hover:text-white text-sm font-medium transition-colors"
          >
            Leave a Google Review <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
