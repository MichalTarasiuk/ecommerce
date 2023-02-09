import {TextInput} from './TextInput';

import type {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
  title: 'components/atoms/TextInput',
  component: TextInput,
} satisfies ComponentMeta<typeof TextInput>;

export const Primary: ComponentStory<typeof TextInput> = (props) => {
  return <TextInput {...props} />;
};

Primary.args = {
  type: 'text',
  label: 'Text',
};

export const Error: ComponentStory<typeof TextInput> = (props) => {
  return <TextInput {...props} />;
};

Error.args = {
  type: 'text',
  label: 'Text',
  errorMessage: 'something went wrong',
};
