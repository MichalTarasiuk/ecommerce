import {createSelectContext} from './selectContext';

export const [UIStateProvider, useUIState, useUIHandler] = createSelectContext(
  'UIState',
  {
    isMenuOpen: false,
  },
);
