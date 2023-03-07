import {Inconsolata} from '@next/font/google';

import type {StoryFn} from '@storybook/react';

export const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  weight: ['400', '700'],
  display: 'swap',
});

export function FontDecorator(Story: StoryFn) {
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
}
