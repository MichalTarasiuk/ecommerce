import * as NextImage from 'next/image';
import {initialize as initializeMSW, mswDecorator} from 'msw-storybook-addon';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

initializeMSW();

export const decorators = [mswDecorator];
