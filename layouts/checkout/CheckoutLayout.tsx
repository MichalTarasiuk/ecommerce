import {LanguageSelect} from './components/components';

import type {ReactNode} from 'react';

type CheckoutLayoutProps = {
  readonly children: ReactNode;
};

export function CheckoutLayout({children}: CheckoutLayoutProps) {
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
