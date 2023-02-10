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

type ExtendedI18nConfig = Omit<I18nConfig, 'pages'> & {
  readonly pages: ReadonlyPages;
  readonly skipInitialProps: boolean;
};

const defaultLocale = 'en';

export const i18nConfig = {
  locales: [defaultLocale],
  defaultLocale: defaultLocale,
  pages: {
    '/': ['common'] as const,
  },
  loadLocaleFrom: (locale = defaultLocale, namespace) => {
    return import(`./src/app/locales/${locale}/${namespace}.json`);
  },
  loader: false,
  skipInitialProps: true,
} satisfies ExtendedI18nConfig;
