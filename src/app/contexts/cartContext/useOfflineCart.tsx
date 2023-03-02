import {useLocalStorage} from '@/common/hooks/useLocalStorage';

import {
  useOnlineNetworkEffect,
  useOfflineNetworkEffect,
} from '../networkContext/networkContext';

export const useOfflineCart = () => {
  const [] = useLocalStorage('offline-cart', () => {});

  useOnlineNetworkEffect(() => {});

  useOfflineNetworkEffect(() => {});

  return {};
};
