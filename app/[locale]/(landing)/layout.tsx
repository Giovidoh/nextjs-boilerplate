import Footer from "@/features/landing/components/layouts/Footer";
import Header from "@/features/landing/components/layouts/Header";
import { initLocale } from "@/i18n/locale";

export default async function LandingLayout({ children, params }: LayoutProps<"/[locale]">) {
  await initLocale(params);

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
