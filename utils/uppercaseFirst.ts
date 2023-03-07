/* eslint-disable @typescript-eslint/consistent-type-assertions -- narrow down type */
type UppercaseFirst<Word extends string> =
  Word extends `${infer Letter}${infer Letters}`
    ? `${Uppercase<Letter>}${Letters}`
    : Word;

export const uppercaseFirst = <Word extends string>(word: Word) =>
  `${word.at(0)?.toUpperCase()}${word.slice(1)}` as UppercaseFirst<Word>;
