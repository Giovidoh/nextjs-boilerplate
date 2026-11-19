"use client";

import { Button } from "@/components/actions/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/overlays/dropdown-menu";
import { cn, type SlotClassNames } from "@/lib/utils";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";

export type ThemeToggleSlot = "trigger" | "content" | "item";

export interface ThemeToggleProps {
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
  classNames?: SlotClassNames<ThemeToggleSlot>;
}

const options = [
  { value: "light", icon: SunIcon },
  { value: "dark", icon: MoonIcon },
  { value: "system", icon: MonitorIcon },
] as const;

export function ThemeToggle({ variant = "ghost", className, classNames }: ThemeToggleProps) {
  const t = useTranslations("components.themeToggle");
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={variant}
            size="icon"
            aria-label={t("label")}
            className={cn(classNames?.trigger, className)}
          />
        }
      >
        {/* Icons switch with CSS so the server render never mismatches. */}
        <SunIcon className="dark:hidden" />
        <MoonIcon className="hidden dark:block" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("w-36", classNames?.content)}>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {options.map(({ value, icon: Icon }) => (
            <DropdownMenuRadioItem key={value} value={value} className={classNames?.item}>
              <Icon />
              {t(value)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
