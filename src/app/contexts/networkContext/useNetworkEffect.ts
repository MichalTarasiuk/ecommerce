import {usePrevious} from '@/common/hooks/usePrevious';

import {isOffline, isOnline} from './helpers/helpers';
import {useNetwork} from './NetworkProvider';

import type {
  NetworkState,
  OfflineNetwork,
  OnlineNetwork,
} from './helpers/helpers';

type EffectNetworkCallback<Network = NetworkState | undefined> = (
  network: Network,
) => void;

const useNetworkEffect = (effectNetworkCallback: EffectNetworkCallback) => {
  const network = useNetwork();
  const previousNetwork = usePrevious(
    network?.online,
    (savedOnline, online) => savedOnline !== online,
  );

  if (network?.online !== previousNetwork) {
    effectNetworkCallback(network);
  }
};

export const useOnlineNetworkEffect = (
  effectNetworkCallback: EffectNetworkCallback<OnlineNetwork>,
) => {
  useNetworkEffect((network) => {
    if (isOnline(network)) {
      effectNetworkCallback(network);
    }
  });
};

export const useOfflineNetworkEffect = (
  effectNetworkCallback: EffectNetworkCallback<OfflineNetwork>,
) => {
  useNetworkEffect((network) => {
    if (isOffline(network)) {
      effectNetworkCallback(network);
    }
  });
};
