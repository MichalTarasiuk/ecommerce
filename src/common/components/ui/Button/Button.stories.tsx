import {Button} from './Button';

import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/atoms/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export const ButtonType: StoryFn<typeof Button> = (props) => {
  return <Button {...props}>Example</Button>;
};

ButtonType.args = {
  type: 'button',
  variant: 'green',
};

export const LinkType: StoryFn<typeof Button> = (props) => {
  return <Button {...props}>Example</Button>;
};

LinkType.args = {
  type: 'link',
  variant: 'green',
  href: '/',
};
