import Footer from "@/features/landing/components/layouts/Footer";
import Header from "@/features/landing/components/layouts/Header";
import Main from "@/components/layouts/Main";

export default function LandingPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex min-h-screen flex-col">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </section>
  );
}
