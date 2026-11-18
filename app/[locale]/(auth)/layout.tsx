import { LanguageSwitcher } from "@/components/common/language-switcher";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { initLocale } from "@/i18n/locale";

export default async function AuthLayout({ children, params }: LayoutProps<"/[locale]">) {
  await initLocale(params);

  return (
    <div className="flex min-h-svh flex-col bg-muted/40">
      <header className="flex justify-end gap-2 p-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-start justify-center px-(--container-gutter) pb-16 sm:items-center">
        {children}
      </main>
    </div>
  );
}
