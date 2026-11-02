import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import { WhatsAppFloatingButton } from "@/components/shared/WhatsAppFloatingButton";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

