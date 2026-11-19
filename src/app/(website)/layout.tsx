import { Suspense } from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import { WhatsAppFloatingButton } from "@/components/shared/WhatsAppFloatingButton";
import { RoutePrefetcher } from "@/components/website/RoutePrefetcher";
import { NavigationProgress } from "@/components/website/NavigationProgress";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      <RoutePrefetcher />
      <Header />
      <main className="flex-1 pt-[7.25rem]">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
