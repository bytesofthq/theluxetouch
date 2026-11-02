import { connectToDatabase } from "@/lib/mongodb";
import { ServiceCategory } from "@/models/ServiceCategory";
import { Service } from "@/models/Service";
import { BookingForm } from "@/components/website/BookingForm";
import { Sparkles, Shield, Clock } from "lucide-react";

export const metadata = {
  title: "Book In-Home Appointment | The Luxe Touch",
  description:
    "Schedule an exclusive personal beauty, bridal, or hair ritual delivered directly to your doorstep.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  await connectToDatabase();
  const { service: preselectedServiceId } = await searchParams;

  const categories = await ServiceCategory.find({ isActive: true })
    .sort({ displayOrder: 1 })
    .lean();

  const services = await Service.find({ isActive: true })
    .sort({ displayOrder: 1 })
    .lean();

  const serializedCategories = categories.map((c: any) => ({
    _id: c._id.toString(),
    name: c.name,
  }));

  const serializedServices = services.map((s: any) => ({
    _id: s._id.toString(),
    name: s.name,
    categoryId: s.categoryId.toString(),
  }));

  return (
    <div className="w-full bg-surface py-16">
      <div className="max-w-[900px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
            PRIVATE CONCIERGE SCHEDULING
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-primary tracking-tight mt-2">
            Reserve Your Ritual
          </h1>
          <p className="text-sm text-espresso/70 mt-3 font-light leading-relaxed">
            Submit your requested service, preferred date, and location. Our concierge will review
            patron availability and confirm your specialist.
          </p>
        </div>

        {/* Value Callouts */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-center bg-surface-container p-4 rounded text-xs text-espresso/80">
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="font-semibold">Sanitised In-Home Set</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Shield className="w-4 h-4 text-secondary" />
            <span className="font-semibold">Vetted Senior Artisans</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Clock className="w-4 h-4 text-secondary" />
            <span className="font-semibold">Punctual & Discreet</span>
          </div>
        </div>

        <BookingForm
          categories={serializedCategories}
          services={serializedServices}
          preselectedServiceId={preselectedServiceId}
        />
      </div>
    </div>
  );
}

