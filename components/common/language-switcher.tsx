"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/forms/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn, type SlotClassNames } from "@/lib/utils";
import { LanguagesIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition, type ComponentProps } from "react";

export type LanguageSwitcherSlot = "trigger" | "content" | "item";

export interface LanguageSwitcherProps {
  size?: ComponentProps<typeof SelectTrigger>["size"];
  /** Show the language icon in the trigger. */
  showIcon?: boolean;
  className?: string;
  classNames?: SlotClassNames<LanguageSwitcherSlot>;
}

/** Native language name, capitalized: "fr" → "Français", "en" → "English". */
function languageName(locale: string) {
  const name = new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
  return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
}

export function LanguageSwitcher({
  size = "sm",
  showIcon = true,
  className,
  classNames,
}: LanguageSwitcherProps) {
  const t = useTranslations("components.languageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const items = routing.locales.map((value) => ({ value, label: languageName(value) }));

  return (
    <Select
      items={items}
      value={locale}
      disabled={isPending}
      onValueChange={(next) => {
        if (!next || next === locale) return;
        startTransition(() => {
          // Keep the query string (e.g. ?email=… on OTP pages) when switching.
          router.replace(`${pathname}${window.location.search}`, { locale: next });
        });
      }}
    >
      <SelectTrigger
        size={size}
        aria-label={t("label")}
        className={cn(classNames?.trigger, className)}
      >
        {showIcon && <LanguagesIcon className="text-muted-foreground" />}
        <SelectValue />
      </SelectTrigger>
      <SelectContent className={classNames?.content}>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value} className={classNames?.item}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
