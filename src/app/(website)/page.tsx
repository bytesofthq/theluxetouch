import Link from "next/link";
import Image from "next/image";
import { connectToDatabase } from "@/lib/mongodb";
import { ServiceCategory } from "@/models/ServiceCategory";
import { Service } from "@/models/Service";
import { GalleryImage } from "@/models/GalleryImage";
import { Testimonial } from "@/models/Testimonial";
import { PageContent } from "@/models/PageContent";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Clock,
  Lock,
} from "lucide-react";
import { getServicePriceDisplay } from "@/lib/utils";

export const revalidate = 60; // ISR cache for 60 seconds

export default async function HomePage() {
  await connectToDatabase();

  const [heroContent, categories, featuredServices, galleryImages, testimonials] =
    await Promise.all([
      PageContent.findOne({ page: "home", section: "hero" }).lean(),
      ServiceCategory.find({ isActive: true }).sort({ displayOrder: 1 }).lean(),
      Service.find({ isFeatured: true, isActive: true })
        .sort({ displayOrder: 1 })
        .populate("categoryId")
        .lean(),
      GalleryImage.find({ isPublished: true }).sort({ displayOrder: 1 }).limit(6).lean(),
      Testimonial.find({ isPublished: true }).sort({ displayOrder: 1 }).limit(3).lean(),
    ]);

  const hero = heroContent?.content || {
    eyebrow: "YOUR PERSONAL BEAUTY RITUAL",
    title: "Beauty, in the comfort of home.",
    description:
      "A considered touch. A little time for yourself. Salon-inspired beauty services, brought to your doorstep with care.",
    primaryCtaText: "Book Your Appointment",
    primaryCtaLink: "/book",
    secondaryCtaText: "Explore our services",
    secondaryCtaLink: "/services",
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 01: FULL-BLEED HERO */}
      <section className="relative w-full min-h-[calc(100svh-7.25rem)] flex items-end lg:items-center overflow-hidden bg-primary text-surface">
        <Image
          src="/assets/branding/image1.png"
          alt="The Luxe Touch — beauty at home"
          fill
          priority
          className="object-cover object-[78%_center] lg:object-[70%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/15 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-primary/20 lg:from-primary/40" />

        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-8 py-16 lg:py-24">
          <div className="max-w-xl flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.25em] text-secondary-fixed font-semibold">
              {hero.eyebrow || "YOUR PERSONAL BEAUTY RITUAL"}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-surface tracking-tight leading-[1.08]">
              Beauty, in the{" "}
              <span className="italic font-light text-secondary-fixed">comfort of home.</span>
            </h1>

            <p className="text-base sm:text-lg text-surface/90 max-w-md font-light leading-relaxed">
              {hero.description ||
                "A considered touch. A little time for yourself. Salon-inspired beauty services, brought to your doorstep with care."}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-1">
              <Link
                href={hero.primaryCtaLink || "/book"}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-surface text-primary rounded text-xs uppercase tracking-[0.16em] font-semibold hover:bg-secondary-fixed transition-colors shadow-lg"
              >
                {hero.primaryCtaText || "Book Your Appointment"}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href={hero.secondaryCtaLink || "/services"}
                className="inline-flex items-center gap-1.5 text-sm text-surface/95 border-b border-surface/50 pb-0.5 hover:border-secondary-fixed hover:text-secondary-fixed transition-colors"
              >
                {hero.secondaryCtaText || "Explore our services"}
                <ArrowDown className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex items-center gap-3 pt-8">
              <span className="w-10 h-[1px] bg-secondary" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-surface/80 font-medium">
                Personalised care · Beautifully convenient
              </span>
            </div>
          </div>
        </div>

        <p
          aria-hidden
          className="hidden xl:block absolute right-5 bottom-24 z-10 text-[10px] uppercase tracking-[0.35em] text-surface/55 whitespace-nowrap origin-bottom-right -rotate-90"
        >
          Where Beauty Meets a Touch of Luxury.
        </p>
      </section>

      {/* SECTION 02: BRAND INTRODUCTION (Warm Ivory) */}
      <section className="w-full bg-surface py-20">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
            <div className="flex items-center justify-center gap-3">
              <span className="w-6 h-[1px] bg-secondary" />
              <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                A MORE PERSONAL KIND OF CARE
              </span>
              <span className="w-6 h-[1px] bg-secondary" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight">
              Your time. Your space.{" "}
              <span className="italic font-light text-secondary">Your glow.</span>
            </h2>

            <p className="text-base sm:text-lg text-espresso/80 leading-relaxed font-light">
              Consider this your invitation to slow down. From little beauty refreshes to
              head-to-toe rituals, enjoy thoughtful service without the trip to a salon.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 pt-4 text-espresso">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span className="text-xs tracking-wider uppercase font-semibold text-secondary">
                  Quality Products
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span className="text-xs tracking-wider uppercase font-semibold text-secondary">
                  Trusted Stylists
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-secondary" />
                <span className="text-xs tracking-wider uppercase font-semibold text-secondary">
                  Full Privacy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: CATEGORIES (no images) */}
      <section className="w-full bg-surface py-20 md:py-24" id="services">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                BROWSE BY CATEGORY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight mt-3 leading-[1.15]">
                Our categories
              </h2>
              <p className="text-sm sm:text-base text-espresso/70 font-light leading-relaxed mt-4 max-w-sm">
                Pick a category to open the full menu — skincare, hair, body, makeup, and waxing.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 mt-8 text-xs uppercase tracking-[0.16em] font-semibold text-primary hover:text-secondary transition-colors"
              >
                View full menu <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-8 border-t border-secondary/30">
              {categories.map((cat: any, index: number) => (
                <Link
                  key={cat._id.toString()}
                  href={`/services#${cat.slug}`}
                  className="group flex items-start sm:items-center gap-4 sm:gap-6 py-6 sm:py-7 border-b border-secondary/30 transition-colors hover:bg-surface-container-low/60 -mx-2 px-2 sm:mx-0 sm:px-0"
                >
                  <span className="font-serif text-2xl sm:text-3xl text-secondary font-light leading-none w-10 sm:w-12 flex-shrink-0 pt-1 sm:pt-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-2xl sm:text-3xl text-primary tracking-tight group-hover:text-secondary transition-colors">
                      {cat.name}
                    </h3>
                    {cat.description ? (
                      <p className="text-sm text-espresso/65 font-light leading-relaxed mt-1.5 max-w-xl">
                        {cat.description}
                      </p>
                    ) : null}
                  </div>
                  <span className="flex-shrink-0 w-10 h-10 rounded-full border border-secondary/40 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-surface group-hover:border-primary transition-all mt-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: FEATURED SERVICES (Menu & Pricing) */}
      <section className="w-full bg-surface py-20" id="featured">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
              POPULAR SERVICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight mt-2">
              Featured At-Home Services
            </h2>
            <p className="text-sm text-espresso/70 mt-3 font-light">
              Every visit includes clean tools, careful setup, and products chosen for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service: any) => (
              <div
                key={service._id.toString()}
                className="bg-surface-container-low p-6 rounded flex flex-col justify-between ring-1 ring-secondary/20 hover:bg-surface-container transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase text-secondary tracking-widest font-semibold">
                      {service.categoryId?.name || "Beauty Care"}
                    </span>
                    {service.durationMinutes && (
                      <span className="text-[11px] text-espresso/70 bg-surface-container-high px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service.durationMinutes} Mins
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-2">{service.name}</h3>
                  {service.brandOrProducts ? (
                    <p className="text-[11px] text-secondary font-medium mb-2">
                      {service.brandOrProducts}
                    </p>
                  ) : null}
                  <p className="text-sm text-espresso/75 mb-6 font-light leading-relaxed">
                    {service.shortDescription}
                  </p>
                  {(() => {
                    const price = getServicePriceDisplay(service.pricing);
                    return (
                      <div className="mb-6">
                        <div className="font-serif text-2xl text-secondary font-light">
                          {price.label}
                        </div>
                        {price.regularLabel ? (
                          <div className="text-sm text-espresso/45 line-through mt-0.5">
                            {price.regularLabel}
                          </div>
                        ) : null}
                      </div>
                    );
                  })()}
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-secondary/20">
                  <Link
                    href={`/book?service=${service._id.toString()}`}
                    className="flex-1 text-center py-2.5 bg-primary text-surface rounded text-xs uppercase tracking-wider font-semibold hover:bg-primary-dark transition-colors shadow-sm"
                  >
                    Book Now
                  </Link>
                  <Link
                    href={`/services/${service.slug}`}
                    className="px-4 py-2.5 bg-surface text-primary rounded ring-1 ring-secondary/40 text-xs uppercase tracking-wider hover:bg-secondary/10 transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05: WHY CLIENTS TRUST US */}
      <section className="w-full bg-primary text-surface py-20 md:py-28 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, #d4af37 0%, transparent 42%), radial-gradient(circle at 88% 78%, #d4af37 0%, transparent 36%)",
          }}
        />
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
            {/* Editorial image collage */}
            <div className="lg:col-span-6 relative">
              <div className="relative max-w-lg mx-auto lg:mx-0 lg:max-w-none">
                <div className="relative w-[78%] aspect-[4/5] overflow-hidden">
                  <Image
                    src="/assets/branding/why-facial.jpg"
                    alt="Facial treatment with serum and brush"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 80vw, 40vw"
                  />
                </div>
                <div className="absolute right-0 bottom-[-1.5rem] sm:bottom-8 w-[48%] aspect-[3/4] overflow-hidden ring-4 ring-primary shadow-2xl">
                  <Image
                    src="/assets/branding/why-makeup.jpg"
                    alt="Relaxing facial massage"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                  />
                </div>
                <div className="absolute -left-3 top-10 hidden sm:block w-px h-28 bg-secondary/60" />
                <p className="mt-10 sm:mt-6 lg:mt-4 lg:absolute lg:left-[82%] lg:top-0 lg:w-40 text-[11px] uppercase tracking-[0.18em] text-secondary-fixed/90 font-semibold leading-relaxed">
                  Care that comes to you
                </p>
              </div>
            </div>

            {/* Pillars */}
            <div className="lg:col-span-6 flex flex-col">
              <span className="text-xs uppercase tracking-[0.25em] text-secondary-fixed font-semibold">
                WHY CHOOSE US
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-surface tracking-tight mt-3 leading-[1.15]">
                Why clients trust us
              </h2>
              <p className="text-sm sm:text-base text-surface/70 font-light leading-relaxed mt-4 max-w-md">
                Quiet setup, personal attention, and a team that treats your home like a private
                studio.
              </p>

              <div className="mt-10 border-t border-secondary/25">
                {[
                  {
                    n: "01",
                    title: "At your doorstep",
                    body: "No travel, no waiting rooms. We arrive a little early, set up quietly, and take care of everything in your home.",
                  },
                  {
                    n: "02",
                    title: "Personal care",
                    body: "Every session starts with understanding your skin or hair needs, so we can choose the right products for you.",
                  },
                  {
                    n: "03",
                    title: "On time, every time",
                    body: "We respect your schedule. Need more than one stylist for a big day? Just tell us — we can arrange it.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="group flex gap-5 sm:gap-6 py-6 border-b border-secondary/25"
                  >
                    <span className="font-serif text-2xl sm:text-3xl text-secondary-fixed font-light leading-none w-10 flex-shrink-0 pt-0.5 transition-transform duration-300 group-hover:translate-x-0.5">
                      {item.n}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-surface tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-surface/70 font-light leading-relaxed mt-1.5 max-w-md">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/our-promise"
                className="inline-flex items-center gap-2 mt-8 text-xs uppercase tracking-[0.16em] font-semibold text-secondary-fixed hover:text-surface transition-colors"
              >
                Read our promise <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06: ARTISANAL GALLERY LOOKBOOK */}
      <section className="w-full bg-surface-container-low py-20">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                OUR LOOKBOOK
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight mt-1">
                Gallery
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-primary font-semibold hover:text-secondary transition-colors"
            >
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img: any) => (
              <div
                key={img._id.toString()}
                className="relative aspect-[3/4] rounded overflow-hidden shadow-md group cursor-pointer"
              >
                <Image
                  src={img.image.url}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-surface">
                  <span className="text-xs uppercase text-secondary-fixed tracking-widest font-semibold">
                    {img.category}
                  </span>
                  <p className="font-serif text-xl mt-1">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 07: TESTIMONIALS */}
      <section className="w-full bg-surface py-20">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
              CLIENT STORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight mt-1">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test: any) => (
              <div
                key={test._id.toString()}
                className="bg-surface-container-low p-8 rounded ring-1 ring-secondary/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-secondary mb-4">
                    {Array.from({ length: test.rating || 5 }).map((_, i) => (
                      <span key={i} className="text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-espresso/80 font-light leading-relaxed italic mb-6">
                    &ldquo;{test.review}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-secondary/20">
                  <p className="font-serif text-lg text-primary">{test.customerName}</p>
                  <p className="text-xs text-secondary font-medium mt-0.5">
                    {test.roleOrLocation || "Happy Client"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 08: BOOKING ENQUIRY BANNER */}
      <section className="w-full bg-primary-dark text-surface py-16 border-t border-secondary/30">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 text-center flex flex-col items-center gap-6">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary-fixed font-semibold">
            BOOK WITH US
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-surface max-w-2xl tracking-tight">
            Book your at-home appointment today.
          </h2>
          <p className="text-sm sm:text-base text-surface/80 max-w-xl font-light">
            Tell us what you need. We will check availability and get back to you quickly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/book"
              className="px-8 py-3.5 bg-secondary text-espresso font-semibold rounded text-xs uppercase tracking-[0.16em] hover:bg-secondary-fixed transition-colors shadow-lg"
            >
              Book Now
            </Link>
            <a
              href="https://wa.me/919196002825"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 bg-transparent text-surface border border-secondary/50 rounded text-xs uppercase tracking-[0.16em] font-semibold hover:bg-secondary/10 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

