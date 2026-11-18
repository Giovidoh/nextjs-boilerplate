import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { cn, type SlotClassNames } from "@/lib/utils";
import GoogleIcon from "@/public/assets/images/logos/google.svg";
import MicrosoftIcon from "@/public/assets/images/logos/microsoft.svg";
import { useTranslations } from "next-intl";

export type OAuthButtonsSlot = "root" | "separator" | "list" | "button";

/**
 * Social sign-in providers.
 * TODO(auth): point each `href` at the provider's sign-in URL once auth is wired.
 */
const providers = [
  { id: "google", icon: GoogleIcon, href: "#" },
  { id: "microsoft", icon: MicrosoftIcon, href: "#" },
] as const;

export function OAuthButtons({
  className,
  classNames,
}: {
  className?: string;
  classNames?: SlotClassNames<OAuthButtonsSlot>;
}) {
  const t = useTranslations("auth.oauth");

  return (
    <div className={cn("flex flex-col gap-4", classNames?.root, className)}>
      <FieldSeparator className={classNames?.separator}>{t("separator")}</FieldSeparator>
      <div className={cn("grid grid-cols-2 gap-3", classNames?.list)}>
        {providers.map(({ id, icon: Icon, href }) => (
          <Button
            key={id}
            variant="outline"
            nativeButton={false}
            render={<a href={href} />}
            className={classNames?.button}
          >
            <Icon aria-hidden="true" />
            {t(id)}
          </Button>
        ))}
      </div>
    </div>
  );
}
