export * from './cartContext/cartContext';
export * from './networkContext/networkContext';

import {createFastContext} from '@/common/utils/utils';

export const [UIStateProvider, useUIState, useUIHandler] = createFastContext(
  'UIState',
  {
    isMenuOpen: false,
  },
);
