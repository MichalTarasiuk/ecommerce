import classNames from 'classnames';
import {forwardRef, useState} from 'react';

import {ReactComponent as ChervonDownIcon} from 'public/icons/chervonDown.svg';

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
            'w-full cursor-pointer appearance-none p-2 text-base outline-none',
            'rounded border border-primary hover:border-active focus:border-active',
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
        <div className='pointer-events-none absolute top-[calc(.5rem+1px)] right-2 border-l pl-2'>
          <ChervonDownIcon />
        </div>
      </div>
    );
  },
);

Select.displayName = 'Select';
