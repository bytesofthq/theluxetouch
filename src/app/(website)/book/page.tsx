import { connectToDatabase } from "@/lib/mongodb";
import { ServiceCategory } from "@/models/ServiceCategory";
import { Service } from "@/models/Service";
import { BookingForm } from "@/components/website/BookingForm";
import { Sparkles, Shield, Clock, IndianRupee } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Book Appointment | The Luxè Touch",
  description: "Book a beauty or salon home service. Confirmed by call and WhatsApp.",
};

export const revalidate = 300;

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  await connectToDatabase();
  const { service: preselectedServiceId } = await searchParams;

  const [categories, services] = await Promise.all([
    ServiceCategory.find({ isActive: true })
      .select("name")
      .sort({ displayOrder: 1 })
      .lean(),
    Service.find({ isActive: true })
      .select("name categoryId")
      .sort({ displayOrder: 1 })
      .lean(),
  ]);

  const serializedCategories = categories.map((c: any) => ({
    _id: c._id.toString(),
    name: c.name,
  }));

  const serializedServices = services.map((s: any) => ({
    _id: s._id.toString(),
    name: s.name,
    categoryId: s.categoryId.toString(),
  }));

  const steps = [
    "Visit the website",
    "Select your service and preferred date / time",
    "Submit your appointment request",
    "Our team receives your request",
    "We confirm your appointment by WhatsApp or phone call",
  ];

  return (
    <div className="w-full bg-surface py-16">
      <div className="max-w-[900px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
            BOOK YOUR VISIT
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-primary tracking-tight mt-2">
            Book Your Appointment
          </h1>
          <p className="text-sm text-espresso/70 mt-3 font-light leading-relaxed">
            Open Sunday to Saturday, 9:00 AM – 6:00 PM. We confirm appointments by phone call and
            WhatsApp.
          </p>
        </div>

        {/* Booking process */}
        <div className="mb-8 p-6 bg-surface-container-low rounded ring-1 ring-secondary/25">
          <p className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold mb-4">
            How booking works
          </p>
          <ol className="space-y-2.5">
            {steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm text-espresso/80 font-light">
                <span className="font-serif text-secondary text-lg leading-none w-6 flex-shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Key booking facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 text-center bg-surface-container p-4 rounded text-xs text-espresso/80">
          <div className="flex flex-col items-center gap-1">
            <IndianRupee className="w-4 h-4 text-secondary" />
            <span className="font-semibold">₹100 advance transport</span>
            <span className="text-[10px] text-espresso/60">₹150 over 15 km</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="font-semibold">Cash & online</span>
            <span className="text-[10px] text-espresso/60">UPI, cards & more</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Shield className="w-4 h-4 text-secondary" />
            <span className="font-semibold">Advance required</span>
            <span className="text-[10px] text-espresso/60">Confirms your booking</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Clock className="w-4 h-4 text-secondary" />
            <span className="font-semibold">Sun – Sat</span>
            <span className="text-[10px] text-espresso/60">9:00 AM – 6:00 PM</span>
          </div>
        </div>

        <p className="text-xs text-espresso/65 font-light mb-6 text-center">
          Full cancellation, refund and payment rules are on our{" "}
          <Link href="/our-promise" className="text-primary underline hover:text-secondary">
            Our Promise
          </Link>{" "}
          page.
        </p>

        <BookingForm
          categories={serializedCategories}
          services={serializedServices}
          preselectedServiceId={preselectedServiceId}
        />
      </div>
    </div>
  );
}
