"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import {
  LayoutDashboard,
  CalendarCheck,
  Sparkles,
  Image as ImageIcon,
  FileEdit,
  Settings,
  ExternalLink,
  LogOut,
  HelpCircle,
  X,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Services", href: "/admin/services", icon: Sparkles },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Website Content", href: "/admin/content", icon: FileEdit },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    onClose?.();
    await signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      className={`w-72 max-w-[85vw] lg:w-64 bg-white border-r border-admin-border flex flex-col justify-between h-screen fixed left-0 top-0 z-50 lg:z-30 transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
      aria-label="Admin Navigation Sidebar"
    >
      {/* Top Brand Header */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="h-16 px-5 sm:px-6 border-b border-admin-border flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-secondary/40 flex-shrink-0">
              <Image
                src="/assets/branding/logo.jpeg"
                alt="The Luxe Touch Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg text-primary font-medium leading-none">
                The Luxe Touch
              </span>
              <span className="text-[9px] text-secondary uppercase tracking-[0.2em] font-semibold mt-0.5">
                Admin Portal
              </span>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-espresso/60 hover:text-espresso hover:bg-surface-admin transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Navigation Links */}
        <nav className="p-4 space-y-1 overflow-y-auto flex-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-semibold tracking-wide transition-colors ${
                  isActive
                    ? "bg-surface-admin text-primary border-l-2 border-primary font-bold"
                    : "text-espresso/70 hover:bg-surface-admin/60 hover:text-espresso"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary" : "text-espresso/50"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation Links */}
      <div className="p-4 border-t border-admin-border space-y-1 bg-white flex-shrink-0">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-3 px-3.5 py-2 rounded text-xs text-espresso/70 hover:bg-surface-admin hover:text-espresso transition-colors font-medium"
        >
          <ExternalLink className="w-4 h-4 text-espresso/50 flex-shrink-0" />
          <span>View Live Website</span>
        </Link>

        <a
          href="mailto:support@theluxetouch.com"
          onClick={onClose}
          className="flex items-center gap-3 px-3.5 py-2 rounded text-xs text-espresso/70 hover:bg-surface-admin hover:text-espresso transition-colors font-medium"
        >
          <HelpCircle className="w-4 h-4 text-espresso/50 flex-shrink-0" />
          <span>Help & Support</span>
        </a>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded text-xs text-red-600 hover:bg-red-50 transition-colors font-semibold text-left"
        >
          <LogOut className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>Logout Session</span>
        </button>
      </div>
    </aside>
  );
}
