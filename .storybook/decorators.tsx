import React from 'react';
import {inconsolata} from '@/app/fonts';

import type {StoryFn} from '@storybook/react';

export const FontDecorator = (Story: StoryFn) => {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${inconsolata.style.fontFamily};
          }
        `}
      </style>
      <Story />
    </>
  );
};
