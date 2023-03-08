import {IconButton, Select} from 'components/components';
import {isSupportedLocale, useLocale} from 'lib/region/region';
import {ReactComponent as LanguageIcon} from 'public/icons/language.svg';

import {useLanguageSelect} from './useLanguageSelect';

import type {ChangeEvent} from 'react';

export function LanguageSelect() {
  const {locale, setLocale} = useLocale();
  const {options, selectedOption} = useLanguageSelect(locale);

  const onChange = ({target: {value}}: ChangeEvent<HTMLSelectElement>) => {
    if (isSupportedLocale(value)) {
      void setLocale(value);
    }
  };

  return (
    <div className='relative'>
      {selectedOption && (
        <IconButton icon={LanguageIcon}>{selectedOption.children}</IconButton>
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
