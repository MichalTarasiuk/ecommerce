import {Select} from './Select';

import type {SelectOption} from './Select';
import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof Select> = {
  title: 'components/atoms/Select',
  component: Select,
};

export default meta;

export const Basic: StoryFn<typeof Select> = (props) => {
  return <Select {...props}>Example heading</Select>;
};

const options: readonly SelectOption[] = [
  {children: 'Durward Reynolds', value: 'Durward Reynolds'},
  {children: 'Kenton Towne', value: 'Kenton Towne'},
  {children: 'Therese Wunsch', value: 'Therese Wunsch'},
  {children: 'Benedict Kessler', value: 'Benedict Kessler'},
  {children: 'Katelyn Rohan', value: 'Katelyn Rohan'},
];

Basic.args = {
  options,
};

export const Disabled: StoryFn<typeof Select> = (props) => {
  return <Select {...props}>Example heading</Select>;
};

Disabled.args = {
  options,
  placeholder: 'Select option',
  disabled: true,
};
