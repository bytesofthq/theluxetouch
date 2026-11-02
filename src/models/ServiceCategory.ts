import mongoose, { Schema, Document, Model } from "mongoose";

export interface IServiceCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: {
    url: string;
    publicId?: string;
    alt?: string;
  };
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceCategorySchema: Schema<IServiceCategory> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, trim: true },
    image: {
      url: { type: String },
      publicId: { type: String },
      alt: { type: String },
    },
    isActive: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ServiceCategory: Model<IServiceCategory> =
  mongoose.models.ServiceCategory ||
  mongoose.model<IServiceCategory>("ServiceCategory", ServiceCategorySchema);

