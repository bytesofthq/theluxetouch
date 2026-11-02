"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { ServiceCategory } from "@/models/ServiceCategory";
import { revalidatePath } from "next/cache";

export async function createService(data: {
  name: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  description?: string;
  pricing: {
    mode: "fixed" | "starting_at" | "quote_required" | "hidden";
    amount?: number;
    currency?: string;
  };
  durationMinutes?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  image?: { url: string; alt?: string };
}) {
  try {
    await connectToDatabase();
    const service = await Service.create({
      ...data,
      pricing: {
        ...data.pricing,
        currency: data.pricing.currency || "INR",
      },
    });

    revalidatePath("/services");
    revalidatePath("/admin/services");
    return { success: true, service: JSON.parse(JSON.stringify(service)) };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to create service" };
  }
}

export async function updateService(id: string, data: Partial<any>) {
  try {
    await connectToDatabase();
    const service = await Service.findByIdAndUpdate(id, { $set: data }, { new: true });
    revalidatePath("/services");
    revalidatePath("/admin/services");
    return { success: true, service: JSON.parse(JSON.stringify(service)) };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update service" };
  }
}

export async function deleteService(id: string) {
  try {
    await connectToDatabase();
    await Service.findByIdAndDelete(id);
    revalidatePath("/services");
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete service" };
  }
}

