import { z } from "zod";

export const registerFormSchema = z
  .object({
    first_name: z.string().min(1, "Prénom est requis"),
    last_name: z.string().min(1, "Nom est requis"),
    email: z.email("Email invalide"),
    password: z
      .string()
      .min(8, "Mot de passe trop court")
      .regex(
        /[a-zA-Z]/,
        "Mot de passe doit contenir au moins 1 lettre minuscule ou majuscule"
      )
      .regex(/[0-9]/, "Mot de passe doit contenir au moins 1 chiffre")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        "Mot de passe doit contenir au moins 1 symbole"
      ),
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
