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
  loadLocaleFrom: async (language, namespace) =>
    import(`./src/app/locales/${language}/${namespace}.json`).then(
      (module) => module.default,
    ),
} satisfies Omit<I18nConfig, 'pages'> & {pages: ReadonlyPages};

export default i18nConfig;
