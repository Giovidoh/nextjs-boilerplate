import Footer from "@/features/landing/components/footer";
import Header from "@/features/landing/components/header";

export default function LandingLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
