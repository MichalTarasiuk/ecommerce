/* eslint-disable @typescript-eslint/no-unsafe-member-access -- to unkown */
import {signs} from '@/common/consts/consts';
import {routes} from '@/common/consts/routes';
import {isObject} from '@/common/utils/utils';

import type {Custom} from '@/common/types/types';
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

const availableLocales = {
  english: 'en-US',
  polish: 'pl-PL',
} as const;

const locales = Object.values(availableLocales);
const defaultLocale = availableLocales.english;

const isI18nProviderProps = (value: unknown): value is I18nProviderProps =>
  isObject(value);

export const i18nConfig = {
  locales,
  defaultLocale,
  pages: {
    '*': ['common'] as const,
    [routes.account.register]: ['account.index', 'account.register'] as const,
  },
  loadLocaleFrom: (locale = defaultLocale, namespace) => {
    const path = `./src/app/locales/${locale}/${namespace.replace(
      signs.dot,
      signs.slash,
    )}.json`;

    return import(path)
      .then((moduleObject) => {
        console.log({moduleObject});
        const locale: unknown = moduleObject.default;

        if (isI18nProviderProps(locale)) {
          return locale;
        }

        throw Error('locale is not i18n provider props');
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.error(error.message);
        }

        return {};
      });
  },
  loader: false,
  skipInitialProps: true,
} satisfies ExtendedI18nConfig;
