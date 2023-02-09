import {createFastContext} from '@/common/utils/utils';

const {
  FastContextProvider: UIStateProvider,
  useFastContext: useUIState,
  useFastContextHandler: useUIHandler,
} = createFastContext('UIState', {
  isMenuOpen: false,
});

export {UIStateProvider, useUIState, useUIHandler};
