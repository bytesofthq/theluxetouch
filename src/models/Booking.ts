import mongoose, { Schema, Document, Model } from "mongoose";

export type BookingStatus = "new" | "contacted" | "confirmed" | "completed" | "cancelled";
export type LocationType = "home" | "hotel" | "venue" | "other";

export interface IStatusHistory {
  status: BookingStatus;
  changedAt: Date;
  changedBy: string;
  note?: string;
}

export interface IBooking extends Document {
  bookingReference: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };
  service: {
    serviceId?: mongoose.Types.ObjectId;
    serviceName: string;
    categoryName: string;
    pricingSnapshot: {
      mode: string;
      amount?: number;
      currency: string;
    };
    durationMinutes?: number;
  };
  appointment: {
    preferredDate: string; // YYYY-MM-DD
    preferredTime: string; // e.g. "11:00 AM" or "Morning"
    locationType: LocationType;
    address: string;
  };
  additionalNotes?: string;
  status: BookingStatus;
  adminNotes?: string;
  statusHistory: IStatusHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      index: true,
      uppercase: true,
    },
    customer: {
      fullName: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true, index: true },
      email: { type: String, lowercase: true, trim: true },
    },
    service: {
      serviceId: { type: Schema.Types.ObjectId, ref: "Service" },
      serviceName: { type: String, required: true },
      categoryName: { type: String, required: true },
      pricingSnapshot: {
        mode: { type: String, default: "fixed" },
        amount: { type: Number },
        currency: { type: String, default: "INR" },
      },
      durationMinutes: { type: Number },
    },
    appointment: {
      preferredDate: { type: String, required: true, index: true },
      preferredTime: { type: String, required: true },
      locationType: {
        type: String,
        enum: ["home", "hotel", "venue", "other"],
        required: true,
      },
      address: { type: String, required: true, trim: true },
    },
    additionalNotes: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "confirmed", "completed", "cancelled"],
      default: "new",
      index: true,
    },
    adminNotes: { type: String, trim: true },
    statusHistory: [
      {
        status: { type: String, required: true },
        changedAt: { type: Date, default: Date.now },
        changedBy: { type: String, default: "system" },
        note: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

