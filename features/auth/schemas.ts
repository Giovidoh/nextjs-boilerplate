import { passwordRules } from "@/lib/validation/password";
import { z } from "zod";

/*
 * Error messages are i18n keys under `validation` (messages/<locale>/common.json);
 * FormField translates them at render time.
 */

const email = z.email("email");
const required = z.string().trim().min(1, "required");
const strongPassword = z
  .string()
  .min(1, "required")
  .refine((value) => passwordRules.every((rule) => rule.test(value)), "passwordTooWeak");

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "required"),
  remember: z.boolean(),
});

export const registerSchema = z.object({
  firstName: required,
  lastName: required,
  email,
  password: strongPassword,
});

export const forgotPasswordSchema = z.object({ email });

export const otpSchema = z.object({
  code: z.string().length(6, "otpLength"),
});

export const resetPasswordSchema = z
  .object({
    password: strongPassword,
    passwordConfirmation: z.string().min(1, "required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "passwordMismatch",
    path: ["passwordConfirmation"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type OtpValues = z.infer<typeof otpSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
