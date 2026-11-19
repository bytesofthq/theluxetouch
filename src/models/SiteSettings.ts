import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  brandName: string;
  tagline: string;
  logoUrl?: string;
  contact: {
    phone: string;
    whatsappNumber: string;
    email: string;
    addressNote?: string;
  };
  serviceAreas: string[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  businessHours?: {
    weekdays: string;
    weekends: string;
  };
  bookingPreferences?: {
    minimumNoticeHours: number;
    enableInstantWhatsAppConfirmation: boolean;
  };
  seo?: {
    defaultTitle: string;
    defaultDescription: string;
  };
  updatedAt: Date;
}

const SiteSettingsSchema: Schema<ISiteSettings> = new Schema(
  {
    brandName: { type: String, default: "The Luxè Touch" },
    tagline: {
      type: String,
      default: "Where Beauty Meets a Touch of Luxury.",
    },
    logoUrl: { type: String, default: "/assets/branding/logo.webp" },
    contact: {
      phone: { type: String, default: "+91 91960 02825" },
      whatsappNumber: { type: String, default: "919196002825" },
      email: { type: String, default: "theluxetouch4@gmail.com" },
      addressNote: {
        type: String,
        default: "Delivered in the comfort of your home, suite, or private estate",
      },
    },
    serviceAreas: {
      type: [String],
      default: ["Lucknow", "Gomti Nagar", "Hazratganj", "Indira Nagar", "Aliganj", "Aminabad"],
    },
    socialLinks: {
      instagram: { type: String, default: "https://instagram.com" },
      facebook: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    businessHours: {
      weekdays: { type: String, default: "9:00 AM - 6:00 PM" },
      weekends: { type: String, default: "9:00 AM - 6:00 PM" },
    },
    bookingPreferences: {
      minimumNoticeHours: { type: Number, default: 24 },
      enableInstantWhatsAppConfirmation: { type: Boolean, default: true },
    },
    seo: {
      defaultTitle: {
        type: String,
        default: "The Luxè Touch | Where Beauty Meets a Touch of Luxury",
      },
      defaultDescription: {
        type: String,
        default:
          "Where Beauty Meets a Touch of Luxury. Salon-inspired beauty services, brought to your doorstep with care.",
      },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

