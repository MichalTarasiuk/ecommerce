/* eslint-disable @typescript-eslint/consistent-type-assertions -- narrow type down */
type FromEntries<Entry extends readonly [PropertyKey, unknown]> = {
  readonly [Key in Entry[0]]: Entry extends readonly [Key, unknown]
    ? Entry[1]
    : never;
};

export const fromEntries = <
  Entries extends ReadonlyArray<readonly [PropertyKey, unknown]>,
>(
  entries: Entries,
) => Object.fromEntries(entries) as FromEntries<Entries[number]>;
