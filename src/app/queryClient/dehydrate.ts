import {keyIn} from '@/common/utils/utils';

import type {ssrExchange} from 'urql';

export type SRRData = ReturnType<ReturnType<typeof ssrExchange>['extractData']>;

const srrDataKey = '__SRR_STATE_KEY__';

export const dehydrate = (srrExchange: ReturnType<typeof ssrExchange>) => ({
  [srrDataKey]: srrExchange.extractData(),
});

export const hasSrrData = (
  pageProps: Record<PropertyKey, unknown>,
): pageProps is {readonly [Key in typeof srrDataKey]: SRRData} =>
  keyIn(pageProps, srrDataKey);

export const getSrrData = (pageProps: {
  readonly [Key in typeof srrDataKey]: SRRData;
}) => pageProps[srrDataKey];
