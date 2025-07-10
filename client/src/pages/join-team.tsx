import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Heart, Users, Award, BookOpen, DollarSign, Shield, Clock, Target } from "lucide-react";
import headshotPath from "@assets/IMG_0016_1751000995747.jpeg";
import ehoLogoPath from "@assets/Equal-Housing-Logo_1751007456918.png";

export default function JoinTeamPage() {
  const scrollToContact = () => {
    const element = document.getElementById("contact-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg text-blue-200 italic mb-4">
              "Go and make disciples of all nations" - Matthew 28:19
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join My Christ-Centered Team</h1>
            <p className="text-xl text-blue-100 mb-6">
              Build a fulfilling and rewarding mortgage career guided by faith
            </p>
            <div className="text-lg text-blue-200 italic mb-8">
              "Whatever you do, work at it with all your heart, as working for the Lord" - Colossians 3:23
            </div>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Start Your Journey
              </Button>
              <Link href="/">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900">
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
          
          {/* Requirements Section */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-12">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Faith Requirement</h2>
            </div>
            <div className="text-blue-600 font-medium italic mb-3">
              "But seek first his kingdom and his righteousness" - Matthew 6:33
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              <strong>You must be a follower of Jesus Christ.</strong> This is not just a career opportunity—it's a ministry calling. 
              We build our team on biblical principles of integrity, honesty, and service. If you have accepted Jesus as your 
              Lord and Savior and desire to serve others through mortgage lending, I want to help you build an exceptional career 
              that honors God.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column - Why Join */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Join Our Faith-Based Team?</h2>
              
              <div className="space-y-6">
                <Card className="border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <BookOpen className="h-8 w-8 text-blue-600 mr-4 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Training & Licensing Support</h3>
                        <p className="text-gray-700">I'll guide you through every step of getting licensed, from pre-licensing education to passing your NMLS exam. No experience required—just faith and dedication.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Users className="h-8 w-8 text-green-600 mr-4 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Pipeline Provided</h3>
                        <p className="text-gray-700">I'll provide you with qualified leads and customers from day one. You won't struggle to find business—I'll help you build your client base immediately.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Shield className="h-8 w-8 text-purple-600 mr-4 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Mentorship Every Step</h3>
                        <p className="text-gray-700">Personal one-on-one coaching, training, and support. I'm committed to your success and will walk alongside you as you build your career.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <DollarSign className="h-8 w-8 text-orange-600 mr-4 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellent Income Potential</h3>
                        <p className="text-gray-700">Top producers in our industry earn six-figure incomes. With faith, hard work, and proper mentorship, you can build substantial financial blessing for your family.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - About Me & Process */}
            <div>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <img
                      src={headshotPath}
                      alt="Mykoal DeShazo - Team Leader"
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Mykoal DeShazo</h3>
                    <p className="text-blue-600 font-semibold mb-2">Christ-Centered Team Leader</p>
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      NMLS #1912347
                    </Badge>
                  </div>

                  <div className="text-gray-700 leading-relaxed">
                    <div className="text-blue-600 font-medium italic mb-3">
                      "Iron sharpens iron, and one man sharpens another" - Proverbs 27:17
                    </div>
                    <p className="mb-4">
                      As a Christ-centered mortgage professional and UWM Breakthrough Award Winner, I'm passionate about 
                      helping fellow believers build successful careers in mortgage lending while serving God through 
                      excellent customer service.
                    </p>
                    <p>
                      I believe God has called me not just to succeed in this industry, but to raise up the next generation 
                      of faith-based mortgage professionals who will serve with integrity and biblical values.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Process Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Your Path to Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Faith & Application</p>
                        <p className="text-sm text-gray-600">Share your testimony and career goals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mr-4">
                        <span className="text-green-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Licensing Support</p>
                        <p className="text-sm text-gray-600">Complete education and pass NMLS exam</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-4">
                        <span className="text-purple-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Training & Mentorship</p>
                        <p className="text-sm text-gray-600">Learn systems, processes, and best practices</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center mr-4">
                        <span className="text-orange-600 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Launch Your Career</p>
                        <p className="text-sm text-gray-600">Start serving clients with provided leads</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What Our Team Members Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200">
                <CardContent className="p-6">
                  <div className="text-blue-600 font-medium italic mb-3">
                    "He has shown you, O mortal, what is good" - Micah 6:8
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "Mykoal didn't just teach me the mortgage business—he showed me how to serve clients with Christ-like love and integrity. This isn't just a job, it's a ministry where I can support families while honoring God."
                  </p>
                  <div className="font-semibold text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-600">Licensed Loan Officer, 2 years with team</div>
                </CardContent>
              </Card>
              
              <Card className="border-green-200">
                <CardContent className="p-6">
                  <div className="text-green-600 font-medium italic mb-3">
                    "Commit to the Lord whatever you do" - Proverbs 16:3
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "I came from retail with no mortgage experience. Mykoal walked me through licensing, provided customers from day one, and showed me how to build a six-figure income while serving God through excellent client service."
                  </p>
                  <div className="font-semibold text-gray-900">David L.</div>
                  <div className="text-sm text-gray-600">Senior Loan Officer, 3 years with team</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form Section */}
          <section id="contact-form" className="mt-16 bg-gray-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Begin Your Calling?</h2>
              <div className="text-blue-600 font-medium italic mb-4">
                "For I know the plans I have for you," declares the Lord - Jeremiah 29:11
              </div>
              <p className="text-lg text-gray-600">
                Share your heart and let's discuss how God might be calling you to this ministry
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Get Started Today</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="text-blue-600 mr-3 h-5 w-5" />
                    <div>
                      <div className="font-semibold text-gray-900">Call or Text</div>
                      <div className="text-blue-600 font-semibold">(623) 280-8351</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="text-blue-600 mr-3 h-5 w-5" />
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <div className="text-blue-600 font-semibold">mdeshazo@mykoal.com</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">What to Include in Your Message:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Your testimony of faith in Jesus Christ</li>
                      <li>• Current career background</li>
                      <li>• Why you feel called to mortgage lending</li>
                      <li>• Your income goals and timeline</li>
                      <li>• Any questions about the process</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>FAQ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Do I need mortgage experience?</p>
                      <p className="text-sm text-gray-700">No! I'll train you from the ground up. Your heart for serving others matters more than experience.</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">How long does licensing take?</p>
                      <p className="text-sm text-gray-700">Typically 4-6 weeks with focused study. I'll guide you through the entire process.</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">What about income during training?</p>
                      <p className="text-sm text-gray-700">We'll discuss transition plans and support options based on your specific situation.</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Is this remote or in-office?</p>
                      <p className="text-sm text-gray-700">Flexible options available. We can work together regardless of your location.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
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
              <p>Licensed by NMLS #1912347. Verify license status at <a href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/1912347" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NMLS Consumer Access</a></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}