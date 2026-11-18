/**
 * Password policy shared by the Zod schemas and the PasswordInput strength
 * meter, so the UI checklist always matches what the form validates.
 * `id` doubles as the i18n key under `validation.password.*`.
 */
export const PASSWORD_MIN_LENGTH = 8;

export const passwordRules = [
  { id: "minLength", test: (v: string) => v.length >= PASSWORD_MIN_LENGTH },
  { id: "letter", test: (v: string) => /[a-zA-Z]/.test(v) },
  { id: "digit", test: (v: string) => /[0-9]/.test(v) },
  { id: "symbol", test: (v: string) => /[^a-zA-Z0-9\s]/.test(v) },
] as const;

export type PasswordRuleId = (typeof passwordRules)[number]["id"];
