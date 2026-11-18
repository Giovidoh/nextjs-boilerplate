import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import authRoutes from "@/features/auth/config/routes";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HeroSection({ className }: { className?: string }) {
  const t = useTranslations("hero");

  return (
    <section className={cn("section-spacing", className)}>
      <div className="page-container flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary">{t("badge")}</Badge>
        <h1 className="max-w-4xl text-display">{t("title")}</h1>
        <p className="max-w-2xl text-lead text-muted-foreground">{t("description")}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" nativeButton={false} render={<Link href={authRoutes.register} />}>
            {t("primaryCta")}
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href={authRoutes.login} />}
          >
            {t("secondaryCta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
