import { NextResponse } from "next/server";
import { generateUploadSignature, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { error: "Cloudinary is not configured. Please add CLOUDINARY_API_KEY, CLOUDINARY_NAME, and CLOUDINARY_API_SECRET." },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const folder = body.folder || "the-luxe-touch/gallery";
    const sigData = generateUploadSignature(folder);

    return NextResponse.json(sigData);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}

