import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  name: string;
  slug: string;
  categoryId: mongoose.Types.ObjectId;
  shortDescription: string;
  description?: string;
  image?: {
    url: string;
    publicId?: string;
    alt?: string;
  };
  pricing: {
    mode: "fixed" | "starting_at" | "quote_required" | "hidden";
    amount?: number;
    currency: string;
  };
  durationMinutes?: number;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  seo?: {
    title?: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema<IService> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "ServiceCategory", required: true, index: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: {
      url: { type: String },
      publicId: { type: String },
      alt: { type: String },
    },
    pricing: {
      mode: {
        type: String,
        enum: ["fixed", "starting_at", "quote_required", "hidden"],
        default: "fixed",
      },
      amount: { type: Number, min: 0 },
      currency: { type: String, default: "INR" },
    },
    durationMinutes: { type: Number, min: 0 },
    isFeatured: { type: Boolean, default: false, index: true },
    isActive: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0 },
    seo: {
      title: { type: String },
      description: { type: String },
    },
  },
  { timestamps: true }
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

