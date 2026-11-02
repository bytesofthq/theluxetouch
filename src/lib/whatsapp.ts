export function generateWhatsAppLink(phone: string, message: string): string {
  // Clean phone number: remove spaces, +, -, etc.
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export function createBookingInquiryWhatsAppMessage(details: {
  reference: string;
  name: string;
  serviceName: string;
  date: string;
  time: string;
  locationType: string;
}): string {
  return `Hello The Luxe Touch Concierge! ✨\n\nI have submitted a booking enquiry:\n• Ref: *${details.reference}*\n• Name: ${details.name}\n• Service: ${details.serviceName}\n• Preferred Date: ${details.date}\n• Preferred Time: ${details.time}\n• Venue: ${details.locationType}\n\nPlease let me know your availability for this ritual. Thank you!`;
}

export function createAdminBookingWhatsAppResponse(details: {
  reference: string;
  name: string;
  serviceName: string;
  date: string;
  time: string;
  status: string;
}): string {
  return `Dear ${details.name},\n\nGreetings from *The Luxe Touch Concierge*. ✨\n\nRegarding your reservation reference *${details.reference}* for *${details.serviceName}* on ${details.date} at ${details.time}:\n\nYour appointment is currently *${details.status.toUpperCase()}*.\n\nPlease let us know if you require any customized adjustments or have specific preferences for your aesthetician.`;
}

