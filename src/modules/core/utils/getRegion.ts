import {LanguageCodeEnum} from '@/common/graphql/generated/graphql';
import {i18nConfig} from '@root/i18n';

import type {Custom} from '@/common/types/types';

type Locale = Custom.ValueOf<(typeof i18nConfig)['locales']>;

type Params =
  | {
      readonly locale: Locale;
      readonly channel: string;
    }
  | undefined;

const defaultChannelName = 'default-channel';

const localeToLanguageCodeEnumKey: Record<Locale, LanguageCodeEnum> = {
  'en-US': LanguageCodeEnum.EnUs,
  'pl-PL': LanguageCodeEnum.Pl,
};

export const localeToLanguageCodeEnum = (
  locale: Locale | undefined = i18nConfig.defaultLocale,
) => localeToLanguageCodeEnumKey[locale];

export const getRegion = (params: Params) => {
  const {locale = i18nConfig.defaultLocale, channel = defaultChannelName} =
    params ?? {};

  return {
    locale: localeToLanguageCodeEnum(locale),
    channel,
  };
};
