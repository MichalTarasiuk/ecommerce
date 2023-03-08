import {createFastContext} from './fastContext';

export const [UIStateProvider, useUIState, useUIHandler] = createFastContext(
  'UIState',
  {
    isMenuOpen: false,
  },
);
