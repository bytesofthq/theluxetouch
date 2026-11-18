import { connectToDatabase } from "@/lib/mongodb";
import { SiteSettings } from "@/models/SiteSettings";
import { SettingsManager } from "@/components/admin/SettingsManager";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await connectToDatabase();

  const settings = (await SiteSettings.findOne({}).lean()) || {
    brandName: "The Luxè Touch",
    tagline: "Where Beauty Meets a Touch of Luxury.",
    contact: {
      phone: "+91 91960 02825",
      whatsappNumber: "919196002825",
      email: "theluxetouch4@gmail.com",
    },
    serviceAreas: ["Lucknow", "Gomti Nagar", "Hazratganj", "Indira Nagar", "Aliganj", "Aminabad"],
    businessHours: {
      weekdays: "9:00 AM - 6:00 PM",
      weekends: "9:00 AM - 6:00 PM",
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
