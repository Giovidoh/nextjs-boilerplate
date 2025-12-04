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
import {
  RegisterFormSchema,
  registerFormSchema,
} from "@/features/auth/schemas/register-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import PasswordInput from "@/features/auth/components/inputs/PasswordInput";

interface RegisterFormProps {
  ref?: React.RefObject<HTMLFormElement | null>;
  onSubmit: (values: RegisterFormSchema) => void;
  defaultValues?: Partial<RegisterFormSchema>;
}

export default function RegisterForm({
  ref,
  onSubmit,
  defaultValues,
}: RegisterFormProps) {
  const t = useTranslations("auth.register.form");

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: defaultValues || {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  function handleSubmit(values: RegisterFormSchema) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form
        ref={ref}
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col items-center gap-5"
      >
        <div className="flex w-full flex-col gap-4 md:gap-5">
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <BaseInput
                    placeholder={t("lastNamePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <BaseInput
                    placeholder={t("firstNamePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <BaseInput
                    placeholder={t("emailPlaceholder")}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.clearErrors("email");
                    }}
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
                    showStrengthIndicator
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5 flex w-full items-center justify-center gap-4">
          <BaseButton type="submit" className="w-full">
            {t("nextButton")}
          </BaseButton>
        </div>
      </form>
    </Form>
  );
}
