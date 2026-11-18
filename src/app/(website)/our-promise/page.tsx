import {
  ShieldCheck,
  HeartHandshake,
  CalendarClock,
  Wallet,
  Lock,
  Gem,
} from "lucide-react";

export const metadata = {
  title: "Our Promise to You | The Luxè Touch",
  description:
    "Beauty with Care, Comfort & Trust. Policies for hygiene, customer care, booking, refunds, privacy, and quality.",
};

const promises = [
  {
    icon: ShieldCheck,
    title: "Hygiene & Safety Policy",
    summary: "Sanitized tools, clean towels and disposable items",
    points: [
      "All beauty tools will be properly cleaned and sanitized before use.",
      "Disposable items will be used only once wherever required.",
      "Clean towels and hygienic materials will be maintained for every appointment.",
      "Product quality and expiry dates will be checked before use.",
      "Proper hygiene and safety standards will be followed during every service.",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Customer Care Policy",
    summary: "Respectful behaviour and personalized services",
    points: [
      "Every customer will be treated with respect, care and professionalism.",
      "Services will be provided according to individual customer needs and preferences.",
      "Service procedures and prices will be communicated before starting.",
      "Customer satisfaction will always remain our priority.",
    ],
  },
  {
    icon: CalendarClock,
    title: "Booking & Cancellation Policy",
    summary: "Advance booking, transport charge and cancellation rules",
    points: [
      "An advance transport charge of ₹100 is mandatory for all bookings. Service is confirmed only after receiving this payment.",
      "Transport charge: ₹100 within 15 km · ₹150 over 15 km.",
      "Customers can cancel before a beautician is assigned, but the ₹100 advance transport charge is non-refundable.",
      "Once a beautician is assigned, the advance transport charge is non-refundable if the customer cancels.",
      "Once the beautician has started traveling, no refund will be provided if the customer cancels.",
      "If The Luxè Touch cancels a booking due to unavoidable circumstances, the customer will receive a full refund (including the advance transport charge) or may choose to reschedule.",
      "After a beautician has been assigned, rescheduling requests are subject to availability and approval by The Luxè Touch.",
      "Appointments are confirmed by phone call and WhatsApp / SMS.",
    ],
  },
  {
    icon: Wallet,
    title: "Refund & Payment Policy",
    summary: "Cash & online payment · fair resolution",
    points: [
      "We accept cash and online payment (UPI, debit cards, credit cards, and other available methods).",
      "Advance payments are required. Preferred booking method is online payment.",
      "Customers paying by cash must still pay the ₹100 advance transport charge online to confirm. The remaining service amount can be paid in cash after completion.",
      "For online payment, the booking is confirmed only after receiving the advance payment.",
      "All service prices will be communicated clearly before booking confirmation.",
      "Generally, refunds will not be available once a service has been completed.",
      "If a service-related issue occurs due to our mistake, we will make reasonable efforts to provide a suitable resolution.",
      "For booking, cancellation, rescheduling, or refund help, contact us by phone or WhatsApp.",
    ],
  },
  {
    icon: Lock,
    title: "Privacy Policy",
    summary: "Protection of customer information and photographs",
    points: [
      "Customer personal information will be kept confidential.",
      "Customer photographs and videos will never be shared on social media without prior permission.",
      "Contact details and personal information will not be shared with third parties except where necessary for service operations or required by law.",
    ],
  },
  {
    icon: Gem,
    title: "Our Quality Promise",
    summary: "Quality products and professional service",
    points: [
      "Use of quality beauty and skincare products.",
      "Professional and responsible beauty professionals.",
      "Clean, hygienic and professional service delivery.",
      "Personalized attention to every customer.",
      "A premium beauty experience in the comfort of your home.",
    ],
  },
];

export default function OurPromisePage() {
  return (
    <div className="w-full bg-surface relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-secondary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"
      />

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
            POLICIES & PROMISE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-primary tracking-tight mt-3">
            Our Promise to You
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-secondary mt-3">
            Beauty with Care, Comfort &amp; Trust.
          </p>
          <p className="text-sm sm:text-base text-espresso/80 font-light leading-relaxed mt-6">
            At The Luxè Touch, we are committed to providing every customer with a safe, hygienic,
            comfortable and luxurious beauty experience at home. Your beauty, satisfaction and trust
            are our top priorities.
          </p>
        </div>

        {/* Promise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {promises.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="bg-surface-container-low/60 p-6 sm:p-8 rounded ring-1 ring-secondary/25 flex flex-col gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-secondary/15 ring-1 ring-secondary/40 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-secondary" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl text-primary tracking-tight">
                      {item.title}
                    </h2>
                    <p className="text-sm italic text-secondary mt-1">{item.summary}</p>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-1">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-espresso/80 font-light leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Closing */}
        <div className="text-center max-w-2xl mx-auto mt-16 md:mt-20 pt-10 border-t border-secondary/25">
          <p className="text-xs uppercase tracking-[0.22em] text-secondary font-semibold">
            OUR PROMISE
          </p>
          <p className="font-serif text-xl sm:text-2xl text-primary tracking-tight mt-3">
            Your Trust. Your Beauty. Our Responsibility.
          </p>
          <p className="text-sm sm:text-base text-espresso/80 font-light mt-4">
            THE LUXÈ TOUCH – Bringing Luxury Beauty Care to Your Doorstep.
          </p>
        </div>
      </div>
    </div>
  );
}
