import { AuthShell } from "@/features/auth/components/auth-shell";
import { OtpForm } from "@/features/auth/components/otp-form";
import { initLocale } from "@/i18n/locale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[locale]/forgot-password/otp-validation">): Promise<Metadata> {
  const locale = await initLocale(params);
  const t = await getTranslations({ locale, namespace: "auth.otp" });
  return { title: t("title") };
}

export default async function ForgotPasswordOtpPage({
  params,
  searchParams,
}: PageProps<"/[locale]/forgot-password/otp-validation">) {
  await initLocale(params);
  const { email } = await searchParams;
  if (typeof email !== "string") notFound();

  const t = await getTranslations("auth.otp");

  return (
    <AuthShell title={t("title")} description={t("description", { email })}>
      <OtpForm email={email} flow="reset" />
    </AuthShell>
  );
}
