"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchema, BookingFormData } from "@/lib/validations/booking";
import { submitBookingEnquiry } from "@/actions/bookings";
import { createBookingInquiryWhatsAppMessage, generateWhatsAppLink } from "@/lib/whatsapp";
import { CheckCircle2, MessageCircle, AlertCircle, Calendar, Clock, MapPin } from "lucide-react";

interface CategoryOption {
  _id: string;
  name: string;
}

interface ServiceOption {
  _id: string;
  name: string;
  categoryId: string;
}

export function BookingForm({
  categories,
  services,
  preselectedServiceId,
}: {
  categories: CategoryOption[];
  services: ServiceOption[];
  preselectedServiceId?: string;
}) {
  const defaultService = services.find((s) => s._id === preselectedServiceId);
  const defaultCategory = defaultService
    ? categories.find((c) => c._id === defaultService.categoryId)
    : categories[0];

  const [selectedCatId, setSelectedCatId] = useState<string>(
    defaultCategory?._id || categories[0]?._id || ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    reference?: string;
    error?: string;
    formData?: BookingFormData;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      categoryId: selectedCatId,
      serviceId: defaultService?._id || "",
      preferredDate: "",
      preferredTime: "11:00 AM",
      locationType: "home",
      address: "",
      additionalNotes: "",
    },
  });

  const availableServices = services.filter((s) => s.categoryId === selectedCatId);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    const res = await submitBookingEnquiry(data);
    setIsSubmitting(false);

    if (res.success && res.bookingReference) {
      setSubmissionResult({
        success: true,
        reference: res.bookingReference,
        formData: data,
      });
    } else {
      setSubmissionResult({
        success: false,
        error: res.error || "Failed to submit booking",
      });
    }
  };

  // If successfully submitted, render the confirmation screen
  if (submissionResult?.success && submissionResult.reference && submissionResult.formData) {
    const selectedServiceObj = services.find(
      (s) => s._id === submissionResult.formData?.serviceId
    );
    const serviceName = selectedServiceObj?.name || "Bespoke Ritual";

    const whatsappMessage = createBookingInquiryWhatsAppMessage({
      reference: submissionResult.reference,
      name: submissionResult.formData.fullName,
      serviceName,
      date: submissionResult.formData.preferredDate,
      time: submissionResult.formData.preferredTime,
      locationType: submissionResult.formData.locationType,
    });

    const whatsappUrl = generateWhatsAppLink("919876543210", whatsappMessage);

    return (
      <div className="bg-surface-container-low p-8 sm:p-12 rounded ring-1 ring-secondary/30 shadow-xl max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
          RESERVATION ENQUIRY RECEIVED
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl text-primary mt-2 mb-3">
          Your Request Has Been Submitted
        </h2>

        <p className="text-sm text-espresso/80 font-light leading-relaxed max-w-md mx-auto mb-6">
          Thank you, <strong>{submissionResult.formData.fullName}</strong>. Your enquiry is now
          being reviewed by our private concierge.
        </p>

        {/* Reference Badge */}
        <div className="bg-surface p-4 rounded inline-block ring-1 ring-secondary/30 mb-8">
          <p className="text-xs uppercase text-espresso/60 tracking-wider">Booking Reference</p>
          <p className="font-mono text-2xl text-primary font-bold tracking-tight mt-1">
            {submissionResult.reference}
          </p>
        </div>

        {/* Details Summary */}
        <div className="text-left bg-surface/60 p-6 rounded mb-8 space-y-2 text-sm text-espresso/80 border border-secondary/20 font-light">
          <div className="flex justify-between border-b border-secondary/10 pb-2">
            <span className="text-espresso/60">Selected Ritual:</span>
            <span className="font-medium text-primary">{serviceName}</span>
          </div>
          <div className="flex justify-between border-b border-secondary/10 pb-2">
            <span className="text-espresso/60">Preferred Schedule:</span>
            <span className="font-medium text-primary">
              {submissionResult.formData.preferredDate} at{" "}
              {submissionResult.formData.preferredTime}
            </span>
          </div>
          <div className="flex justify-between border-b border-secondary/10 pb-2">
            <span className="text-espresso/60">Venue Type:</span>
            <span className="font-medium text-primary capitalize">
              {submissionResult.formData.locationType}
            </span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-espresso/60">Address:</span>
            <span className="font-medium text-primary text-right max-w-xs">
              {submissionResult.formData.address}
            </span>
          </div>
        </div>

        <div className="bg-secondary/15 p-4 rounded text-xs text-espresso/80 font-light mb-8 leading-relaxed">
          <strong>Note:</strong> An enquiry does not constitute an instant confirmed booking. Our
          concierge will verify aesthetician travel and scheduling, then reach out via WhatsApp or
          phone to confirm.
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4" /> Message Concierge on WhatsApp
          </a>

          <button
            onClick={() => setSubmissionResult(null)}
            className="px-6 py-3.5 bg-surface text-espresso border border-secondary/40 font-semibold rounded text-xs uppercase tracking-wider hover:bg-secondary/10 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-surface-container-low p-8 sm:p-10 rounded ring-1 ring-secondary/30 shadow-lg space-y-8"
    >
      {submissionResult?.error && (
        <div className="p-4 bg-red-50 text-red-700 rounded flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{submissionResult.error}</span>
        </div>
      )}

      {/* Step 1: Customer Details */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl text-primary border-b border-secondary/20 pb-2">
          1. Patron Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
              Full Name *
            </label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="e.g. Elena Rostova"
              className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.fullName && (
              <p className="text-red-600 text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
              Phone / WhatsApp Number *
            </label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
            Email Address (Optional)
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="patron@example.com"
            className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Step 2: Ritual Selection */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl text-primary border-b border-secondary/20 pb-2">
          2. Desired Ritual
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
              Service Department *
            </label>
            <select
              value={selectedCatId}
              onChange={(e) => {
                const newCat = e.target.value;
                setSelectedCatId(newCat);
                setValue("categoryId", newCat);
                const firstSvc = services.find((s) => s.categoryId === newCat);
                setValue("serviceId", firstSvc?._id || "");
              }}
              className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
              Specific Treatment *
            </label>
            <select
              {...register("serviceId")}
              className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select Treatment...</option>
              {availableServices.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.serviceId && (
              <p className="text-red-600 text-xs mt-1">{errors.serviceId.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Step 3: Appointment Date, Time & Venue */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl text-primary border-b border-secondary/20 pb-2">
          3. Date, Time & Location
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
              Preferred Date *
            </label>
            <input
              type="date"
              {...register("preferredDate")}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.preferredDate && (
              <p className="text-red-600 text-xs mt-1">{errors.preferredDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
              Preferred Time *
            </label>
            <select
              {...register("preferredTime")}
              className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="9:30 AM">9:30 AM (Morning)</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="1:00 PM">1:00 PM (Afternoon)</option>
              <option value="3:30 PM">3:30 PM</option>
              <option value="5:30 PM">5:30 PM (Evening)</option>
              <option value="7:00 PM">7:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
              Venue Classification *
            </label>
            <select
              {...register("locationType")}
              className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary capitalize"
            >
              <option value="home">Private Residence / Apartment</option>
              <option value="hotel">Hotel Suite</option>
              <option value="venue">Bridal / Event Venue</option>
              <option value="other">Other Private Facility</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
            Complete Delivery Address & Landmark *
          </label>
          <textarea
            rows={2}
            {...register("address")}
            placeholder="e.g. Tower 3, Apt 14B, Palm Heights, Bandra West, Mumbai"
            className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.address && (
            <p className="text-red-600 text-xs mt-1">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1">
            Special Requests or Skin/Hair Notes (Optional)
          </label>
          <textarea
            rows={2}
            {...register("additionalNotes")}
            placeholder="Any allergies, sensitivity to products, or specific bridal requests..."
            className="w-full px-4 py-2.5 rounded bg-surface border border-secondary/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-secondary/20">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-primary text-surface rounded text-xs uppercase tracking-[0.2em] font-semibold hover:bg-primary-dark transition-all duration-300 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
        >
          {isSubmitting ? "Submitting Your Reservation..." : "Submit Reservation Request"}
        </button>
        <p className="text-[11px] text-center text-espresso/60 mt-3 font-light">
          No advance payment required for enquiry. Our concierge will verify availability and confirm.
        </p>
      </div>
    </form>
  );
}

