import { connectToDatabase } from "@/lib/mongodb";
import { GalleryImage } from "@/models/GalleryImage";
import { GalleryClient } from "@/components/website/GalleryClient";

export const revalidate = 60;

export const metadata = {
  title: "Gallery | The Luxe Touch",
  description: "See our bridal looks, hair styling, and skincare work.",
};

export default async function GalleryPage() {
  await connectToDatabase();

  const images = await GalleryImage.find({ isPublished: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .lean();

  const formattedImages = images.map((img: any) => ({
    _id: img._id.toString(),
    title: img.title,
    description: img.description,
    category: img.category,
    image: {
      url: img.image.url,
      alt: img.image.alt || img.title,
    },
  }));

  return (
    <div className="w-full bg-surface py-16">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
            OUR LOOKBOOK
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-primary tracking-tight mt-2">
            Gallery
          </h1>
          <p className="text-base text-espresso/70 mt-3 font-light leading-relaxed">
            A look at our at-home beauty, bridal styling, and hair care work.
          </p>
        </div>

        <GalleryClient initialImages={formattedImages} />
      </div>
    </div>
  );
}

