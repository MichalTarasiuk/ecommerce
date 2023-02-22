import {LanguageSelect} from './LanguageSelect';

import type {ReactNode} from 'react';

type CheckoutWrapperProps = {
  readonly children: ReactNode;
};

export const CheckoutWrapper = ({children}: CheckoutWrapperProps) => {
  return (
    <div className='px-6'>
      <div className='max-w-4xl min-h-screen mx-auto'>
        <div>
          <LanguageSelect />
        </div>
        {children}
      </div>
    </div>
  );
};
