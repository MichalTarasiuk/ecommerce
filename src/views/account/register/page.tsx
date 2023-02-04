import {Main} from '@/views/core/core';

import {
  RegisterStepperProvider,
  useRegisterStep,
  useRegisterStepper,
} from './registerContext';

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
    <Main>
      <h1>Register page</h1>
      {step === 0 && <RegisterFullnameStep />}
      {step === 1 && <p>age step</p>}
    </Main>
  );
};

const RegisterFullnameStep = () => {
  const registerStep = useRegisterStep();

  return (
    <button
      onClick={() => {
        const token = registerStep.set({
          firstname: 'Michał',
          lastname: 'Tarasiuk',
        });

        if (token) {
          registerStep.move(token);
        }
      }}
    >
      set fullname
    </button>
  );
};
