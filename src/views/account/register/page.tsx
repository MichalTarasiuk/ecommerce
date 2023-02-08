import {Main} from '@/views/core/core';

import {RegisterFullnameStep} from './components/components';
import {RegisterStepperProvider, useRegisterStepper} from './context';

export const RegisterPage = () => {
  return (
    <RegisterStepperProvider>
      <Register />
    </RegisterStepperProvider>
  );
};

const Register = () => {
  const {step} = useRegisterStepper();

  return (
    <Main className='min-h-screen bg-gradient-to-r from-blue-100 to-blue-500'>
      <div className='flex justify-center items-center ml-auto min-h-screen w-1/2 bg-white'>
        <div className='w-2/5'>
          {step === '0:fullname' && <RegisterFullnameStep />}
          {step === '1:age' && <p>age step</p>}
        </div>
      </div>
    </Main>
  );
};
