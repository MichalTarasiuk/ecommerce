import type {ReactNode} from 'react';

type AccountLayoutProps = {
  readonly children: ReactNode;
};

export function AccountLayout({children}: AccountLayoutProps) {
  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-100 to-blue-500'>
      <div className='md:w-1/2 min-h-screen flex items-center justify-center bg-white ml-auto'>
        {children}
      </div>
    </div>
  );
}
