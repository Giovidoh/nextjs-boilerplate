"use client";

import BaseButton from "@/components/buttons/BaseButton";
import BaseCheckbox from "@/components/checkboxes/BaseCheckbox";
import PasswordInput from "@/features/auth/components/inputs/PasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  LoginFormSchema,
  loginFormSchema,
} from "@/features/auth/schemas/login-form-schema";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import BaseInput from "@/components/inputs/BaseInput";

export default function LoginForm() {
  const t = useTranslations("auth.login.form");
  const tSuccess = useTranslations("auth.login.successes");
  const tErrors = useTranslations("auth.login.errors");
  const { login, error } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormSchema) {
    try {
      setIsLoading(true);
      const data = await login(values);
      if (data) {
        toast.success(tSuccess("loginSuccess"));
        window.location.reload();
      } else {
        toast.error(tErrors("loginFailed"));
      }
    } catch (error) {
      console.error(error);
      toast.error(tErrors("loginFailed"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-5"
      >
        <div className="flex w-full flex-col gap-4 md:gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <BaseInput
                    placeholder={t("emailPlaceholder")}
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder={t("passwordPlaceholder")}
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <BaseCheckbox label={t("rememberPassword")} disabled={isLoading} />
          <Link
            href="/forgot-password"
            className="hover:text-primary text-[clamp(14px,1.5vw,16px)] transition"
          >
            {t("forgotPasswordLink")}
          </Link>
        </div>
        <BaseButton
          className="w-full"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {t("submitButton")}
        </BaseButton>
      </form>
    </Form>
  );
}
