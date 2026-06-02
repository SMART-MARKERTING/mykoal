import { useState } from "react";
import { Link } from "wouter";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, Calendar } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useCalModal } from "@/hooks/use-cal";
import { useToast } from "@/hooks/use-toast";

const contactOptions = [
  {
    icon: <Phone className="h-6 w-6" />,
    label: "Phone",
    value: "(480) 206-9290",
    href: "tel:+14802069290",
    color: "bg-[#0077a8] hover:bg-[#005f85]",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    label: "Email",
    value: "mdeshazo@mykoal.com",
    href: "mailto:mdeshazo@mykoal.com",
    color: "bg-blue-700 hover:bg-blue-800",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    label: "Office",
    value: "16767 N Perimeter Dr, Ste 150, Scottsdale AZ 85260",
    href: "https://maps.google.com/?q=16767+N+Perimeter+Dr+Ste+150+Scottsdale+AZ+85260",
    color: "bg-slate-700 hover:bg-slate-600",
  },
];

export default function Contact() {
  const openCal = useCalModal();
  const { toast } = useToast();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    loanType: "General Inquiry",
    timeline: "Flexible",
    message: "",
  });
  const [smsOptIn, setSmsOptIn] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: typeof form & { smsOptIn: string }) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Message sent!", description: "Mykoal will be in touch shortly." });
      setForm({ firstName: "", lastName: "", email: "", phone: "", loanType: "General Inquiry", timeline: "Flexible", message: "" });
      setSmsOptIn(false);
    },
    onError: (err: Error) => {
      toast({
        title: "Something went wrong",
        description: err.message || "Please try calling or emailing directly.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...form, smsOptIn: smsOptIn ? "Yes" : "No" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <SiteNav />
      <div className="container max-w-md mx-auto px-4 pt-24 pb-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Get In Touch</h1>
          <p className="text-blue-200/70 text-sm">Direct access to Mykoal — no call centers, no runaround.</p>
        </div>

        {/* Contact Option Cards */}
        <div className="space-y-3 mb-10">
          {contactOptions.map((opt, i) => (
            <a key={i} href={opt.href} target={opt.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
              <div className={`${opt.color} text-white rounded-xl p-4 flex items-center gap-4 transition-all duration-200 hover:scale-[1.02] shadow-md`}>
                <div className="flex-shrink-0">{opt.icon}</div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/70 mb-0.5">{opt.label}</p>
                  <p className="text-sm font-medium">{opt.value}</p>
                </div>
              </div>
            </a>
          ))}

          {/* Book a Call card */}
          <button onClick={openCal} className="block w-full text-left">
            <div className="bg-[#00b4d8] hover:bg-[#0099bb] text-white rounded-xl p-4 flex items-center gap-4 transition-all duration-200 hover:scale-[1.02] shadow-md">
              <Calendar className="h-6 w-6 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/70 mb-0.5">Schedule</p>
                <p className="text-sm font-medium">Book a Free Consultation</p>
              </div>
            </div>
          </button>
        </div>

        {/* Contact Form */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 mb-8">
          <h2 className="text-white font-bold text-lg mb-5">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-300/50"
              />
              <Input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-300/50"
              />
            </div>
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-300/50"
            />
            <Input
              name="phone"
              type="tel"
              placeholder="Phone Number (optional — needed only for text updates)"
              value={form.phone}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-300/50"
            />
            <select
              name="loanType"
              value={form.loanType}
              onChange={handleChange}
              className="w-full rounded-md border border-white/20 bg-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
            >
              <option value="General Inquiry" className="bg-slate-800">General Inquiry</option>
              <option value="Purchase" className="bg-slate-800">Purchase</option>
              <option value="Refinance" className="bg-slate-800">Refinance</option>
              <option value="HELOC" className="bg-slate-800">HELOC</option>
              <option value="Investor/DSCR" className="bg-slate-800">Investor / DSCR</option>
              <option value="VA Loan" className="bg-slate-800">VA Loan</option>
            </select>
            <textarea
              name="message"
              placeholder="How can Mykoal help you?"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-white/20 bg-white/10 text-white text-sm px-3 py-2 placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-[#00b4d8] resize-none"
            />
            {/* SMS opt-in — optional, separate from policy agreement (per 10DLC guidance) */}
            <label className="flex items-start gap-3 bg-white/5 border border-white/15 rounded-lg p-3 cursor-pointer select-none">
              <input
                type="checkbox"
                name="smsOptIn"
                checked={smsOptIn}
                onChange={(e) => setSmsOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-white/30 bg-white/10 text-orange-600 focus:ring-2 focus:ring-orange-500 cursor-pointer"
              />
              <div className="text-blue-300/80 text-xs leading-relaxed">
                <span className="block text-white text-sm font-semibold mb-1">Text me</span>
                By providing my phone number and checking this box, I agree to receive recurring SMS messages about my mortgage inquiry, application status, appointment reminders, and marketing offers from DeShazo Wealth LLC d/b/a Mykoal DeShazo. (Mortgage services are provided through Adaxa Home LLC, NMLS #2380533.) You are opting into marketing texts. Consent is not a condition of any purchase or service. Message frequency may vary. Standard message and data rates may apply. Reply STOP to opt out. Reply HELP for help. We will not share mobile information with third parties for promotional or marketing purposes.
              </div>
            </label>

            {/* Policy agreement — kept separate from SMS consent */}
            <p className="text-blue-300/60 text-xs leading-relaxed">
              By submitting this form, you agree to our{" "}
              <Link href="/privacy" className="underline hover:text-blue-200">Privacy Policy</Link>
              {" "}and{" "}
              <Link href="/terms-of-use" className="underline hover:text-blue-200">Terms of Use</Link>
              .
            </p>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        {/* Google Maps Embed */}
        <div className="rounded-xl overflow-hidden border border-white/20 mb-6">
          <iframe
            title="Adaxa Home Office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.0!2d-111.924!3d33.636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s16767+N+Perimeter+Dr+Ste+150+Scottsdale+AZ+85260!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="220"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
