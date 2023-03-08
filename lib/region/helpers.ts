import {defaultLocale, defaultRegion, locales} from 'constants/constants';
import {LanguageCodeEnum} from 'types/generated/graphql';
import {isString} from 'utils/utils';

type Locale = Custom.ValueOf<typeof locales>;

type Region = ReturnType<typeof getRegion>;

const localeToLanguageCode: Record<Locale, LanguageCodeEnum> = {
  'en-US': LanguageCodeEnum.EnUs,
  'pl-PL': LanguageCodeEnum.Pl,
};

export const isSupportedLocale = (value: unknown): value is Locale => {
  const unknownLocales: readonly string[] = locales;

  return isString(value) && unknownLocales.includes(value);
};

export const getLocale = (params: {readonly locale?: string}) => {
  if (isSupportedLocale(params.locale)) {
    return params.locale;
  }

  return defaultLocale;
};

export const getChannel = (params: {readonly channel?: string}) => {
  if (isString(params.channel)) {
    return params.channel;
  }

  return defaultRegion.channel;
};

export const getRegion = (
  params: {readonly channel?: string; readonly locale?: string} = defaultRegion,
) => {
  const locale = getLocale(params);

  return {
    locale,
    variables: {
      languageCode: localeToLanguageCode[locale],
      channel: getChannel(params),
    },
  };
};

export const regionToPathname = ({variables: {channel}, locale}: Region) =>
  `/${channel}/${locale}`;
