import {Text, TextInput, Button, Heading} from '@/common/components/components';

import {useRegisterStep} from '../context';

export const RegisterFullnameStep = () => {
  const registerStep = useRegisterStep();

  const submit = () => {
    const token = registerStep.set({
      firstname: 'Michał',
      lastname: 'Tarasiuk',
    });

    if (token) {
      registerStep.go(token);
    }
  };

  return (
    <form onSubmit={submit}>
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
        type='link'
        href='/'
        ref={(ref) => {
          if (ref) {
            ref;
          }
        }}
        variant='green'
      >
        set fullname
      </Button>
    </form>
  );
};
