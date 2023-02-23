import {VisuallyHidden} from './VisuallyHidden';

import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/atoms/VisuallyHidden',
  component: VisuallyHidden,
} satisfies Meta<typeof VisuallyHidden>;

export const Primary: StoryFn<typeof VisuallyHidden> = (props) => {
  return (
    <VisuallyHidden {...props}>
      <button>visually hidden content</button>
    </VisuallyHidden>
  );
};

Primary.args = {
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
