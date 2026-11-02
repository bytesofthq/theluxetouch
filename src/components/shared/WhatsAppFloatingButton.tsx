"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFloatingButton({
  phoneNumber = "919876543210",
  message = "Hello The Luxe Touch Concierge! I would like to inquire about booking a private beauty ritual.",
}: {
  phoneNumber?: string;
  message?: string;
}) {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Concierge on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:bg-[#1EBE5D] hover:scale-105 transition-all duration-300 font-medium text-xs tracking-wider uppercase group"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="hidden sm:inline font-semibold">Concierge Chat</span>
    </a>
  );
}

