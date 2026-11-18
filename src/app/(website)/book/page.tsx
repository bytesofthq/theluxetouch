import { connectToDatabase } from "@/lib/mongodb";
import { ServiceCategory } from "@/models/ServiceCategory";
import { Service } from "@/models/Service";
import { BookingForm } from "@/components/website/BookingForm";
import { Sparkles, Shield, Clock } from "lucide-react";

export const metadata = {
  title: "Book Appointment | The Luxe Touch",
  description:
    "Book a beauty, bridal, or hair service at your home.",
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
            BOOK YOUR VISIT
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-primary tracking-tight mt-2">
            Book Your Appointment
          </h1>
          <p className="text-sm text-espresso/70 mt-3 font-light leading-relaxed">
            Choose your service, preferred date, and location. We will check availability and
            confirm your stylist.
          </p>
        </div>

        {/* Value Callouts */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-center bg-surface-container p-4 rounded text-xs text-espresso/80">
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="font-semibold">Clean At-Home Kits</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Shield className="w-4 h-4 text-secondary" />
            <span className="font-semibold">Trusted Stylists</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Clock className="w-4 h-4 text-secondary" />
            <span className="font-semibold">On Time & Private</span>
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

