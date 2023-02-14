import {LanguageCodeEnum} from '@/common/graphql/generated/graphql';
import {i18nConfig} from '@root/i18n';

import type {Custom} from '@/common/types/types';

type LocaleName = Custom.ValueOf<(typeof i18nConfig)['locales']>;

type Params =
  | {
      readonly locale?: LocaleName;
      readonly channel?: string;
    }
  | undefined;

type Region = ReturnType<typeof getRegion>;

const defaultChannelName = 'default-channel';

const localeNameToLanguageCode: Record<LocaleName, LanguageCodeEnum> = {
  'en-US': LanguageCodeEnum.EnUs,
  'pl-PL': LanguageCodeEnum.Pl,
};

const languageCodeEnumToLocaleName: Partial<
  Record<LanguageCodeEnum, LocaleName>
> = {
  [LanguageCodeEnum.EnUs]: 'en-US',
  [LanguageCodeEnum.Pl]: 'pl-PL',
};

export const regionToPathname = ({channel, locale}: Region) => {
  const localeName =
    languageCodeEnumToLocaleName[locale] ?? i18nConfig.defaultLocale;

  return `/${channel}/${localeName}`;
};

export const getRegion = (params: Params) => {
  const {
    locale: localeName = i18nConfig.defaultLocale,
    channel = defaultChannelName,
  } = params ?? {};

  return {
    locale: localeNameToLanguageCode[localeName],
    localeName,
    channel,
  };
};
