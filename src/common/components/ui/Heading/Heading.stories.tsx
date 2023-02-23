import {Heading} from './Heading';

import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/atoms/Heading',
  component: Heading,
} satisfies Meta<typeof Heading>;

export const Primary: StoryFn<typeof Heading> = (props) => {
  return <Heading {...props}>Example heading</Heading>;
};

Primary.args = {
  tag: 'h1',
  size: 'medium',
};
