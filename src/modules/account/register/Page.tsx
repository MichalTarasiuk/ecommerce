import {RegisterForm} from './components/components';

export function RegisterPage() {
  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-100 to-blue-500'>
      <div className='w-1/2 min-h-screen bg-white ml-auto flex justify-center items-center'>
        <RegisterForm />
      </div>
    </div>
  );
}
