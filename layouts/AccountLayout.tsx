import type {ReactNode} from 'react';

type AccountLayoutProps = {
  readonly children: ReactNode;
};

export function AccountLayout({children}: AccountLayoutProps) {
  return (
    <main className='min-h-screen bg-gradient-to-r from-blue-100 to-blue-500'>
      <div className='ml-auto flex min-h-screen items-center justify-center bg-white md:w-1/2'>
        {children}
      </div>
    </main>
  );
}
