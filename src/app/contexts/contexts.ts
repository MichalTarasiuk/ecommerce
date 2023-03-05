export * from './cartStateContext/cartStateContext';

import {createFastContext} from '@/common/utils/utils';

export const [UIStateProvider, useUIState, useUIHandler] = createFastContext(
  'UIState',
  {
    isMenuOpen: false,
  },
);
