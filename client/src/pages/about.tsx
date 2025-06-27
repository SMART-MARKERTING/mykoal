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
              <p className="text-xl text-blue-100 mb-6">Your Trusted Mortgage Professional</p>
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
                    <p className="text-blue-600 font-semibold mb-2">Licensed Mortgage Loan Officer</p>
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
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Get Started Today
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Biography */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Hello, welcome to my page.</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Mykoal DeShazo is a highly accomplished mortgage loan officer with over half a decade of experience in the financial industry. He has built a strong reputation for providing personalized and comprehensive solutions to his clients' mortgage needs. Mykoal is well-versed in a wide range of mortgage products, including conventional, FHA, VA, and jumbo loans. His expertise allows him to match clients with the loan products that best suit their unique situations.
                  </p>
                </div>

                {/* Expertise Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">Top Producer</h3>
                      <p className="text-sm text-gray-600">Recognized for exceptional results and client satisfaction</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">Industry Speaker</h3>
                      <p className="text-sm text-gray-600">Invited to speak at industry events and conferences</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">Community Focused</h3>
                      <p className="text-sm text-gray-600">Active volunteer for local charities and non-profits</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Career Achievement */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Career Excellence</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Throughout his career, Mykoal has consistently delivered results that exceed clients' expectations, earning recognition as a top producer. He has received numerous accolades and has been invited to speak at industry events and conferences, establishing himself as a leader in the mortgage industry.
                  </p>
                </div>

                {/* Personal Values */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Values & Interests</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Committed to giving back, Mykoal actively volunteers for local charities and non-profit organizations. Outside of work, he values maintaining a healthy work-life balance, enjoys traveling, engaging in outdoor activities, and spending quality time with his family.
                  </p>
                </div>

                {/* Mission Statement */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">My Commitment to You</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Mykoal's passion for exceptional customer service, dedication, and community involvement have earned him the trust and respect of those he serves. Every client receives personalized attention and comprehensive solutions tailored to their unique financial situation.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your mortgage needs and find the perfect financing solution for you.
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