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
import { formatCurrency } from "@/lib/utils";

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
      Booking.find().sort({ createdAt: -1 }).limit(6).lean(),
    ]);

  const stats = [
    {
      label: "TOTAL BOOKINGS",
      value: totalBookings,
      change: "+18% from last month",
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
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-primary">Good day, Concierge</h2>
          <p className="text-xs text-espresso/60 mt-0.5">
            Here is your daily operational summary and patron reservation schedule.
          </p>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-primary text-surface rounded text-xs font-semibold hover:bg-primary-dark transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Service
          </Link>
          <Link
            href="/admin/gallery"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-white border border-admin-border text-espresso text-xs font-semibold hover:bg-surface-admin transition-colors rounded shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-secondary" /> Upload Photos
          </Link>
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-white border border-admin-border text-espresso text-xs font-semibold hover:bg-surface-admin transition-colors rounded shadow-sm"
          >
            View Bookings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white p-4 sm:p-5 rounded-lg border border-admin-border shadow-card flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-espresso/50">
                  {s.label}
                </span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-sans text-espresso tabular-nums my-1">
                {s.value}
              </div>
              <span className="text-[11px] text-espresso/60 font-light">{s.change}</span>
            </div>
          );
        })}
      </div>

      {/* Recent Patron Enquiries (Full Width) */}
      <div className="bg-white rounded-lg border border-admin-border shadow-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-admin-border flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-espresso tracking-wide uppercase">
              Recent Patron Enquiries
            </h3>
            <p className="text-[10px] sm:text-[11px] text-espresso/60 font-light mt-0.5">
              Live reservations and booking requests submitted by patrons
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-semibold text-secondary-dark hover:underline flex items-center gap-1 flex-shrink-0"
          >
            See all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs min-w-[620px]">
            <thead className="bg-surface-admin/60 text-espresso/50 uppercase text-[10px] tracking-wider font-semibold border-b border-admin-border">
              <tr>
                <th className="px-4 sm:px-5 py-3">Reference / Patron</th>
                <th className="px-4 sm:px-5 py-3">Ritual</th>
                <th className="px-4 sm:px-5 py-3">Schedule</th>
                <th className="px-4 sm:px-5 py-3">Status</th>
                <th className="px-4 sm:px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border text-espresso">
              {recentBookings.map((b: any) => (
                <tr key={b._id.toString()} className="hover:bg-surface-admin/40 transition-colors">
                  <td className="px-4 sm:px-5 py-3.5">
                    <p className="font-mono font-bold text-primary">{b.bookingReference}</p>
                    <p className="text-[11px] text-espresso/70 mt-0.5">{b.customer.fullName}</p>
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 font-medium">{b.service.serviceName}</td>
                  <td className="px-4 sm:px-5 py-3.5 text-espresso/80">
                    <p>{b.appointment.preferredDate}</p>
                    <p className="text-[11px] text-espresso/60">{b.appointment.preferredTime}</p>
                  </td>
                  <td className="px-4 sm:px-5 py-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusPill(
                        b.status
                      )}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/bookings?selected=${b._id.toString()}`}
                      className="text-xs font-semibold text-primary hover:text-secondary-dark"
                    >
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {recentBookings.length === 0 && (
          <div className="p-8 text-center text-xs text-espresso/60">
            No recent reservations logged yet.
          </div>
        )}
      </div>

      {/* Concierge Operational Protocol */}
      <div className="bg-primary-dark text-surface rounded-lg p-4 sm:p-5 shadow-card text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-serif text-base text-secondary-fixed">Concierge Protocol</p>
          <p className="text-surface/80 font-light leading-relaxed max-w-3xl">
            Upon receiving a new enquiry, review aesthetician travel time and WhatsApp the patron
            within 30 minutes to confirm venue access.
          </p>
        </div>
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-primary-dark rounded font-semibold text-xs hover:bg-secondary-light transition-colors whitespace-nowrap self-start md:self-auto"
        >
          Manage Enquiries <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
