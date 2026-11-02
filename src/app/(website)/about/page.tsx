import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles, HeartHandshake, CheckCircle } from "lucide-react";

export const metadata = {
  title: "About The Luxe Touch | Private Haute Atelier",
  description:
    "Learn about our bespoke in-home beauty rituals, strict hygiene charter, and dedicated aesthetic team.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-surface py-16">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        {/* Intro */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
            ABOUT THE ATELIER
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-primary tracking-tight mt-2">
            Elevating In-Home Beauty & Wellness
          </h1>
          <p className="text-base sm:text-lg text-espresso/80 mt-4 font-light leading-relaxed">
            The Luxe Touch was founded with a singular conviction: high-end beauty treatments should
            never demand hours in traffic or noisy waiting lounges. True indulgence begins when
            exceptional craft comes directly to you.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-20">
          <div className="md:col-span-6 relative aspect-[4/5] rounded overflow-hidden shadow-xl ring-1 ring-secondary/30">
            <Image
              src="/assets/branding/image.png"
              alt="The Luxe Touch Atelier Consultation"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:col-span-6 flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl text-primary tracking-tight">
              A Private Sanctuary in Your Own Home
            </h2>
            <p className="text-sm text-espresso/80 font-light leading-relaxed">
              Whether you are preparing for your bridal celebrations, hosting an intimate gathering,
              or taking an uninterrupted morning for restorative hair and skin care, our senior
              specialists arrive fully equipped to create a complete salon sanctuary in your space.
            </p>
            <p className="text-sm text-espresso/80 font-light leading-relaxed">
              We bring our own protective surface drapes, autoclaved stainless steel implements, and
              certified organic botanical elixirs. After your treatment, your space is left as
              pristine as we found it.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-secondary/20">
              <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Single-Patron Sterile Tools</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Vetted Artisans Only</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Discreet & Punctual</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Zero Clean-up for You</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hygiene & Discretion Charter */}
        <div className="bg-primary text-surface p-8 sm:p-12 rounded ring-1 ring-secondary/40 shadow-xl mb-20">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-secondary-fixed font-semibold">
              SAFETY & HYGIENE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-surface tracking-tight mt-2 mb-4">
              Our Uncompromised Hygiene Charter
            </h2>
            <p className="text-sm text-surface/85 font-light leading-relaxed mb-6">
              Your comfort and health are our foremost priority. Every visit strictly adheres to
              clinical-grade sanitisation standards:
            </p>

            <ul className="space-y-3 text-sm text-surface/90 font-light">
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-secondary-fixed flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Autoclaved Implements:</strong> Tweezers, cuticle pushers, and combs are
                  sanitised and unsealed only in front of the patron.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-secondary-fixed flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Disposable Consumables:</strong> Premium single-use towels, wax spatulas,
                  and pedicure liners ensure zero cross-contamination.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-secondary-fixed flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Complete Discretion:</strong> Our team signs strict confidentiality
                  agreements, respecting the intimacy of high-profile private residences and venues.
                </span>
              </li>
            </ul>

            <div className="pt-8 mt-8 border-t border-secondary/30 flex flex-wrap gap-4">
              <Link
                href="/book"
                className="px-6 py-3 bg-secondary text-espresso text-xs uppercase tracking-[0.16em] font-semibold rounded hover:bg-secondary-fixed transition-colors"
              >
                Book Your Ritual
              </Link>
              <Link
                href="/gallery"
                className="px-6 py-3 bg-transparent text-surface border border-secondary/50 text-xs uppercase tracking-[0.16em] font-semibold rounded hover:bg-secondary/10 transition-colors"
              >
                Explore Lookbook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

