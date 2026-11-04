"use client";

import { useState } from "react";
import { createService, updateService, deleteService } from "@/actions/services";
import { Plus, Search, Sparkles, Edit2, Trash2, Check, X, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ServiceItem {
  _id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  shortDescription: string;
  description?: string;
  pricing: {
    mode: "fixed" | "starting_at" | "quote_required" | "hidden";
    amount?: number;
    currency: string;
  };
  durationMinutes?: number;
  isFeatured: boolean;
  isActive: boolean;
}

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
}

export function ServicesManager({
  initialServices,
  categories,
}: {
  initialServices: ServiceItem[];
  categories: CategoryItem[];
}) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?._id || "");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [pricingMode, setPricingMode] = useState<"fixed" | "starting_at" | "quote_required" | "hidden">("fixed");
  const [amount, setAmount] = useState<number>(3000);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const openCreateModal = () => {
    setEditingService(null);
    setName("");
    setSlug("");
    setCategoryId(categories[0]?._id || "");
    setShortDescription("");
    setDescription("");
    setPricingMode("fixed");
    setAmount(3000);
    setDurationMinutes(60);
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setName(service.name);
    setSlug(service.slug);
    setCategoryId(service.categoryId);
    setShortDescription(service.shortDescription);
    setDescription(service.description || "");
    setPricingMode(service.pricing.mode);
    setAmount(service.pricing.amount || 0);
    setDurationMinutes(service.durationMinutes || 60);
    setIsFeatured(service.isFeatured);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      categoryId,
      shortDescription,
      description,
      pricing: {
        mode: pricingMode,
        amount: Number(amount),
        currency: "INR",
      },
      durationMinutes: Number(durationMinutes),
      isFeatured,
      isActive: editingService ? editingService.isActive : true,
    };

    if (editingService) {
      const res = await updateService(editingService._id, payload);
      if (res.success) {
        const catObj = categories.find((c) => c._id === categoryId);
        setServices(
          services.map((s) =>
            s._id === editingService._id
              ? {
                  ...s,
                  ...payload,
                  categoryName: catObj?.name || s.categoryName,
                }
              : s
          )
        );
        setIsModalOpen(false);
      }
    } else {
      const res = await createService(payload);
      if (res.success) {
        const catObj = categories.find((c) => c._id === categoryId);
        setServices([
          {
            ...res.service,
            categoryName: catObj?.name || "Uncategorized",
          },
          ...services,
        ]);
        setIsModalOpen(false);
      }
    }

    setIsSaving(false);
  };

  const handleToggleFeatured = async (service: ServiceItem) => {
    const updated = !service.isFeatured;
    const res = await updateService(service._id, { isFeatured: updated });
    if (res.success) {
      setServices(
        services.map((s) => (s._id === service._id ? { ...s, isFeatured: updated } : s))
      );
    }
  };

  const handleToggleActive = async (service: ServiceItem) => {
    const updated = !service.isActive;
    const res = await updateService(service._id, { isActive: updated });
    if (res.success) {
      setServices(
        services.map((s) => (s._id === service._id ? { ...s, isActive: updated } : s))
      );
    }
  };

  const handleDelete = async (id: string, serviceName: string) => {
    if (confirm(`Are you sure you want to delete "${serviceName}"?`)) {
      const res = await deleteService(id);
      if (res.success) {
        setServices(services.filter((s) => s._id !== id));
      }
    }
  };

  const filtered = services.filter((s) => {
    const matchesCat = selectedCat === "all" ? true : s.categoryId === selectedCat;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-lg border border-admin-border shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 max-w-full no-scrollbar flex-nowrap sm:flex-wrap">
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex-shrink-0 ${
              selectedCat === "all"
                ? "bg-primary text-surface shadow-sm"
                : "bg-surface-admin text-espresso/70 hover:bg-surface-admin/80"
            }`}
          >
            All Departments
          </button>
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => setSelectedCat(c._id)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex-shrink-0 ${
                selectedCat === c._id
                  ? "bg-primary text-surface shadow-sm"
                  : "bg-surface-admin text-espresso/70 hover:bg-surface-admin/80"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <div className="relative w-full sm:w-60">
            <input
              type="text"
              placeholder="Search rituals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded bg-surface-admin text-xs border border-admin-border text-espresso focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="w-4 h-4 text-espresso/40 absolute left-3 top-2.5" />
          </div>

          <button
            onClick={openCreateModal}
            className="w-full sm:w-auto justify-center px-4 py-2 bg-primary text-surface rounded text-xs font-semibold hover:bg-primary-dark transition-colors shadow-sm flex items-center gap-1.5 flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> New Service
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg border border-admin-border shadow-card overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-surface-admin text-espresso/50 uppercase text-[10px] tracking-wider font-semibold border-b border-admin-border">
              <tr>
                <th className="px-5 py-3.5">Treatment Name</th>
                <th className="px-5 py-3.5">Department</th>
                <th className="px-5 py-3.5">Pricing Mode</th>
                <th className="px-5 py-3.5">Duration</th>
                <th className="px-5 py-3.5 text-center">Featured</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border text-espresso">
              {filtered.map((s) => (
                <tr key={s._id} className="hover:bg-surface-admin/40 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-espresso">{s.name}</p>
                    <p className="text-[11px] text-espresso/60 truncate max-w-xs mt-0.5 font-light">
                      {s.shortDescription}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-secondary-dark font-medium">{s.categoryName}</td>
                  <td className="px-5 py-4">
                    <span className="font-semibold">
                      {s.pricing.mode === "fixed" && s.pricing.amount
                        ? formatCurrency(s.pricing.amount, s.pricing.currency)
                        : s.pricing.mode === "starting_at" && s.pricing.amount
                        ? `From ${formatCurrency(s.pricing.amount, s.pricing.currency)}`
                        : "Quote required"}
                    </span>
                    <span className="block text-[10px] text-espresso/50 capitalize mt-0.5">
                      {s.pricing.mode.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-espresso/80">
                    {s.durationMinutes ? `${s.durationMinutes} mins` : "—"}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(s)}
                      className={`w-6 h-6 rounded-full inline-flex items-center justify-center transition-colors ${
                        s.isFeatured
                          ? "bg-secondary text-espresso"
                          : "bg-surface-admin text-espresso/30 hover:text-espresso"
                      }`}
                      title={s.isFeatured ? "Featured on Home" : "Click to feature"}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => handleToggleActive(s)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        s.isActive
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-gray-100 text-gray-600 border border-gray-300"
                      }`}
                    >
                      {s.isActive ? "Active" : "Hidden"}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-1.5 rounded hover:bg-surface-admin text-espresso/70 hover:text-primary transition-colors"
                        title="Edit service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s._id, s.name)}
                        className="p-1.5 rounded hover:bg-red-50 text-espresso/70 hover:text-red-600 transition-colors"
                        title="Delete service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg border border-admin-border shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 sm:p-8 my-auto">
            <div className="flex items-center justify-between border-b border-admin-border pb-3 sm:pb-4 mb-4 sm:mb-6">
              <h3 className="font-serif text-xl sm:text-2xl text-primary font-normal">
                {editingService ? "Edit Service Ritual" : "Create New Service"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-espresso/50 hover:text-espresso hover:bg-surface-admin transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs text-espresso">
              <div>
                <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Imperial Gold Botanical Facial"
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                    Department *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                    Pricing Mode *
                  </label>
                  <select
                    value={pricingMode}
                    onChange={(e) => setPricingMode(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="fixed">Fixed Price</option>
                    <option value="starting_at">Starting At</option>
                    <option value="quote_required">Quote Required</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                    Price (INR)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    disabled={pricingMode === "quote_required" || pricingMode === "hidden"}
                    className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="One or two sentences summarizing the treatment..."
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                  Full Detailed Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Complete ritual walkthrough, ingredients used, preparations..."
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-admin-border text-primary focus:ring-primary"
                />
                <label htmlFor="featuredCheck" className="text-xs font-medium cursor-pointer">
                  Feature this ritual on the Homepage Signature Menu
                </label>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-3 pt-5 border-t border-admin-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 border border-admin-border rounded text-xs font-semibold hover:bg-surface-admin transition-colors text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-2.5 bg-primary text-surface rounded text-xs font-semibold hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-50 text-center"
                >
                  {isSaving ? "Saving..." : editingService ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
