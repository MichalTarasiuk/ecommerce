import classNames from 'classnames';
import {forwardRef, useState} from 'react';

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
      <select
        ref={ref}
        onChange={onChange}
        className={classNames(
          'border rounded py-2 px-3 pr-12 w-full text-base appearance-none cursor-pointer',
          props.className,
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
    );
  },
);

Select.displayName = 'Select';
