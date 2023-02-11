import type {NextRouter} from 'next/router';
import type {
  ForwardRefExoticComponent,
  RefAttributes,
  ForwardRefRenderFunction,
  PropsWithoutRef,
  ComponentType,
} from 'react';
import type {UrlObject} from 'url';

export * from './typings/typings';

type Url = UrlObject | string;

export type ForwardRef<Instance, Props = {}> = (
  render: ForwardRefRenderFunction<Instance, Props>,
) => ForwardRefExoticComponent<
  PropsWithoutRef<Props> & RefAttributes<Instance>
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

export type InferProps<Component> = Component extends ComponentType<infer Props>
  ? Props
  : never;
