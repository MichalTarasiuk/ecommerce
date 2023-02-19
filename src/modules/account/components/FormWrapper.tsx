import type {ReactNode} from 'react';

type FormWrapperProps = {
  readonly children: ReactNode;
};

export const FormWrapper = ({children}: FormWrapperProps) => {
  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-100 to-blue-500'>
      <div className='w-1/2 min-h-screen bg-white ml-auto flex justify-center items-center'>
        {children}
      </div>
    </div>
  );
};
