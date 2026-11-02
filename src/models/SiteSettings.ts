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
    brandName: { type: String, default: "The Luxe Touch" },
    tagline: {
      type: String,
      default: "Personalised Beauty & Grooming Delivered to You",
    },
    logoUrl: { type: String, default: "/assets/branding/logo.jpeg" },
    contact: {
      phone: { type: String, default: "+91 98765 43210" },
      whatsappNumber: { type: String, default: "919876543210" },
      email: { type: String, default: "concierge@theluxetouch.com" },
      addressNote: {
        type: String,
        default: "Delivered in the comfort of your home, suite, or private estate",
      },
    },
    serviceAreas: {
      type: [String],
      default: ["Mumbai", "Bandra", "Juhu", "South Mumbai", "Powai", "Thane"],
    },
    socialLinks: {
      instagram: { type: String, default: "https://instagram.com" },
      facebook: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    businessHours: {
      weekdays: { type: String, default: "9:00 AM - 8:00 PM" },
      weekends: { type: String, default: "8:00 AM - 9:00 PM" },
    },
    bookingPreferences: {
      minimumNoticeHours: { type: Number, default: 24 },
      enableInstantWhatsAppConfirmation: { type: Boolean, default: true },
    },
    seo: {
      defaultTitle: {
        type: String,
        default: "The Luxe Touch | Luxury In-Home Beauty & Grooming Services",
      },
      defaultDescription: {
        type: String,
        default:
          "Experience personalised haute beauty and wellness rituals delivered to your doorstep. Private estate hair, skin, bridal and somatic care.",
      },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

