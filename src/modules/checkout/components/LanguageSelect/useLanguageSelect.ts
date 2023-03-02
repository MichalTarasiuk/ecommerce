import {useMemo} from 'react';

import {useTranslate} from '@/common/hooks/hooks';
import {hasOwn, isString, objectEvery} from '@/common/utils/utils';
import {i18nConfig} from '@root/i18n';

import type {locales} from '@/common/consts/consts';

type Locale = Custom.ValueOf<typeof locales>;

export const useLanguageSelect = (locale: Locale) => {
  const {translate} = useTranslate('common');

  const options = useMemo(() => {
    const languageSelectObject = translate('language_select', null, {
      returnObjects: true,
    });

    if (
      !objectEvery<Record<typeof locale, string>>(
        languageSelectObject,
        isString,
      )
    ) {
      return [];
    }

    return i18nConfig.locales.flatMap((locale) => {
      if (hasOwn(languageSelectObject, locale)) {
        const children = languageSelectObject[locale];
        const option = {value: locale, children};

        return [option];
      }

      return [];
    });
  }, [translate]);

  const selectedChildrenOption = useMemo(() => {
    const {children} = options.find((option) => option.value === locale) ?? {};

    return children;
  }, [locale, options]);

  return {
    options,
    selectedChildrenOption,
  };
};
