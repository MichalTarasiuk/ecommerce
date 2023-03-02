import {isClient} from '@/common/utils/utils';

export type NetworkInformation = {
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
