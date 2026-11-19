import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { Service } from "@/models/Service";
import {
  CalendarCheck,
  Inbox,
  Sparkles,
  TrendingUp,
  Plus,
  Upload,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  await connectToDatabase();

  const [totalBookings, newEnquiries, confirmedBookings, completedBookings, activeServices, recentBookings] =
    await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "new" }),
      Booking.countDocuments({ status: "confirmed" }),
      Booking.countDocuments({ status: "completed" }),
      Service.countDocuments({ isActive: true }),
      Booking.find()
        .select("bookingReference customer.fullName service.serviceName status createdAt")
        .sort({ createdAt: -1 })
        .limit(6)
        .lean(),
    ]);

  const stats = [
    {
      label: "TOTAL BOOKINGS",
      value: totalBookings,
      change: "All-time enquiries",
      icon: CalendarCheck,
      color: "text-primary",
    },
    {
      label: "NEW INQUIRIES",
      value: newEnquiries,
      change: "Requires review",
      icon: Inbox,
      color: "text-amber-600",
    },
    {
      label: "CONFIRMED VISITS",
      value: confirmedBookings,
      change: `${completedBookings} completed`,
      icon: TrendingUp,
      color: "text-emerald-700",
    },
    {
      label: "ACTIVE SERVICES",
      value: activeServices,
      change: "In catalog",
      icon: Sparkles,
      color: "text-secondary-dark",
    },
  ];

  const getStatusPill = (status: string) => {
    switch (status) {
      case "new":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "contacted":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-primary">Overview</h2>
          <p className="text-xs text-espresso/60 mt-0.5">
            Concierge desk snapshot — bookings, enquiries, and catalogue health.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            prefetch
            href="/admin/bookings?status=new"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-primary text-surface text-[11px] font-semibold uppercase tracking-wider"
          >
            New enquiries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            prefetch
            href="/admin/services"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-admin-border bg-white text-[11px] font-semibold uppercase tracking-wider text-espresso"
          >
            <Plus className="w-3.5 h-3.5" /> Services
          </Link>
          <Link
            prefetch
            href="/admin/gallery"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-admin-border bg-white text-[11px] font-semibold uppercase tracking-wider text-espresso"
          >
            <Upload className="w-3.5 h-3.5" /> Gallery
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border border-admin-border rounded-lg p-4 sm:p-5 shadow-card"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-espresso/50">
                  {stat.label}
                </span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="font-serif text-2xl sm:text-3xl text-primary mt-2">{stat.value}</p>
              <p className="text-[11px] text-espresso/55 mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-admin-border rounded-lg shadow-card overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 border-b border-admin-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-espresso">Recent bookings</h3>
          <Link
            prefetch
            href="/admin/bookings"
            className="text-[11px] font-semibold uppercase tracking-wider text-primary hover:text-secondary"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-admin-border">
          {recentBookings.length === 0 ? (
            <p className="p-6 text-xs text-espresso/55 font-light">No bookings yet.</p>
          ) : (
            recentBookings.map((b: any) => (
              <Link
                key={b._id.toString()}
                prefetch
                href={`/admin/bookings?selected=${b._id.toString()}`}
                className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 hover:bg-surface-admin/50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-espresso truncate">
                    {b.customer?.fullName}
                  </p>
                  <p className="text-[11px] text-espresso/55 truncate mt-0.5">
                    {b.service?.serviceName} · {b.bookingReference}
                  </p>
                </div>
                <span
                  className={`flex-shrink-0 inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusPill(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
