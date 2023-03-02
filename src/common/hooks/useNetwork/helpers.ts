import {hasOwn} from '@/common/utils/hasOwn';

import type {useNetwork} from './useNetwork';

export type AnyNetwork = ReturnType<typeof useNetwork>;

type AnyStatus = 'online' | 'offline';

const booleanToStatus: Record<'true' | 'false', AnyStatus> = {
  true: 'online',
  false: 'offline',
};

const assertNetworkStatus = <Status extends AnyStatus>(
  network: AnyNetwork,
  status: Status,
) => {
  const stringifyBoolean = network?.online?.toString();

  if (stringifyBoolean && hasOwn(booleanToStatus, stringifyBoolean)) {
    return booleanToStatus[stringifyBoolean] === status;
  }

  return false;
};

export type OnlineNetwork = Exclude<AnyNetwork, undefined> & {
  readonly online: true;
};

export const isOnline = (network: AnyNetwork): network is OnlineNetwork =>
  assertNetworkStatus(network, 'online');

export type OfflineNetwork = Exclude<AnyNetwork, undefined> & {
  readonly online: false;
};

export const isOffline = (network: AnyNetwork): network is OfflineNetwork =>
  assertNetworkStatus(network, 'offline');
