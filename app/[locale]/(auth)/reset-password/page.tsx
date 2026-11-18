import { AuthShell } from "@/features/auth/components/auth-shell";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.resetPassword");
  return { title: t("title") };
}

export default async function ResetPasswordPage({
  searchParams,
}: PageProps<"/[locale]/reset-password">) {
  const { email, code } = await searchParams;
  if (typeof email !== "string" || typeof code !== "string") notFound();

  const t = await getTranslations("auth.resetPassword");

  return (
    <AuthShell title={t("title")} description={t("description")}>
      <ResetPasswordForm email={email} code={code} />
    </AuthShell>
  );
}
