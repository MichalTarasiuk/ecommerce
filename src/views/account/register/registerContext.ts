import {createStepperContext} from '@/common/contexts/stepperContext/stepperContext';

type RegisterStepperContextValue = {
  readonly fullname: {readonly firstname: string; readonly lastname: string};
  readonly age: number;
};

export const {
  StepperProvider: RegisterStepperProvider,
  useRegisterStepper: useRegisterStepper,
  useStep: useRegisterStep,
} = createStepperContext<RegisterStepperContextValue>('register', {
  0: {type: 'fullname', assert: (fullname) => fullname.firstname.length > 3},
  1: {type: 'age', assert: (age) => age >= 19},
});
