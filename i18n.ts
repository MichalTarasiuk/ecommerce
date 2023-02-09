import type {Common} from '@/common/types/types';
import type {I18nConfig} from 'next-translate';

type Pages = I18nConfig extends {
  readonly pages?: infer Pages;
}
  ? Pages
  : never;

export type ReadonlyPages = {
  readonly [Key in keyof Pages]: Common.ReadonlyAll<Pages[Key]>;
};

const i18nConfig = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'] as const,
    '/': ['home'] as const,
  },
  loadLocaleFrom: async () => {
    try {
      const locale = await import(`./src/app/locales/en/common.json`);

      return locale;
    } catch (error) {
      console.log(error);

      return {};
    }
  },
} satisfies Omit<I18nConfig, 'pages'> & {readonly pages: ReadonlyPages};

module.exports = i18nConfig;
export default i18nConfig;
