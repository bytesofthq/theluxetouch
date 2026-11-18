"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type TestimonialItem = {
  _id: string;
  customerName: string;
  roleOrLocation?: string;
  review: string;
  rating?: number;
};

export function TestimonialsCarousel({ items }: { items: TestimonialItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, items.length]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-testimonial-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (!items.length) return null;

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((test) => (
          <article
            key={test._id}
            data-testimonial-card
            className="snap-start shrink-0 w-[85%] sm:w-[70%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-surface-container-low p-8 ring-1 ring-secondary/20 flex flex-col justify-between min-h-[260px]"
          >
            <div>
              <div className="flex items-center gap-1 text-secondary mb-4" aria-label={`${test.rating || 5} stars`}>
                {Array.from({ length: test.rating || 5 }).map((_, i) => (
                  <span key={i} className="text-lg leading-none">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-espresso/80 font-light leading-relaxed italic">
                &ldquo;{test.review}&rdquo;
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-secondary/20">
              <p className="font-serif text-lg text-primary">{test.customerName}</p>
              <p className="text-xs text-secondary font-medium mt-0.5">
                {test.roleOrLocation || "Happy Client"}
              </p>
            </div>
          </article>
        ))}
      </div>

      {items.length > 1 ? (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Previous testimonials"
            className="w-11 h-11 border border-secondary/40 text-primary flex items-center justify-center transition-colors hover:bg-primary hover:text-surface hover:border-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Next testimonials"
            className="w-11 h-11 border border-secondary/40 text-primary flex items-center justify-center transition-colors hover:bg-primary hover:text-surface hover:border-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
