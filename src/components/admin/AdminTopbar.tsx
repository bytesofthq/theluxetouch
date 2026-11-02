"use client";

import { Search, Bell } from "lucide-react";

export function AdminTopbar({ title = "Overview Dashboard" }: { title?: string }) {
  return (
    <header className="h-16 bg-white border-b border-admin-border px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <span className="text-xs text-espresso/50 font-medium">Atelier Console /</span>
        <h1 className="text-sm font-semibold text-espresso">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Search */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search bookings, services..."
            className="w-64 pl-9 pr-8 py-1.5 rounded bg-surface-admin text-xs text-espresso placeholder:text-espresso/40 border border-admin-border focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Search className="w-3.5 h-3.5 text-espresso/40 absolute left-3 top-2.5" />
          <kbd className="absolute right-2.5 top-2 text-[9px] font-mono bg-white px-1 py-0.5 rounded border border-admin-border text-espresso/40">
            ⌘K
          </kbd>
        </div>

        {/* Notification Bell */}
        <button
          className="relative w-8 h-8 rounded-full flex items-center justify-center text-espresso/60 hover:bg-surface-admin hover:text-espresso transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary" />
        </button>

        {/* Monogram Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-admin-border">
          <div className="w-8 h-8 rounded-full bg-primary text-surface flex items-center justify-center text-xs font-serif font-bold ring-1 ring-secondary/40">
            LT
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-espresso leading-none">Admin Owner</span>
            <span className="text-[10px] text-espresso/50 mt-0.5">Concierge Desk</span>
          </div>
        </div>
      </div>
    </header>
  );
}

