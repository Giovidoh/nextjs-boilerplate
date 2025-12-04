"use client";

import BaseSelect from "@/components/selects/BaseSelect";
import { cn } from "@/lib/utils";
import enFlag from "@/public/assets/images/countries/US.png";
import frFlag from "@/public/assets/images/countries/FR.png";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export interface LanguageSelectorProps {
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  size?: "sm" | "md";
}

export default function LanguageSelector({
  className,
  triggerClassName,
  contentClassName,
  size = "sm",
}: LanguageSelectorProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("header");

  const languageOptions = [
    {
      value: "fr",
      label: (
        <span className="flex items-center gap-2">
          <Image
            src={frFlag}
            alt="Français"
            width={20}
            height={20}
            className="rounded-sm"
          />
          {/* <span>Français</span> */}
        </span>
      ),
    },
    {
      value: "en",
      label: (
        <span className="flex items-center gap-2">
          <Image
            src={enFlag}
            alt="English"
            width={20}
            height={20}
            className="rounded-sm"
          />
          {/* <span>English</span> */}
        </span>
      ),
    },
  ];

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;

    startTransition(() => {
      // Remove the current locale from the pathname
      const pathWithoutLocale = pathname.replace(`/${locale}`, "");
      // Navigate to the new locale path
      router.replace(`/${newLocale}${pathWithoutLocale}`);
    });
  };

  return (
    <BaseSelect
      options={languageOptions}
      value={locale}
      onValueChange={handleLanguageChange}
      disabled={isPending}
      className={cn("cursor-pointer rounded-lg", className)}
      triggerClassName={cn("border-none text-sm p-5", triggerClassName)}
      contentClassName={cn("rounded-lg", contentClassName)}
      size={size}
    />
  );
}
