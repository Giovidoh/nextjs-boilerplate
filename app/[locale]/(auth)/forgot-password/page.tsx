import { AuthShell } from "@/features/auth/components/auth-shell";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import authRoutes from "@/features/auth/config/routes";
import { Link } from "@/i18n/navigation";
import { initLocale } from "@/i18n/locale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: PageProps<"/[locale]/forgot-password">): Promise<Metadata> {
  const locale = await initLocale(params);
  const t = await getTranslations({ locale, namespace: "auth.forgotPassword" });
  return { title: t("title") };
}

export default async function ForgotPasswordPage({ params }: PageProps<"/[locale]/forgot-password">) {
  await initLocale(params);
  const t = await getTranslations("auth.forgotPassword");

  return (
    <AuthShell
      title={t("title")}
      description={t("description")}
      footer={
        <Link href={authRoutes.login} className="font-medium text-primary hover:underline">
          {t("backToLogin")}
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
