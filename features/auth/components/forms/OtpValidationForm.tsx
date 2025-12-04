"use client";

import BaseButton from "@/components/buttons/BaseButton";
import BaseInputOTP from "@/components/inputs/BaseInputOTP";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import authRoutes from "@/features/auth/config/routes";
import {
  OtpValidationFormSchemaType,
  otpValidationFormSchema,
} from "@/features/auth/schemas/otp-validation-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function OtpValidationForm({ email }: { email: string }) {
  const t = useTranslations("auth.otpValidation.form");
  const tErrors = useTranslations("auth.otpValidation.errors");
  const tSuccess = useTranslations("auth.otpValidation.successes");

  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<OtpValidationFormSchemaType>({
    resolver: zodResolver(otpValidationFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: OtpValidationFormSchemaType) {
    if (pathname.includes(authRoutes.register.otpValidation)) {
      try {
        setIsLoading(true);

        // Redirection vers la page de login
        router.push(authRoutes.login.index);

        toast.success(tSuccess("otpValidationSuccess"));
      } catch (error: any) {
        // console.log(error);
        const message =
          error?.response?.data?.detail.message || tErrors("invalidOTP");

        if (
          message ===
          "The code provided is invalid or expired. Please try again."
        ) {
          toast.error(tErrors("invalidOTPExpired"));
        } else {
          toast.error(message);
        }
      } finally {
        setIsLoading(false);
      }
    } else if (pathname.includes(authRoutes.forgotPassword.otpValidation)) {
      try {
        setIsLoading(true);

        router.push(
          authRoutes.resetPassword.index + `?email=${email}&code=${values.otp}`
        );
        toast.success(tSuccess("otpValidationSuccess"));
      } catch (error: any) {
        // console.log(error);
        const message =
          error?.response?.data?.detail.message || tErrors("invalidOTP");
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
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
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <BaseInputOTP {...field} disabled={isLoading} />
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
