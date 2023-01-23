import type {I18nConfig} from 'next-translate';

type ReadonlyPageValue =
  | ReadonlyArray<string>
  | ((context: Record<string, unknown>) => ReadonlyArray<string>);
export type ReadonlyPages = Record<string, ReadonlyPageValue>;

const i18nConfig = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'] as const,
    '/': ['home'] as const,
  },
  loadLocaleFrom: async () => {
    // @TODO
    // Add logic of dynamic locale

    const locale = await import(`./src/app/locales/en/common.json`);

    return locale;
  },
} satisfies Omit<I18nConfig, 'pages'> & {pages: ReadonlyPages};

module.exports = i18nConfig;
export default i18nConfig;
