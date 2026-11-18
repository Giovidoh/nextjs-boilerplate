import { AuthShell } from "@/features/auth/components/auth-shell";
import { LoginForm } from "@/features/auth/components/login-form";
import { OAuthButtons } from "@/features/auth/components/oauth-buttons";
import authRoutes from "@/features/auth/config/routes";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.login");
  return { title: t("title") };
}

export default async function LoginPage() {
  const t = await getTranslations("auth.login");

  return (
    <AuthShell
      title={t("title")}
      description={t("description")}
      footer={
        <>
          <OAuthButtons className="w-full" />
          <p>
            {t("noAccount")}{" "}
            <Link href={authRoutes.register} className="font-medium text-primary hover:underline">
              {t("signUp")}
            </Link>
          </p>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
