import {useMemo} from 'react';

import {useRerender} from '@/common/hooks/useRerender';
import {contextify} from '@/common/utils/utils';

import type {getStepsRange} from './helpers/helpers';

const useStepperStateImpl = (range: ReturnType<typeof getStepsRange>) => {
  const rerender = useRerender();

  const state = useMemo(() => {
    const map = new Map<symbol, unknown>();
    let index = range.start;

    const set = (token: symbol | undefined, value: unknown) => {
      if (!token) {
        return;
      }

      map.set(token, value);

      rerender();
    };

    const has = (token: symbol | undefined) => token && map.has(token);

    const getNextIndex = () => {
      const nextIndex = index + 1;

      if (nextIndex > range.end) {
        return index;
      }

      return nextIndex;
    };

    return {
      get index() {
        return index;
      },
      set index(nextIndex: number) {
        if (nextIndex < range.start || nextIndex > range.end) {
          return;
        }

        index = nextIndex;
      },
      getNextIndex,
      has,
      set,
    };
  }, [range.end, range.start, rerender]);

  return {
    state,
  };
};

const [StepperStateProvider, useStepperState] = contextify(useStepperStateImpl);

export {StepperStateProvider, useStepperState};
