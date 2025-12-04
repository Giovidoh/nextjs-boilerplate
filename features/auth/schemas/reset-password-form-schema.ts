import { z } from 'zod';

export const resetPasswordFormSchema = z
  .object({
    new_password: z
      .string()
      .min(8, 'Mot de passe trop court')
      .regex(/[a-zA-Z]/, 'Mot de passe doit contenir au moins 1 lettre minuscule ou majuscule')
      .regex(/[0-9]/, 'Mot de passe doit contenir au moins 1 chiffre')
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        'Mot de passe doit contenir au moins 1 symbole',
      ),
    new_password_confirmation: z.string().min(1, 'Veuillez confirmer votre mot de passe'),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['new_password_confirmation'],
  });

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
