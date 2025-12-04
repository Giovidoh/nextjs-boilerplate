"use client";

import BaseButton from "@/components/buttons/BaseButton";
import PasswordInput from "@/features/auth/components/inputs/PasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import authRoutes from "@/features/auth/config/routes";
import {
  ResetPasswordFormSchema,
  resetPasswordFormSchema,
} from "@/features/auth/schemas/reset-password-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPasswordForm({
  email,
  code,
}: {
  email: string;
  code: string;
}) {
  const t = useTranslations("auth.resetPassword.form");
  const tSuccess = useTranslations("auth.resetPassword.successes");
  const tErrors = useTranslations("auth.resetPassword.errors");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      new_password: "",
      new_password_confirmation: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormSchema) {
    try {
      setIsLoading(true);

      // Redirection vers la page de login
      toast.success(tSuccess("resetPasswordSuccess"));
      router.push(authRoutes.login.index);
    } catch (error: any) {
      const message =
        error?.response?.data?.detail.message || tErrors("invalidPassword");
      if (message === "Invalid or expired reset code.") {
        toast.error(tErrors("invalidResetCodeExpired"));

        // Renvoyer le code de réinitialisation et rediriger vers la page de validation du code
        router.push(
          authRoutes.forgotPassword.otpValidation + `?email=${email}`
        );
      } else {
        toast.error(message);
      }
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
        <div className="flex w-full flex-col gap-5 md:gap-7">
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder={t("passwordPlaceholder")}
                    showStrengthIndicator
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
            name="new_password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder={t("passwordConfirmationPlaceholder")}
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <BaseButton
          className="mt-5 w-full"
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
