import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles, HeartHandshake, Heart } from "lucide-react";

export const metadata = {
  title: "About Us | The Luxe Touch",
  description:
    "Meet our salon stylists. Salon-quality beauty experiences brought right to your doorstep.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-surface">
      {/* Meet Our Salon Stylists — column layout */}
      <section className="w-full bg-surface-container-low py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image column — full banner */}
            <div className="relative rounded overflow-hidden ring-1 ring-secondary/30 shadow-lg bg-[#F3E9DF]">
              <Image
                src="/assets/branding/salon-stylists.jpg"
                alt="The Luxe Touch salon stylists"
                width={1200}
                height={800}
                priority
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>

            {/* Text column */}
            <div className="flex flex-col gap-5 lg:pl-2">
              <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                ABOUT US
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight">
                Meet the team behind{" "}
                <span className="italic font-light text-secondary">The Luxe Touch</span>
              </h1>
              <p className="text-sm sm:text-base text-espresso/80 font-light leading-relaxed">
                Our stylists bring salon-quality care to your home — with skill, care, and a
                personal touch every visit.
              </p>

              <div>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose/25 text-espresso text-xs sm:text-sm font-medium tracking-wide ring-1 ring-rose/40">
                  Skilled. Passionate. Dedicated.
                  <Heart className="w-3.5 h-3.5 text-rose fill-rose" />
                </span>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/book"
                  className="px-6 py-3 bg-primary text-surface text-xs uppercase tracking-[0.16em] font-semibold rounded hover:bg-primary-dark transition-colors"
                >
                  Book Now
                </Link>
                <Link
                  href="/our-promise"
                  className="px-6 py-3 bg-transparent text-primary ring-1 ring-secondary/50 text-xs uppercase tracking-[0.16em] font-semibold rounded hover:bg-secondary/10 transition-colors"
                >
                  Our Promise
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hygiene section */}
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
