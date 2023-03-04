import {usePrevious} from '@/common/hooks/usePrevious';

import {isOnline} from './helpers/helpers';
import {useNetwork} from './NetworkProvider';

import type {OnlineNetwork} from './helpers/helpers';
import type {NetworkState} from './NetworkProvider';

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
