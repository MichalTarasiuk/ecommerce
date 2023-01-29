import type {ssrExchange} from 'urql';

export type SRRData = ReturnType<ReturnType<typeof ssrExchange>['extractData']>;

const srrDataKey = Symbol();

export const dehydrate = (srrExchange: ReturnType<typeof ssrExchange>) => ({
  [srrDataKey]: srrExchange.extractData(),
});

export const isSRRDataKey = (key: PropertyKey) => key === srrDataKey;
