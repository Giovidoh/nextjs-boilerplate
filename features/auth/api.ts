import type {
  ForgotPasswordValues,
  LoginValues,
  RegisterValues,
  ResetPasswordValues,
} from "./schemas";

/**
 * Auth API boundary used by the forms (through TanStack Query mutations).
 *
 * TODO(auth): implement once the auth strategy is chosen
 * (external backend through the proxy route, or Better Auth).
 * Until then every call rejects, so the UI shows its error state
 * instead of pretending the request succeeded.
 */
const notConfigured = (action: string): Promise<never> =>
  Promise.reject(new Error(`Auth API not configured (${action})`));

export const authApi = {
  login: (_values: LoginValues) => notConfigured("login"),
  register: (_values: RegisterValues) => notConfigured("register"),
  verifyEmail: (_input: { email: string; code: string }) => notConfigured("verifyEmail"),
  forgotPassword: (_values: ForgotPasswordValues) => notConfigured("forgotPassword"),
  verifyResetCode: (_input: { email: string; code: string }) => notConfigured("verifyResetCode"),
  resetPassword: (_input: ResetPasswordValues & { email: string; code: string }) =>
    notConfigured("resetPassword"),
};
