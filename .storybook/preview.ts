import {FontDecorator} from './decorators';

import '../src/app/styles/globals.css';

export const parameters = {
  backgrounds: {
    default: 'light',
  },
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [FontDecorator];
