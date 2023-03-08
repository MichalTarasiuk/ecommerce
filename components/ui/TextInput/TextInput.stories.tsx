import {TextInput} from './TextInput';

import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/ui/TextInput',
  component: TextInput,
} satisfies Meta<typeof TextInput>;

const Template: StoryFn<typeof TextInput> = (props) => {
  return <TextInput {...props} />;
};

export const Primary = Template.bind(undefined);

Primary.args = {
  type: 'text',
  label: 'Text',
};

export const Error = Template.bind(undefined);

Error.args = {
  type: 'text',
  label: 'Text',
  errorMessage: 'something went wrong',
};
