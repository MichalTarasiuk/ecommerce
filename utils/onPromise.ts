import {isDevelopment} from './nodeEnvironment';

import type {SyntheticEvent} from 'react';

export const onPromise = <ReturnType>(
  promise: (event: SyntheticEvent) => Promise<ReturnType>,
) => {
  return (event: SyntheticEvent) => {
    promise(event).catch((error) => {
      if (isDevelopment()) {
        console.error('Unexpected error', error);
      }
    });
  };
};
