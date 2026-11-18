"use client";

import { FormField } from "@/components/forms/form-field";
import { PasswordInput } from "@/components/forms/password-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { FieldGroup } from "@/components/ui/field";
import { authApi } from "@/features/auth/api";
import authRoutes from "@/features/auth/config/routes";
import { resetPasswordSchema, type ResetPasswordValues } from "@/features/auth/schemas";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ResetPasswordForm({ email, code }: { email: string; code: string }) {
  const t = useTranslations("auth.resetPassword");
  const router = useRouter();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", passwordConfirmation: "" },
  });

  const reset = useMutation({
    mutationFn: (values: ResetPasswordValues) => authApi.resetPassword({ ...values, email, code }),
    onSuccess: () => {
      toast.success(t("success"));
      router.push(authRoutes.login);
    },
    onError: (error) => toast.error(t("failed"), { description: error.message }),
  });

  return (
    <form noValidate onSubmit={form.handleSubmit((values) => reset.mutate(values))}>
      <FieldGroup>
        <FormField control={form.control} name="password" label={t("password")}>
          {(field) => <PasswordInput showStrength {...field} />}
        </FormField>
        <FormField
          control={form.control}
          name="passwordConfirmation"
          label={t("passwordConfirmation")}
        >
          {(field) => <PasswordInput autoComplete="new-password" {...field} />}
        </FormField>
        <SubmitButton pending={reset.isPending} size="lg" className="w-full">
          {t("submit")}
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
