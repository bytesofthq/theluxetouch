import { connectToDatabase } from "@/lib/mongodb";
import { PageContent } from "@/models/PageContent";
import { Testimonial } from "@/models/Testimonial";
import { ContentManager } from "@/components/admin/ContentManager";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  await connectToDatabase();

  const [heroContent, testimonials] = await Promise.all([
    PageContent.findOne({ page: "home", section: "hero" }).lean(),
    Testimonial.find().sort({ displayOrder: 1, createdAt: -1 }).lean(),
  ]);

  const serializedHero = heroContent ? JSON.parse(JSON.stringify(heroContent.content)) : null;
  const serializedTestimonials = testimonials.map((t: any) => ({
    _id: t._id.toString(),
    customerName: t.customerName,
    roleOrLocation: t.roleOrLocation,
    review: t.review,
    rating: t.rating,
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif text-primary">Website Content Management System</h2>
        <p className="text-xs text-espresso/60 mt-0.5">
          Modify live copy, homepage announcements, brand narratives, and client testimonials.
        </p>
      </div>

      <ContentManager
        initialHero={serializedHero}
        initialTestimonials={serializedTestimonials}
      />
    </div>
  );
}
