import { z } from "zod";

export const BookingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  categoryId: z.string().min(1, "Please select a service category"),
  serviceId: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a preferred time slot"),
  locationType: z.enum(["home", "hotel", "venue", "other"]),
  address: z.string().min(5, "Please enter your complete service address"),
  additionalNotes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof BookingSchema>;

