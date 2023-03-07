import {createFastContext} from '~composables/fastContext';

export * from './cartStateContext/cartStateContext';

export const [UIStateProvider, useUIState, useUIHandler] = createFastContext(
  'UIState',
  {
    isMenuOpen: false,
  },
);
