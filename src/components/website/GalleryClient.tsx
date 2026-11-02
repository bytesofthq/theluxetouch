"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Sparkles } from "lucide-react";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  category: string;
  image: {
    url: string;
    alt?: string;
  };
}

export function GalleryClient({ initialImages }: { initialImages: GalleryItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = ["all", "bridal", "makeup", "hair", "skincare"];

  const filtered =
    selectedCategory === "all"
      ? initialImages
      : initialImages.filter((img) => img.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded text-xs uppercase tracking-wider font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-primary text-surface shadow-sm"
                : "bg-surface-container text-espresso/70 hover:bg-surface-container-high"
            }`}
          >
            {cat === "all" ? "All Works" : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item._id}
            onClick={() => setActiveLightbox(item)}
            className="group relative aspect-[3/4] rounded overflow-hidden shadow-md cursor-pointer bg-surface-container-low"
          >
            <Image
              src={item.image.url}
              alt={item.image.alt || item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-surface">
              <span className="text-[11px] uppercase tracking-widest text-secondary-fixed font-semibold">
                {item.category}
              </span>
              <p className="font-serif text-xl mt-1">{item.title}</p>
              {item.description && (
                <p className="text-xs text-surface/80 mt-1 font-light line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-espresso/60 font-light">
          No editorial photographs currently in this collection.
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-espresso/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-surface rounded overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-sm text-espresso flex items-center justify-center hover:bg-surface transition-colors shadow"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full md:w-3/5 aspect-[4/5] md:aspect-auto h-[50vh] md:h-auto">
              <Image
                src={activeLightbox.image.url}
                alt={activeLightbox.image.alt || activeLightbox.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-surface">
              <div>
                <span className="text-xs uppercase tracking-widest text-secondary font-semibold">
                  {activeLightbox.category}
                </span>
                <h3 className="font-serif text-3xl text-primary mt-2 mb-4">
                  {activeLightbox.title}
                </h3>
                {activeLightbox.description && (
                  <p className="text-sm text-espresso/80 font-light leading-relaxed">
                    {activeLightbox.description}
                  </p>
                )}
              </div>

              <div className="pt-8 border-t border-secondary/20">
                <a
                  href="/book"
                  className="w-full inline-flex items-center justify-center py-3 bg-primary text-surface rounded text-xs uppercase tracking-wider font-semibold hover:bg-primary-dark transition-colors"
                >
                  Book In-Home Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

