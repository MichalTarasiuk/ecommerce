/* eslint-disable @typescript-eslint/no-unsafe-member-access -- to unkown */
import {defaultLocale, locales, signs} from 'constants/constants';
import {routes} from 'constants/routes';
import {isError, isObject, logErrorInDev} from 'utils/utils';

import type {Locale} from 'lib/translate/types';
import type {I18nConfig} from 'next-translate';

type ToNamespaceKey<
  Keys extends string,
  NamespaceKey extends string = StringType.ReplaceAll<
    StringType.Replace<Keys, '/', ''>,
    '/',
    '.'
  >,
> = NamespaceKey | Omit<string, NamespaceKey>;

type InferPages<
  Routes extends Record<string, unknown>,
  Keys extends string = Extract<ObjectType.DeepValueOf<Routes>, string>,
> = {
  readonly [Key in Keys | (Omit<string, Keys> & PropertyKey)]?: ReadonlyArray<
    ToNamespaceKey<Keys>
  >;
};

type I18nProviderProps = Awaited<
  ReturnType<Exclude<I18nConfig['loadLocaleFrom'], undefined>>
>;

export type ExtendedI18nConfig = Omit<I18nConfig, 'pages'> & {
  readonly locales: ReadonlyArray<Locale>;
  readonly pages: InferPages<typeof routes>;
  readonly skipInitialProps: boolean;
};

const isI18nProviderProps = (value: unknown): value is I18nProviderProps =>
  isObject(value);

export const i18nConfig = {
  locales,
  defaultLocale,
  pages: {
    '*': ['common'],
    [routes.checkout]: ['checkout'],
    [routes.account.register]: ['account.register'],
    [routes.account.login]: ['account.login'],
    [routes.account.forgotPassword]: ['account.forgot-password'],
    [routes.account.changePassword]: ['account.change-password'],
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
          logErrorInDev(error.message);
        }

        return {};
      });
  },
  loader: false,
  skipInitialProps: true,
} satisfies ExtendedI18nConfig;
