import { connectToDatabase } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { ServiceCategory } from "@/models/ServiceCategory";
import { ServicesManager } from "@/components/admin/ServicesManager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  await connectToDatabase();

  const [services, categories] = await Promise.all([
    Service.find().sort({ displayOrder: 1, createdAt: -1 }).populate("categoryId").lean(),
    ServiceCategory.find().sort({ displayOrder: 1 }).lean(),
  ]);

  const serializedServices = services.map((s: any) => ({
    _id: s._id.toString(),
    name: s.name,
    slug: s.slug,
    categoryId: s.categoryId?._id ? s.categoryId._id.toString() : "",
    categoryName: s.categoryId?.name || "Uncategorized",
    shortDescription: s.shortDescription,
    description: s.description,
    pricing: s.pricing,
    durationMinutes: s.durationMinutes,
    isFeatured: s.isFeatured,
    isActive: s.isActive,
  }));

  const serializedCategories = categories.map((c: any) => ({
    _id: c._id.toString(),
    name: c.name,
    slug: c.slug,
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-serif text-primary">Services Catalogue Management</h2>
        <p className="text-xs text-espresso/60 mt-0.5">
          Add, edit, reprice, or feature in-home beauty rituals and departments.
        </p>
      </div>

      <ServicesManager
        initialServices={serializedServices}
        categories={serializedCategories}
      />
    </div>
  );
}

