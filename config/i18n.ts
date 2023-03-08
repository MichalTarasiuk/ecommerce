/* eslint-disable @typescript-eslint/no-unsafe-member-access -- to unkown */
import {defaultLocale, locales, signs} from '~constants/constants';
import {routes} from '~constants/routes';
import {isError, isObject} from '~utils/utils';

import type {I18nConfig} from 'next-translate';

type Pages = I18nConfig extends {
  readonly pages?: infer Pages;
}
  ? Pages
  : never;

type I18nProviderProps = Awaited<
  ReturnType<Exclude<I18nConfig['loadLocaleFrom'], undefined>>
>;

export type ReadonlyPages = {
  readonly [Key in keyof Pages]: Custom.ReadonlyAll<Pages[Key]>;
};

export type ExtendedI18nConfig = Omit<I18nConfig, 'pages'> & {
  readonly locales: ReadonlyArray<Custom.ValueOf<typeof locales>>;
  readonly pages: ReadonlyPages;
  readonly skipInitialProps: boolean;
};

const isI18nProviderProps = (value: unknown): value is I18nProviderProps =>
  isObject(value);

export const i18nConfig = {
  locales,
  defaultLocale,
  pages: {
    '*': ['common'] as const,
    [routes.checkout]: ['checkout'] as const,
    [routes.account.register]: ['account.register'] as const,
    [routes.account.login]: ['account.login'] as const,
    [routes.account.forgotPassword]: ['account.forgot-password'] as const,
    [routes.account.changePassword]: ['account.change-password'] as const,
  },
  loadLocaleFrom: (locale = defaultLocale, namespace) => {
    return import(
      `../locales/${locale}/${namespace.replace(signs.dot, signs.slash)}.json`
    )
      .then((moduleObject) => {
        const locale: unknown = moduleObject.default;
        if (isI18nProviderProps(locale)) {
          return locale;
        }
        throw Error('locale is not i18n provider props');
      })
      .catch((error) => {
        if (isError(error)) {
          console.error(error.message);
        }
        return {};
      });
  },
  loader: false,
  skipInitialProps: true,
} satisfies ExtendedI18nConfig;
