import { AuthShell } from "@/features/auth/components/auth-shell";
import { OtpForm } from "@/features/auth/components/otp-form";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.otp");
  return { title: t("title") };
}

export default async function ForgotPasswordOtpPage({
  searchParams,
}: PageProps<"/[locale]/forgot-password/otp-validation">) {
  const { email } = await searchParams;
  if (typeof email !== "string") notFound();

  const t = await getTranslations("auth.otp");

  return (
    <AuthShell title={t("title")} description={t("description", { email })}>
      <OtpForm email={email} flow="reset" />
    </AuthShell>
  );
}
