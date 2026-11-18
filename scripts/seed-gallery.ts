import fs from "fs";

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
import { GalleryImage } from "../src/models/GalleryImage";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

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

async function main() {
  await mongoose.connect(MONGODB_URI as string, { dbName: "theluxetouch" });
  await GalleryImage.deleteMany({});
  await GalleryImage.insertMany(galleryData);
  const count = await GalleryImage.countDocuments({ isPublished: true });
  console.log(`✓ Seeded ${count} gallery images`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
