import { AuthShell } from "@/features/auth/components/auth-shell";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { initLocale } from "@/i18n/locale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[locale]/reset-password">): Promise<Metadata> {
  const locale = await initLocale(params);
  const t = await getTranslations({ locale, namespace: "auth.resetPassword" });
  return { title: t("title") };
}

export default async function ResetPasswordPage({
  params,
  searchParams,
}: PageProps<"/[locale]/reset-password">) {
  await initLocale(params);
  const { email, code } = await searchParams;
  if (typeof email !== "string" || typeof code !== "string") notFound();

  const t = await getTranslations("auth.resetPassword");

  return (
    <AuthShell title={t("title")} description={t("description")}>
      <ResetPasswordForm email={email} code={code} />
    </AuthShell>
  );
}
