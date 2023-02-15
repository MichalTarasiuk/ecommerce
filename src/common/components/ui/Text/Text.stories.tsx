import {Text} from './Text';

import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof Text> = {
  title: 'components/atoms/Text',
  component: Text,
};

export default meta;

export const Primary: StoryFn<typeof Text> = (props) => {
  return <Text {...props}>Example text</Text>;
};

Primary.args = {
  variant: 'default',
  size: 'medium',
  tag: 'p',
};

export const ErrorText: StoryFn<typeof Text> = (props) => {
  return <Text {...props}>Example text</Text>;
};

ErrorText.args = {
  variant: 'error',
  size: 'medium',
  tag: 'p',
};
