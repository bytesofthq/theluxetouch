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
import { Testimonial } from "../src/models/Testimonial";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

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

async function main() {
  await mongoose.connect(MONGODB_URI as string, { dbName: "theluxetouch" });
  await Testimonial.deleteMany({});
  await Testimonial.insertMany(testimonialsData);
  console.log(`✓ Seeded ${testimonialsData.length} testimonials`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
