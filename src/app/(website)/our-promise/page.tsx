import {
  ShieldCheck,
  HeartHandshake,
  CalendarClock,
  Wallet,
  Lock,
  Gem,
} from "lucide-react";

export const metadata = {
  title: "Our Promise to You | The Luxe Touch",
  description:
    "Beauty with Care, Comfort & Trust. Our commitments to hygiene, customer care, booking, payments, privacy, and quality.",
};

const promises = [
  {
    icon: ShieldCheck,
    title: "Hygiene & Safety Promise",
    tagline: "Your safety is our priority.",
    points: [
      "Your safety and well-being are always our priority.",
      "All beauty tools are thoroughly cleaned and sanitised before every appointment.",
      "Disposable items are used only once wherever required.",
      "Fresh towels and clean materials are maintained for every customer.",
      "Products are checked for quality, suitability and expiry dates before use.",
      "Proper hygiene and safety practices are followed throughout every service.",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Customer Care Promise",
    tagline: "You matter to us.",
    points: [
      "Every customer deserves to feel valued, comfortable and confident.",
      "We treat every customer with respect, kindness and professionalism.",
      "Services are tailored to individual needs, preferences and requirements.",
      "Service details, procedures and prices are communicated clearly before starting.",
      "We listen to your preferences and aim to deliver an experience that meets your expectations.",
      "Your satisfaction is always at the heart of what we do.",
    ],
  },
  {
    icon: CalendarClock,
    title: "Booking & Cancellation Policy",
    tagline: "Convenient and flexible.",
    points: [
      "We value your time and aim to make every appointment convenient.",
      "All appointments are subject to availability.",
      "Customers are requested to provide at least 24 hours' notice for cancellations or rescheduling.",
      "In case of unexpected delays or changes, customers will be informed as early as possible.",
      "Appointments are confirmed based on availability and any applicable advance payment requirements.",
    ],
  },
  {
    icon: Wallet,
    title: "Payment & Refund Policy",
    tagline: "Transparent and fair.",
    points: [
      "We believe in transparent pricing and clear communication.",
      "All service prices are shared before booking confirmation.",
      "Payments and any applicable advance payment requirements are communicated clearly.",
      "Generally, refunds are not available once a service has been completed.",
      "If an issue arises due to our mistake, we will make reasonable efforts to understand the concern and provide a suitable resolution.",
      "Any applicable refund or rescheduling conditions will be communicated before booking.",
    ],
  },
  {
    icon: Lock,
    title: "Privacy & Confidentiality Promise",
    tagline: "Your privacy, our priority.",
    points: [
      "Your privacy deserves the same care and attention as your beauty.",
      "Customer contact details and personal information are treated confidentially.",
      "Photographs and videos of customers are never shared on social media or promotional platforms without prior permission.",
      "Personal information is not shared with third parties except where necessary for service operations or when legally required.",
    ],
  },
  {
    icon: Gem,
    title: "Our Quality Promise",
    tagline: "Nothing but the best.",
    points: [
      "We are dedicated to maintaining high standards in every service we provide.",
      "Carefully selected, quality beauty and skincare products.",
      "Skilled and responsible beauty professionals.",
      "Clean, hygienic and professional service practices.",
      "Personalised attention and care for every customer.",
      "Salon-style beauty experiences delivered in the comfort of your home.",
    ],
  },
];

export default function OurPromisePage() {
  return (
    <div className="w-full bg-surface relative overflow-hidden">
      {/* Soft corner flourishes (design-system friendly) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-secondary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-16 w-56 h-56 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
            OUR COMMITMENT TO YOU
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-primary tracking-tight mt-3">
            Our Promise to You
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-secondary mt-3">
            Beauty with Care, Comfort &amp; Trust.
          </p>
          <p className="text-sm sm:text-base text-espresso/80 font-light leading-relaxed mt-6">
            At The Luxe Touch, we believe that beauty is more than just a service — it&apos;s an
            experience built on care, comfort and confidence. We are committed to bringing
            professional, hygienic and personalised beauty services right to your doorstep.
          </p>
          <p className="text-sm sm:text-base text-espresso/80 font-light leading-relaxed mt-4">
            Your comfort, satisfaction and trust mean everything to us. From the products we use to
            the care we provide, every detail is thoughtfully considered to make your experience
            special.
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
                    <p className="text-sm italic text-secondary mt-1">{item.tagline}</p>
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
          <p className="font-serif text-xl sm:text-2xl text-primary tracking-tight italic">
            The Luxe Touch – Because You Deserve Nothing Less Than Extraordinary.
          </p>
          <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-secondary font-semibold mt-5">
            YOUR BEAUTY. YOUR COMFORT. OUR COMMITMENT.
          </p>
        </div>
      </div>
    </div>
  );
}
