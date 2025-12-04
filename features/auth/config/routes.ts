const routes = {
  login: {
    index: '/login',
  },
  register: {
    index: '/register',
    otpValidation: '/register/otp-validation',
  },
  forgotPassword: {
    index: '/forgot-password',
    otpValidation: '/forgot-password/otp-validation',
  },
  resetPassword: {
    index: '/reset-password',
  },
};

export default routes;
