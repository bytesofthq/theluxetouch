"use client";

import { useState } from "react";
import { updatePageSectionContent, createTestimonial, deleteTestimonial } from "@/actions/content";
import { Save, Plus, Trash2, CheckCircle2 } from "lucide-react";

export function ContentManager({
  initialHero,
  initialTestimonials,
}: {
  initialHero: any;
  initialTestimonials: any[];
}) {
  const [hero, setHero] = useState(
    initialHero || {
      eyebrow: "YOUR PERSONAL BEAUTY RITUAL",
      title: "Beauty, in the comfort of home.",
      description:
        "Experience personalised beauty and grooming services, thoughtfully delivered to your doorstep. Your beauty ritual, your space, your time.",
      primaryCtaText: "Book Your Appointment",
      secondaryCtaText: "Explore Our Services",
    }
  );

  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newRoleOrLocation, setNewRoleOrLocation] = useState("");
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);

  const [isSavingHero, setIsSavingHero] = useState(false);
  const [isSavingTestimonial, setIsSavingTestimonial] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHero(true);
    const res = await updatePageSectionContent("home", "hero", hero);
    setIsSavingHero(false);
    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName || !newReview) return;
    setIsSavingTestimonial(true);

    const payload = {
      customerName: newCustomerName,
      roleOrLocation: newRoleOrLocation,
      review: newReview,
      rating: Number(newRating),
    };

    const res = await createTestimonial(payload);
    setIsSavingTestimonial(false);

    if (res.success) {
      setTestimonials([
        ...testimonials,
        {
          _id: `temp_${Date.now()}`,
          ...payload,
        },
      ]);
      setNewCustomerName("");
      setNewRoleOrLocation("");
      setNewReview("");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (confirm("Delete this client testimonial?")) {
      const res = await deleteTestimonial(id);
      if (res.success) {
        setTestimonials(testimonials.filter((t) => t._id !== id));
      }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Homepage Hero CMS */}
      <div className="bg-white p-4 sm:p-6 sm:p-8 rounded-lg border border-admin-border shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-admin-border pb-4 mb-6">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-primary font-normal">Homepage Hero Section</h3>
            <p className="text-xs text-espresso/60 mt-0.5">
              Edit the lead headlines, taglines, and call-to-action buttons on the public homepage.
            </p>
          </div>
          {saveSuccess && (
            <span className="self-start sm:self-auto flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" /> Published to Website!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveHero} className="space-y-4 text-xs text-espresso">
          <div>
            <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
              Eyebrow Badge Text
            </label>
            <input
              type="text"
              value={hero.eyebrow}
              onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
              className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
              Hero Headline
            </label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
              Lead Description
            </label>
            <textarea
              rows={3}
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-sm focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                Primary CTA Button Label
              </label>
              <input
                type="text"
                value={hero.primaryCtaText}
                onChange={(e) => setHero({ ...hero, primaryCtaText: e.target.value })}
                className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                Secondary CTA Button Label
              </label>
              <input
                type="text"
                value={hero.secondaryCtaText}
                onChange={(e) => setHero({ ...hero, secondaryCtaText: e.target.value })}
                className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="pt-3 sm:pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSavingHero}
              className="w-full sm:w-auto justify-center px-6 py-2.5 bg-primary text-surface rounded text-xs uppercase tracking-wider font-semibold hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              {isSavingHero ? "Saving Changes..." : "Publish Hero Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Patron Testimonials Manager */}
      <div className="bg-white p-4 sm:p-6 sm:p-8 rounded-lg border border-admin-border shadow-card space-y-6 sm:space-y-8">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-primary font-normal">Patron Testimonials</h3>
          <p className="text-xs text-espresso/60 mt-0.5">
            Manage verified client reviews and private estate feedback featured on the public website.
          </p>
        </div>

        {/* Existing Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-4 sm:p-5 rounded bg-surface-admin/60 border border-admin-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary font-bold">{"★".repeat(t.rating || 5)}</span>
                  <button
                    onClick={() => handleDeleteTestimonial(t._id)}
                    className="p-1 rounded text-espresso/40 hover:text-red-600 transition-colors"
                    title="Delete review"
                    aria-label="Delete review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-espresso/80 font-light italic mb-4 leading-relaxed">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-admin-border">
                <p className="font-semibold text-xs text-espresso">{t.customerName}</p>
                <p className="text-[10px] text-secondary-dark">{t.roleOrLocation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Testimonial Form */}
        <form
          onSubmit={handleAddTestimonial}
          className="p-4 sm:p-6 bg-surface-admin rounded-lg border border-admin-border space-y-4 text-xs text-espresso"
        >
          <h4 className="font-bold text-xs uppercase tracking-wider text-espresso/70">
            Add New Client Review
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            <div>
              <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                placeholder="e.g. Radhika Singhania"
                className="w-full px-3.5 py-2 rounded bg-white border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                Location / Role
              </label>
              <input
                type="text"
                value={newRoleOrLocation}
                onChange={(e) => setNewRoleOrLocation(e.target.value)}
                placeholder="e.g. Bandra West, Mumbai"
                className="w-full px-3.5 py-2 rounded bg-white border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                Rating
              </label>
              <select
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded bg-white border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★</option>
                <option value={3}>3 Stars ★★★</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
              Client Feedback *
            </label>
            <textarea
              rows={2}
              required
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="What did the client appreciate about the ritual, sanitisation, or punctuality?"
              className="w-full px-3.5 py-2 rounded bg-white border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={isSavingTestimonial || !newCustomerName || !newReview}
            className="w-full sm:w-auto justify-center px-5 py-2 bg-primary text-surface rounded text-xs font-semibold hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Testimonial
          </button>
        </form>
      </div>
    </div>
  );
}
