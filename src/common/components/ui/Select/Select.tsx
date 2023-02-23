import classNames from 'classnames';
import {forwardRef, useState} from 'react';

import {ReactComponent as ChervonDownIcon} from 'public/icons/chervonDown.svg';

import type {ObjectType} from '@/common/types/types';
import type {
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  ChangeEvent,
} from 'react';

export type SelectOption = ObjectType.Required<
  OptionHTMLAttributes<HTMLOptionElement>,
  'value' | 'children'
>;

export type SelectProps = {
  readonly options: readonly SelectOption[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const defaultValue = 'default_value';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({value, options, placeholder, onChange: onChangeImpl, ...props}, ref) => {
    const [showPlaceholder, setShowPlaceholder] = useState(
      Boolean(placeholder),
    );

    const onChange = (changeEvent: ChangeEvent<HTMLSelectElement>) => {
      setShowPlaceholder(false);

      onChangeImpl?.(changeEvent);
    };

    return (
      <div className={classNames('relative', props.className)}>
        <select
          ref={ref}
          onChange={onChange}
          className={classNames(
            'absolute border rounded text-base p-2 w-full appearance-none',
            'focus:outline-none active:outline-none cursor-pointer',
            'disabled:pointer-events-none disabled:select-none disabled:text-gray-500',
          )}
          {...(showPlaceholder && {value: defaultValue})}
          {...props}
        >
          {showPlaceholder && (
            <option value={defaultValue} disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value?.toString()} {...option} />
          ))}
        </select>
        <div className='absolute top-[calc(.5rem+1px)] right-2 pl-2 border-l'>
          <ChervonDownIcon />
        </div>
      </div>
    );
  },
);

Select.displayName = 'Select';
