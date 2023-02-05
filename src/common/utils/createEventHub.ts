import {keyIn} from './keyIn';
import {isSet} from './typeof';

import type {FunctionType} from '../types/types';

type EventHub<Key extends string = string> = Record<
  Key,
  // eslint-disable-next-line functional/prefer-readonly-type -- should be writable
  Set<FunctionType.Unknown>
>;

/**
 * Creates a pub/sub (publish–subscribe) event hub with emit, on, and off methods.
 */
export const createEventHub = () => {
  const eventHub: EventHub = {};

  const hasEvent = <Name extends string>(
    state: EventHub,
    name: string,
  ): state is EventHub<Name> => keyIn(state, name) && isSet(state[name]);

  const emit = <Name extends string>(
    name: Name,
    ...args: readonly unknown[]
  ) => {
    if (hasEvent<Name>(eventHub, name)) {
      eventHub[name].forEach((listener) => listener(...args));
    }
  };

  const offImpl = <Name extends string>(
    name: Name,
    handler: FunctionType.Unknown,
  ) => {
    if (hasEvent<Name>(eventHub, name)) {
      eventHub[name].delete(handler);
    }
  };

  const on = <Name extends string>(
    name: Name,
    handler: FunctionType.Unknown,
  ) => {
    eventHub[name] ??= new Set();
    eventHub[name]?.add(handler);

    return {
      off: () => {
        offImpl(name, handler);
      },
    };
  };

  return {
    emit,
    on,
    off: offImpl,
  };
};
