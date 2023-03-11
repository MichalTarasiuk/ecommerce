/* eslint-disable functional/prefer-readonly-type -- event hub should be writable */
import {isSet} from './typeof';

type EventHub<Key extends string = string> = Map<
  Key,
  Set<FunctionType.Unknown>
>;

export const createEventHub = () => {
  const eventHub: EventHub = new Map();

  const hasEvent = <Name extends string>(
    state: EventHub,
    name: string,
  ): state is EventHub<Name> => state.has(name) && isSet(state.get(name));

  const emit = <Name extends string>(
    name: Name,
    ...args: readonly unknown[]
  ) => {
    if (hasEvent<Name>(eventHub, name)) {
      eventHub.get(name)?.forEach((listener) => listener(...args));
    }
  };

  const offImpl = <Name extends string>(
    name: Name,
    handler: FunctionType.Unknown,
  ) => {
    if (hasEvent<Name>(eventHub, name)) {
      eventHub.get(name)?.delete(handler);
    }
  };

  const on = <Name extends string>(
    name: Name,
    handler: FunctionType.Unknown,
  ) => {
    if (!hasEvent<Name>(eventHub, name)) {
      eventHub.set(name, new Set());
    }

    eventHub.get(name)?.add(handler);

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
