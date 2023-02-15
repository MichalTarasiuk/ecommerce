import {VisuallyHidden} from './VisuallyHidden';

import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'components/atoms/VisuallyHidden',
  component: VisuallyHidden,
};

export default meta;

export const Default: StoryFn<typeof VisuallyHidden> = (props) => {
  return (
    <VisuallyHidden {...props}>
      <button>visually hidden content</button>
    </VisuallyHidden>
  );
};

Default.args = {
  tag: 'span',
};

export const VisibleOnFocus: StoryFn<typeof VisuallyHidden> = (props) => {
  return (
    <VisuallyHidden {...props}>
      <button>visually hidden content</button>
    </VisuallyHidden>
  );
};

VisibleOnFocus.args = {
  tag: 'span',
  visibleOnFocus: true,
};
