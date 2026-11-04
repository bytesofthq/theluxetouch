"use client";

import { useState } from "react";
import { updateSiteSettings } from "@/actions/content";
import { Save, CheckCircle2 } from "lucide-react";

export function SettingsManager({ initialSettings }: { initialSettings: any }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateSiteSettings(settings);
    setIsSaving(false);

    if (res.success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 max-w-4xl">
      {savedSuccess && (
        <div className="p-3.5 sm:p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Business settings successfully updated across website and concierge system!</span>
        </div>
      )}

      {/* Brand & Identity */}
      <div className="bg-white p-4 sm:p-6 sm:p-8 rounded-lg border border-admin-border shadow-card space-y-4 text-xs text-espresso">
        <h3 className="font-serif text-xl sm:text-2xl text-primary font-normal border-b border-admin-border pb-3">
          Brand & Identity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
              Brand Trade Name
            </label>
            <input
              type="text"
              value={settings.brandName || ""}
              onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
              className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={settings.tagline || ""}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Direct Contact Channels */}
      <div className="bg-white p-4 sm:p-6 sm:p-8 rounded-lg border border-admin-border shadow-card space-y-4 text-xs text-espresso">
        <h3 className="font-serif text-xl sm:text-2xl text-primary font-normal border-b border-admin-border pb-3">
          Concierge Communication
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          <div>
            <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
              Public Telephone Number
            </label>
            <input
              type="text"
              value={settings.contact?.phone || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, phone: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
              WhatsApp Number (with Country Code)
            </label>
            <input
              type="text"
              value={settings.contact?.whatsappNumber || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, whatsappNumber: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
              Concierge Email
            </label>
            <input
              type="email"
              value={settings.contact?.email || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, email: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
            Service Coverage Areas (Comma separated)
          </label>
          <input
            type="text"
            value={settings.serviceAreas?.join(", ") || ""}
            onChange={(e) =>
              setSettings({
                ...settings,
                serviceAreas: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-white p-4 sm:p-6 sm:p-8 rounded-lg border border-admin-border shadow-card space-y-4 text-xs text-espresso">
        <h3 className="font-serif text-xl sm:text-2xl text-primary font-normal border-b border-admin-border pb-3">
          Operating Hours & Dispatch
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
              Weekday Schedule
            </label>
            <input
              type="text"
              value={settings.businessHours?.weekdays || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  businessHours: { ...settings.businessHours, weekdays: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-bold text-espresso/60 mb-1">
              Weekend Schedule
            </label>
            <input
              type="text"
              value={settings.businessHours?.weekends || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  businessHours: { ...settings.businessHours, weekends: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded bg-surface-admin border border-admin-border text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="w-full sm:w-auto justify-center px-8 py-3 bg-primary text-surface rounded text-xs uppercase tracking-wider font-semibold hover:bg-primary-dark transition-colors shadow-md flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving Settings..." : "Save Business Settings"}
        </button>
      </div>
    </form>
  );
}
