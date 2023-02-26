declare namespace FunctionType {
  type Unknown = (...args: readonly unknown[]) => unknown;

  type Any = (...args: readonly any[]) => any;

  type Noop = () => void;
}
