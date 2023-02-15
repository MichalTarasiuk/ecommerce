import {useRouter} from 'next/router';
import {useMemo} from 'react';

import {LanguageCodeEnum} from '@/common/graphql/generated/graphql';
import {i18nConfig} from '@root/i18n';

import {getChannel, getLocaleName} from './helpers';

import type {Custom} from '@/common/types/types';

type LocaleName = Custom.ValueOf<(typeof i18nConfig)['locales']>;

const isSupportedLocaleName = (localeName: string): localeName is LocaleName =>
  i18nConfig.locales.some((locale) => localeName === locale);

const localeNameToLanguageCode: Record<LocaleName, LanguageCodeEnum> = {
  'en-US': LanguageCodeEnum.EnUs,
  'pl-PL': LanguageCodeEnum.Pl,
};

export const useRegion = () => {
  const router = useRouter();

  return useMemo(() => {
    const localeName = getLocaleName(router.query);
    const locale = isSupportedLocaleName(localeName)
      ? localeNameToLanguageCode[localeName]
      : localeNameToLanguageCode[i18nConfig.defaultLocale];

    return {
      locale,
      channel: getChannel(router.query),
    };
  }, [router.query]);
};
