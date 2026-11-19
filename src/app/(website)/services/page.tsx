import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { ServiceCategory } from "@/models/ServiceCategory";
import { Service } from "@/models/Service";
import { Clock, ArrowRight } from "lucide-react";
import { getServicePriceDisplay } from "@/lib/utils";

export const revalidate = 300;

export default async function ServicesPage() {
  await connectToDatabase();

  const [categories, services] = await Promise.all([
    ServiceCategory.find({ isActive: true })
      .select("name slug description displayOrder")
      .sort({ displayOrder: 1 })
      .lean(),
    Service.find({ isActive: true })
      .select(
        "name slug shortDescription pricing durationMinutes categoryId subcategory brandOrProducts displayOrder"
      )
      .sort({ displayOrder: 1 })
      .populate("categoryId", "name slug")
      .lean(),
  ]);

  return (
    <div className="w-full bg-surface py-16">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
            OUR SERVICES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-primary tracking-tight mt-2">
            Services
          </h1>
          <p className="text-base text-espresso/70 mt-4 font-light leading-relaxed">
            Every service is done at your home by trained stylists using clean tools, just for you.
          </p>

          {/* Quick jump navigation */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((cat: any) => (
              <a
                key={cat._id.toString()}
                href={`#${cat.slug}`}
                className="px-4 py-1.5 bg-surface-container rounded-full text-xs text-espresso/80 hover:bg-primary hover:text-surface transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>

        {/* Categories and their services */}
        <div className="flex flex-col gap-20">
          {categories.map((cat: any) => {
            const catServices = services.filter(
              (s: any) => s.categoryId?._id.toString() === cat._id.toString()
            );

            return (
              <section key={cat._id.toString()} id={cat.slug} className="scroll-mt-28">
                <div className="border-b border-secondary/30 pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <h2 className="font-serif text-3xl text-primary">{cat.name}</h2>
                    <p className="text-sm text-espresso/70 mt-1 font-light">{cat.description}</p>
                  </div>
                  <span className="text-xs text-secondary uppercase font-semibold">
                    {catServices.length} Treatments Available
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catServices.map((service: any) => (
                    <div
                      key={service._id.toString()}
                      className="bg-surface-container-low p-6 rounded flex flex-col justify-between ring-1 ring-secondary/20 hover:bg-surface-container transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3 gap-2">
                          <span className="text-[11px] uppercase text-secondary font-semibold">
                            {service.subcategory || cat.name}
                          </span>
                          {service.durationMinutes && (
                            <span className="text-[11px] text-espresso/70 bg-surface-container-high px-2 py-0.5 rounded flex items-center gap-1 flex-shrink-0">
                              <Clock className="w-3 h-3" />
                              {service.durationMinutes} Mins
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-2xl text-primary mb-2">
                          {service.name}
                        </h3>

                        {service.brandOrProducts ? (
                          <p className="text-[11px] text-secondary font-medium mb-2">
                            {service.brandOrProducts}
                          </p>
                        ) : null}

                        <p className="text-sm text-espresso/75 mb-6 font-light leading-relaxed">
                          {service.shortDescription}
                        </p>

                        {(() => {
                          const price = getServicePriceDisplay(service.pricing);
                          return (
                            <div className="mb-6">
                              <div className="font-serif text-2xl text-secondary font-light">
                                {price.label}
                              </div>
                              {price.regularLabel ? (
                                <div className="text-sm text-espresso/45 line-through mt-0.5">
                                  {price.regularLabel}
                                </div>
                              ) : null}
                            </div>
                          );
                        })()}
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-secondary/20">
                        <Link
                          href={`/book?service=${service._id.toString()}`}
                          className="flex-1 text-center py-2.5 bg-primary text-surface rounded text-xs uppercase tracking-wider font-semibold hover:bg-primary-dark transition-colors shadow-sm"
                        >
                          Book Visit
                        </Link>
                        <Link
                          href={`/services/${service.slug}`}
                          className="px-4 py-2.5 bg-surface text-primary rounded ring-1 ring-secondary/40 text-xs uppercase tracking-wider hover:bg-secondary/10 transition-colors"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

