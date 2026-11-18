import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "About Us | The Luxe Touch",
  description:
    "Meet our salon stylists. We bring salon-quality beauty services right to your doorstep.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-surface">
      {/* Client reference banner — exact design */}
      <section className="w-full bg-[#F3E9DF]">
        <Image
          src="/assets/branding/salon-stylists.jpg"
          alt="Meet Our Salon Stylists — The Luxe Touch"
          width={1600}
          height={900}
          priority
          className="w-full h-auto"
        />
      </section>

      {/* Hygiene section — simplified wording */}
      <section className="w-full bg-surface py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          <div className="bg-primary text-surface p-8 sm:p-12 rounded ring-1 ring-secondary/40 shadow-xl">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-secondary-fixed font-semibold">
                SAFETY & HYGIENE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-surface tracking-tight mt-2 mb-4">
                Our Cleanliness Promise
              </h2>
              <p className="text-sm text-surface/85 font-light leading-relaxed mb-6">
                Your comfort and health come first. Every visit follows strict cleaning standards:
              </p>

              <ul className="space-y-3 text-sm text-surface/90 font-light">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-secondary-fixed flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Clean Tools:</strong> Tweezers, cuticle pushers, and combs are cleaned
                    and opened only in front of you.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-secondary-fixed flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Single-Use Items:</strong> Fresh towels, wax sticks, and pedicure liners
                    are used once and never shared.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HeartHandshake className="w-5 h-5 text-secondary-fixed flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Your Privacy:</strong> Our team keeps your home and personal details
                    private at all times.
                  </span>
                </li>
              </ul>

              <div className="pt-8 mt-8 border-t border-secondary/30 flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="px-6 py-3 bg-secondary text-espresso text-xs uppercase tracking-[0.16em] font-semibold rounded hover:bg-secondary-fixed transition-colors"
                >
                  Book Now
                </Link>
                <Link
                  href="/our-promise"
                  className="px-6 py-3 bg-transparent text-surface border border-secondary/50 text-xs uppercase tracking-[0.16em] font-semibold rounded hover:bg-secondary/10 transition-colors"
                >
                  Our Promise
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
