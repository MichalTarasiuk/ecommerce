import {LanguageSelect} from './LanguageSelect';

import type {ReactNode} from 'react';

type CheckoutWrapperProps = {
  readonly children: ReactNode;
};

export const CheckoutWrapper = ({children}: CheckoutWrapperProps) => {
  return (
    <div className='max-w-4xl min-h-screen mx-auto'>
      <LanguageSelect />
      {children}
    </div>
  );
};
