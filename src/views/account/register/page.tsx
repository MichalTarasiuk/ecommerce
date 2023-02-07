import {TextInput, Text, Heading, Button} from '@/common/components/components';
import {Main} from '@/views/core/core';

import {
  RegisterStepperProvider,
  useRegisterStep,
  useRegisterStepper,
} from './consts';

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
          {step === 0 && <RegisterFullnameStep />}
          {step === 1 && <p>age step</p>}
        </div>
      </div>
    </Main>
  );
};

const RegisterFullnameStep = () => {
  const registerStep = useRegisterStep();

  return (
    <form>
      <div>
        <Text tag='span' size='small'>
          Welcome,
        </Text>
        <Heading tag='h1' size='medium'>
          Create a new account
        </Heading>
      </div>
      <TextInput type='text' label='Email' placeholder='' htmlFor='email' />
      <TextInput
        type='text'
        label='Password'
        placeholder=''
        htmlFor='password'
      />
      <Button
        type='submit'
        variant='green'
        onClick={() => {
          const token = registerStep.set({
            firstname: 'Michał',
            lastname: 'Tarasiuk',
          });

          if (token) {
            registerStep.go(token);
          }
        }}
      >
        set fullname
      </Button>
    </form>
  );
};
