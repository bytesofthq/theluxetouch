"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { GalleryImage } from "@/models/GalleryImage";
import { revalidatePath } from "next/cache";

export async function addGalleryImage(data: {
  title: string;
  description?: string;
  category: "bridal" | "makeup" | "hair" | "skincare" | "general";
  image: {
    url: string;
    publicId: string;
    alt?: string;
  };
  isFeatured?: boolean;
}) {
  try {
    await connectToDatabase();
    const image = await GalleryImage.create({
      ...data,
      isPublished: true,
      displayOrder: 0,
    });

    revalidatePath("/gallery");
    revalidatePath("/");
    revalidatePath("/admin/gallery");

    return { success: true, image: JSON.parse(JSON.stringify(image)) };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to add image" };
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    await connectToDatabase();
    await GalleryImage.findByIdAndDelete(id);

    revalidatePath("/gallery");
    revalidatePath("/");
    revalidatePath("/admin/gallery");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete image" };
  }
}

