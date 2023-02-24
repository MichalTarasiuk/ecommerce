import classNames from 'classnames';
import {useId} from 'react';

import {ReactComponent as CheckIcon} from 'public/icons/check.svg';

import type {InputHTMLAttributes} from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({
  checked,
  children,
  className,
  ...props
}: CheckboxProps) => {
  const id = useId();

  return (
    <label
      className='cursor-pointer relative flex items-center gap-1.5'
      htmlFor={id}
    >
      <div>
        <input
          id={id}
          type='checkbox'
          checked={checked}
          className={classNames('absolute invisible', className)}
          {...props}
        />
        <div
          className={classNames(
            'h-5 w-5 flex justify-center items-center',
            'border border-primary hover:border-active focus:border-active',
          )}
        >
          {checked && <CheckIcon />}
        </div>
      </div>
      <span>{children}</span>
    </label>
  );
};
