/* eslint-disable @typescript-eslint/consistent-type-assertions -- narrow type down */
type FromEntries<Entry extends readonly [string, unknown]> = {
  readonly [Key in Entry[0] as StringType.ToNumber<Key>]: Entry extends readonly [
    NumberType.ToString<Key>,
    unknown,
  ]
    ? Entry[1]
    : never;
};

export const fromEntries = <
  Entries extends ReadonlyArray<readonly [string, unknown]>,
>(
  entries: Entries,
) => Object.fromEntries(entries) as FromEntries<Entries[number]>;
