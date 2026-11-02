import Link from "next/link";
import Image from "next/image";
import { Sparkles, Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-primary-dark text-surface border-t border-secondary/20 pt-16 pb-12">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-secondary/20">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-1 ring-secondary/50">
                <Image
                  src="/assets/branding/logo.jpeg"
                  alt="The Luxe Touch Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl text-surface tracking-tight leading-none">
                  The Luxe Touch
                </span>
                <span className="text-[10px] text-secondary-fixed uppercase tracking-[0.25em] font-semibold mt-1">
                  Private Haute Atelier
                </span>
              </div>
            </div>
            <p className="text-sm text-surface/80 font-light leading-relaxed max-w-sm mt-2">
              Transforming private living chambers, suites, and estates into serene sanctuaries of bespoke beauty, skincare, and bridal rituals.
            </p>
            <div className="flex items-center gap-2 text-xs text-secondary-fixed mt-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Sanitised Instruments • Vetted Specialists • Absolute Discretion</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-secondary-fixed font-semibold mb-2">
              Navigation
            </span>
            <Link href="/" className="text-sm text-surface/80 hover:text-secondary-fixed transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-sm text-surface/80 hover:text-secondary-fixed transition-colors">
              Services & Rituals
            </Link>
            <Link href="/gallery" className="text-sm text-surface/80 hover:text-secondary-fixed transition-colors">
              Artisanal Gallery
            </Link>
            <Link href="/about" className="text-sm text-surface/80 hover:text-secondary-fixed transition-colors">
              About The Atelier
            </Link>
            <Link href="/book" className="text-sm text-secondary-fixed font-medium hover:underline">
              Book Appointment
            </Link>
          </div>

          {/* Column 3: Concierge Details */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-secondary-fixed font-semibold mb-2">
              Concierge Contact
            </span>
            <div className="flex items-center gap-3 text-sm text-surface/80">
              <Phone className="w-4 h-4 text-secondary" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-surface/80">
              <MessageCircle className="w-4 h-4 text-secondary" />
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="hover:text-secondary-fixed transition-colors"
              >
                WhatsApp Click-to-Chat
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-surface/80">
              <Mail className="w-4 h-4 text-secondary" />
              <span>concierge@theluxetouch.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-surface/80">
              <MapPin className="w-4 h-4 text-secondary" />
              <span>Mumbai & Greater Suburbs (Doorstep Delivery)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-surface/80">
              <Clock className="w-4 h-4 text-secondary" />
              <span>Mon - Sun: 9:00 AM – 8:00 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-surface/60 gap-4">
          <p>© {new Date().getFullYear()} The Luxe Touch. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-surface transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-surface transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin/login" className="hover:text-secondary-fixed transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

