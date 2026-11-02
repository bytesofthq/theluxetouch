import fs from "fs";
import path from "path";

// Load .env.local if not already in process.env
if (!process.env.MONGODB_URI && fs.existsSync(".env.local")) {
  const envContent = fs.readFileSync(".env.local", "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, "");
      }
    }
  }
}

import mongoose from "mongoose";
import { ServiceCategory } from "../src/models/ServiceCategory";
import { Service } from "../src/models/Service";
import { GalleryImage } from "../src/models/GalleryImage";
import { Testimonial } from "../src/models/Testimonial";
import { PageContent } from "../src/models/PageContent";
import { SiteSettings } from "../src/models/SiteSettings";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

async function seed() {
  console.log("Connecting to MongoDB Atlas (database: theluxetouch)...");
  await mongoose.connect(MONGODB_URI as string, { dbName: "theluxetouch" });
  console.log("Connected successfully!");

  // 1. Categories
  const categoriesData = [
    {
      name: "Facials & Skincare",
      slug: "facials-skincare",
      description: "Cellular rejuvenation, cold-pressed botanical therapies, and non-invasive glow infusions.",
      displayOrder: 1,
      isActive: true,
    },
    {
      name: "Hair Care",
      slug: "hair-care",
      description: "Deep scalp detox, restorative keratin glazing, hair botox, and precision styling.",
      displayOrder: 2,
      isActive: true,
    },
    {
      name: "Makeup",
      slug: "makeup",
      description: "Opulent bridal regalia, evening gala artistry, and flawless red carpet glamour.",
      displayOrder: 3,
      isActive: true,
    },
    {
      name: "Body Care & Massage",
      slug: "body-care-massage",
      description: "Somatic therapy, lymphatic stimulation, basalt hot stones, and botanical body polishing.",
      displayOrder: 4,
      isActive: true,
    },
    {
      name: "Hand & Foot Care",
      slug: "hand-foot-care",
      description: "Apothecary herbal foot soaks, paraffin warmth wraps, and sterile medical-grade nail artistry.",
      displayOrder: 5,
      isActive: true,
    },
    {
      name: "Waxing & Grooming",
      slug: "waxing-grooming",
      description: "European hypoallergenic lycon wax, brow micro-sculpting, and soothing finish balms.",
      displayOrder: 6,
      isActive: true,
    },
  ];

  const categoryMap = new Map();
  for (const cat of categoriesData) {
    const upserted = await ServiceCategory.findOneAndUpdate(
      { slug: cat.slug },
      { $set: cat },
      { upsert: true, new: true }
    );
    categoryMap.set(cat.slug, upserted._id);
    console.log(`✓ Category seeded: ${cat.name}`);
  }

  // 2. Services
  const servicesData = [
    // Facials & Skincare
    {
      name: "Imperial Gold Botanical Facial",
      slug: "imperial-gold-botanical-facial",
      categorySlug: "facials-skincare",
      shortDescription: "24k micro-gold sheet infusion paired with jasmine hydraulic mist and chilled jade lymphatic drainage.",
      description: "An opulent ritual designed to restore timeless radiance. Features a double botanical cleanse, mild papaya enzyme exfoliation, deep cellular hydration mist, and real 24k gold leaf application, sealed with cold jade rollers.",
      pricing: { mode: "fixed", amount: 4500, currency: "INR" },
      durationMinutes: 90,
      isFeatured: true,
      displayOrder: 1,
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuIdKNEn211NUyCuaAha3qeYAtTFbYRjY04uPr7LdEkC5my4pAaMlg5AzSRi-oCpsJY4yE8fIFLrcUdpUlGyatJetDUNjn5anvRsfnfg5rs5ylHQtOuUaDfidiU12XqlGTmgFiESThywgX1mI_06JPEOhOruKCC2LKdOnkoYIBVzCwOG9COusHZYX3bqQt5ow0Zhvyx79fZSgHmU1stU6iAao6h2iuO29XE41_B54",
        alt: "Imperial Gold Botanical Facial Setup",
      },
    },
    {
      name: "Express Radiance Clean-up",
      slug: "express-radiance-clean-up",
      categorySlug: "facials-skincare",
      shortDescription: "Deep pore purification, gentle vacuum extraction, and hydrating marine algae mask.",
      pricing: { mode: "fixed", amount: 2200, currency: "INR" },
      durationMinutes: 45,
      isFeatured: false,
      displayOrder: 2,
    },
    {
      name: "Pure Botanical De-Tan Therapy",
      slug: "pure-botanical-de-tan-therapy",
      categorySlug: "facials-skincare",
      shortDescription: "Saffron, kojic nectar, and liquorice root peel to reverse sun exposure and even out complexion.",
      pricing: { mode: "fixed", amount: 1800, currency: "INR" },
      durationMinutes: 45,
      isFeatured: false,
      displayOrder: 3,
    },

    // Hair Care
    {
      name: "Deep Keratin Nectar Glaze",
      slug: "deep-keratin-nectar-glaze",
      categorySlug: "hair-care",
      shortDescription: "Bio-lipid seal therapy, ozone steam bath, followed by silk velvet blow-out and protective shield.",
      description: "Transforms frizzy, stressed tresses into mirror-smooth, resilient silk. Formulated with hydrolyzed botanical keratin and cold-pressed argan oil, sealed under precise temperature control.",
      pricing: { mode: "starting_at", amount: 5500, currency: "INR" },
      durationMinutes: 120,
      isFeatured: true,
      displayOrder: 1,
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJh2kNEN4ymgo2HcLqQNB8mpeG0-1pudla7MQCbhm9HnD4w4Sjbhtr54ZJ_Pd-tpq_GR2Rer198cC7Q2qJ4cvvnzKBnL_1466FlptAbEcrQpy9tYpO5QzksGLgj1nMyAOR5M0m2aAO-7fGM4ZkC1cEkAWdti_c58v-rhA8qrvsNADCOLwEMlg1QjM9NFc563KZGjMY7GdxfwjySN3IqDuaYpoG8M5s4PMp25MAt6M",
        alt: "Deep Keratin Treatment Session",
      },
    },
    {
      name: "Botanical Scalp & Hair Spa",
      slug: "botanical-scalp-hair-spa",
      categorySlug: "hair-care",
      shortDescription: "Holistic scalp acupressure, steam hydration, and nutrient-dense peptide infusion.",
      pricing: { mode: "fixed", amount: 2800, currency: "INR" },
      durationMinutes: 60,
      isFeatured: false,
      displayOrder: 2,
    },
    {
      name: "Restorative Cellular Hair Botox",
      slug: "restorative-cellular-hair-botox",
      categorySlug: "hair-care",
      shortDescription: "Intense collagen and hyaluronic plumping treatment for brittle, thinning or color-treated hair.",
      pricing: { mode: "quote_required", amount: 6000, currency: "INR" },
      durationMinutes: 120,
      isFeatured: false,
      displayOrder: 3,
    },
    {
      name: "Haute Organic Nanoplastia",
      slug: "haute-organic-nanoplastia",
      categorySlug: "hair-care",
      shortDescription: "Formaldehyde-free organic amino acid straightening and gloss restoration.",
      pricing: { mode: "quote_required", amount: 7500, currency: "INR" },
      durationMinutes: 150,
      isFeatured: false,
      displayOrder: 4,
    },
    {
      name: "Haute Haircut & Signature Blow-dry",
      slug: "haute-haircut-blow-dry",
      categorySlug: "hair-care",
      shortDescription: "Face-framing bespoke cut by a senior stylist, finished with voluminous velvet styling.",
      pricing: { mode: "fixed", amount: 2200, currency: "INR" },
      durationMinutes: 50,
      isFeatured: false,
      displayOrder: 5,
    },

    // Makeup
    {
      name: "Grand Bridal Radiance Ceremony",
      slug: "grand-bridal-radiance-ceremony",
      categorySlug: "makeup",
      shortDescription: "Comprehensive skin priming, HD heirloom makeup, jewel setting assistance, and hair architecture.",
      description: "Our signature bridal concierge service. Includes in-depth consultation, high-definition camera-ready makeup, luxury eyelash application, dupatta and jewelry draping, and a private touch-up kit.",
      pricing: { mode: "starting_at", amount: 18000, currency: "INR" },
      durationMinutes: 180,
      isFeatured: true,
      displayOrder: 1,
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBshvby-UJX3Udt_oWWX1ay8LWhi5ER60v9jHT67421pdStXgYEuMsu2aVzKCYJz9hWcgqdlTaZsgYTpWIb4QGKSnpo4dfBxNzdm6_759baM2e8IvIvw5G4BDkC_AWBDpcLGpTC9BleC3bVGKQ-TsVXFmhJscphccWV3YaeuyXL1n8v4Aef6l9wFDP5ibrwgucUyNDG0w0Ggt5rlzunCMvC_N4Yjd6_v8ll5UtmhgA",
        alt: "Opulent Bridal Makeup Look",
      },
    },
    {
      name: "Evening Gala High-Glam Makeup",
      slug: "evening-gala-high-glam-makeup",
      categorySlug: "makeup",
      shortDescription: "Sculpted luminous base, dramatic or classic eye styling, and 16-hour transfer-proof finish.",
      pricing: { mode: "fixed", amount: 4800, currency: "INR" },
      durationMinutes: 75,
      isFeatured: false,
      displayOrder: 2,
    },
    {
      name: "Soft Elegance Day & Party Makeup",
      slug: "soft-elegance-day-makeup",
      categorySlug: "makeup",
      shortDescription: "Dewy skin tint, soft diffused eyeshadow, and natural flushed lips for intimate soirees.",
      pricing: { mode: "fixed", amount: 3500, currency: "INR" },
      durationMinutes: 60,
      isFeatured: false,
      displayOrder: 3,
    },

    // Body Care & Massage
    {
      name: "Somatic Full Body Stress Relief Massage",
      slug: "somatic-full-body-massage",
      categorySlug: "body-care-massage",
      shortDescription: "Warm botanical herbal compress, Swedish fluid strokes, and nervous system relaxation.",
      pricing: { mode: "fixed", amount: 3800, currency: "INR" },
      durationMinutes: 60,
      isFeatured: true,
      displayOrder: 1,
    },
    {
      name: "Sandalwood Botanical Body Polish",
      slug: "sandalwood-botanical-body-polish",
      categorySlug: "body-care-massage",
      shortDescription: "Fine walnut and sandalwood micro-buffing followed by rich shea butter moisture lock.",
      pricing: { mode: "fixed", amount: 4500, currency: "INR" },
      durationMinutes: 75,
      isFeatured: false,
      displayOrder: 2,
    },
    {
      name: "Full Body Glow Bleach",
      slug: "full-body-glow-bleach",
      categorySlug: "body-care-massage",
      shortDescription: "Gentle herbal formulation designed to brighten and unify overall skin radiance.",
      pricing: { mode: "fixed", amount: 3200, currency: "INR" },
      durationMinutes: 60,
      isFeatured: false,
      displayOrder: 3,
    },

    // Hand & Foot Care
    {
      name: "Apothecary Rose Petal Spa Pedicure",
      slug: "apothecary-rose-pedicure",
      categorySlug: "hand-foot-care",
      shortDescription: "Dead sea salt scrub, rosehip oil cuticle therapy, callus smoothing, and heated mask.",
      pricing: { mode: "fixed", amount: 1800, currency: "INR" },
      durationMinutes: 60,
      isFeatured: false,
      displayOrder: 1,
    },
    {
      name: "Silk Velvet Spa Manicure",
      slug: "silk-velvet-spa-manicure",
      categorySlug: "hand-foot-care",
      shortDescription: "Gentle shaping, honey-almond buffing, nourishing cuticle soak, and hand massage.",
      pricing: { mode: "fixed", amount: 1400, currency: "INR" },
      durationMinutes: 45,
      isFeatured: false,
      displayOrder: 2,
    },

    // Waxing & Grooming
    {
      name: "European Lycon Silk Waxing (Full Body)",
      slug: "european-lycon-silk-waxing",
      categorySlug: "waxing-grooming",
      shortDescription: "Low-temperature, hypoallergenic strip and hot wax for painless, irritation-free smoothness.",
      pricing: { mode: "starting_at", amount: 3200, currency: "INR" },
      durationMinutes: 60,
      isFeatured: false,
      displayOrder: 1,
    },
  ];

  for (const s of servicesData) {
    const categoryId = categoryMap.get(s.categorySlug);
    const servicePayload = {
      name: s.name,
      slug: s.slug,
      categoryId,
      shortDescription: s.shortDescription,
      description: s.description || s.shortDescription,
      pricing: s.pricing,
      durationMinutes: s.durationMinutes,
      isFeatured: s.isFeatured,
      isActive: true,
      displayOrder: s.displayOrder,
      image: s.image || {
        url: "/assets/branding/image.png",
        alt: s.name,
      },
    };

    await Service.findOneAndUpdate(
      { slug: s.slug },
      { $set: servicePayload },
      { upsert: true, new: true }
    );
    console.log(`✓ Service seeded: ${s.name}`);
  }

  // 3. Testimonials
  const testimonialsData = [
    {
      customerName: "Radhika Singhania",
      roleOrLocation: "Bandra West, Mumbai",
      review: "The convenience of having a master aesthetician come to my residence for my pre-wedding events was unparalleled. The sanitization protocol and gentle gold facial left my skin glowing for days.",
      rating: 5,
      isPublished: true,
      displayOrder: 1,
    },
    {
      customerName: "Ayesha Merchant",
      roleOrLocation: "Juhu Estate Patron",
      review: "Absolute luxury. Punctual to the minute, completely self-contained equipment, and zero mess. The botanical hair spa was the most relaxing 60 minutes I have had this year.",
      rating: 5,
      isPublished: true,
      displayOrder: 2,
    },
    {
      customerName: "Meera Kapoor",
      roleOrLocation: "South Mumbai",
      review: "Their bridal team is phenomenal. They understood exactly what I wanted—radiant, timeless, and not heavy. I felt like royalty in my own dressing chamber.",
      rating: 5,
      isPublished: true,
      displayOrder: 3,
    },
  ];

  for (const t of testimonialsData) {
    await Testimonial.findOneAndUpdate(
      { customerName: t.customerName },
      { $set: t },
      { upsert: true, new: true }
    );
  }
  console.log("✓ Testimonials seeded.");

  // 4. Lookbook Gallery
  const galleryData = [
    {
      title: "Haute Bridal Regalia & Bespoke Makeup",
      description: "Private dressing suite bridal session with emerald hues and antique gold jewelry.",
      category: "bridal",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhHsA7hUiQvLghQgB7_KbRNIyxJtnvFqJnKPz059EIPl1jqB7PU3ZOUaVLAnZL28n5lc08mzf224zy_HoSJLCArQJ7YDYMCQEz8ck4uz5y4jhNNtdpdD612ER5inGP7j_qCRJPY71_yZwBwCs_Lra4wNLuQU1J6cfSarNJP-JaY2hqlGOYWoXC372lFJ8pcr9o5yzzl5YKe3t6XEvA3VgBz63nu0aBDEKhpltVNeA",
        publicId: "stitch_bridal_1",
        alt: "Bridal Lookbook Photo",
      },
    },
    {
      title: "Cold-Pressed Botanical Nectar Skincare",
      description: "Organic jade roller and 24k gold infusion preparation.",
      category: "skincare",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMxPgAmRk76kCcHn4TDzCNUYeVcpv4mjOpwv6YEsjBMFFlxupkB-iJdHnSjpVfPQgdHk_YWzkCq09hJ67U09_oXW8nGE6aEOfuScCDjZgsspHdn8aNHwllsYlpQGEdvIFABZDmDiChy8bp3hmlfa5HE2yokJBhVrFaPIjCPAkduiKV30bmp55GcK80eht7C5lFl0BC3RA2luYYmkX0t-kK4fo7byf8BLP-mfnWNRg",
        publicId: "stitch_skincare_1",
        alt: "Skincare Lookbook Photo",
      },
    },
    {
      title: "Radiant Evening Gala Glamour",
      description: "Luminous mineral silk base and soft contoured eyes.",
      category: "makeup",
      isFeatured: false,
      isPublished: true,
      displayOrder: 3,
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA63RBXc63JtLFtrYtgfaf6APjwrh6PSe_Ud7NM8gfe5xtVaJ1656EoVgXIySyT2sceXzOmfuH3Z85GB5_cgKCQidYDRkRdqRyC7MteO7zL2zhd89iglsyWjvRyqhv5TfqRRPKfJUbAeLgtsOKRP-wTQAvEtQl3Vn9qcvqFkLkG-YWY9l5AGExTAyr76OEEmjmAWoXiLAC69AqHJdRDD1TJEYfBgDosHoSgLqeKIXw",
        publicId: "stitch_makeup_1",
        alt: "Gala Glamour Lookbook Photo",
      },
    },
  ];

  for (const g of galleryData) {
    await GalleryImage.findOneAndUpdate(
      { title: g.title },
      { $set: g },
      { upsert: true, new: true }
    );
  }
  console.log("✓ Gallery images seeded.");

  // 5. Global Site Settings
  await SiteSettings.findOneAndUpdate(
    {},
    {
      $set: {
        brandName: "The Luxe Touch",
        tagline: "Personalised Beauty & Grooming Delivered to You",
        logoUrl: "/assets/branding/logo.jpeg",
        contact: {
          phone: "+91 98765 43210",
          whatsappNumber: "919876543210",
          email: "concierge@theluxetouch.com",
          addressNote: "Delivered in the comfort of your home, suite, or private estate",
        },
        serviceAreas: ["Mumbai", "Bandra", "Juhu", "South Mumbai", "Powai", "Thane"],
        businessHours: {
          weekdays: "9:00 AM - 8:00 PM",
          weekends: "8:00 AM - 9:00 PM",
        },
      },
    },
    { upsert: true }
  );
  console.log("✓ Site Settings seeded.");

  // 6. Homepage CMS Page Content
  await PageContent.findOneAndUpdate(
    { page: "home", section: "hero" },
    {
      $set: {
        page: "home",
        section: "hero",
        isPublished: true,
        content: {
          eyebrow: "YOUR PERSONAL BEAUTY RITUAL",
          title: "Beauty, in the comfort of home.",
          highlightWord: "comfort of home.",
          description: "Experience personalised beauty and grooming services, thoughtfully delivered to your doorstep. Your beauty ritual, your space, your time.",
          primaryCtaText: "Book Your Appointment",
          primaryCtaLink: "/book",
          secondaryCtaText: "Explore Our Services",
          secondaryCtaLink: "/services",
          badges: [
            { value: "100%", label: "Sanitised Private Kits" },
            { value: "5.0 ★", label: "Estate Patron Rating" },
            { value: "Haute", label: "Certified Artisans" },
          ],
        },
      },
    },
    { upsert: true }
  );
  console.log("✓ Homepage CMS seeded.");

  console.log("All database seeds completed successfully!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
