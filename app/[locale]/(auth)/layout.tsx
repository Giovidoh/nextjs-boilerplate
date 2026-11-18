import { LanguageSwitcher } from "@/components/common/language-switcher";
import { ThemeToggle } from "@/components/common/theme-toggle";

export default function AuthLayout({ children }: LayoutProps<"/[locale]">) {
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
