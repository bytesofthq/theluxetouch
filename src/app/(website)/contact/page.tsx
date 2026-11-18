import { connectToDatabase } from "@/lib/mongodb";
import { SiteSettings } from "@/models/SiteSettings";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | The Luxe Touch",
  description: "Get in touch with The Luxe Touch for bookings and questions.",
};

export default async function ContactPage() {
  await connectToDatabase();
  const settings = (await SiteSettings.findOne({}).lean()) || {
    brandName: "The Luxe Touch",
    contact: {
      phone: "+91 98765 43210",
      whatsappNumber: "919876543210",
      email: "concierge@theluxetouch.com",
      addressNote: "We come to your home",
    },
    serviceAreas: ["Mumbai", "Bandra", "Juhu", "South Mumbai", "Powai", "Thane"],
    businessHours: {
      weekdays: "9:00 AM - 8:00 PM",
      weekends: "8:00 AM - 9:00 PM",
    },
  };

  return (
    <div className="w-full bg-surface py-16">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
            CONTACT US
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-primary tracking-tight mt-2">
            Get in Touch
          </h1>
          <p className="text-base text-espresso/70 mt-3 font-light leading-relaxed">
            Questions about bridal packages, hair treatments, or home bookings? We are available
            seven days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6 flex flex-col gap-8">
            <div className="flex gap-4 items-start p-6 bg-surface-container-low rounded ring-1 ring-secondary/20">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase text-secondary font-semibold tracking-wider">
                  Phone
                </p>
                <p className="font-serif text-2xl text-primary mt-1">{settings.contact.phone}</p>
                <p className="text-xs text-espresso/60 mt-1 font-light">Call us to book or ask</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 bg-surface-container-low rounded ring-1 ring-secondary/20">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-xs uppercase text-secondary font-semibold tracking-wider">
                  WhatsApp
                </p>
                <p className="font-serif text-2xl text-primary mt-1">Quick Chat</p>
                <a
                  href={`https://wa.me/${settings.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-xs font-semibold uppercase tracking-wider text-primary hover:text-secondary underline"
                >
                  Start Chat →
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 bg-surface-container-low rounded ring-1 ring-secondary/20">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase text-secondary font-semibold tracking-wider">
                  Email
                </p>
                <p className="font-serif text-2xl text-primary mt-1">{settings.contact.email}</p>
                <p className="text-xs text-espresso/60 mt-1 font-light">
                  For events, business, or press
                </p>
              </div>
            </div>

            <div className="p-6 bg-surface-container rounded ring-1 ring-secondary/20 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase text-secondary font-semibold tracking-wider">
                    Areas We Cover
                  </p>
                  <p className="text-sm text-espresso/80 mt-1 font-light">
                    {settings.serviceAreas.join(" • ")}
                  </p>
                  <p className="text-xs text-espresso/60 mt-1 italic">
                    {settings.contact.addressNote}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-secondary/20">
                <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase text-secondary font-semibold tracking-wider">
                    Working Hours
                  </p>
                  <p className="text-xs text-espresso/80 mt-1">
                    Weekdays: {settings.businessHours?.weekdays}
                  </p>
                  <p className="text-xs text-espresso/80">
                    Weekends: {settings.businessHours?.weekends}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 bg-surface-container-low p-8 rounded ring-1 ring-secondary/30 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold">
                SEND A MESSAGE
              </span>
              <h2 className="font-serif text-3xl text-primary tracking-tight mt-1 mb-4">
                Message Us
              </h2>
              <p className="text-xs text-espresso/70 mb-6 font-light leading-relaxed">
                Have a special request? Leave a note below, or message us on WhatsApp for a faster
                reply.
              </p>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
                    Your Phone or Email
                  </label>
                  <input
                    type="text"
                    placeholder="+91..."
                    className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you need..."
                    className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={`https://wa.me/${settings.contact.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-primary text-surface rounded text-xs uppercase tracking-wider font-semibold hover:bg-primary-dark transition-colors shadow-md"
              >
                Send via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
