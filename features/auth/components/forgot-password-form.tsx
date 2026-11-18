"use client";

import { FormField } from "@/components/forms/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authApi } from "@/features/auth/api";
import authRoutes from "@/features/auth/config/routes";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/features/auth/schemas";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const t = useTranslations("auth.forgotPassword");
  const router = useRouter();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const sendCode = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: (_data, values) => {
      toast.success(t("success"));
      router.push({ pathname: authRoutes.forgotPasswordOtp, query: { email: values.email } });
    },
    onError: (error) => toast.error(t("failed"), { description: error.message }),
  });

  return (
    <form noValidate onSubmit={form.handleSubmit((values) => sendCode.mutate(values))}>
      <FieldGroup>
        <FormField control={form.control} name="email" label={t("email")}>
          {(field) => <Input type="email" autoComplete="email" {...field} />}
        </FormField>
        <SubmitButton pending={sendCode.isPending} size="lg" className="w-full">
          {t("submit")}
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
