import {useEffect, useState} from 'react';

import {isClient} from '@/common/utils/utils';

type NetworkInformation = {
  readonly downlink: number;
  readonly downlinkMax: number;
  readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  readonly rtt: number;
  readonly saveData: boolean;
  readonly type:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'none'
    | 'wifi'
    | 'wimax'
    | 'other'
    | 'unknown';
} & EventTarget;

type UseNetworkState = {
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

type NavigatorWithConnection = Navigator &
  Partial<
    Record<
      'connection' | 'mozConnection' | 'webkitConnection',
      NetworkInformation
    >
  >;
const navigator = isClient()
  ? // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- wrong typed by default
    (window.navigator as NavigatorWithConnection)
  : undefined;

const networkInformation: NetworkInformation | undefined =
  navigator &&
  (navigator.connection ??
    navigator.mozConnection ??
    navigator.webkitConnection);

const getNetworkStateState = (previousState?: UseNetworkState) => {
  const {downlink, downlinkMax, effectiveType, rtt, saveData, type} =
    networkInformation ?? {};

  const onlineState = {
    online: navigator?.onLine,
    previous: previousState?.online,
  };

  const since =
    onlineState.online === onlineState.previous
      ? previousState?.since
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

export const useNetwork = () => {
  const [networkState, setNetworkState] = useState(() => {
    if (isClient()) {
      return getNetworkStateState();
    }

    return undefined;
  });

  useEffect(() => {
    const networkChangeHandler = () => {
      setNetworkState(getNetworkStateState);
    };

    window.addEventListener('online', networkChangeHandler, {passive: true});
    window.addEventListener('offline', networkChangeHandler, {passive: true});

    if (networkInformation) {
      networkInformation.addEventListener('change', networkChangeHandler, {
        passive: true,
      });
    }

    return () => {
      window.removeEventListener('online', networkChangeHandler);
      window.removeEventListener('offline', networkChangeHandler);

      if (networkInformation) {
        networkInformation.removeEventListener('change', networkChangeHandler);
      }
    };
  }, []);

  return networkState;
};
