import {useCallback, useMemo, useSyncExternalStore} from 'react';

import {
  createEventHub,
  createSafeContext,
  entries,
  isNumber,
  uppercaseFirst,
} from '@/common/utils/utils';

import {getStepsRange, tokenize} from './helpers/helpers';
import {StepperStateProvider, useStepperState} from './useStepperState';

import type {Common} from '@/common/types/types';
import type {ReactNode} from 'react';

export type GetSteps<
  Store extends Record<string, unknown>,
  Type extends PropertyKey = keyof Store,
> = Record<
  number,
  Type extends keyof Store
    ? {readonly type: Type; readonly assert: (value: Store[Type]) => boolean}
    : never
>;

export type AnyStore = Record<number, unknown>;

const stepperContextEventHub = createEventHub();

export const createStepperContext = <Store extends Record<number, unknown>>(
  name: string,
  steps: GetSteps<Store>,
) => {
  type AssertParams = Parameters<Common.ValueOf<typeof steps>['assert']>;
  type StepperContextValue = {
    readonly set: (...params: AssertParams) => symbol | null;
    readonly go: (nextIndex: number | symbol) => void;
  };

  const range = getStepsRange(steps);
  const {tokenizedSteps, tokens} = tokenize(steps);

  const contextName = `stepper${uppercaseFirst(name)}`;
  const [StepperProviderNative, useStep] =
    createSafeContext<StepperContextValue>(contextName);

  const StepperProviderInner = ({children}: {readonly children: ReactNode}) => {
    const {state} = useStepperState();

    const set = useCallback(
      (...assertParams: AssertParams) => {
        const tokenizedStep = tokenizedSteps[state.index];

        if (tokenizedStep) {
          const {token, value} = tokenizedStep.assert(...assertParams) ?? {};

          state.set(token, value);

          return tokens[state.getNextIndex()] ?? null;
        }

        return null;
      },
      [state],
    );

    const go = useCallback(
      (indexOrToken: number | symbol) => {
        if (isNumber(indexOrToken)) {
          const token = tokens[indexOrToken];

          if (state.has(token) && token) {
            state.index = indexOrToken;

            stepperContextEventHub.emit(contextName);
          }

          return;
        }

        const foundTokenEntry = entries(tokens).find(
          (tokenEntry) => tokenEntry[1] === indexOrToken,
        );

        if (foundTokenEntry) {
          const nextIndex = foundTokenEntry[0];

          state.index = Number(nextIndex);

          stepperContextEventHub.emit(contextName);
        }
      },
      [state],
    );

    const value = useMemo(
      () => ({
        set,
        go,
      }),
      [go, set],
    );

    return (
      <StepperProviderNative value={value}>{children}</StepperProviderNative>
    );
  };

  const StepperProvider = ({children}: {readonly children: ReactNode}) => (
    <StepperStateProvider config={[range]}>
      <StepperProviderInner>{children}</StepperProviderInner>
    </StepperStateProvider>
  );

  const useRegisterStepper = () => {
    const {state} = useStepperState();

    const getStepSnapshot = useCallback(() => {
      const step = tokenizedSteps[state.index];

      if (!step) {
        throw Error('step should be defined');
      }

      return `${state.index}:${String(step.type)}`;
    }, [state.index]);

    const step = useSyncExternalStore(
      (onStoreChange) => {
        const subscriber = stepperContextEventHub.on(
          contextName,
          onStoreChange,
        );

        return () => {
          subscriber.off();
        };
      },
      getStepSnapshot,
      getStepSnapshot,
    );

    return {
      step,
    };
  };

  return {
    StepperProvider,
    useRegisterStepper,
    useStep,
  } as const;
};
