import ContactForm from "./contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, Clock } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Started Today</h2>
          <p className="text-xl text-gray-600">Multiple ways to connect with our mortgage experts</p>
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
                    <div className="text-blue-600 font-semibold">(555) 123-4567</div>
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
                    <div className="font-semibold text-gray-900">Schedule Online</div>
                    <div className="text-blue-600 font-semibold">Book a time that works</div>
                    <div className="text-sm text-gray-600">Free 30-minute consultation</div>
                  </div>
                </div>

                <Button className="mt-6 w-full accent-gradient text-white hover:opacity-90">
                  Schedule Free Consultation
                </Button>
              </CardContent>
            </Card>

            {/* Office location */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Office Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-900">MortgagePro Financial</div>
                  <div className="text-gray-600">
                    123 Main Street, Suite 450<br />
                    San Francisco, CA 94102
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

            {/* Emergency contact */}
            <Card className="primary-gradient shadow-lg text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Need Help After Hours?</h3>
                <p className="mb-4">For urgent mortgage questions or time-sensitive situations.</p>
                <div className="font-semibold text-xl">(555) 123-4567</div>
                <div className="text-blue-200 text-sm">Emergency line available 24/7</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
