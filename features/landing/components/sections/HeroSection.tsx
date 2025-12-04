import SectionContainer from "@/features/landing/components/containers/SectionContainer";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("hero");

  return (
    <header className="flex justify-center items-center h-screen min-h-fit rounded-b-2xl pt-20">
      <SectionContainer className="flex w-full flex-col items-center justify-between md:flex-row">
        <div className="flex flex-col items-center justify-center gap-3 md:items-start max-w-[600px]"></div>
        <div className="hidden md:block min-w-[200px] relative flex-col items-center justify-center"></div>
      </SectionContainer>
    </header>
  );
};

export default HeroSection;
