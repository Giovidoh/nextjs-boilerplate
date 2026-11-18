/** Auth routes, without locale prefix — use with Link / router from `@/i18n/navigation`. */
const authRoutes = {
  login: "/login",
  register: "/register",
  registerOtp: "/register/otp-validation",
  forgotPassword: "/forgot-password",
  forgotPasswordOtp: "/forgot-password/otp-validation",
  resetPassword: "/reset-password",
} as const;

export default authRoutes;
