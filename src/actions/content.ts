"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { PageContent } from "@/models/PageContent";
import { SiteSettings } from "@/models/SiteSettings";
import { Testimonial } from "@/models/Testimonial";
import { revalidatePath } from "next/cache";

export async function updatePageSectionContent(page: string, section: string, content: any) {
  try {
    await connectToDatabase();
    await PageContent.findOneAndUpdate(
      { page, section },
      { $set: { content, isPublished: true } },
      { upsert: true }
    );

    revalidatePath("/");
    revalidatePath(`/${page}`);
    revalidatePath("/admin/content");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update page content" };
  }
}

export async function updateSiteSettings(settings: any) {
  try {
    await connectToDatabase();
    await SiteSettings.findOneAndUpdate({}, { $set: settings }, { upsert: true });

    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/admin/settings");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update settings" };
  }
}

export async function createTestimonial(data: {
  customerName: string;
  roleOrLocation?: string;
  review: string;
  rating?: number;
}) {
  try {
    await connectToDatabase();
    await Testimonial.create({
      ...data,
      isPublished: true,
      displayOrder: 0,
    });

    revalidatePath("/");
    revalidatePath("/admin/content");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to create testimonial" };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await connectToDatabase();
    await Testimonial.findByIdAndDelete(id);

    revalidatePath("/");
    revalidatePath("/admin/content");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete testimonial" };
  }
}

