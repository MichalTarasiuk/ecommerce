import {useMemo} from 'react';

import {Select} from '@/common/components/components';
import {useLocale, useTranslate} from '@/common/hooks/hooks';
import {
  hasOwn,
  isString,
  isSupportedLocale,
  objectEvery,
} from '@/common/utils/utils';
import {i18nConfig} from '@root/i18n';

import type {ChangeEvent} from 'react';

export const LanguageSelect = () => {
  const {locale, setLocale} = useLocale();
  const {translate} = useTranslate('common');

  const options = useMemo(() => {
    const languageSelectObject = translate('language_select', null, {
      returnObjects: true,
    });

    return i18nConfig.locales.flatMap((locale) => {
      if (
        hasOwn(languageSelectObject, locale) &&
        objectEvery<Record<typeof locale, string>>(
          languageSelectObject,
          isString,
        )
      ) {
        const children = languageSelectObject[locale];
        const option = {value: locale, children};

        return [option];
      }

      return [];
    });
  }, [translate]);

  const onChange = ({target: {value}}: ChangeEvent<HTMLSelectElement>) => {
    if (isSupportedLocale(value)) {
      void setLocale(value);
    }
  };

  return <Select value={locale} options={options} onChange={onChange} />;
};
