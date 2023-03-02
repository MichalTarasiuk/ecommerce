import {IconButton, Select} from '@/common/components/components';
import {useLocale} from '@/common/hooks/hooks';
import {isSupportedLocale} from '@/common/utils/utils';
import {ReactComponent as LanguageIcon} from 'public/icons/language.svg';

import {useLanguageSelect} from './useLanguageSelect';

import type {ChangeEvent} from 'react';

export function LanguageSelect() {
  const {locale, setLocale} = useLocale();
  const {options, selectedChildrenOption} = useLanguageSelect(locale);

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
