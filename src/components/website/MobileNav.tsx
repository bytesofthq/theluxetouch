"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/our-promise", label: "Our Promise" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-10 h-10 text-primary hover:text-secondary transition-colors"
        aria-label="Toggle Navigation Menu"
        aria-expanded={open}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-full bg-surface border-t border-secondary/20 shadow-xl px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              onClick={() => setOpen(false)}
              className="text-sm font-serif text-espresso/80 hover:text-primary py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center px-4 py-3 bg-primary text-surface rounded text-xs uppercase tracking-[0.16em] font-semibold shadow-md"
            >
              Book a Visit
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
