import { AuthShell } from "@/features/auth/components/auth-shell";
import { OAuthButtons } from "@/features/auth/components/oauth-buttons";
import { RegisterForm } from "@/features/auth/components/register-form";
import authRoutes from "@/features/auth/config/routes";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.register");
  return { title: t("title") };
}

export default async function RegisterPage() {
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
