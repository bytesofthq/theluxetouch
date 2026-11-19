import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/our-promise", label: "Our Promise" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-primary text-center py-2 px-4">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-surface/90 font-medium">
          A little luxury, delivered to your doorstep + now taking home appointments
        </p>
      </div>
      <div className="relative h-20 bg-surface/90 backdrop-blur-xl border-b border-secondary/20 shadow-[0_1px_12px_rgba(48,37,31,0.04)]">
        <div className="h-full max-w-[1320px] mx-auto px-6 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-secondary/40 group-hover:ring-secondary transition-all">
              <Image
                src="/assets/branding/logo.webp"
                alt="The Luxe Touch Emblem"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl text-primary tracking-tight font-normal leading-none">
                The Luxè Touch
              </span>
              <span className="text-[10px] text-secondary tracking-wide font-medium mt-1">
                Where Beauty Meets a Touch of Luxury.
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                className={
                  link.active
                    ? "text-xs uppercase tracking-[0.16em] font-semibold text-primary py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-secondary"
                    : "text-xs uppercase tracking-[0.16em] font-medium text-espresso/80 hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-secondary hover:after:w-full after:transition-all after:duration-300"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/book"
              prefetch
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-surface text-primary ring-1 ring-secondary/60 hover:bg-primary hover:text-surface hover:ring-primary transition-all duration-300 rounded text-xs uppercase tracking-[0.16em] font-semibold shadow-[0_2px_12px_rgba(116,90,42,0.08)]"
            >
              Book a Visit
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
