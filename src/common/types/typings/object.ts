import type {Equals, And} from './custom';

export type Is<Value> = Value extends Record<PropertyKey, unknown>
  ? true
  : false;

export type KeyPaths<Value> = Value extends Record<string, unknown>
  ? {
      readonly [Key in keyof Value]: Value[Key] extends Record<string, unknown>
        ? Key | `${Key & string}.${KeyPaths<Value[Key]>}`
        : Key;
    }[keyof Value]
  : never;

export type Filter<AnyObject extends Record<PropertyKey, unknown>, When> = {
  readonly [Key in keyof AnyObject as Equals<AnyObject[Key], When> extends 1
    ? never
    : Key]: AnyObject[Key];
};

export type Debug<AnyObject> = AnyObject extends Record<PropertyKey, unknown>
  ? {readonly [Key in keyof AnyObject]: AnyObject[Key]}
  : never;

export type IntersectionKeys<
  Obj1 extends Record<PropertyKey, unknown>,
  Obj2 extends Record<PropertyKey, unknown>,
> = Extract<keyof Obj1, keyof Obj2> | Extract<keyof Obj2, keyof Obj1>;

export type Intersection<
  Obj1 extends Record<PropertyKey, unknown>,
  Obj2 extends Record<PropertyKey, unknown>,
> = Filter<
  {
    readonly [Key in IntersectionKeys<Obj1, Obj2>]: Equals<
      Obj1[Key],
      Obj2[Key]
    > extends 1
      ? Obj2[Key]
      : And<Is<Obj1[Key]> | Is<Obj2[Key]>> extends true
      ? Intersection<Obj1[Key] & {}, Obj2[Key] & {}>
      : never;
  },
  never
>;

// eslint-disable-next-line functional/prefer-readonly-type -- make Writable
export type Writable<AnyObject extends Record<PropertyKey, unknown>> = {
  -readonly [Key in keyof AnyObject[Key]]: AnyObject[Key];
};

export type Required<AnyObject, Keys extends keyof AnyObject> = Omit<
  AnyObject,
  Keys
> & {readonly [Key in Keys]-?: AnyObject[Key]};
