import {isObject, hasOwn} from '@/common/utils/utils';

import type {NetworkState} from './networkState';

type AnyStatus = 'online' | 'offline';

const booleanToStatus: Record<'true' | 'false', AnyStatus> = {
  true: 'online',
  false: 'offline',
};

const assertNetworkStatus = <Status extends AnyStatus>(
  network: NetworkState,
  status: Status,
) => {
  const stringifyBoolean = network?.online?.toString();

  if (stringifyBoolean && hasOwn(booleanToStatus, stringifyBoolean)) {
    return booleanToStatus[stringifyBoolean] === status;
  }

  return false;
};

export type OnlineNetwork = NetworkState & {
  readonly online: true;
};

export const isOnline = (
  network: NetworkState | undefined,
): network is OnlineNetwork =>
  isObject(network) && assertNetworkStatus(network, 'online');

export type OfflineNetwork = NetworkState & {
  readonly online: false;
};

export const isOffline = (
  network: NetworkState | undefined,
): network is OfflineNetwork =>
  isObject(network) && assertNetworkStatus(network, 'offline');
