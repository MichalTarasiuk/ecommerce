import {ReactComponent as LanguageIcon} from 'public/icons/language.svg';

import {IconButton} from './IconButton';

import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/ui/IconButton',
  component: IconButton,
} satisfies Meta<typeof IconButton>;

const Template: StoryFn<typeof IconButton> = (props) => {
  return <IconButton {...props} />;
};

export const Primary = Template.bind(undefined);

Primary.args = {
  icon: LanguageIcon,
  children: 'English (USA)',
};

export const OnlyIcon = Template.bind(undefined);

OnlyIcon.args = {
  icon: LanguageIcon,
};
