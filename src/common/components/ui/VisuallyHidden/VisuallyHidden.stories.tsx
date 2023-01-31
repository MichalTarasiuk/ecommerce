import {VisuallyHidden} from './VisuallyHidden';

import type {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
  title: 'components/atoms/VisuallyHidden',
  component: VisuallyHidden,
} satisfies ComponentMeta<typeof VisuallyHidden>;

export const Default: ComponentStory<typeof VisuallyHidden> = (props) => {
  return (
    <VisuallyHidden {...props}>
      <button>visually hidden content</button>
    </VisuallyHidden>
  );
};

Default.args = {
  tag: 'span',
};

export const VisibleOnFocus: ComponentStory<typeof VisuallyHidden> = (
  props,
) => {
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
