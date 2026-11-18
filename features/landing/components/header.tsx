"use client";

import { LanguageSwitcher } from "@/components/common/language-switcher";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import authRoutes from "@/features/auth/config/routes";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const navigation = [
  { key: "home", href: "/" },
  { key: "pricing", href: "/#pricing" },
  { key: "about", href: "/#about" },
] as const;

export default function Header({ className }: { className?: string }) {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-(--header-height) border-b bg-background/80 backdrop-blur-xl",
        className,
      )}
    >
      <div className="page-container flex h-full items-center justify-between gap-6">
        <Logo />

        <nav aria-label={t("label")} className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-small font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(`navigation.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Button nativeButton={false} render={<Link href={authRoutes.login} />} className="hidden sm:inline-flex">
            {t("login")}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="md:hidden" aria-label={t("openMenu")} />}
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Logo onClick={() => setOpen(false)} />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label={t("label")} className="flex flex-col gap-1 px-4">
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-2 font-medium hover:bg-muted"
                  >
                    {t(`navigation.${item.key}`)}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-4">
                <div className="flex items-center gap-2">
                  <LanguageSwitcher className="flex-1" />
                  <ThemeToggle variant="outline" />
                </div>
                <Button nativeButton={false} render={<Link href={authRoutes.login} />} onClick={() => setOpen(false)}>
                  {t("login")}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
