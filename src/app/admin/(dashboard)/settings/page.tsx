import { connectToDatabase } from "@/lib/mongodb";
import { SiteSettings } from "@/models/SiteSettings";
import { SettingsManager } from "@/components/admin/SettingsManager";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await connectToDatabase();

  const settings = (await SiteSettings.findOne({}).lean()) || {
    brandName: "The Luxe Touch",
    tagline: "Personalised Beauty & Grooming Delivered to You",
    contact: {
      phone: "+91 98765 43210",
      whatsappNumber: "919876543210",
      email: "concierge@theluxetouch.com",
    },
    serviceAreas: ["Mumbai", "Bandra", "Juhu", "South Mumbai", "Powai", "Thane"],
    businessHours: {
      weekdays: "9:00 AM - 8:00 PM",
      weekends: "8:00 AM - 9:00 PM",
    },
  };

  const serializedSettings = JSON.parse(JSON.stringify(settings));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif text-primary">Business Profile & Settings</h2>
        <p className="text-xs text-espresso/60 mt-0.5">
          Configure branding, concierge WhatsApp line, service coverage territories, and operating
          timings.
        </p>
      </div>

      <SettingsManager initialSettings={serializedSettings} />
    </div>
  );
}
