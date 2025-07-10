import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Award, Users, Heart } from "lucide-react";
import headshotPath from "@assets/IMG_0016_1751000995747.jpeg";
import ehoLogoPath from "@assets/Equal-Housing-Logo_1751007456918.png";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Mykoal DeShazo</h1>
              <p className="text-xl text-blue-100 mb-2">Christ-Centered Mortgage Professional</p>
              <p className="text-lg text-blue-200 italic">"Trust in the Lord with all your heart" - Proverbs 3:5</p>
              <Link href="/">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Photo and Contact */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <img
                      src={headshotPath}
                      alt="Mykoal DeShazo - Professional Headshot"
                      className="w-48 h-48 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Mykoal DeShazo</h3>
                    <p className="text-blue-600 font-semibold mb-2">Christ-Centered Mortgage Professional</p>
                    <p className="text-gray-600 text-sm italic mb-2">"Serving God by serving you"</p>
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      NMLS #1912347
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-3 text-blue-600" />
                      <span>(623) 280-8351</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-3 text-blue-600" />
                      <span>mdeshazo@mykoal.com</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                      <span>Scottsdale, Arizona</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <Link href="/#contact">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-4">
                        Get Started Today
                      </Button>
                    </Link>
                    
                    {/* Quick Links */}
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h4>
                      <div className="space-y-2">
                        <Link href="/#calculator" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                          Mortgage Calculator
                        </Link>
                        <Link href="/#loans" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                          Lending Solutions
                        </Link>
                        <Link href="/resources" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                          Resources
                        </Link>
                        <Link href="/pre-qualification" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                          Pre-Qualify
                        </Link>
                        <Link href="/market-updates" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                          Market Updates
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Biography */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <div className="bg-blue-50 p-6 rounded-lg mb-8 border-l-4 border-blue-600">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Called to Serve Through Faith</h2>
                  <div className="text-blue-600 font-medium italic mb-4">
                    "In all your ways acknowledge Him, and He will make your paths straight" - Proverbs 3:6
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Mykoal DeShazo is a Christ-centered mortgage professional with over half a decade of experience serving clients with integrity, honesty, and biblical values. Guided by his faith in Jesus Christ, he brings transparency and ethical excellence to every transaction. Mykoal believes that his calling is to serve others through mortgage lending, helping families and investors achieve their financial goals while honoring God in every step of the process. He specializes in investment property financing, DSCR loans, and alternative lending solutions, always putting his clients' best interests first as an expression of Christian love and service.
                  </p>
                </div>

                {/* Expertise Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">Excellence in Service</h3>
                      <p className="text-sm text-gray-600">Serving with excellence as unto the Lord, recognized for exceptional results</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">Faith-Based Leadership</h3>
                      <p className="text-sm text-gray-600">Leading by example through Christian principles in business</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">Kingdom Service</h3>
                      <p className="text-sm text-gray-600">Active in church and Christian community outreach ministries</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Faith-Based Career Achievement */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Walking in Faith and Excellence</h3>
                  <div className="text-blue-600 font-medium italic mb-3">
                    "Whatever you do, work at it with all your heart, as working for the Lord" - Colossians 3:23
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Throughout his career, Mykoal has consistently delivered results that exceed clients' expectations by applying biblical principles of integrity, honesty, and excellence in all his work. His faith-driven approach to business has earned him recognition as a top producer and UWM Breakthrough Award Winner. He believes that every successful transaction is a testimony to God's faithfulness and an opportunity to serve others with Christian love and transparency.
                  </p>
                </div>

                {/* Christian Values & Ministry */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Christian Values & Ministry</h3>
                  <div className="text-blue-600 font-medium italic mb-3">
                    "For we are God's handiwork, created in Christ Jesus to do good works" - Ephesians 2:10
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Mykoal's life is centered on his relationship with Jesus Christ. He is actively involved in his local church and Christian community, participating in outreach ministries and volunteer work that reflects God's love. His faith guides every aspect of his business practice, ensuring that clients receive honest, transparent service built on biblical principles. Outside of work, he enjoys fellowship with other believers, studying God's Word, and spending time with family while maintaining the balance that God calls us to in all areas of life.
                  </p>
                </div>

                {/* Christ-Centered Mission Statement */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">My God-Given Mission</h3>
                  <div className="text-blue-600 font-medium italic mb-3">
                    "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus" - Colossians 3:17
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Mykoal believes he has been called by God to serve others through mortgage lending with Christ-like love, integrity, and excellence. His passion for exceptional customer service flows from his desire to honor God in all his business dealings. Every client receives personalized attention, honest guidance, and comprehensive solutions tailored to their unique financial situation. His commitment goes beyond just closing loans—it's about building relationships founded on trust, transparency, and biblical values while helping families and investors achieve their God-given dreams and financial goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Christ-Centered Service?</h2>
          <div className="text-lg text-blue-200 italic mb-4">
            "The plans of the diligent lead to profit" - Proverbs 21:5
          </div>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your mortgage needs with integrity, honesty, and biblical principles guiding every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                Get Your Quote Today
              </Button>
            </Link>
            <Link href="/pre-qualification">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Pre-Qualification
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Equal Housing Opportunity */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <img 
              src={ehoLogoPath} 
              alt="Equal Housing Opportunity" 
              className="h-12 w-12"
            />
            <div className="text-sm text-gray-600">
              <p className="font-semibold mb-1">Equal Housing Opportunity</p>
              <p>All loans subject to credit approval. Licensed by NMLS #1912347.</p>
              <p>Verify license status at <a href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/1912347" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NMLS Consumer Access</a></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}