import { Logo } from "@/components/common/logo";
import { APP_NAME } from "@/configs/app-config";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const sections = {
  navigation: [
    { key: "home", href: "/" },
    { key: "pricing", href: "/#pricing" },
    { key: "about", href: "/#about" },
    { key: "blog", href: "/blog" },
  ],
  support: [
    { key: "faq", href: "/faq" },
    { key: "helpCenter", href: "/help" },
    { key: "contact", href: "/contact" },
    { key: "status", href: "/status" },
  ],
  legal: [
    { key: "privacyPolicy", href: "/privacy" },
    { key: "termsOfService", href: "/terms" },
    { key: "cookiePolicy", href: "/cookies" },
  ],
} as const;

export default function Footer({ className }: { className?: string }) {
  const t = useTranslations("footer");

  return (
    <footer className={cn("border-t bg-muted/40", className)}>
      <div className="page-container flex flex-col gap-10 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-sm flex-col gap-3">
            <Logo />
            <p className="text-small text-muted-foreground">{t("description", { appName: APP_NAME })}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {(Object.keys(sections) as (keyof typeof sections)[]).map((section) => (
              <div key={section} className="flex flex-col gap-3">
                <h2 className="text-small font-semibold tracking-normal">
                  {t(`sections.${section}.title`)}
                </h2>
                <ul className="flex flex-col gap-2">
                  {sections[section].map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className="text-small text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {t(`sections.${section}.links.${link.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="border-t pt-6 text-center text-caption text-muted-foreground">
          {t("copyright", { year: new Date().getFullYear(), appName: APP_NAME })}
        </p>
      </div>
    </footer>
  );
}
