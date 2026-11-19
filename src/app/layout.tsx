import type { Metadata } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "The Luxè Touch | Where Beauty Meets a Touch of Luxury",
  description:
    "Premium beauty & salon home services in Lucknow. Where Beauty Meets a Touch of Luxury.",
  icons: {
    icon: "/assets/branding/logo.webp",
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
