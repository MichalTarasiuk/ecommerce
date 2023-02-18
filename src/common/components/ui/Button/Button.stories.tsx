import {Button} from './Button';

import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'components/atoms/Button',
  component: Button,
};

export default meta;

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
