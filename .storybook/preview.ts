import '../src/app/styles/globals.css';

export {decorators} from './decorators/decorators';

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
