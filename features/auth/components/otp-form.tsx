"use client";

import { FormField } from "@/components/forms/form-field";
import { OtpInput } from "@/components/forms/otp-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { FieldGroup } from "@/components/ui/field";
import { authApi } from "@/features/auth/api";
import authRoutes from "@/features/auth/config/routes";
import { otpSchema, type OtpValues } from "@/features/auth/schemas";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface OtpFormProps {
  email: string;
  /** `register` verifies the email, `reset` checks a password-reset code. */
  flow: "register" | "reset";
}

export function OtpForm({ email, flow }: OtpFormProps) {
  const t = useTranslations("auth.otp");
  const router = useRouter();

  const form = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  const verify = useMutation({
    mutationFn: ({ code }: OtpValues) =>
      flow === "register"
        ? authApi.verifyEmail({ email, code })
        : authApi.verifyResetCode({ email, code }),
    onSuccess: (_data, { code }) => {
      toast.success(t("success"));
      if (flow === "register") router.push(authRoutes.login);
      else router.push({ pathname: authRoutes.resetPassword, query: { email, code } });
    },
    onError: (error) => toast.error(t("failed"), { description: error.message }),
  });

  return (
    <form noValidate onSubmit={form.handleSubmit((values) => verify.mutate(values))}>
      <FieldGroup>
        <FormField
          control={form.control}
          name="code"
          label={t("code")}
          classNames={{ label: "sr-only", root: "items-center" }}
        >
          {({ ref, ...field }) => (
            <OtpInput
              {...field}
              ref={ref}
              autoFocus
              classNames={{ root: "justify-center" }}
              onComplete={() => form.handleSubmit((values) => verify.mutate(values))()}
            />
          )}
        </FormField>
        <SubmitButton pending={verify.isPending} size="lg" className="w-full">
          {t("submit")}
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
