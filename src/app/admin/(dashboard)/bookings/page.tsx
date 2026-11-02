import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { BookingsManager } from "@/components/admin/BookingsManager";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ selected?: string }>;
}) {
  await connectToDatabase();
  const { selected } = await searchParams;

  const bookings = await Booking.find().sort({ createdAt: -1 }).lean();

  const serializedBookings = bookings.map((b: any) => ({
    _id: b._id.toString(),
    bookingReference: b.bookingReference,
    customer: {
      fullName: b.customer.fullName,
      phone: b.customer.phone,
      email: b.customer.email,
    },
    service: {
      serviceName: b.service.serviceName,
      categoryName: b.service.categoryName,
      pricingSnapshot: b.service.pricingSnapshot,
      durationMinutes: b.service.durationMinutes,
    },
    appointment: {
      preferredDate: b.appointment.preferredDate,
      preferredTime: b.appointment.preferredTime,
      locationType: b.appointment.locationType,
      address: b.appointment.address,
    },
    additionalNotes: b.additionalNotes,
    status: b.status,
    adminNotes: b.adminNotes,
    statusHistory: b.statusHistory.map((h: any) => ({
      status: h.status,
      changedAt: h.changedAt.toISOString(),
      changedBy: h.changedBy,
      note: h.note,
    })),
    createdAt: b.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-serif text-primary">Bookings Management & Ledger</h2>
        <p className="text-xs text-espresso/60 mt-0.5">
          Review, communicate, and update statuses for patron appointment enquiries.
        </p>
      </div>

      <BookingsManager initialBookings={serializedBookings} initialSelectedId={selected} />
    </div>
  );
}

