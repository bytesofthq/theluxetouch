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

  // Testimonials
  await Testimonial.deleteMany({});
  const testimonialsData = [
    {
      customerName: "Radhika S.",
      roleOrLocation: "Gomti Nagar, Lucknow",
      review:
        "So convenient to get beauty services at home. Clean setup, kind staff, and my skin felt fresh after the facial.",
      rating: 5,
      isPublished: true,
      displayOrder: 1,
    },
    {
      customerName: "Ayesha M.",
      roleOrLocation: "Hazratganj",
      review:
        "On time, professional, and no mess left behind. The hair spa was relaxing and exactly what I needed.",
      rating: 5,
      isPublished: true,
      displayOrder: 2,
    },
    {
      customerName: "Meera K.",
      roleOrLocation: "Indira Nagar",
      review:
        "Booked waxing at home and it was smooth and comfortable. Will definitely book again.",
      rating: 5,
      isPublished: true,
      displayOrder: 3,
    },
    {
      customerName: "Sana R.",
      roleOrLocation: "Aliganj",
      review:
        "Booked bridal makeup trial at home — calm, careful, and the look lasted all evening. Felt spoiled in my own room.",
      rating: 5,
      isPublished: true,
      displayOrder: 4,
    },
    {
      customerName: "Priya T.",
      roleOrLocation: "Aminabad",
      review:
        "They arrived early, set up quietly, and cleaned everything after. The cleanup facial was gentle and effective.",
      rating: 5,
      isPublished: true,
      displayOrder: 5,
    },
    {
      customerName: "Ananya V.",
      roleOrLocation: "Gomti Nagar",
      review:
        "Needed two stylists for a family function — they arranged it without fuss. Hair and makeup both looked polished.",
      rating: 5,
      isPublished: true,
      displayOrder: 6,
    },
  ];

  await Testimonial.insertMany(testimonialsData);
  console.log("✓ Testimonials seeded.");

  // Gallery — local lookbook photos
  await GalleryImage.deleteMany({});
  const galleryData = [
    {
      title: "Soft Glam Makeup",
      description: "Soft glam lip and eye makeup for celebrations.",
      category: "makeup" as const,
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
      image: {
        url: "/assets/gallery/gallery-bridal.jpg",
        publicId: "gallery_soft_glam",
        alt: "Soft glam makeup application",
      },
    },
    {
      title: "Clay Mask Facial",
      description: "A calming facial with a nourishing clay mask.",
      category: "skincare" as const,
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
      image: {
        url: "/assets/gallery/gallery-skincare.jpg",
        publicId: "gallery_clay_mask",
        alt: "Clay mask facial treatment",
      },
    },
    {
      title: "Serum Ritual",
      description: "Serum and brush application for glowing skin.",
      category: "skincare" as const,
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
      image: {
        url: "/assets/gallery/gallery-facial.jpg",
        publicId: "gallery_serum_ritual",
        alt: "Facial serum ritual",
      },
    },
    {
      title: "Natural Glow",
      description: "Fresh, luminous skin after a beauty session.",
      category: "skincare" as const,
      isFeatured: true,
      isPublished: true,
      displayOrder: 4,
      image: {
        url: "/assets/gallery/gallery-glow.jpg",
        publicId: "gallery_natural_glow",
        alt: "Natural skin glow",
      },
    },
    {
      title: "Hair Care Wash",
      description: "Gentle shampoo and scalp care at home.",
      category: "hair" as const,
      isFeatured: true,
      isPublished: true,
      displayOrder: 5,
      image: {
        url: "/assets/gallery/gallery-hair.jpg",
        publicId: "gallery_hair_wash",
        alt: "Hair wash and care",
      },
    },
    {
      title: "At-Home Makeup",
      description: "Makeup artistry brought to your living room.",
      category: "makeup" as const,
      isFeatured: true,
      isPublished: true,
      displayOrder: 6,
      image: {
        url: "/assets/gallery/gallery-makeup.jpg",
        publicId: "gallery_at_home_makeup",
        alt: "At-home makeup session",
      },
    },
  ];

  await GalleryImage.insertMany(galleryData);
  console.log("✓ Gallery images seeded.");

  await SiteSettings.findOneAndUpdate(
    {},
    {
      $set: {
        brandName: "The Luxè Touch",
        tagline: "Where Beauty Meets a Touch of Luxury.",
        logoUrl: "/assets/branding/logo.webp",
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
