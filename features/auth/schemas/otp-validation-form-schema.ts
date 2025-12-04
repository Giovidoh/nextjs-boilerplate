import { z } from 'zod';

export const otpValidationFormSchema = z.object({
  otp: z.string().min(6, 'Code de confirmation est requis'),
});

export type OtpValidationFormSchemaType = z.infer<typeof otpValidationFormSchema>;
