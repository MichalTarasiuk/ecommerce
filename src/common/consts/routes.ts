export const routes = {
  home: '/',
  account: {
    register: '/account/register',
    login: '/account/login',
    confirm: '/account/confirm',
    forgotPassword: '/account/forgot-password',
    changePassword: '/account/change-password',
  },
} as const;
