import fs from "fs";

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
import { categoriesData, servicesData } from "./catalogue-data";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

async function seed() {
  console.log("Connecting to MongoDB Atlas (database: theluxetouch)...");
  await mongoose.connect(MONGODB_URI as string, { dbName: "theluxetouch" });
  console.log("Connected successfully!");

  // Replace demo catalogue with client sheet data
  console.log("Clearing old categories and services...");
  await Service.deleteMany({});
  await ServiceCategory.deleteMany({});
  console.log("✓ Old catalogue cleared");

  const categoryMap = new Map<string, mongoose.Types.ObjectId>();
  for (const cat of categoriesData) {
    const created = await ServiceCategory.create(cat);
    categoryMap.set(cat.slug, created._id);
    console.log(`✓ Category: ${cat.name}`);
  }

  for (const s of servicesData) {
    const categoryId = categoryMap.get(s.categorySlug);
    if (!categoryId) {
      console.warn(`⚠ Skipping ${s.name} — missing category ${s.categorySlug}`);
      continue;
    }

    await Service.create({
      name: s.name,
      slug: s.slug,
      categoryId,
      subcategory: s.subcategory,
      brandOrProducts: s.brandOrProducts,
      shortDescription: s.shortDescription,
      description: s.shortDescription,
      pricing: s.pricing,
      durationMinutes: s.durationMinutes,
      isFeatured: s.isFeatured || false,
      isActive: true,
      displayOrder: s.displayOrder,
    });
    console.log(`✓ Service: ${s.name}`);
  }

  // Testimonials (keep simple, client-friendly)
  const testimonialsData = [
    {
      customerName: "Radhika S.",
      roleOrLocation: "Bandra West, Mumbai",
      review:
        "So convenient to get beauty services at home. Clean setup, kind staff, and my skin felt fresh after the facial.",
      rating: 5,
      isPublished: true,
      displayOrder: 1,
    },
    {
      customerName: "Ayesha M.",
      roleOrLocation: "Juhu",
      review:
        "On time, professional, and no mess left behind. The hair spa was relaxing and exactly what I needed.",
      rating: 5,
      isPublished: true,
      displayOrder: 2,
    },
    {
      customerName: "Meera K.",
      roleOrLocation: "South Mumbai",
      review:
        "Booked waxing at home and it was smooth and comfortable. Will definitely book again.",
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

  // Gallery (keep existing image URLs if present)
  const galleryData = [
    {
      title: "Bridal Makeup",
      description: "At-home bridal makeup look.",
      category: "bridal",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhHsA7hUiQvLghQgB7_KbRNIyxJtnvFqJnKPz059EIPl1jqB7PU3ZOUaVLAnZL28n5lc08mzf224zy_HoSJLCArQJ7YDYMCQEz8ck4uz5y4jhNNtdpdD612ER5inGP7j_qCRJPY71_yZwBwCs_Lra4wNLuQU1J6cfSarNJP-JaY2hqlGOYWoXC372lFJ8pcr9o5yzzl5YKe3t6XEvA3VgBz63nu0aBDEKhpltVNeA",
        publicId: "gallery_bridal_1",
        alt: "Bridal Makeup",
      },
    },
    {
      title: "Skincare Glow",
      description: "Fresh glowing skin after an at-home facial.",
      category: "skincare",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMxPgAmRk76kCcHn4TDzCNUYeVcpv4mjOpwv6YEsjBMFFlxupkB-iJdHnSjpVfPQgdHk_YWzkCq09hJ67U09_oXW8nGE6aEOfuScCDjZgsspHdn8aNHwllsYlpQGEdvIFABZDmDiChy8bp3hmlfa5HE2yokJBhVrFaPIjCPAkduiKV30bmp55GcK80eht7C5lFl0BC3RA2luYYmkX0t-kK4fo7byf8BLP-mfnWNRg",
        publicId: "gallery_skincare_1",
        alt: "Skincare",
      },
    },
    {
      title: "Evening Makeup",
      description: "Soft glam for a night out.",
      category: "makeup",
      isFeatured: false,
      isPublished: true,
      displayOrder: 3,
      image: {
        url: "/assets/branding/image1.png",
        publicId: "gallery_makeup_1",
        alt: "Evening Makeup",
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

  await SiteSettings.findOneAndUpdate(
    {},
    {
      $set: {
        brandName: "The Luxè Touch",
        tagline: "Where Beauty Meets a Touch of Luxury.",
        logoUrl: "/assets/branding/logo.jpeg",
        contact: {
          phone: "+91 91960 02825",
          whatsappNumber: "919196002825",
          email: "theluxetouch4@gmail.com",
          addressNote: "We come to your home",
        },
        serviceAreas: ["Lucknow", "Gomti Nagar", "Hazratganj", "Indira Nagar", "Aliganj", "Aminabad"],
        businessHours: {
          weekdays: "9:00 AM - 6:00 PM",
          weekends: "9:00 AM - 6:00 PM",
        },
      },
    },
    { upsert: true }
  );
  console.log("✓ Site Settings seeded.");

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
          description:
            "A considered touch. A little time for yourself. Salon-inspired beauty services, brought to your doorstep with care.",
          primaryCtaText: "Book Your Appointment",
          primaryCtaLink: "/book",
          secondaryCtaText: "Explore our services",
          secondaryCtaLink: "/services",
        },
      },
    },
    { upsert: true }
  );
  console.log("✓ Homepage CMS seeded.");

  console.log(`\nDone! Seeded ${categoriesData.length} categories and ${servicesData.length} services.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
