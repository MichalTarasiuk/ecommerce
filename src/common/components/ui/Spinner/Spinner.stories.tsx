import {Spinner} from './Spinner';

import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/ui/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export const Primary: StoryFn<typeof Spinner> = () => {
  return <Spinner />;
};
