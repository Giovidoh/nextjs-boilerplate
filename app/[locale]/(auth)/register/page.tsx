import { AuthShell } from "@/features/auth/components/auth-shell";
import { OAuthButtons } from "@/features/auth/components/oauth-buttons";
import { RegisterForm } from "@/features/auth/components/register-form";
import authRoutes from "@/features/auth/config/routes";
import { Link } from "@/i18n/navigation";
import { initLocale } from "@/i18n/locale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: PageProps<"/[locale]/register">): Promise<Metadata> {
  const locale = await initLocale(params);
  const t = await getTranslations({ locale, namespace: "auth.register" });
  return { title: t("title") };
}

export default async function RegisterPage({ params }: PageProps<"/[locale]/register">) {
  await initLocale(params);
  const t = await getTranslations("auth.register");

  return (
    <AuthShell
      title={t("title")}
      description={t("description")}
      footer={
        <>
          <OAuthButtons className="w-full" />
          <p>
            {t("haveAccount")}{" "}
            <Link href={authRoutes.login} className="font-medium text-primary hover:underline">
              {t("signIn")}
            </Link>
          </p>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
