"use client";

import { FormField } from "@/components/forms/form-field";
import { PasswordInput } from "@/components/forms/password-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authApi } from "@/features/auth/api";
import authRoutes from "@/features/auth/config/routes";
import { loginSchema, type LoginValues } from "@/features/auth/schemas";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
  const t = useTranslations("auth.login");
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const login = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      toast.success(t("success"));
      router.push("/");
    },
    onError: (error) => toast.error(t("failed"), { description: error.message }),
  });

  return (
    <form noValidate onSubmit={form.handleSubmit((values) => login.mutate(values))}>
      <FieldGroup>
        <FormField control={form.control} name="email" label={t("email")}>
          {(field) => <Input type="email" autoComplete="email" {...field} />}
        </FormField>

        <FormField control={form.control} name="password" label={t("password")}>
          {(field) => <PasswordInput {...field} />}
        </FormField>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <FormField
            control={form.control}
            name="remember"
            label={t("remember")}
            orientation="horizontal"
            labelPlacement="after"
            className="w-auto"
          >
            {({ value, onChange, ref, ...field }) => (
              <Checkbox {...field} inputRef={ref} checked={value} onCheckedChange={onChange} />
            )}
          </FormField>
          <Link
            href={authRoutes.forgotPassword}
            className="text-small font-medium text-primary underline-offset-4 hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        <SubmitButton pending={login.isPending} size="lg" className="w-full">
          {t("submit")}
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
