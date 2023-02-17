import {Button} from './Button';

import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'components/atoms/Button',
  component: Button,
};

export default meta;

export const GreenVariant: StoryFn<typeof Button> = (props) => {
  return <Button {...props}>Example</Button>;
};

GreenVariant.args = {
  type: 'button',
  variant: 'green',
};
