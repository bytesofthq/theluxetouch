"use client";

import { useState } from "react";
import { updateBookingStatus } from "@/actions/bookings";
import { createAdminBookingWhatsAppResponse, generateWhatsAppLink } from "@/lib/whatsapp";
import {
  Search,
  Filter,
  X,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function BookingsManager({
  initialBookings,
  initialSelectedId,
}: {
  initialBookings: any[];
  initialSelectedId?: string;
}) {
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(
    initialBookings.find((b) => b._id === initialSelectedId) || null
  );
  const [adminNoteInput, setAdminNoteInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const statuses = ["all", "new", "contacted", "confirmed", "completed", "cancelled"];

  const filtered = bookings.filter((b) => {
    const matchesStatus =
      selectedStatus === "all" ? true : b.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch =
      b.bookingReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer.phone.includes(searchQuery) ||
      b.service.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
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

  const handleStatusChange = async (newStatus: any) => {
    if (!selectedBooking) return;
    setIsUpdating(true);
    const res = await updateBookingStatus(
      selectedBooking._id,
      newStatus,
      adminNoteInput || undefined,
      "concierge"
    );
    setIsUpdating(false);

    if (res.success) {
      const updatedList = bookings.map((b) =>
        b._id === selectedBooking._id
          ? {
              ...b,
              status: newStatus,
              adminNotes: adminNoteInput || b.adminNotes,
              statusHistory: [
                ...b.statusHistory,
                {
                  status: newStatus,
                  changedAt: new Date().toISOString(),
                  changedBy: "concierge",
                  note: adminNoteInput,
                },
              ],
            }
          : b
      );
      setBookings(updatedList);
      setSelectedBooking(updatedList.find((b) => b._id === selectedBooking._id));
      setAdminNoteInput("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters & Search Toolbar */}
      <div className="bg-white p-3 sm:p-4 rounded-lg border border-admin-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 max-w-full no-scrollbar flex-nowrap sm:flex-wrap">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded text-xs font-semibold capitalize transition-colors flex-shrink-0 ${
                selectedStatus === st
                  ? "bg-primary text-surface shadow-sm"
                  : "bg-surface-admin text-espresso/70 hover:bg-surface-admin/80"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 flex-shrink-0">
          <input
            type="text"
            placeholder="Search by name, ref, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded bg-surface-admin text-xs border border-admin-border focus:outline-none focus:ring-1 focus:ring-primary text-espresso"
          />
          <Search className="w-4 h-4 text-espresso/40 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg border border-admin-border shadow-card overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-surface-admin text-espresso/50 uppercase text-[10px] tracking-wider font-semibold border-b border-admin-border">
              <tr>
                <th className="px-5 py-3.5">Reference</th>
                <th className="px-5 py-3.5">Patron</th>
                <th className="px-5 py-3.5">Service Ritual</th>
                <th className="px-5 py-3.5">Date & Time</th>
                <th className="px-5 py-3.5">Venue</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border text-espresso">
              {filtered.map((b) => (
                <tr
                  key={b._id}
                  onClick={() => setSelectedBooking(b)}
                  className={`cursor-pointer hover:bg-surface-admin/50 transition-colors ${
                    selectedBooking?._id === b._id ? "bg-surface-admin/80" : ""
                  }`}
                >
                  <td className="px-5 py-4 font-mono font-bold text-primary">
                    {b.bookingReference}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-espresso">{b.customer.fullName}</p>
                    <p className="text-[11px] text-espresso/60 mt-0.5">{b.customer.phone}</p>
                  </td>
                  <td className="px-5 py-4 font-medium">{b.service.serviceName}</td>
                  <td className="px-5 py-4 text-espresso/80">
                    <p className="font-medium">{b.appointment.preferredDate}</p>
                    <p className="text-[11px] text-espresso/60">{b.appointment.preferredTime}</p>
                  </td>
                  <td className="px-5 py-4 capitalize text-espresso/70">
                    {b.appointment.locationType}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusBadge(
                        b.status
                      )}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(b);
                      }}
                      className="text-xs font-semibold text-primary hover:text-secondary-dark px-2.5 py-1 rounded border border-admin-border bg-white shadow-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-xs text-espresso/60 font-light">
            No booking enquiries match your selected filters.
          </div>
        )}
      </div>

      {/* Responsive Slide-Over Detail Drawer */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-espresso/40 backdrop-blur-sm flex justify-end">
          <div
            className="w-full sm:max-w-[480px] bg-white h-full shadow-2xl border-l border-admin-border flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-6 border-b border-admin-border flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">
                  RESERVATION DETAIL
                </span>
                <h3 className="font-mono text-lg sm:text-xl font-bold text-primary mt-0.5">
                  {selectedBooking.bookingReference}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-espresso/60 hover:bg-surface-admin transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 flex-1 text-xs text-espresso">
              {/* Status Selector */}
              <div className="p-3.5 sm:p-4 rounded-lg bg-surface-admin border border-admin-border space-y-2">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-espresso/60">
                  Update Appointment Status
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedBooking.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={isUpdating}
                    className="flex-1 px-3 py-2 bg-white rounded border border-admin-border font-semibold uppercase text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="new">New Inquiry</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Patron Card */}
              <div className="space-y-3">
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-espresso/50">
                  Patron Information
                </h4>
                <div className="p-3.5 sm:p-4 bg-surface-admin/50 rounded border border-admin-border space-y-2">
                  <p className="text-sm font-bold text-espresso">
                    {selectedBooking.customer.fullName}
                  </p>
                  <p className="text-espresso/70 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                    {selectedBooking.customer.phone}
                  </p>
                  {selectedBooking.customer.email && (
                    <p className="text-espresso/70 flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                      <span className="truncate">{selectedBooking.customer.email}</span>
                    </p>
                  )}

                  {/* Direct Contact Action Shortcuts */}
                  <div className="flex gap-2 pt-2 border-t border-admin-border">
                    <a
                      href={`tel:${selectedBooking.customer.phone}`}
                      className="flex-1 py-1.5 bg-white border border-admin-border rounded text-center font-semibold text-[11px] hover:bg-surface-admin transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3 h-3 text-primary" /> Call
                    </a>
                    <a
                      href={generateWhatsAppLink(
                        selectedBooking.customer.phone,
                        createAdminBookingWhatsAppResponse({
                          reference: selectedBooking.bookingReference,
                          name: selectedBooking.customer.fullName,
                          serviceName: selectedBooking.service.serviceName,
                          date: selectedBooking.appointment.preferredDate,
                          time: selectedBooking.appointment.preferredTime,
                          status: selectedBooking.status,
                        })
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-1.5 bg-[#25D366] text-white rounded text-center font-semibold text-[11px] hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <MessageCircle className="w-3 h-3" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Service & Venue */}
              <div className="space-y-3">
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-espresso/50">
                  Ritual & Delivery Location
                </h4>
                <div className="p-3.5 sm:p-4 bg-surface-admin/50 rounded border border-admin-border space-y-2.5">
                  <div className="flex justify-between gap-2">
                    <span className="text-espresso/60 flex-shrink-0">Service:</span>
                    <span className="font-semibold text-primary text-right">
                      {selectedBooking.service.serviceName}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-espresso/60 flex-shrink-0">Quoted Pricing:</span>
                    <span className="font-semibold text-secondary-dark text-right">
                      {selectedBooking.service.pricingSnapshot.amount
                        ? formatCurrency(
                            selectedBooking.service.pricingSnapshot.amount,
                            selectedBooking.service.pricingSnapshot.currency
                          )
                        : "Quote required"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-espresso/60 flex-shrink-0">Schedule:</span>
                    <span className="font-medium text-right">
                      {selectedBooking.appointment.preferredDate} at{" "}
                      {selectedBooking.appointment.preferredTime}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-espresso/60 flex-shrink-0">Venue Type:</span>
                    <span className="font-medium capitalize text-right">
                      {selectedBooking.appointment.locationType}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-admin-border">
                    <span className="text-espresso/60 block mb-1">Service Address:</span>
                    <p className="font-medium leading-relaxed bg-white p-2.5 rounded border border-admin-border break-words">
                      {selectedBooking.appointment.address}
                    </p>
                  </div>
                  {selectedBooking.additionalNotes && (
                    <div className="pt-2">
                      <span className="text-espresso/60 block mb-1">Patron Notes:</span>
                      <p className="italic text-espresso/80 bg-white p-2.5 rounded border border-admin-border break-words">
                        &ldquo;{selectedBooking.additionalNotes}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Internal Notes & History */}
              <div className="space-y-3">
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-espresso/50">
                  Concierge Notes & History
                </h4>
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    placeholder="Add staff note or specialist assignment..."
                    className="w-full p-2.5 bg-white border border-admin-border rounded text-xs text-espresso focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {selectedBooking.adminNotes && (
                    <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded text-xs font-light break-words">
                      <strong>Current Staff Note:</strong> {selectedBooking.adminNotes}
                    </div>
                  )}
                </div>

                {/* Audit Timeline */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-bold text-espresso/50 tracking-wider">
                    Status Audit History
                  </span>
                  <div className="border-l-2 border-admin-border pl-3 space-y-3">
                    {selectedBooking.statusHistory?.map((h: any, i: number) => (
                      <div key={i} className="text-[11px]">
                        <span className="font-semibold uppercase tracking-wider text-primary">
                          {h.status}
                        </span>
                        <span className="text-espresso/40 ml-2 font-mono text-[10px]">
                          {new Date(h.changedAt).toLocaleString()}
                        </span>
                        {h.note && (
                          <p className="text-espresso/70 mt-0.5 italic">&ldquo;{h.note}&rdquo;</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 sm:p-6 border-t border-admin-border bg-surface-admin flex justify-end">
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-white border border-admin-border rounded text-xs font-semibold hover:bg-surface-admin transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
