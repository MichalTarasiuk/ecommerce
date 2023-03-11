import {objectEvery} from 'utils/objectEvery';
import {objectKeys} from 'utils/objectKeys';
import {isString} from 'utils/typeof';

import type {Locale} from 'lib/translate/types';

type Translations = Record<string, unknown>;

type LDMLPluralRulesNames = Custom.UnionToTuple<Intl.LDMLPluralRule>;
type LDMLPluralRules = Record<Intl.LDMLPluralRule, string>;

// @ts-ignore
const ldmlPluralRulesNames: LDMLPluralRulesNames = [
  'zero',
  'one',
  'two',
  'few',
  'many',
  'other',
];

const isLDMLPluralRules = (
  translations: Translations,
): translations is LDMLPluralRules => {
  const hasLDMLPluralKeys = objectKeys(translations).every((translationKey) => {
    const unknownLDMLPluralRulesNames: readonly string[] = ldmlPluralRulesNames;

    return unknownLDMLPluralRulesNames.includes(translationKey);
  });

  return hasLDMLPluralKeys && objectEvery(translations, isString);
};

export const plurals = (
  locale: Locale,
  value: number,
  translations: Translations,
) => {
  const pluralRules = new Intl.PluralRules(locale, {
    type: 'cardinal',
  });

  if (!isLDMLPluralRules(translations)) {
    return null;
  }

  const plural = pluralRules.select(value);
  const pluralForm = translations[plural];

  return `${value} ${pluralForm}`;
};
