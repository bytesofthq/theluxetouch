import { connectToDatabase } from "@/lib/mongodb";
import { GalleryImage } from "@/models/GalleryImage";
import { GalleryClient } from "@/components/website/GalleryClient";

export const revalidate = 60;

export const metadata = {
  title: "Artisanal Gallery | The Luxe Touch",
  description: "Explore our lookbook of opulent bridal regalia, hair transformations, and skincare rituals.",
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
            THE LOOKBOOK ARCHIVE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-primary tracking-tight mt-2">
            Artisanal Gallery
          </h1>
          <p className="text-base text-espresso/70 mt-3 font-light leading-relaxed">
            A visual documentation of our bespoke at-home beauty, bridal styling, and somatic
            hair therapies.
          </p>
        </div>

        <GalleryClient initialImages={formattedImages} />
      </div>
    </div>
  );
}

