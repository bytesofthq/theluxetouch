"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Booking, BookingStatus } from "@/models/Booking";
import { Service } from "@/models/Service";
import { ServiceCategory } from "@/models/ServiceCategory";
import { BookingSchema, BookingFormData } from "@/lib/validations/booking";
import { sendBookingNotificationEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";

function generateBookingReference(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `LT-${dateStr}-${randomSuffix}`;
}

export async function submitBookingEnquiry(rawFormData: BookingFormData) {
  try {
    const validated = BookingSchema.parse(rawFormData);
    await connectToDatabase();

    const service = await Service.findById(validated.serviceId).populate("categoryId");
    if (!service) {
      return { success: false, error: "Selected service is no longer available." };
    }

    const category = await ServiceCategory.findById(validated.categoryId);

    const bookingReference = generateBookingReference();

    const newBooking = await Booking.create({
      bookingReference,
      customer: {
        fullName: validated.fullName,
        phone: validated.phone,
        email: validated.email || undefined,
      },
      service: {
        serviceId: service._id,
        serviceName: service.name,
        categoryName: category?.name || "Beauty Ritual",
        pricingSnapshot: {
          mode: service.pricing.mode,
          amount: service.pricing.amount,
          currency: service.pricing.currency || "INR",
        },
        durationMinutes: service.durationMinutes,
      },
      appointment: {
        preferredDate: validated.preferredDate,
        preferredTime: validated.preferredTime,
        locationType: validated.locationType,
        address: validated.address,
      },
      additionalNotes: validated.additionalNotes,
      status: "new",
      statusHistory: [
        {
          status: "new",
          changedAt: new Date(),
          changedBy: "customer",
          note: "Enquiry submitted via website",
        },
      ],
    });

    // Attempt non-blocking email notification
    sendBookingNotificationEmail({
      bookingReference,
      customerName: validated.fullName,
      phone: validated.phone,
      serviceName: service.name,
      preferredDate: validated.preferredDate,
      preferredTime: validated.preferredTime,
      address: validated.address,
    }).catch(console.error);

    revalidatePath("/admin/bookings");
    revalidatePath("/admin");

    return {
      success: true,
      bookingReference,
      bookingId: newBooking._id.toString(),
    };
  } catch (error: any) {
    console.error("Failed to submit booking enquiry:", error);
    return {
      success: false,
      error: error?.message || "Failed to process booking enquiry. Please try again.",
    };
  }
}

export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus,
  adminNote?: string,
  changedBy: string = "admin"
) {
  try {
    await connectToDatabase();

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    booking.status = newStatus;
    if (adminNote) {
      booking.adminNotes = adminNote;
    }

    booking.statusHistory.push({
      status: newStatus,
      changedAt: new Date(),
      changedBy,
      note: adminNote,
    });

    await booking.save();

    revalidatePath("/admin/bookings");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update status" };
  }
}

