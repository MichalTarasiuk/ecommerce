import {VisuallyHidden} from './VisuallyHidden';

import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/ui/VisuallyHidden',
  component: VisuallyHidden,
} satisfies Meta<typeof VisuallyHidden>;

const Template: StoryFn<typeof VisuallyHidden> = (props) => {
  return (
    <VisuallyHidden {...props}>
      <button>visually hidden content</button>
    </VisuallyHidden>
  );
};

export const Primary = Template.bind(undefined);

Primary.args = {
  tag: 'span',
};

export const VisibleOnFocus = Template.bind(undefined);

VisibleOnFocus.args = {
  tag: 'span',
  visibleOnFocus: true,
};
