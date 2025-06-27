import ContactForm from "./contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, Clock, Facebook, Linkedin, Instagram } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600">Let's discuss your financing needs</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <ContactForm />

          {/* Contact options and info */}
          <div className="space-y-8">
            {/* Quick contact options */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="text-blue-600 h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Call or Text</div>
                    <div className="text-blue-600 font-semibold">(623) 280-8351</div>
                    <div className="text-sm text-gray-600">Mon-Fri 8am-7pm, Sat 9am-5pm</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="text-green-600 h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-green-600 font-semibold">mdeshazo@mykoal.com</div>
                    <div className="text-sm text-gray-600">Response within 1 hour</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Calendar className="text-blue-600 h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Quick Response</div>
                    <div className="text-blue-600 font-semibold">Fast quote turnaround</div>
                    <div className="text-sm text-gray-600">Same-day rate quotes</div>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    const element = document.getElementById("contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="mt-6 w-full accent-gradient text-white hover:opacity-90"
                >
                  Get Started Today
                </Button>
              </CardContent>
            </Card>

            {/* Office location */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Service Area</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-900">Mykoal DeShazo</div>
                  <div className="text-gray-600">
                    Serving Scottsdale, Arizona<br />
                    and nationwide investors
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <strong>Hours:</strong>
                  </div>
                  <div className="ml-6">
                    <div>Monday - Friday: 8:00 AM - 7:00 PM</div>
                    <div>Saturday: 9:00 AM - 5:00 PM</div>
                    <div>Sunday: By appointment</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Follow for market updates and financing tips</p>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/61577360476457" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                    aria-label="Follow Mykoal on Facebook"
                  >
                    <Facebook className="h-6 w-6 text-white" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/mykoal-deshazo-48134616a" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-700 w-12 h-12 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                    aria-label="Connect with Mykoal on LinkedIn"
                  >
                    <Linkedin className="h-6 w-6 text-white" />
                  </a>
                  <a 
                    href="https://www.instagram.com/realmykoal/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
                    aria-label="Follow Mykoal on Instagram"
                  >
                    <Instagram className="h-6 w-6 text-white" />
                  </a>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}
