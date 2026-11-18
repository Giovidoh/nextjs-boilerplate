import HeroSection from "@/features/landing/components/sections/HeroSection";
import { initLocale } from "@/i18n/locale";

export default async function Home({ params }: PageProps<"/[locale]">) {
  await initLocale(params);

  return <HeroSection />;
}
