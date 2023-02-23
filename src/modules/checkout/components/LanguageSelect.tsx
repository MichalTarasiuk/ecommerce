import {useMemo} from 'react';

import {IconButton, Select} from '@/common/components/components';
import {useLocale, useTranslate} from '@/common/hooks/hooks';
import {
  hasOwn,
  isString,
  isSupportedLocale,
  objectEvery,
} from '@/common/utils/utils';
import {i18nConfig} from '@root/i18n';
import {ReactComponent as LanguageIcon} from 'public/icons/language.svg';

import type {ChangeEvent} from 'react';

export function LanguageSelect() {
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

  const selectedChildrenOption = useMemo(() => {
    const {children} = options.find((option) => option.value === locale) ?? {};

    return children;
  }, [locale, options]);

  const onChange = ({target: {value}}: ChangeEvent<HTMLSelectElement>) => {
    if (isSupportedLocale(value)) {
      void setLocale(value);
    }
  };

  return (
    <div className='relative'>
      {selectedChildrenOption && (
        <IconButton icon={LanguageIcon}>{selectedChildrenOption}</IconButton>
      )}
      <Select
        value={locale}
        options={options}
        onChange={onChange}
        containerClassName='!absolute top-0 opacity-0 h-full w-full'
        selectClassName='!p-0 h-full'
      />
    </div>
  );
}
