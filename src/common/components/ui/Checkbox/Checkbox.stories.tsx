import {useState} from 'react';

import {Checkbox} from './Checkbox';

import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/ui/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (props) => {
  return <Checkbox {...props} />;
};

export const Primary = Template.bind(undefined);

Primary.args = {
  children: 'Selector label',
};

export const Checked = Template.bind(undefined);

Checked.args = {
  children: 'Selector label',
  checked: true,
};

export const Controlled: StoryFn<typeof Checkbox> = (props) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Checkbox
      {...props}
      checked={enabled}
      onChange={({target: {checked}}) => {
        setEnabled(checked);
      }}
    />
  );
};

Controlled.args = {
  children: 'Selector label',
};
