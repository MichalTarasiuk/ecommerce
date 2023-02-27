import {createContext, useContext} from 'react';

import {uppercaseFirst} from './uppercaseFirst';

export const createSafeContext = <ContextValue>(name: string) => {
  const initialContextValue = Symbol('initial-context-value');
  const contextName = uppercaseFirst(name);

  const safeContext = createContext<ContextValue | typeof initialContextValue>(
    initialContextValue,
  );

  const useSafeContext = () => {
    const safeContextValue = useContext(safeContext);

    if (safeContextValue === initialContextValue) {
      throw new Error(
        `use${contextName} must be called within a <${contextName}Provider />`,
      );
    }

    return safeContextValue;
  };

  return [safeContext.Provider, useSafeContext] as const;
};
