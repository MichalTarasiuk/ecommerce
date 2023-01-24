export type Tail<AnyArray extends Array<unknown>> = AnyArray extends [
  unknown,
  ...infer Rest,
]
  ? Rest
  : never;

export type ObjectKeyPaths<Value> = Value extends Record<string, unknown>
  ? {
      [Key in keyof Value]: Value[Key] extends Record<string, unknown>
        ? Key | `${Key & string}.${ObjectKeyPaths<Value[Key]>}`
        : Key;
    }[keyof Value]
  : never;
