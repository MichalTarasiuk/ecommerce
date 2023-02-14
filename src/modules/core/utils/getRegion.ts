import {LanguageCodeEnum} from '@/common/graphql/generated/graphql';
import {i18nConfig} from '@root/i18n';

import type {Custom} from '@/common/types/types';

type Locale = Custom.ValueOf<(typeof i18nConfig)['locales']>;

type Params =
  | {
      readonly locale?: Locale;
      readonly channel?: string;
    }
  | undefined;

type Region = ReturnType<typeof getRegion>;

const defaultChannelName = 'default-channel';

const localeToLanguageCodeEnumKey: Record<Locale, LanguageCodeEnum> = {
  'en-US': LanguageCodeEnum.EnUs,
  'pl-PL': LanguageCodeEnum.Pl,
};

const languageCodeEnumToLocaleKey: Partial<Record<LanguageCodeEnum, Locale>> = {
  [LanguageCodeEnum.EnUs]: 'en-US',
  [LanguageCodeEnum.Pl]: 'pl-PL',
};

export const regionToPathname = ({
  channel,
  locale: languageCodeEnum,
}: Region) => {
  const locale =
    languageCodeEnumToLocaleKey[languageCodeEnum] ?? i18nConfig.defaultLocale;

  return `/${channel}/${locale}`;
};

export const getRegion = (params: Params) => {
  const {locale = i18nConfig.defaultLocale, channel = defaultChannelName} =
    params ?? {};

  return {
    locale: localeToLanguageCodeEnumKey[locale],
    channel,
  };
};
