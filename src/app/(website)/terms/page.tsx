export const metadata = {
  title: "Terms of Service | The Luxe Touch",
};

export default function TermsPage() {
  return (
    <div className="w-full bg-surface py-16">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 prose prose-stone text-sm text-espresso/80 font-light leading-relaxed">
        <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold not-prose block">
          TERMS
        </span>
        <h1 className="font-serif text-4xl text-primary tracking-tight mt-2 mb-8 not-prose">
          Terms of Service
        </h1>

        <p>
          Welcome to <strong>The Luxe Touch</strong>. By using our website and booking at-home beauty
          services, you agree to the following terms.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">1. Booking Requests</h3>
        <p>
          Submitting a booking form is a request, not a confirmed appointment. We will confirm your
          booking by phone or WhatsApp based on stylist availability.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">2. Cancellation & Rescheduling</h3>
        <p>
          Please give at least 24 hours&apos; notice if you need to cancel or reschedule, so we can
          adjust our stylists&apos; schedules.
        </p>

        <h3 className="font-serif text-xl text-primary font-normal">3. Safety & Access</h3>
        <p>
          You agree to provide a clean, safe indoor space with basic power and water access for the
          service. We may decline service if the space is not safe.
        </p>
      </div>
    </div>
  );
}
