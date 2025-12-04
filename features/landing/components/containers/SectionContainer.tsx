import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

const SectionContainer: FC<SectionContainerProps> = ({
  children,
  className,
}) => {
  return (
    <section
      className={cn(
        "container mx-auto flex w-full flex-col items-center gap-5 px-[clamp(1.25rem,-0.714rem+9.82vw,4rem)] py-[clamp(2.5rem,0.714rem+8.93vw,5rem)]",
        className
      )}
    >
      {children}
    </section>
  );
};

export default SectionContainer;
