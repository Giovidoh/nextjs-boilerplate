"use client";

import BaseButton from "@/components/buttons/BaseButton";
import BaseInput from "@/components/inputs/BaseInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import authRoutes from "@/features/auth/config/routes";
import {
  ForgotPasswordFormSchema,
  forgotPasswordFormSchema,
} from "@/features/auth/schemas/forgot-password-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const t = useTranslations("auth.forgotPassword.form");
  const tSuccess = useTranslations("auth.forgotPassword.successes");
  const tErrors = useTranslations("auth.forgotPassword.errors");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormSchema) {
    try {
      setIsLoading(true);
    } catch (error: any) {
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
