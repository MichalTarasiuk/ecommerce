import type {ObjectType} from '@/common/types/types';

type CommonNamespace = {
  readonly pl: typeof import('src/app/locales/pl-PL/common.json');
  readonly en: typeof import('src/app/locales/en-US/common.json');
};

type AccountRegisterNamespace = {
  readonly pl: typeof import('src/app/locales/pl-PL/account/register.json');
  readonly en: typeof import('src/app/locales/en-US/account/register.json');
};

type AccountLoginNamespace = {
  readonly pl: typeof import('src/app/locales/pl-PL/account/login.json');
  readonly en: typeof import('src/app/locales/en-US/account/login.json');
};

type AccountForgotPassword = {
  readonly pl: typeof import('src/app/locales/pl-PL/account/forgot-password.json');
  readonly en: typeof import('src/app/locales/en-US/account/forgot-password.json');
};

export type Namespaces = {
  readonly common: ObjectType.Intersection<
    CommonNamespace['pl'],
    CommonNamespace['en']
  >;
  readonly ['account.register']: ObjectType.Intersection<
    AccountRegisterNamespace['en'],
    AccountRegisterNamespace['pl']
  >;
  readonly ['account.login']: ObjectType.Intersection<
    AccountLoginNamespace['en'],
    AccountLoginNamespace['pl']
  >;
  readonly ['account.forgot-password']: ObjectType.Intersection<
    AccountForgotPassword['en'],
    AccountForgotPassword['pl']
  >;
};
