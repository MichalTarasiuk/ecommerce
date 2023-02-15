import {Spinner} from './Spinner';

import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof Spinner> = {
  title: 'components/atoms/Spinner',
  component: Spinner,
};

export default meta;

export const Default: StoryFn<typeof Spinner> = () => {
  return <Spinner />;
};
