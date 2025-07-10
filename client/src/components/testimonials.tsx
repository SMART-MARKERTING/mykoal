import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Failed to load testimonials</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">God's Blessings Through Our Service</h2>
          <p className="text-lg text-gray-600">Real results from satisfied clients who experienced Christ-centered lending</p>
          <div className="text-lg text-blue-600 mt-3 font-medium italic">
            "Let your light shine before others, that they may see your good deeds" - Matthew 5:16
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-current" />
              ))}
            </div>
            <span className="text-xl font-bold text-gray-900">4.91</span>
            <span className="text-gray-600">(54 reviews)</span>
            <a 
              href="https://www.experience.com/reviews/mykoal-deshazo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium underline"
            >
              View all reviews
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials?.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  {testimonial.imageUrl && (
                    <img 
                      src={testimonial.imageUrl} 
                      alt={`${testimonial.name} testimonial`} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )) || []}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600">54</div>
              <div className="text-gray-600">Verified Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">4.91/5</div>
              <div className="text-gray-600">Experience.com Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">5+ Years</div>
              <div className="text-gray-600">Industry Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">NMLS</div>
              <div className="text-gray-600">#1912347</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
