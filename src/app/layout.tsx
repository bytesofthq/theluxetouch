import type { Metadata } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Luxe Touch | Luxury In-Home Beauty & Grooming Services",
  description:
    "Experience bespoke haute beauty and grooming rituals delivered thoughtfully to your doorstep, penthouse, or private venue.",
  icons: {
    icon: "/assets/branding/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${manrope.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-surface text-espresso selection:bg-secondary-fixed selection:text-espresso">
        {children}
      </body>
    </html>
  );
}

