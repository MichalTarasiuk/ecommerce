import {TextInput} from './TextInput';

import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof TextInput> = {
  title: 'components/atoms/TextInput',
  component: TextInput,
};

export default meta;

export const Primary: StoryFn<typeof TextInput> = (props) => {
  return <TextInput {...props} />;
};

Primary.args = {
  type: 'text',
  label: 'Text',
};

export const Error: StoryFn<typeof TextInput> = (props) => {
  return <TextInput {...props} />;
};

Error.args = {
  type: 'text',
  label: 'Text',
  errorMessage: 'something went wrong',
};
