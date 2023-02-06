import {useMemo} from 'react';

import {none} from '@/common/consts/consts';

import {createSafeContext} from './createSafeContext';

import type {ArrayType, FunctionType} from '@/common/types/types';
import type {ReactNode} from 'react';

type InferConfig<Params extends ArrayType.Any> = {
  readonly [Key in Extract<keyof Params, `${number}`>]: Params[Key];
};

type ContextProvider<Params extends ArrayType.Any> = {
  readonly children: ReactNode;
  readonly config: InferConfig<Params>;
};

export const contextify = <UseHook extends FunctionType.Any>(
  useHook: UseHook,
) => {
  const name = useHook.name.replace('use', none);
  const [ContextProviderImpl, useContext] =
    createSafeContext<ReturnType<UseHook>>(name);

  const ContextProvider = ({
    children,
    config,
  }: ContextProvider<Parameters<UseHook>>) => {
    const hookParams = useMemo(() => Object.values(config), [config]);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- in the function, the type can not be inferred
    const hook = useHook(...hookParams) as ReturnType<UseHook>;

    return <ContextProviderImpl value={hook}>{children}</ContextProviderImpl>;
  };

  return [ContextProvider, useContext] as const;
};
