import {forwardRef} from 'react';

import {Text} from '../Text/Text';

import type {InputHTMLAttributes} from 'react';

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;
type InputProps = InputAttributes & {
  readonly type: Extract<
    InputAttributes['type'],
    'text' | 'email' | 'password'
  >;
  readonly label: string;
  readonly htmlFor: string;
  readonly placeholder: string;
  readonly errorMessage?: string;
};

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({type = 'text', htmlFor, label, errorMessage, ...props}, ref) => {
    return (
      <div className='my-3'>
        <label htmlFor={htmlFor}>{label}</label>
        <input
          className='px-4 w-full border-2 py-2 rounded-md text-sm mb-1'
          ref={ref}
          type={type}
          id={htmlFor}
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
