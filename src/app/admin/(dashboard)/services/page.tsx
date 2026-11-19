import { connectToDatabase } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { ServiceCategory } from "@/models/ServiceCategory";
import { ServicesManager } from "@/components/admin/ServicesManager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  await connectToDatabase();

  const [services, categories] = await Promise.all([
    Service.find()
      .select(
        "name slug categoryId subcategory brandOrProducts shortDescription description pricing durationMinutes isFeatured isActive displayOrder"
      )
      .sort({ displayOrder: 1, createdAt: -1 })
      .populate("categoryId", "name")
      .lean(),
    ServiceCategory.find()
      .select("name slug description isActive displayOrder")
      .sort({ displayOrder: 1 })
      .lean(),
  ]);

  const serializedServices = services.map((s: any) => ({
    _id: s._id.toString(),
    name: s.name,
    slug: s.slug,
    categoryId: s.categoryId?._id ? s.categoryId._id.toString() : "",
    categoryName: s.categoryId?.name || "Uncategorized",
    subcategory: s.subcategory || "",
    brandOrProducts: s.brandOrProducts || "",
    shortDescription: s.shortDescription,
    description: s.description,
    pricing: {
      mode: s.pricing?.mode || "fixed",
      amount: s.pricing?.amount,
      regularAmount: s.pricing?.regularAmount,
      currency: s.pricing?.currency || "INR",
    },
    durationMinutes: s.durationMinutes,
    isFeatured: s.isFeatured,
    isActive: s.isActive,
  }));

  const serviceCounts: Record<string, number> = {};
  for (const s of serializedServices) {
    if (s.categoryId) {
      serviceCounts[s.categoryId] = (serviceCounts[s.categoryId] || 0) + 1;
    }
  }

  const serializedCategories = categories.map((c: any) => ({
    _id: c._id.toString(),
    name: c.name,
    slug: c.slug,
    description: c.description || "",
    isActive: c.isActive !== false,
    displayOrder: c.displayOrder ?? 0,
    serviceCount: serviceCounts[c._id.toString()] || 0,
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif text-primary">Services Catalogue Management</h2>
        <p className="text-xs text-espresso/60 mt-0.5">
          Manage categories and services — prices, brands, and catalogue details.
        </p>
      </div>

      <ServicesManager
        initialServices={serializedServices}
        initialCategories={serializedCategories}
      />
    </div>
  );
}
