import type {
  ForwardRefExoticComponent,
  RefAttributes,
  ForwardRefRenderFunction,
  PropsWithoutRef,
} from 'react';

export * from './typings/typings';

export type ForwardRef<Instance, Props = {}> = (
  render: ForwardRefRenderFunction<Instance, Props>,
) => ForwardRefExoticComponent<
  PropsWithoutRef<Props> & RefAttributes<Instance>
>;
