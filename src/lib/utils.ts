import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export type ServicePricing = {
  mode: "fixed" | "starting_at" | "quote_required" | "hidden";
  amount?: number;
  regularAmount?: number;
  currency?: string;
};

/** Returns display parts for service pricing (offer + optional struck regular). */
export function getServicePriceDisplay(pricing: ServicePricing): {
  label: string;
  regularLabel?: string;
  isQuote: boolean;
} {
  const currency = pricing.currency || "INR";

  if (pricing.mode === "quote_required" || pricing.mode === "hidden" || !pricing.amount) {
    return { label: "Price on request", isQuote: true };
  }

  const live =
    pricing.mode === "starting_at"
      ? `Starting at ${formatCurrency(pricing.amount, currency)}`
      : formatCurrency(pricing.amount, currency);

  const regularLabel =
    pricing.regularAmount && pricing.regularAmount > pricing.amount
      ? formatCurrency(pricing.regularAmount, currency)
      : undefined;

  return { label: live, regularLabel, isQuote: false };
}

