"use client";

import { useMemo, useState } from "react";
import { createService, updateService, deleteService } from "@/actions/services";
import { createCategory, updateCategory, deleteCategory } from "@/actions/categories";
import {
  Plus,
  Search,
  Sparkles,
  Edit2,
  Trash2,
  X,
  FolderPlus,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { getServicePriceDisplay } from "@/lib/utils";

interface ServiceItem {
  _id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  subcategory?: string;
  brandOrProducts?: string;
  shortDescription: string;
  description?: string;
  pricing: {
    mode: "fixed" | "starting_at" | "quote_required" | "hidden";
    amount?: number;
    regularAmount?: number;
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
  description?: string;
  isActive: boolean;
  displayOrder: number;
  serviceCount: number;
}

export function ServicesManager({
  initialServices,
  initialCategories,
}: {
  initialServices: ServiceItem[];
  initialCategories: CategoryItem[];
}) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Service modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategories[0]?._id || "");
  const [subcategory, setSubcategory] = useState("");
  const [brandOrProducts, setBrandOrProducts] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [pricingMode, setPricingMode] =
    useState<"fixed" | "starting_at" | "quote_required" | "hidden">("fixed");
  const [amount, setAmount] = useState<number>(0);
  const [regularAmount, setRegularAmount] = useState<number>(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Category modal
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [catName, setCatName] = useState("");
  const [catDescription, setCatDescription] = useState("");
  const [catDisplayOrder, setCatDisplayOrder] = useState(0);
  const [isSavingCat, setIsSavingCat] = useState(false);
  const [catError, setCatError] = useState("");

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name)),
    [categories]
  );

  const openCreateModal = () => {
    setEditingService(null);
    setName("");
    setSlug("");
    setCategoryId(categories[0]?._id || "");
    setSubcategory("");
    setBrandOrProducts("");
    setShortDescription("");
    setDescription("");
    setPricingMode("fixed");
    setAmount(0);
    setRegularAmount(0);
    setDurationMinutes(60);
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setName(service.name);
    setSlug(service.slug);
    setCategoryId(service.categoryId);
    setSubcategory(service.subcategory || "");
    setBrandOrProducts(service.brandOrProducts || "");
    setShortDescription(service.shortDescription);
    setDescription(service.description || "");
    setPricingMode(service.pricing.mode);
    setAmount(service.pricing.amount || 0);
    setRegularAmount(service.pricing.regularAmount || 0);
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
      subcategory: subcategory.trim(),
      brandOrProducts: brandOrProducts.trim(),
      shortDescription,
      description,
      pricing: {
        mode: pricingMode,
        amount: Number(amount) || undefined,
        regularAmount: Number(regularAmount) || undefined,
        currency: "INR",
      },
      durationMinutes: Number(durationMinutes) || undefined,
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
            _id: res.service._id,
            categoryName: catObj?.name || "Uncategorized",
            subcategory: payload.subcategory,
            brandOrProducts: payload.brandOrProducts,
            pricing: {
              ...payload.pricing,
              currency: "INR",
            },
          },
          ...services,
        ]);
        setCategories(
          categories.map((c) =>
            c._id === categoryId ? { ...c, serviceCount: c.serviceCount + 1 } : c
          )
        );
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
    if (!confirm(`Are you sure you want to delete "${serviceName}"?`)) return;
    const service = services.find((s) => s._id === id);
    const res = await deleteService(id);
    if (res.success) {
      setServices(services.filter((s) => s._id !== id));
      if (service?.categoryId) {
        setCategories(
          categories.map((c) =>
            c._id === service.categoryId
              ? { ...c, serviceCount: Math.max(0, c.serviceCount - 1) }
              : c
          )
        );
      }
    }
  };

  const openCreateCategory = () => {
    setEditingCategory(null);
    setCatName("");
    setCatDescription("");
    setCatDisplayOrder(categories.length);
    setCatError("");
    setIsCatModalOpen(true);
  };

  const openEditCategory = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatDescription(cat.description || "");
    setCatDisplayOrder(cat.displayOrder);
    setCatError("");
    setIsCatModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCat(true);
    setCatError("");

    if (editingCategory) {
      const res = await updateCategory(editingCategory._id, {
        name: catName,
        description: catDescription,
        displayOrder: Number(catDisplayOrder),
      });
      if (res.success && res.category) {
        setCategories(
          categories.map((c) =>
            c._id === editingCategory._id
              ? {
                  ...c,
                  name: res.category.name,
                  slug: res.category.slug,
                  description: res.category.description || "",
                  displayOrder: res.category.displayOrder ?? c.displayOrder,
                }
              : c
          )
        );
        setServices(
          services.map((s) =>
            s.categoryId === editingCategory._id
              ? { ...s, categoryName: res.category.name }
              : s
          )
        );
        setIsCatModalOpen(false);
      } else {
        setCatError(res.error || "Failed to update category");
      }
    } else {
      const res = await createCategory({
        name: catName,
        description: catDescription,
        displayOrder: Number(catDisplayOrder),
      });
      if (res.success && res.category) {
        setCategories([
          ...categories,
          {
            _id: res.category._id,
            name: res.category.name,
            slug: res.category.slug,
            description: res.category.description || "",
            isActive: res.category.isActive !== false,
            displayOrder: res.category.displayOrder ?? 0,
            serviceCount: 0,
          },
        ]);
        if (!categoryId) setCategoryId(res.category._id);
        setIsCatModalOpen(false);
      } else {
        setCatError(res.error || "Failed to create category");
      }
    }

    setIsSavingCat(false);
  };

  const handleToggleCategoryActive = async (cat: CategoryItem) => {
    const res = await updateCategory(cat._id, { isActive: !cat.isActive });
    if (res.success) {
      setCategories(
        categories.map((c) => (c._id === cat._id ? { ...c, isActive: !cat.isActive } : c))
      );
    }
  };

  const handleDeleteCategory = async (cat: CategoryItem) => {
    if (!confirm(`Delete category "${cat.name}"?`)) return;
    const res = await deleteCategory(cat._id);
    if (res.success) {
      setCategories(categories.filter((c) => c._id !== cat._id));
      if (selectedCat === cat._id) setSelectedCat("all");
    } else {
      alert(res.error || "Failed to delete category");
    }
  };

  const filtered = services.filter((s) => {
    const matchesCat = selectedCat === "all" ? true : s.categoryId === selectedCat;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.shortDescription.toLowerCase().includes(q) ||
      (s.subcategory || "").toLowerCase().includes(q) ||
      (s.brandOrProducts || "").toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Categories panel */}
      <div className="bg-white rounded-lg border border-admin-border shadow-card p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-serif text-lg text-primary">Categories</h3>
            <p className="text-[11px] text-espresso/55 mt-0.5">
              Add departments like Skincare, Haircare, Honey Waxing — then assign services to them.
            </p>
          </div>
          <button
            onClick={openCreateCategory}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-surface-admin text-primary border border-admin-border rounded text-xs font-semibold hover:bg-secondary/20 transition-colors"
          >
            <FolderPlus className="w-3.5 h-3.5" /> Add Category
          </button>
        </div>

        {sortedCategories.length === 0 ? (
          <p className="text-xs text-espresso/50 py-4 text-center border border-dashed border-admin-border rounded">
            No categories yet. Add one to start building your catalogue.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[560px]">
              <thead className="text-espresso/50 uppercase text-[10px] tracking-wider font-semibold border-b border-admin-border">
                <tr>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Services</th>
                  <th className="px-2 py-2">Order</th>
                  <th className="px-2 py-2 text-center">Live</th>
                  <th className="px-2 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {sortedCategories.map((c) => (
                  <tr key={c._id} className="hover:bg-surface-admin/40">
                    <td className="px-2 py-2.5">
                      <p className="font-semibold text-espresso">{c.name}</p>
                      {c.description ? (
                        <p className="text-[11px] text-espresso/50 font-light truncate max-w-xs">
                          {c.description}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-2 py-2.5 text-espresso/70">{c.serviceCount}</td>
                    <td className="px-2 py-2.5 text-espresso/70">{c.displayOrder}</td>
                    <td className="px-2 py-2.5 text-center">
                      <button
                        onClick={() => handleToggleCategoryActive(c)}
                        className="inline-flex items-center justify-center text-espresso/60 hover:text-primary"
                        title={c.isActive ? "Active on website" : "Hidden on website"}
                      >
                        {c.isActive ? (
                          <ToggleRight className="w-5 h-5 text-emerald-700" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="px-2 py-2.5 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => openEditCategory(c)}
                          className="p-1.5 rounded hover:bg-surface-admin text-espresso/70 hover:text-primary"
                          title="Edit category"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(c)}
                          className="p-1.5 rounded hover:bg-red-50 text-espresso/70 hover:text-red-600"
                          title="Delete category"
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
        )}
      </div>

      {/* Action Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-lg border border-admin-border shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 max-w-full no-scrollbar flex-nowrap sm:flex-wrap">
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex-shrink-0 ${
              selectedCat === "all"
                ? "bg-primary text-surface shadow-sm"
                : "bg-surface-admin text-espresso/70 hover:bg-surface-admin/80"
            }`}
          >
            All Categories
          </button>
          {sortedCategories.map((c) => (
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
              {!c.isActive ? " (hidden)" : ""}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <div className="relative w-full sm:w-60">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded bg-surface-admin text-xs border border-admin-border text-espresso focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="w-4 h-4 text-espresso/40 absolute left-3 top-2.5" />
          </div>

          <button
            onClick={openCreateModal}
            disabled={categories.length === 0}
            className="w-full sm:w-auto justify-center px-4 py-2 bg-primary text-surface rounded text-xs font-semibold hover:bg-primary-dark transition-colors shadow-sm flex items-center gap-1.5 flex-shrink-0 disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" /> New Service
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg border border-admin-border shadow-card overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs min-w-[860px]">
            <thead className="bg-surface-admin text-espresso/50 uppercase text-[10px] tracking-wider font-semibold border-b border-admin-border">
              <tr>
                <th className="px-5 py-3.5">Service</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Duration</th>
                <th className="px-5 py-3.5 text-center">Featured</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border text-espresso">
              {filtered.map((s) => {
                const price = getServicePriceDisplay(s.pricing);
                return (
                  <tr key={s._id} className="hover:bg-surface-admin/40 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-espresso">{s.name}</p>
                      <p className="text-[11px] text-espresso/60 truncate max-w-xs mt-0.5 font-light">
                        {[s.subcategory, s.brandOrProducts].filter(Boolean).join(" · ") ||
                          s.shortDescription}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-secondary-dark font-medium">{s.categoryName}</td>
                    <td className="px-5 py-4">
                      <span className="font-semibold">{price.label}</span>
                      {price.regularLabel ? (
                        <span className="block text-[10px] text-espresso/45 line-through mt-0.5">
                          {price.regularLabel}
                        </span>
                      ) : (
                        <span className="block text-[10px] text-espresso/50 capitalize mt-0.5">
                          {s.pricing.mode.replace("_", " ")}
                        </span>
                      )}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg border border-admin-border shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 sm:p-8 my-auto">
            <div className="flex items-center justify-between border-b border-admin-border pb-3 sm:pb-4 mb-4 sm:mb-6">
              <h3 className="font-serif text-xl sm:text-2xl text-primary font-normal">
                {editingService ? "Edit Service" : "Create New Service"}
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
                  placeholder="e.g. Full Legs Honey Wax"
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                    Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
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
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    placeholder="e.g. Facial Kits, Hair Spa"
                    className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                  Brand / Products Used
                </label>
                <input
                  type="text"
                  value={brandOrProducts}
                  onChange={(e) => setBrandOrProducts(e.target.value)}
                  placeholder="e.g. VLCC, Honey Wax, Rica Wax"
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                    Pricing Mode *
                  </label>
                  <select
                    value={pricingMode}
                    onChange={(e) => setPricingMode(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="fixed">Fixed / Offer Price</option>
                    <option value="starting_at">Starting At</option>
                    <option value="quote_required">Price on Request</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                    Regular Price (INR)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={regularAmount}
                    onChange={(e) => setRegularAmount(Number(e.target.value))}
                    disabled={pricingMode === "quote_required" || pricingMode === "hidden"}
                    placeholder="Optional"
                    className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-40"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                    Offer / Live Price (INR)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    disabled={pricingMode === "quote_required" || pricingMode === "hidden"}
                    className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  min={0}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
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
                  placeholder="One or two sentences about this service..."
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                  Full Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="More details for the service page..."
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
                  Feature this service on the homepage
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

      {/* Category Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg border border-admin-border shadow-2xl max-w-md w-full p-5 sm:p-6 my-auto">
            <div className="flex items-center justify-between border-b border-admin-border pb-3 mb-4">
              <h3 className="font-serif text-xl text-primary">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h3>
              <button
                onClick={() => setIsCatModalOpen(false)}
                className="p-1 rounded text-espresso/50 hover:text-espresso hover:bg-surface-admin"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Honey Waxing"
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={catDescription}
                  onChange={(e) => setCatDescription(e.target.value)}
                  placeholder="Short blurb shown on the services page"
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={catDisplayOrder}
                  onChange={(e) => setCatDisplayOrder(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {catError ? <p className="text-red-600 text-xs">{catError}</p> : null}

              <div className="flex justify-end gap-2 pt-3 border-t border-admin-border">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-4 py-2 border border-admin-border rounded text-xs font-semibold hover:bg-surface-admin"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingCat}
                  className="px-5 py-2 bg-primary text-surface rounded text-xs font-semibold hover:bg-primary-dark disabled:opacity-50"
                >
                  {isSavingCat ? "Saving..." : editingCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
