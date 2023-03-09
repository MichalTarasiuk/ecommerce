import type {
  ForwardRefExoticComponent,
  RefAttributes,
  ForwardRefRenderFunction,
  PropsWithoutRef,
  ComponentType,
} from 'react';

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

export type InferProps<Component> = Component extends ForwardRefExoticComponent<
  infer Props
>
  ? Omit<Props, keyof RefAttributes<unknown>>
  : Component extends ComponentType<infer Props>
  ? Props
  : never;
