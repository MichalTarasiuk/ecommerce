import {isClient} from '@/common/utils/utils';

export type NetworkInformation = EventTarget;

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

export const networkInformation: NetworkInformation | undefined =
  navigator &&
  (navigator.connection ??
    navigator.mozConnection ??
    navigator.webkitConnection);
