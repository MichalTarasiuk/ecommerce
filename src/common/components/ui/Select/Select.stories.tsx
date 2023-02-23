import {Select} from './Select';

import type {SelectProps} from './Select';
import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/atoms/Select',
  component: Select,
} satisfies Meta<typeof Select>;

const options: SelectProps['options'] = [
  {children: 'Durward Reynolds', value: 'Durward Reynolds'},
  {children: 'Kenton Towne', value: 'Kenton Towne'},
  {children: 'Therese Wunsch', value: 'Therese Wunsch'},
  {children: 'Benedict Kessler', value: 'Benedict Kessler'},
  {children: 'Katelyn Rohan', value: 'Katelyn Rohan'},
];

export const Placeholder: StoryFn<typeof Select> = (props) => {
  return <Select {...props} />;
};

Placeholder.args = {
  placeholder: 'Select option',
  options,
};

export const Basic: StoryFn<typeof Select> = (props) => {
  return <Select {...props} />;
};

Basic.args = {
  options,
};

export const Disabled: StoryFn<typeof Select> = (props) => {
  return <Select {...props} />;
};

Disabled.args = {
  options,
  placeholder: 'Select option',
  disabled: true,
};
