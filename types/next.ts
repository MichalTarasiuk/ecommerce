import type {GetStaticPaths, NextPage} from 'next';
import type {NextRouter} from 'next/router';
import type {ReactElement, ReactNode} from 'react';
import type {Url} from 'url';

export type NextPageWithLayout<Props = {}> = NextPage<Props> & {
  // eslint-disable-next-line functional/prefer-readonly-type -- should be writeable
  getLayout: (page: ReactElement) => ReactNode;
};

export type TransitionOptions = NextRouter extends {
  readonly push: (
    url: Url,
    as?: Url,
    options?: infer TransitionOptions,
  ) => unknown;
}
  ? TransitionOptions
  : never;

export type InferParsedQuery<AnyGetStaticPaths extends GetStaticPaths> =
  Awaited<ReturnType<AnyGetStaticPaths>>['paths'][number] extends {
    readonly params: infer Params;
  }
    ? Params
    : never;
