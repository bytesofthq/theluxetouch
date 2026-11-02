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
  Award,
  ArrowRight,
  ArrowDown,
  Clock,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

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
      "Experience personalised beauty and grooming services, thoughtfully delivered to your doorstep. Your beauty ritual, your space, your time.",
    primaryCtaText: "Book Your Appointment",
    primaryCtaLink: "/book",
    secondaryCtaText: "Explore Our Services",
    secondaryCtaLink: "/services",
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 01: HERO (Deep Emerald) */}
      <section className="relative w-full bg-primary text-surface overflow-hidden pt-12 pb-20 lg:py-24">
        {/* Ambient gold illumination glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary-dark/60 blur-3xl pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Column */}
            <div className="lg:col-span-7 flex flex-col gap-6 pr-0 lg:pr-8">
              <div className="flex items-center gap-2">
                <span className="inline-block w-8 h-[1px] bg-secondary-fixed" />
                <span className="text-xs uppercase tracking-[0.25em] text-secondary-fixed font-semibold">
                  {hero.eyebrow}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-surface tracking-tight leading-[1.1]">
                Beauty, in the{" "}
                <span className="italic font-light text-secondary-fixed">
                  comfort of home.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-surface/85 max-w-xl font-light leading-relaxed">
                {hero.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={hero.primaryCtaLink || "/book"}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-dark text-surface ring-1 ring-secondary hover:bg-secondary hover:text-espresso hover:ring-secondary transition-all duration-300 rounded text-xs uppercase tracking-[0.16em] font-semibold shadow-[0_4px_24px_rgba(0,37,30,0.4)]"
                >
                  {hero.primaryCtaText || "Book Your Appointment"}
                </Link>
                <Link
                  href={hero.secondaryCtaLink || "/services"}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-secondary-fixed ring-1 ring-secondary/50 hover:bg-secondary/10 hover:ring-secondary-fixed transition-all duration-300 rounded text-xs uppercase tracking-[0.16em] font-semibold"
                >
                  {hero.secondaryCtaText || "Explore Our Services"}
                </Link>
              </div>

              {/* Discrete Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-secondary/20 max-w-lg mt-2">
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl text-secondary-fixed">100%</span>
                  <span className="text-xs text-surface/75 mt-0.5">Sanitised Private Kits</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl text-secondary-fixed">5.0 ★</span>
                  <span className="text-xs text-surface/75 mt-0.5">Estate Patron Rating</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl text-secondary-fixed">Haute</span>
                  <span className="text-xs text-surface/75 mt-0.5">Certified Artisans</span>
                </div>
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[440px] aspect-[4/5] rounded overflow-hidden shadow-2xl ring-1 ring-secondary/40">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA63RBXc63JtLFtrYtgfaf6APjwrh6PSe_Ud7NM8gfe5xtVaJ1656EoVgXIySyT2sceXzOmfuH3Z85GB5_cgKCQidYDRkRdqRyC7MteO7zL2zhd89iglsyWjvRyqhv5TfqRRPKfJUbAeLgtsOKRP-wTQAvEtQl3Vn9qcvqFkLkG-YWY9l5AGExTAyr76OEEmjmAWoXiLAC69AqHJdRDD1TJEYfBgDosHoSgLqeKIXw"
                  alt="The Luxe Touch Beauty Ritual Portrait"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-surface/95 backdrop-blur-md rounded shadow-lg flex items-center justify-between text-espresso">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold">
                        Master Somatic Stylist
                      </p>
                      <p className="text-[11px] text-espresso/70">Private Estate Residency</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-secondary uppercase font-semibold">
                    Concierge
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex items-center justify-center pt-16 gap-2 text-secondary-fixed/70">
            <span className="text-xs uppercase tracking-[0.2em]">Scroll to Discover</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </section>

      {/* SECTION 02: BRAND INTRODUCTION (Warm Ivory) */}
      <section className="w-full bg-surface py-20">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
            <div className="flex items-center justify-center gap-3">
              <span className="w-6 h-[1px] bg-secondary" />
              <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                A MORE PERSONAL KIND OF LUXURY
              </span>
              <span className="w-6 h-[1px] bg-secondary" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight">
              Your time. Your space.{" "}
              <span className="italic font-light text-secondary">Your glow.</span>
            </h2>

            <p className="text-base sm:text-lg text-espresso/80 leading-relaxed font-light">
              We transcend conventional salons by transporting the entire haute couture vanity
              experience directly to your residence, suite, or private dressing quarters. Every
              implement is sterile-sealed, every botanical formula crafted for high-performance
              sensorial renewal, and every aesthetician bound by our strict oath of absolute
              discretion.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 pt-4 text-espresso">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span className="text-xs tracking-wider uppercase font-semibold text-secondary">
                  Pure Botanicals
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span className="text-xs tracking-wider uppercase font-semibold text-secondary">
                  Vetted Specialists
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-secondary" />
                <span className="text-xs tracking-wider uppercase font-semibold text-secondary">
                  Strict Privacy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: EXPLORE SERVICES (Soft Beige) */}
      <section className="w-full bg-surface-container py-20" id="services">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                FIND YOUR RITUAL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight">
                Discover our services.
              </h2>
            </div>
            <p className="text-sm text-espresso/70 max-w-md">
              Customized bespoke offerings curated specifically to restore radiance without leaving
              your residence.
            </p>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat: any, index: number) => (
              <div
                key={cat._id.toString()}
                className="bg-surface rounded p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group ring-1 ring-secondary/20"
              >
                <div>
                  <div className="relative w-full aspect-[4/3] rounded overflow-hidden mb-5 bg-surface-container-low">
                    <Image
                      src={
                        index === 0
                          ? "https://lh3.googleusercontent.com/aida-public/AB6AXuAuIdKNEn211NUyCuaAha3qeYAtTFbYRjY04uPr7LdEkC5my4pAaMlg5AzSRi-oCpsJY4yE8fIFLrcUdpUlGyatJetDUNjn5anvRsfnfg5rs5ylHQtOuUaDfidiU12XqlGTmgFiESThywgX1mI_06JPEOhOruKCC2LKdOnkoYIBVzCwOG9COusHZYX3bqQt5ow0Zhvyx79fZSgHmU1stU6iAao6h2iuO29XE41_B54"
                          : index === 1
                          ? "https://lh3.googleusercontent.com/aida-public/AB6AXuCJh2kNEN4ymgo2HcLqQNB8mpeG0-1pudla7MQCbhm9HnD4w4Sjbhtr54ZJ_Pd-tpq_GR2Rer198cC7Q2qJ4cvvnzKBnL_1466FlptAbEcrQpy9tYpO5QzksGLgj1nMyAOR5M0m2aAO-7fGM4ZkC1cEkAWdti_c58v-rhA8qrvsNADCOLwEMlg1QjM9NFc563KZGjMY7GdxfwjySN3IqDuaYpoG8M5s4PMp25MAt6M"
                          : index === 2
                          ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBshvby-UJX3Udt_oWWX1ay8LWhi5ER60v9jHT67421pdStXgYEuMsu2aVzKCYJz9hWcgqdlTaZsgYTpWIb4QGKSnpo4dfBxNzdm6_759baM2e8IvIvw5G4BDkC_AWBDpcLGpTC9BleC3bVGKQ-TsVXFmhJscphccWV3YaeuyXL1n8v4Aef6l9wFDP5ibrwgucUyNDG0w0Ggt5rlzunCMvC_N4Yjd6_v8ll5UtmhgA"
                          : "/assets/branding/image.png"
                      }
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-surface/90 backdrop-blur-sm text-primary text-[10px] uppercase tracking-wider rounded font-semibold">
                      Ritual 0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-2">{cat.name}</h3>
                  <p className="text-sm text-espresso/70 mb-6 leading-relaxed font-light">
                    {cat.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-secondary/20">
                  <span className="text-xs uppercase text-secondary font-semibold">
                    Curated Menu
                  </span>
                  <Link
                    href={`/services#${cat.slug}`}
                    className="text-xs uppercase tracking-wider text-primary group-hover:text-secondary flex items-center gap-1 transition-colors font-semibold"
                  >
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04: FEATURED SERVICES (Menu & Pricing) */}
      <section className="w-full bg-surface py-20" id="featured">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
              THE SIGNATURE MENU
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight mt-2">
              Featured In-Residence Therapies
            </h2>
            <p className="text-sm text-espresso/70 mt-3 font-light">
              Each appointment includes complete suite preparation, sterile instrument presentation,
              and aromatic botanical infusion.
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
                      {service.categoryId?.name || "Signature Care"}
                    </span>
                    {service.durationMinutes && (
                      <span className="text-[11px] text-espresso/70 bg-surface-container-high px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service.durationMinutes} Mins
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-2">{service.name}</h3>
                  <p className="text-sm text-espresso/75 mb-6 font-light leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <div className="font-serif text-2xl text-secondary mb-6 font-light">
                    {service.pricing.mode === "fixed" && service.pricing.amount
                      ? formatCurrency(service.pricing.amount, service.pricing.currency)
                      : service.pricing.mode === "starting_at" && service.pricing.amount
                      ? `Starting at ${formatCurrency(service.pricing.amount, service.pricing.currency)}`
                      : "Quote upon consultation"}
                  </div>
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

      {/* SECTION 05: WHY THE LUXE TOUCH (Split Emerald / Privilege Charter) */}
      <section className="w-full bg-primary text-surface py-20 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual with Gold Border Flourish */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-[4/5] rounded overflow-hidden ring-1 ring-secondary/50 shadow-2xl">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgid-YWbrsgXXl2LLMi17woK6G7qNpq51kiFD0th10zC1isGiancuF1ESJ2ZOYHV7WjnRyQGZDDHc6SZ1GbRt7uU8q0XwDDC1CNcFyqwjqpppdDxXe6rVFWuk7_ZbXtocGs2GRQPuSlUGAZ6KKMSCiaKL4Xc9IxLRpfx28YBpgPLQd0I3b9A3jAJLaC7Az7k4b9QaOIZ7UlFkLn5GY98usR7MVvUaPHKL2I-wJmtM"
                  alt="Private Bridal Consultation Chamber"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block p-6 bg-primary-dark rounded ring-1 ring-secondary/40 shadow-xl max-w-xs text-surface">
                <p className="font-serif text-xl text-secondary-fixed mb-1 font-light">
                  The Atelier Oath
                </p>
                <p className="text-xs text-surface/80 font-light leading-relaxed">
                  Every specialist arrives with autonomous power suites, fresh protective sheets, and
                  hospital-grade instrument sterilisers.
                </p>
              </div>
            </div>

            {/* Numbered Pillars */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-secondary-fixed font-semibold">
                  THE PRIVILEGE CHARTER
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-surface tracking-tight mt-1">
                  Why Patrons Entrust Us
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {/* Pillar 01 */}
                <div className="flex gap-4 items-start p-5 bg-primary-dark/50 rounded ring-1 ring-secondary/20">
                  <span className="font-serif text-3xl text-secondary-fixed font-light leading-none">
                    01
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-surface mb-1">
                      At Your Doorstep, Seamlessly
                    </h3>
                    <p className="text-sm text-surface/80 font-light leading-relaxed">
                      Zero commute, zero waiting rooms. We arrive 15 minutes prior to arrange our
                      self-contained mobile salon suite without disrupting your household.
                    </p>
                  </div>
                </div>

                {/* Pillar 02 */}
                <div className="flex gap-4 items-start p-5 bg-primary-dark/50 rounded ring-1 ring-secondary/20">
                  <span className="font-serif text-3xl text-secondary-fixed font-light leading-none">
                    02
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-surface mb-1">Personalised Haute Touch</h3>
                    <p className="text-sm text-surface/80 font-light leading-relaxed">
                      Every session begins with a private digital skin or hair diagnosis, tailoring
                      specialised organic compounds to your exact tone and texture.
                    </p>
                  </div>
                </div>

                {/* Pillar 03 */}
                <div className="flex gap-4 items-start p-5 bg-primary-dark/50 rounded ring-1 ring-secondary/20">
                  <span className="font-serif text-3xl text-secondary-fixed font-light leading-none">
                    03
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-surface mb-1">Your Time, Respected</h3>
                    <p className="text-sm text-surface/80 font-light leading-relaxed">
                      Punctuality guaranteed to the exact minute. Need dual therapists for parallel
                      treatments before an evening gala? Our concierge arranges synchronized
                      execution.
                    </p>
                  </div>
                </div>
              </div>
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
                THE CURATED ARCHIVE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight mt-1">
                Artisanal Gallery
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
              PATRON EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary tracking-tight mt-1">
              Words From Our Discerning Clients
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
                    {test.roleOrLocation || "Verified Patron"}
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
            BESPOKE RESERVATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-surface max-w-2xl tracking-tight">
            Reserve your private in-home appointment today.
          </h2>
          <p className="text-sm sm:text-base text-surface/80 max-w-xl font-light">
            Our private concierge will promptly review your request, confirm availability, and ensure
            every tailored requirement is prepared.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/book"
              className="px-8 py-3.5 bg-secondary text-espresso font-semibold rounded text-xs uppercase tracking-[0.16em] hover:bg-secondary-fixed transition-colors shadow-lg"
            >
              Begin Booking Enquiry
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 bg-transparent text-surface border border-secondary/50 rounded text-xs uppercase tracking-[0.16em] font-semibold hover:bg-secondary/10 transition-colors"
            >
              Direct WhatsApp Concierge
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

