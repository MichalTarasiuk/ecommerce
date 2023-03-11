import {LanguageSelect} from './components/components';

import type {ReactNode} from 'react';

type CheckoutLayoutProps = {
  readonly children: ReactNode;
};

export function CheckoutLayout({children}: CheckoutLayoutProps) {
  return (
    <main className='bg-snow-white'>
      <div className='max-w-4xl min-h-screen mx-auto '>
        <nav className='flex justify-end py-9'>
          <LanguageSelect />
        </nav>
        {children}
      </div>
    </main>
  );
}
