import type {GetStaticPaths} from 'next';
import type {NextRouter} from 'next/router';
import type {
  ForwardRefExoticComponent,
  RefAttributes,
  ForwardRefRenderFunction,
  PropsWithoutRef,
  ComponentType,
} from 'react';
import type {UrlObject} from 'url';

export type Url = UrlObject | string;

export type ForwardRef<Params extends readonly [props: {}, instance: unknown]> =
  (
    render: Params extends Params
      ? ForwardRefRenderFunction<Params[1], Params[0]>
      : never,
  ) => ForwardRefExoticComponent<
    Params extends Params
      ? PropsWithoutRef<Params[0]> & RefAttributes<Params[1]>
      : never
  >;

export type TransitionOptions = NextRouter extends {
  readonly push: (
    url: Url,
    as?: Url,
    options?: infer TransitionOptions,
  ) => unknown;
}
  ? TransitionOptions
  : never;

export type InferProps<Component> = Component extends ForwardRefExoticComponent<
  infer Props
>
  ? Omit<Props, keyof RefAttributes<unknown>>
  : Component extends ComponentType<infer Props>
  ? Props
  : never;

export type InferParsedQuery<AnyGetStaticPaths extends GetStaticPaths> =
  Awaited<ReturnType<AnyGetStaticPaths>>['paths'][number] extends {
    readonly params: infer Params;
  }
    ? Params
    : never;
