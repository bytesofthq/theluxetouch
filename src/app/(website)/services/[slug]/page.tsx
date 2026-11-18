import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { connectToDatabase } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { Clock, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  await connectToDatabase();
  const { slug } = await params;
  const service = await Service.findOne({ slug }).lean();

  if (!service) {
    return { title: "Service Not Found | The Luxe Touch" };
  }

  return {
    title: `${service.name} | The Luxe Touch Luxury Services`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connectToDatabase();
  const { slug } = await params;
  const service = await Service.findOne({ slug }).populate("categoryId").lean();

  if (!service) {
    notFound();
  }

  return (
    <div className="w-full bg-surface py-16">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-espresso/70 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />           Back to Services
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Main Content */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
              {(service.categoryId as any)?.name || "Beauty Service"}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl text-primary tracking-tight">
              {service.name}
            </h1>

            <p className="text-lg text-espresso/80 font-light leading-relaxed">
              {service.shortDescription}
            </p>

            <div className="flex items-center gap-6 py-4 border-y border-secondary/20 my-2">
              {service.durationMinutes && (
                <div className="flex items-center gap-2 text-sm text-espresso">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>{service.durationMinutes} Minutes</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-espresso">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>At-Home Service</span>
              </div>
            </div>

            <div className="prose prose-stone text-sm text-espresso/80 leading-relaxed font-light">
              <h3 className="font-serif text-xl text-primary font-normal mt-4 mb-2">
                About This Service
              </h3>
              <p>{service.description || service.shortDescription}</p>

              <h3 className="font-serif text-xl text-primary font-normal mt-6 mb-2">
                What to Expect
              </h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>We arrive 15 minutes early to set up and clean the area.</li>
                <li>Clean tools are opened in front of you.</li>
                <li>Products are chosen to suit your skin and hair.</li>
                <li>We clean up fully before we leave.</li>
              </ul>
            </div>
          </div>

          {/* Booking Card */}
          <div className="md:col-span-5 bg-surface-container-low p-8 rounded ring-1 ring-secondary/30 shadow-lg sticky top-28">
            <span className="text-xs uppercase text-secondary font-semibold tracking-wider">
              Price
            </span>
            <div className="font-serif text-3xl text-primary mt-1 mb-6">
              {service.pricing.mode === "fixed" && service.pricing.amount
                ? formatCurrency(service.pricing.amount, service.pricing.currency)
                : service.pricing.mode === "starting_at" && service.pricing.amount
                ? `Starting at ${formatCurrency(service.pricing.amount, service.pricing.currency)}`
                : "Price on request"}
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href={`/book?service=${service._id.toString()}`}
                className="w-full py-3.5 bg-primary text-surface text-center rounded text-xs uppercase tracking-[0.16em] font-semibold hover:bg-primary-dark transition-colors shadow-md"
              >
                Book This Service
              </Link>

              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(
                  `Hello The Luxe Touch! I would like to know more about "${service.name}".`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-surface text-primary border border-secondary/50 text-center rounded text-xs uppercase tracking-[0.16em] font-semibold hover:bg-secondary/10 transition-colors"
              >
                Ask on WhatsApp
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-secondary/20 flex flex-col gap-2 text-xs text-espresso/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>100% Clean At-Home Kit</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>Trained & Trusted Stylists</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

