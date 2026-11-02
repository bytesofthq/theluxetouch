"use client";

import { useState } from "react";
import Image from "next/image";
import { addGalleryImage, deleteGalleryImage } from "@/actions/gallery";
import { Upload, Trash2, Plus, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  category: "bridal" | "makeup" | "hair" | "skincare" | "general";
  image: {
    url: string;
    publicId: string;
    alt?: string;
  };
  isFeatured: boolean;
}

export function GalleryManager({ initialImages }: { initialImages: GalleryItem[] }) {
  const [images, setImages] = useState<GalleryItem[]>(initialImages);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"bridal" | "makeup" | "hair" | "skincare" | "general">("bridal");
  const [imageUrl, setImageUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFeedback(null);

    try {
      // 1. Fetch server signature
      const sigRes = await fetch("/api/upload/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "the-luxe-touch/gallery" }),
      });

      if (!sigRes.ok) {
        // Fallback: Use direct browser preview or URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
          setFeedback({
            type: "success",
            text: "Image preview loaded locally. Provide title and add to lookbook.",
          });
        };
        reader.readAsDataURL(file);
        setIsUploading(false);
        return;
      }

      const sigData = await sigRes.json();

      // 2. Direct client upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", sigData.apiKey);
      formData.append("timestamp", sigData.timestamp.toString());
      formData.append("signature", sigData.signature);
      formData.append("folder", sigData.folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();

      if (uploadData.secure_url) {
        setImageUrl(uploadData.secure_url);
        setFeedback({
          type: "success",
          text: "Image successfully uploaded to Cloudinary CDN!",
        });
      } else {
        throw new Error(uploadData.error?.message || "Cloudinary upload failed");
      }
    } catch (err: any) {
      console.warn("Upload fallback activated:", err);
      // Fallback: Local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setFeedback({
          type: "success",
          text: "Image preview loaded. Add to save in catalog.",
        });
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !title) {
      setFeedback({ type: "error", text: "Please provide a title and upload or enter an image URL." });
      return;
    }

    const payload = {
      title,
      description,
      category,
      image: {
        url: imageUrl,
        publicId: `luxe_${Date.now()}`,
        alt: title,
      },
      isFeatured,
    };

    const res = await addGalleryImage(payload);
    if (res.success) {
      setImages([res.image, ...images]);
      setTitle("");
      setDescription("");
      setImageUrl("");
      setIsFeatured(false);
      setFeedback({ type: "success", text: "Lookbook photo successfully published!" });
    } else {
      setFeedback({ type: "error", text: res.error || "Failed to publish lookbook image." });
    }
  };

  const handleDelete = async (id: string, imgTitle: string) => {
    if (confirm(`Remove "${imgTitle}" from the public gallery?`)) {
      const res = await deleteGalleryImage(id);
      if (res.success) {
        setImages(images.filter((img) => img._id !== id));
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload & Creator Box */}
      <div className="bg-white p-6 sm:p-8 rounded-lg border border-admin-border shadow-card">
        <h3 className="font-serif text-2xl text-primary mb-2">Publish New Lookbook Artwork</h3>
        <p className="text-xs text-espresso/60 mb-6 font-light">
          Upload editorial photography of bridal ceremonies, hair glazing, or private suite rituals.
        </p>

        {feedback && (
          <div
            className={`p-4 rounded text-xs flex items-center gap-2 mb-6 ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        <form onSubmit={handleSaveImage} className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Dropzone Column */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 border-2 border-dashed border-secondary/50 rounded-lg bg-surface-admin/50 text-center relative hover:bg-surface-admin transition-colors">
            {imageUrl ? (
              <div className="relative w-full aspect-[4/5] rounded overflow-hidden shadow">
                <Image src={imageUrl} alt="Uploaded Preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 bg-espresso/80 text-white p-1 rounded-full text-xs"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6">
                <Upload className="w-8 h-8 text-secondary mb-3" />
                <p className="text-xs font-semibold text-espresso">
                  Drag and drop photo here, or click to browse
                </p>
                <p className="text-[11px] text-espresso/50 mt-1 font-light">
                  PNG, JPG, or WEBP up to 5MB
                </p>
                <label className="mt-4 px-4 py-2 bg-white border border-admin-border rounded text-xs font-semibold text-primary hover:bg-surface-admin cursor-pointer shadow-sm">
                  {isUploading ? "Uploading to CDN..." : "Choose Image File"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Metadata Column */}
          <div className="md:col-span-7 space-y-4 text-xs text-espresso">
            <div>
              <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                Photograph Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Royal Emerald Bridal Dressing Regalia"
                className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary capitalize"
                >
                  <option value="bridal">Bridal</option>
                  <option value="makeup">Makeup</option>
                  <option value="hair">Hair Care</option>
                  <option value="skincare">Skincare</option>
                  <option value="general">General Atelier</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                  Or Direct Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
                Editorial Caption (Optional)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the artistry or client setting..."
                className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featGallery"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-admin-border text-primary focus:ring-primary"
              />
              <label htmlFor="featGallery" className="text-xs font-medium cursor-pointer">
                Feature on Homepage Lookbook Preview
              </label>
            </div>

            <button
              type="submit"
              disabled={isUploading || !imageUrl || !title}
              className="px-6 py-2.5 bg-primary text-surface rounded text-xs uppercase tracking-wider font-semibold hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-40"
            >
              Publish to Lookbook
            </button>
          </div>
        </form>
      </div>

      {/* Existing Images Grid */}
      <div className="bg-white p-6 sm:p-8 rounded-lg border border-admin-border shadow-card">
        <h3 className="text-sm font-bold text-espresso uppercase tracking-wider mb-6">
          Published Lookbook Collection ({images.length})
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {images.map((img) => (
            <div
              key={img._id}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden border border-admin-border bg-surface-admin shadow-sm"
            >
              <Image
                src={img.image.url}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white text-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary-fixed">
                  {img.category}
                </span>
                <p className="font-semibold mt-0.5 line-clamp-1">{img.title}</p>
                <button
                  onClick={() => handleDelete(img._id, img.title)}
                  className="mt-3 flex items-center gap-1.5 text-[11px] text-red-400 hover:text-red-300 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

