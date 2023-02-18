import {forwardRef, useId} from 'react';

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

    return (
      <div className='my-2'>
        <label className='block mb-1' htmlFor={id}>
          {label}
        </label>
        <input
          className='px-4 w-full border-2 py-2 rounded-md text-sm mb-1'
          ref={ref}
          type={type}
          id={id}
          spellCheck={type === ('email' && 'password')}
          autoComplete='off'
          {...props}
        />
        {errorMessage && (
          <Text tag='p' size='small' variant='error'>
            {errorMessage}
          </Text>
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
