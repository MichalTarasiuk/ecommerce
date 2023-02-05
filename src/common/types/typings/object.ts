export type KeyPaths<Value> = Value extends Record<string, unknown>
  ? {
      readonly [Key in keyof Value]: Value[Key] extends Record<string, unknown>
        ? Key | `${Key & string}.${KeyPaths<Value[Key]>}`
        : Key;
    }[keyof Value]
  : never;

export type Debug<AnyObject> = AnyObject extends Record<PropertyKey, unknown>
  ? {readonly [Key in keyof AnyObject]: AnyObject[Key]}
  : never;
