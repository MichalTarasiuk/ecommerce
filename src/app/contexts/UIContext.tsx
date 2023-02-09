import {createFastContext} from '@/common/utils/utils';

export const {
  FastContextProvider: UIStateProvider,
  useFastContext: useUIState,
  useFastContextHandler: useUIHandler,
} = createFastContext('UIState', {
  isMenuOpen: false,
});
