import {networkInformation} from './networkInformation';

import type {NetworkInformation} from './networkInformation';

export type NetworkState = {
  readonly online: boolean | undefined;
  readonly previous: boolean | undefined;
  readonly since: Date | undefined;
  readonly downlink: NetworkInformation['downlink'] | undefined;
  readonly downlinkMax: NetworkInformation['downlinkMax'] | undefined;
  readonly effectiveType: NetworkInformation['effectiveType'] | undefined;
  readonly rtt: NetworkInformation['rtt'] | undefined;
  readonly saveData: NetworkInformation['saveData'] | undefined;
  readonly type: NetworkInformation['type'] | undefined;
};

export const getNetworkStateState = (previousNetworkState?: NetworkState) => {
  const {downlink, downlinkMax, effectiveType, rtt, saveData, type} =
    networkInformation ?? {};

  const onlineState = {
    online: navigator?.onLine,
    previous: previousNetworkState?.online,
  };

  const since =
    onlineState.online === onlineState.previous
      ? previousNetworkState?.since
      : new Date();

  return {
    ...onlineState,
    since,
    downlink,
    downlinkMax,
    effectiveType,
    rtt,
    saveData,
    type,
  };
};
