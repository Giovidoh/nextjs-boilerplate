"use client";

import { FormField } from "@/components/forms/form-field";
import { PasswordInput } from "@/components/forms/password-input";
import { SubmitButton } from "@/components/actions/submit-button";
import { FieldGroup } from "@/components/forms/field";
import { Input } from "@/components/forms/input";
import { authApi } from "@/features/auth/api";
import authRoutes from "@/features/auth/config/routes";
import { registerSchema, type RegisterValues } from "@/features/auth/schemas";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "@/components/feedback/toaster";

export function RegisterForm() {
  const t = useTranslations("auth.register");
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const register = useMutation({
    mutationFn: authApi.register,
    onSuccess: (_data, values) =>
      router.push({ pathname: authRoutes.registerOtp, query: { email: values.email } }),
    onError: (error) => toast.error(t("failed"), { description: error.message }),
  });

  return (
    <form noValidate onSubmit={form.handleSubmit((values) => register.mutate(values))}>
      <FieldGroup>
        <div className="grid gap-[inherit] sm:grid-cols-2">
          <FormField control={form.control} name="firstName" label={t("firstName")}>
            {(field) => <Input autoComplete="given-name" {...field} />}
          </FormField>
          <FormField control={form.control} name="lastName" label={t("lastName")}>
            {(field) => <Input autoComplete="family-name" {...field} />}
          </FormField>
        </div>

        <FormField control={form.control} name="email" label={t("email")}>
          {(field) => <Input type="email" autoComplete="email" {...field} />}
        </FormField>

        <FormField control={form.control} name="password" label={t("password")}>
          {(field) => <PasswordInput showStrength {...field} />}
        </FormField>

        <SubmitButton pending={register.isPending} size="lg" className="w-full">
          {t("submit")}
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
