/* eslint-disable @typescript-eslint/no-unsafe-member-access -- to unkown */
import {isObject} from '@/common/utils/utils';

import type {Custom} from '@/common/types/types';
import type {I18nConfig} from 'next-translate';

type Pages = I18nConfig extends {
  readonly pages?: infer Pages;
}
  ? Pages
  : never;

export type ReadonlyPages = {
  readonly [Key in keyof Pages]: Custom.ReadonlyAll<Pages[Key]>;
};

export type ExtendedI18nConfig = Omit<I18nConfig, 'pages'> & {
  readonly locales: ReadonlyArray<Custom.ValueOf<typeof locales>>;
  readonly pages: ReadonlyPages;
  readonly skipInitialProps: boolean;
};

const locales = {
  english: 'en-US',
  polish: 'pl-PL',
} as const;

const defaultLocale = locales.english;

const isI18nProviderProps = (
  value: unknown,
): value is Awaited<
  ReturnType<Exclude<I18nConfig['loadLocaleFrom'], undefined>>
> => isObject(value);

export const i18nConfig = {
  locales: Object.values(locales),
  defaultLocale: defaultLocale,
  pages: {
    '/': ['common'] as const,
  },
  loadLocaleFrom: (locale = defaultLocale, namespace) => {
    return import(`./src/app/locales/${locale}/${namespace}.json`).then(
      (moduleObject) => {
        const locale: unknown = moduleObject.default;

        if (isI18nProviderProps(locale)) {
          return locale;
        }

        throw Error('error during loading locale');
      },
    );
  },
  loader: false,
  skipInitialProps: true,
} satisfies ExtendedI18nConfig;
