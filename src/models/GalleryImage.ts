import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryImage extends Document {
  title: string;
  description?: string;
  image: {
    url: string;
    publicId: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  category: "bridal" | "makeup" | "hair" | "skincare" | "general";
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema: Schema<IGalleryImage> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
      width: { type: Number },
      height: { type: Number },
      alt: { type: String },
    },
    category: {
      type: String,
      enum: ["bridal", "makeup", "hair", "skincare", "general"],
      default: "general",
      index: true,
    },
    isFeatured: { type: Boolean, default: false, index: true },
    isPublished: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);

