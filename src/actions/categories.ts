"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { ServiceCategory } from "@/models/ServiceCategory";
import { revalidatePath } from "next/cache";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function revalidateServicePaths() {
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/book");
  revalidatePath("/admin/services");
}

export async function createCategory(data: {
  name: string;
  description?: string;
  displayOrder?: number;
}) {
  try {
    await connectToDatabase();
    const name = data.name.trim();
    if (!name) {
      return { success: false, error: "Category name is required" };
    }

    let slug = slugify(name);
    const existing = await ServiceCategory.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const category = await ServiceCategory.create({
      name,
      slug,
      description: data.description?.trim() || "",
      displayOrder: data.displayOrder ?? 0,
      isActive: true,
    });

    revalidateServicePaths();
    return { success: true, category: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to create category" };
  }
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    description?: string;
    isActive?: boolean;
    displayOrder?: number;
  }
) {
  try {
    await connectToDatabase();
    const update: Record<string, unknown> = {};

    if (typeof data.name === "string" && data.name.trim()) {
      update.name = data.name.trim();
      update.slug = slugify(data.name);
    }
    if (typeof data.description === "string") {
      update.description = data.description.trim();
    }
    if (typeof data.isActive === "boolean") {
      update.isActive = data.isActive;
    }
    if (typeof data.displayOrder === "number") {
      update.displayOrder = data.displayOrder;
    }

    const category = await ServiceCategory.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    revalidateServicePaths();
    return { success: true, category: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await connectToDatabase();
    const serviceCount = await Service.countDocuments({ categoryId: id });
    if (serviceCount > 0) {
      return {
        success: false,
        error: `Cannot delete: ${serviceCount} service(s) still use this category. Move or delete those services first, or deactivate the category.`,
      };
    }

    await ServiceCategory.findByIdAndDelete(id);
    revalidateServicePaths();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete category" };
  }
}
