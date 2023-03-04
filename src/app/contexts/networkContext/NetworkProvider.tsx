import {useEffect, useState} from 'react';

import {createSafeContext, isClient} from '@/common/utils/utils';

import {networkInformation} from './helpers/helpers';

import type {ReactNode} from 'react';

type NetworkProviderProps = {
  readonly children: ReactNode;
};
export type NetworkState = {
  readonly online: boolean;
};

export const getNetworkStateState = () => {
  return {
    online: navigator?.onLine ?? false,
  };
};

const [NativeNetworkProvider, useNetwork] = createSafeContext<
  NetworkState | undefined
>('network');

function NetworkProvider({children}: NetworkProviderProps) {
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

  return (
    <NativeNetworkProvider value={networkState}>
      {children}
    </NativeNetworkProvider>
  );
}

export {NetworkProvider, useNetwork};