import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPageContent extends Document {
  page: string;
  section: string;
  content: Record<string, any>;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PageContentSchema: Schema<IPageContent> = new Schema(
  {
    page: { type: String, required: true, index: true },
    section: { type: String, required: true, index: true },
    content: { type: Schema.Types.Mixed, required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Ensure unique page + section pair
PageContentSchema.index({ page: 1, section: 1 }, { unique: true });

export const PageContent: Model<IPageContent> =
  mongoose.models.PageContent ||
  mongoose.model<IPageContent>("PageContent", PageContentSchema);

