import {ReactComponent as LanguageIcon} from 'public/icons/language.svg';

import {IconButton} from './IconButton';

import type {Meta, StoryFn} from '@storybook/react';

export default {
  title: 'components/atoms/IconButton',
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export const Primary: StoryFn<typeof IconButton> = (props) => {
  return <IconButton {...props} />;
};

Primary.args = {
  icon: LanguageIcon,
  children: 'English (USA)',
};

export const OnlyIcon: StoryFn<typeof IconButton> = (props) => {
  return <IconButton {...props} />;
};

OnlyIcon.args = {
  icon: LanguageIcon,
};
