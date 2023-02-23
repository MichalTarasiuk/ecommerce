import classNames from 'classnames';
import {forwardRef, useState} from 'react';

import {ReactComponent as ChervonDownIcon} from 'public/icons/chervonDown.svg';

import type {ObjectType} from '@/common/types/types';
import type {
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  ChangeEvent,
} from 'react';

type SelectOption = ObjectType.Required<
  OptionHTMLAttributes<HTMLOptionElement>,
  'value' | 'children'
>;

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'className'
> & {
  readonly options: readonly SelectOption[];
  readonly containerClassName?: string;
  readonly selectClassName?: string;
};

const defaultSelectValue = 'default_select_value';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      value,
      options,
      containerClassName,
      selectClassName,
      placeholder,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [showPlaceholder, setShowPlaceholder] = useState(
      Boolean(placeholder),
    );

    const onChangeHandler = (changeEvent: ChangeEvent<HTMLSelectElement>) => {
      setShowPlaceholder(false);

      onChange?.(changeEvent);
    };

    return (
      <div className={classNames('relative', containerClassName)}>
        <select
          ref={ref}
          onChange={onChangeHandler}
          className={classNames(
            'border border-primary rounded text-base p-2 w-full appearance-none',
            'outline-none hover:border-active focus:border-active cursor-pointer',
            'disabled:pointer-events-none disabled:select-none disabled:text-secondary',
            selectClassName,
          )}
          value={showPlaceholder ? defaultSelectValue : value}
          {...props}
        >
          {showPlaceholder && (
            <option value={defaultSelectValue} disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value?.toString()} {...option} />
          ))}
        </select>
        <div className='absolute top-[calc(.5rem+1px)] right-2 pl-2 border-l pointer-events-none'>
          <ChervonDownIcon />
        </div>
      </div>
    );
  },
);

Select.displayName = 'Select';
