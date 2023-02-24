import {forwardRef, useId} from 'react';

import {isString} from '@/common/utils/typeof';

import {Text} from '../Text/Text';

import type {InputHTMLAttributes} from 'react';

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;
type InputProps = InputAttributes & {
  readonly type?: Extract<
    InputAttributes['type'],
    'text' | 'email' | 'password'
  >;
  readonly label: string;
  readonly errorMessage?: string | undefined;
};

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({type = 'text', label, errorMessage, ...props}, ref) => {
    const id = useId();

    const hasError = isString(errorMessage);

    return (
      <div className='my-2'>
        <label className='block mb-1' htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          type={type}
          className='px-4 w-fullpy-2 border-2 rounded-md text-sm mb-1'
          spellCheck={type === ('email' && 'password')}
          autoComplete='off'
          {...props}
        />
        {hasError && (
          <Text tag='p' size='small' variant='error'>
            {errorMessage}
          </Text>
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
