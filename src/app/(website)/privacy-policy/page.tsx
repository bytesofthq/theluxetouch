export const metadata = {
  title: "Privacy Policy | The Luxe Touch",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-surface py-16">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 prose prose-stone text-sm text-espresso/80 font-light leading-relaxed">
        <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold not-prose block">
          CONFIDENTIALITY & SECURITY
        </span>
        <h1 className="font-serif text-4xl text-primary tracking-tight mt-2 mb-8 not-prose">
          Privacy Policy
        </h1>

        <p>
          At <strong>The Luxe Touch</strong>, we hold the privacy and security of our patrons in the
          highest regard. This policy outlines how we handle personal information gathered during
          booking enquiries and consultation.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">1. Information We Collect</h3>
        <p>
          When you submit an appointment enquiry, we collect your full name, telephone / WhatsApp
          number, optional email, preferred date, and residential or venue delivery address.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">2. Use of Information</h3>
        <p>
          Your contact information is utilized strictly to coordinate appointment schedules, confirm
          specialist arrival, and communicate treatment recommendations. We never sell, trade, or
          rent personal patron details to third-party commercial entities.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">3. Private Residence Discretion</h3>
        <p>
          Our team members are bound by non-disclosure agreements. Any details regarding your
          residence, suite, or personal schedule remain strictly confidential.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">4. Contact Us</h3>
        <p>
          If you have any questions regarding your data or wish to have past records removed, please
          contact us at <em>concierge@theluxetouch.com</em>.
        </p>
      </div>
    </div>
  );
}

