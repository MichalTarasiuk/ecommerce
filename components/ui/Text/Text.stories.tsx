import {Text} from './Text';

import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/ui/Text',
  component: Text,
} satisfies Meta<typeof Text>;

const Template: StoryFn<typeof Text> = (props) => {
  return <Text {...props}>Example text</Text>;
};

export const Primary = Template.bind(undefined);

Primary.args = {
  variant: 'default',
  size: 'medium',
  tag: 'p',
};

export const ErrorText = Template.bind(undefined);

ErrorText.args = {
  variant: 'error',
  size: 'medium',
  tag: 'p',
};
