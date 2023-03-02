import {usePrevious} from '../usePrevious';

import {isOffline, isOnline} from './helpers';
import {useNetwork} from './useNetwork';

import type {AnyNetwork, OfflineNetwork, OnlineNetwork} from './helpers';

type EffectNetworkCallback<Network = AnyNetwork> = (network: Network) => void;

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
