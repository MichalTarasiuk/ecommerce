import {Button} from './Button';

import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/ui/Button',
  component: Button,
} satisfies Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (props) => {
  return <Button {...props}>Example</Button>;
};

export const ButtonType = Template.bind(undefined);

ButtonType.args = {
  type: 'button',
  color: 'green',
  size: 'medium',
};

export const LinkType = Template.bind(undefined);

LinkType.args = {
  type: 'link',
  color: 'green',
  size: 'medium',
  href: '/',
};
