import {Spinner} from './Spinner';

import type {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
  title: 'components/atoms/Spinner',
  component: Spinner,
} satisfies ComponentMeta<typeof Spinner>;

export const Default: ComponentStory<typeof Spinner> = () => {
  return <Spinner />;
};
