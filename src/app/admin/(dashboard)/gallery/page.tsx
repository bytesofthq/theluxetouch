import { connectToDatabase } from "@/lib/mongodb";
import { GalleryImage } from "@/models/GalleryImage";
import { GalleryManager } from "@/components/admin/GalleryManager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  await connectToDatabase();

  const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();

  const serializedImages = images.map((img: any) => ({
    _id: img._id.toString(),
    title: img.title,
    description: img.description,
    category: img.category,
    image: {
      url: img.image.url,
      publicId: img.image.publicId,
      alt: img.image.alt,
    },
    isFeatured: img.isFeatured,
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif text-primary">Lookbook & Gallery Management</h2>
        <p className="text-xs text-espresso/60 mt-0.5">
          Upload and organize curated high-resolution photography of bridal and beauty sessions.
        </p>
      </div>

      <GalleryManager initialImages={serializedImages} />
    </div>
  );
}
