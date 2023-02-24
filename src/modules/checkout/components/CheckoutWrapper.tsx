import {LanguageSelect} from './LanguageSelect';

import type {ReactNode} from 'react';

type CheckoutWrapperProps = {
  readonly children: ReactNode;
};

export function CheckoutWrapper({children}: CheckoutWrapperProps) {
  return (
    <div className='bg-snow-white'>
      <div className='max-w-4xl min-h-screen mx-auto '>
        <div className='flex justify-end py-9'>
          <LanguageSelect />
        </div>
        {children}
      </div>
    </div>
  );
}
