import '../src/app/styles/globals.css';

import {FontDecorator, TranslateDecorator} from './decorators';

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

export const decorators = [FontDecorator, TranslateDecorator];
