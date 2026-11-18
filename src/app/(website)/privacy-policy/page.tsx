export const metadata = {
  title: "Privacy Policy | The Luxe Touch",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-surface py-16">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 prose prose-stone text-sm text-espresso/80 font-light leading-relaxed">
        <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold not-prose block">
          YOUR PRIVACY
        </span>
        <h1 className="font-serif text-4xl text-primary tracking-tight mt-2 mb-8 not-prose">
          Privacy Policy
        </h1>

        <p>
          At <strong>The Luxe Touch</strong>, we take your privacy seriously. This page explains how
          we use the personal information you share when you book with us.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">1. Information We Collect</h3>
        <p>
          When you book an appointment, we collect your name, phone / WhatsApp number, optional
          email, preferred date, and home or venue address.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">2. How We Use It</h3>
        <p>
          We use your details only to schedule appointments, confirm your stylist, and share service
          updates. We never sell or rent your personal information to others.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">3. Your Home & Privacy</h3>
        <p>
          Our team keeps details about your home, location, and schedule private. We do not share
          photos or personal information without your permission.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">4. Contact Us</h3>
        <p>
          If you have questions about your data or want past records removed, email us at{" "}
          <em>concierge@theluxetouch.com</em>.
        </p>
      </div>
    </div>
  );
}
