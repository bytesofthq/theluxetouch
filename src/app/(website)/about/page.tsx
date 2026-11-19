import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles, HeartHandshake, Heart } from "lucide-react";

export const dynamic = "force-static";

export const metadata = {
  title: "About Us | The Luxè Touch",
  description:
    "Professional beauty services, delivered to your doorstep. Where Beauty Meets a Touch of Luxury.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-surface">
      {/* Intro + stylists */}
      <section className="w-full bg-surface-container-low py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="relative rounded overflow-hidden ring-1 ring-secondary/30 shadow-lg bg-[#F3E9DF]">
              <Image
                src="/assets/branding/salon-stylists.jpg"
                alt="The Luxè Touch salon stylists"
                width={1200}
                height={800}
                priority
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>

            <div className="flex flex-col gap-5 lg:pl-2">
              <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                ABOUT US
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight">
                Professional Beauty Services,{" "}
                <span className="italic font-light text-secondary">Delivered to Your Doorstep!</span>
              </h1>
              <p className="text-sm sm:text-base text-espresso/80 font-light leading-relaxed">
                Experience the perfect blend of beauty, comfort, and convenience with The Luxè Touch.
                Enjoy personalised, salon-style beauty services at home, delivered by a trained and
                experienced beauty professional. Because you deserve to feel beautiful, confident,
                and cared for – wherever you are.
              </p>
              <p className="text-sm font-medium text-primary">
                Beauty meets comfort, right at your doorstep!
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-secondary font-semibold">
                Turning Self-Care into Something Extraordinary
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

      {/* Long description + founder */}
      <section className="w-full bg-surface py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-6 md:px-8">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
            OUR STORY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight mt-2">
            Welcome to The Luxè Touch – Beauty, Comfort &amp; Care at Your Doorstep!
          </h2>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-espresso/80 font-light leading-relaxed">
            <p>
              At The Luxè Touch, we believe self-care should feel special. We offer a relaxing,
              personalised beauty experience at home — so you can look and feel your best without
              leaving your doorstep.
            </p>
            <p>
              Led by a trained professional, we are dedicated to helping clients look and feel their
              best — from everyday grooming to special occasions — with careful attention to every
              detail.
            </p>
            <p>
              Our goal is to make professional beauty care accessible without compromising on
              quality, making every experience effortless and memorable.
            </p>
            <p className="font-medium text-primary">
              Your beauty, your comfort, our touch – experience the luxury of salon-style care at
              home with The Luxè Touch.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-secondary/25">
            <p className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold">
              Founder
            </p>
            <p className="font-serif text-2xl text-primary mt-2">Anup Kumar Gupta</p>
            <p className="text-sm text-espresso/70 font-light mt-1">
              The Luxè Touch — Premium Beauty &amp; Salon Home Services
            </p>
          </div>
        </div>
      </section>

      {/* Hygiene section */}
      <section className="w-full bg-surface pb-16 md:pb-20">
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
