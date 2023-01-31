import {Text} from './Text';

import type {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
  title: 'components/atoms/Text',
  component: Text,
} satisfies ComponentMeta<typeof Text>;

export const Primary: ComponentStory<typeof Text> = (props) => {
  return <Text {...props}>Example text</Text>;
};

Primary.args = {
  variant: 'default',
  size: 'medium',
  tag: 'p',
};

export const ErrorText: ComponentStory<typeof Text> = (props) => {
  return <Text {...props}>Example text</Text>;
};

ErrorText.args = {
  variant: 'error',
  size: 'medium',
  tag: 'p',
};
