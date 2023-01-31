import {Heading} from './Heading';

import type {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
  title: 'components/atoms/Heading',
  component: Heading,
} satisfies ComponentMeta<typeof Heading>;

export const Primary: ComponentStory<typeof Heading> = (props) => {
  return <Heading {...props}>Example heading</Heading>;
};

Primary.args = {
  tag: 'h1',
  size: 'medium',
};
