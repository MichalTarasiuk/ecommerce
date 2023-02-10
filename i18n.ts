import type {I18nConfig} from 'next-translate';

export type ReadonlyAll<Value> =
  | Readonly<Value>
  | (Value extends (...params: infer Params) => infer ReturnType
      ? (...params: Params) => Readonly<ReturnType>
      : never);

type Pages = I18nConfig extends {
  readonly pages?: infer Pages;
}
  ? Pages
  : never;

export type ReadonlyPages = {
  readonly [Key in keyof Pages]: ReadonlyAll<Pages[Key]>;
};

const i18nConfig = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '/': ['common'] as const,
  },
  loadLocaleFrom: async () => {
    const locale = await import(`./src/app/locales/en/common.json`);

    return locale;
  },
} satisfies Omit<I18nConfig, 'pages'> & {readonly pages: ReadonlyPages};

module.exports = i18nConfig;
export default i18nConfig;
