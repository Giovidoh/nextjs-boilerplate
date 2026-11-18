import Footer from "@/features/landing/components/layouts/Footer";
import Header from "@/features/landing/components/layouts/Header";

export default function LandingLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
