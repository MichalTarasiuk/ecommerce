declare namespace ObjectType {
  type Is<Value> = Value extends Record<PropertyKey, unknown> ? true : false;

  type KeyPaths<Value> = Value extends Record<string, unknown>
    ? {
        readonly [Key in keyof Value]: Value[Key] extends Record<
          string,
          unknown
        >
          ? Key | `${Key & string}.${KeyPaths<Value[Key]>}`
          : Key;
      }[keyof Value]
    : never;

  type Filter<AnyObject extends Record<PropertyKey, unknown>, When> = {
    readonly [Key in keyof AnyObject as Custom.Equals<
      AnyObject[Key],
      When
    > extends 1
      ? never
      : Key]: AnyObject[Key];
  };
  type Debug<AnyObject> = AnyObject extends Record<PropertyKey, unknown>
    ? {readonly [Key in keyof AnyObject]: AnyObject[Key]}
    : never;

  type IntersectionKeys<
    Obj1 extends Record<PropertyKey, unknown>,
    Obj2 extends Record<PropertyKey, unknown>,
  > = Extract<keyof Obj1, keyof Obj2> | Extract<keyof Obj2, keyof Obj1>;

  type Intersection<
    Obj1 extends Record<PropertyKey, unknown>,
    Obj2 extends Record<PropertyKey, unknown>,
  > = Filter<
    {
      readonly [Key in IntersectionKeys<Obj1, Obj2>]: Custom.Equals<
        Obj1[Key],
        Obj2[Key]
      > extends 1
        ? Obj2[Key]
        : Custom.And<Is<Obj1[Key]> | Is<Obj2[Key]>> extends true
        ? Intersection<Obj1[Key] & {}, Obj2[Key] & {}>
        : never;
    },
    never
  >;

  type Required<
    AnyObject,
    Keys extends keyof AnyObject = keyof AnyObject,
  > = Omit<AnyObject, Keys> & {readonly [Key in Keys]-?: AnyObject[Key]};

  type DeepValueOf<AnyObject extends Record<PropertyKey, unknown>> =
    Custom.ValueOf<{
      readonly [Key in keyof AnyObject]: AnyObject[Key] extends Record<
        PropertyKey,
        unknown
      >
        ? DeepValueOf<AnyObject[Key]>
        : AnyObject[Key];
    }>;
}
