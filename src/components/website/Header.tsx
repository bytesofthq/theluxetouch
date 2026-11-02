"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-secondary/20 shadow-[0_1px_12px_rgba(48,37,31,0.04)]">
      <div className="h-20 max-w-[1320px] mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-secondary/40 group-hover:ring-secondary transition-all">
            <Image
              src="/assets/branding/logo.jpeg"
              alt="The Luxe Touch Emblem"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl text-primary tracking-tight font-normal leading-none">
              The Luxe Touch
            </span>
            <span className="text-[10px] text-secondary uppercase tracking-[0.25em] font-semibold mt-1">
              Private Haute Atelier
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.16em] font-semibold text-primary py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-secondary"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-xs uppercase tracking-[0.16em] font-medium text-espresso/80 hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-secondary hover:after:w-full after:transition-all after:duration-300"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="text-xs uppercase tracking-[0.16em] font-medium text-espresso/80 hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-secondary hover:after:w-full after:transition-all after:duration-300"
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="text-xs uppercase tracking-[0.16em] font-medium text-espresso/80 hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-secondary hover:after:w-full after:transition-all after:duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-xs uppercase tracking-[0.16em] font-medium text-espresso/80 hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-secondary hover:after:w-full after:transition-all after:duration-300"
          >
            Contact
          </Link>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/book"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-surface text-primary ring-1 ring-secondary/60 hover:bg-primary hover:text-surface hover:ring-primary transition-all duration-300 rounded text-xs uppercase tracking-[0.16em] font-semibold shadow-[0_2px_12px_rgba(116,90,42,0.08)]"
          >
            Book a Visit
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-primary hover:text-secondary transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-secondary/20 shadow-xl px-6 py-6 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-serif text-primary py-1"
          >
            Home
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-serif text-espresso/80 hover:text-primary py-1"
          >
            Services & Rituals
          </Link>
          <Link
            href="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-serif text-espresso/80 hover:text-primary py-1"
          >
            Artisanal Gallery
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-serif text-espresso/80 hover:text-primary py-1"
          >
            About The Atelier
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-serif text-espresso/80 hover:text-primary py-1"
          >
            Concierge Contact
          </Link>
          <div className="pt-2">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center px-4 py-3 bg-primary text-surface rounded text-xs uppercase tracking-[0.16em] font-semibold shadow-md"
            >
              Book an In-Home Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

