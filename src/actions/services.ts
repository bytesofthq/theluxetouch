"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { revalidatePath } from "next/cache";

function revalidateServicePaths() {
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/book");
  revalidatePath("/admin/services");
}

export type ServicePayload = {
  name: string;
  slug: string;
  categoryId: string;
  subcategory?: string;
  brandOrProducts?: string;
  shortDescription: string;
  description?: string;
  pricing: {
    mode: "fixed" | "starting_at" | "quote_required" | "hidden";
    amount?: number;
    regularAmount?: number;
    currency?: string;
  };
  durationMinutes?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  image?: { url: string; alt?: string };
};

export async function createService(data: ServicePayload) {
  try {
    await connectToDatabase();
    const service = await Service.create({
      ...data,
      subcategory: data.subcategory?.trim() || undefined,
      brandOrProducts: data.brandOrProducts?.trim() || undefined,
      pricing: {
        ...data.pricing,
        currency: data.pricing.currency || "INR",
        regularAmount:
          typeof data.pricing.regularAmount === "number" && data.pricing.regularAmount > 0
            ? data.pricing.regularAmount
            : undefined,
      },
    });

    revalidateServicePaths();
    return { success: true, service: JSON.parse(JSON.stringify(service)) };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to create service" };
  }
}

export async function updateService(id: string, data: Partial<ServicePayload> | Partial<any>) {
  try {
    await connectToDatabase();

    const update = { ...data };
    if (data.subcategory !== undefined) {
      update.subcategory = data.subcategory?.trim() || "";
    }
    if (data.brandOrProducts !== undefined) {
      update.brandOrProducts = data.brandOrProducts?.trim() || "";
    }
    if (data.pricing) {
      update.pricing = {
        ...data.pricing,
        currency: data.pricing.currency || "INR",
        regularAmount:
          typeof data.pricing.regularAmount === "number" && data.pricing.regularAmount > 0
            ? data.pricing.regularAmount
            : undefined,
      };
    }

    const service = await Service.findByIdAndUpdate(id, { $set: update }, { new: true });
    revalidateServicePaths();
    return { success: true, service: JSON.parse(JSON.stringify(service)) };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update service" };
  }
}

export async function deleteService(id: string) {
  try {
    await connectToDatabase();
    await Service.findByIdAndDelete(id);
    revalidateServicePaths();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete service" };
  }
}
