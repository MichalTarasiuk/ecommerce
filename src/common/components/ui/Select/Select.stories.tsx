import {Select} from './Select';

import type {SelectProps} from './Select';
import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/ui/Select',
  component: Select,
} satisfies Meta<typeof Select>;

const options: SelectProps['options'] = [
  {children: 'Durward Reynolds', value: 'Durward Reynolds'},
  {children: 'Kenton Towne', value: 'Kenton Towne'},
  {children: 'Therese Wunsch', value: 'Therese Wunsch'},
  {children: 'Benedict Kessler', value: 'Benedict Kessler'},
  {children: 'Katelyn Rohan', value: 'Katelyn Rohan'},
];

const Template: StoryFn<typeof Select> = (props) => {
  return <Select {...props} />;
};

export const Placeholder = Template.bind(undefined);

Placeholder.args = {
  placeholder: 'Select option',
  options,
};

export const Basic = Template.bind(undefined);

Basic.args = {
  options,
};

export const Disabled = Template.bind(undefined);

Disabled.args = {
  options,
  placeholder: 'Select option',
  disabled: true,
};
