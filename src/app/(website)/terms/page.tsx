export const metadata = {
  title: "Terms of Service | The Luxe Touch",
};

export default function TermsPage() {
  return (
    <div className="w-full bg-surface py-16">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 prose prose-stone text-sm text-espresso/80 font-light leading-relaxed">
        <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold not-prose block">
          ATELIER TERMS
        </span>
        <h1 className="font-serif text-4xl text-primary tracking-tight mt-2 mb-8 not-prose">
          Terms of Service
        </h1>

        <p>
          Welcome to <strong>The Luxe Touch</strong>. By using our website and requesting in-home
          beauty and grooming services, you agree to the following terms and conditions.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">1. Nature of Enquiry</h3>
        <p>
          Submitting a reservation enquiry form through our website constitutes a formal request and
          is subject to specialist availability confirmation by our concierge team. Confirmed
          reservations will be acknowledged directly via telephone or WhatsApp.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">2. Cancellation & Rescheduling</h3>
        <p>
          We request a minimum of 12 hours advance notice for rescheduling or cancellation to respect
          the travel schedule of our senior aestheticians.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">3. Safety & Premise Access</h3>
        <p>
          Patrons agree to provide a clean, secure indoor space with basic electrical and water access
          suitable for conducting professional beauty rituals. Our team reserves the right to decline
          service in any environment deemed unsafe.
        </p>
      </div>
    </div>
  );
}

