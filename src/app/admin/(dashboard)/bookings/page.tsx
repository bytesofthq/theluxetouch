import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { BookingsManager } from "@/components/admin/BookingsManager";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    selected?: string;
    page?: string;
    status?: string;
    q?: string;
  }>;
}) {
  await connectToDatabase();
  const { selected, page: pageRaw, status: statusRaw, q: qRaw } = await searchParams;

  const page = Math.max(1, parseInt(pageRaw || "1", 10) || 1);
  const status = (statusRaw || "all").toLowerCase();
  const q = (qRaw || "").trim();

  const filter: Record<string, unknown> = {};
  if (status && status !== "all") {
    filter.status = status;
  }
  if (q) {
    const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [
      { bookingReference: { $regex: safe, $options: "i" } },
      { "customer.fullName": { $regex: safe, $options: "i" } },
      { "customer.phone": { $regex: safe, $options: "i" } },
      { "service.serviceName": { $regex: safe, $options: "i" } },
    ];
  }

  const skip = (page - 1) * PAGE_SIZE;

  const [total, bookings] = await Promise.all([
    Booking.countDocuments(filter),
    Booking.find(filter)
      .select(
        "bookingReference customer service appointment additionalNotes status adminNotes statusHistory createdAt"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .lean(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

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
    statusHistory: (b.statusHistory || []).map((h: any) => ({
      status: h.status,
      changedAt: h.changedAt?.toISOString?.() || h.changedAt,
      changedBy: h.changedBy,
      note: h.note,
    })),
    createdAt: b.createdAt.toISOString(),
  }));

  const buildHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (status && status !== "all") params.set("status", status);
    if (q) params.set("q", q);
    if (nextPage > 1) params.set("page", String(nextPage));
    const qs = params.toString();
    return qs ? `/admin/bookings?${qs}` : "/admin/bookings";
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-primary">
            Patron Bookings & Enquiries
          </h2>
          <p className="text-xs text-espresso/60 mt-0.5">
            Review, manage, confirm, and update appointments — {total} total
            {status !== "all" ? ` · filtered` : ""}.
          </p>
        </div>
      </div>

      <BookingsManager
        initialBookings={serializedBookings}
        initialSelectedId={selected}
        currentStatus={status}
        currentQuery={q}
        page={page}
        totalPages={totalPages}
        total={total}
      />

      {totalPages > 1 ? (
        <div className="flex items-center justify-between gap-3 text-xs">
          <Link
            href={buildHref(Math.max(1, page - 1))}
            prefetch
            className={`px-3 py-2 rounded border border-admin-border bg-white font-semibold ${
              page <= 1 ? "pointer-events-none opacity-40" : "hover:bg-surface-admin"
            }`}
          >
            Previous
          </Link>
          <span className="text-espresso/60">
            Page {page} of {totalPages}
          </span>
          <Link
            href={buildHref(Math.min(totalPages, page + 1))}
            prefetch
            className={`px-3 py-2 rounded border border-admin-border bg-white font-semibold ${
              page >= totalPages ? "pointer-events-none opacity-40" : "hover:bg-surface-admin"
            }`}
          >
            Next
          </Link>
        </div>
      ) : null}
    </div>
  );
}
