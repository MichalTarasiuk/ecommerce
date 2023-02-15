import {Heading} from './Heading';

import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof Heading> = {
  title: 'components/atoms/Heading',
  component: Heading,
};

export default meta;

export const Primary: StoryFn<typeof Heading> = (props) => {
  return <Heading {...props}>Example heading</Heading>;
};

Primary.args = {
  tag: 'h1',
  size: 'medium',
};
