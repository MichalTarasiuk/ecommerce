/* eslint-disable @typescript-eslint/consistent-type-assertions -- next translate has wrong types by default */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion -- eslint bug */
import useTranslation from 'next-translate/useTranslation';

import type {Namespaces} from './namespaces';
import type {i18nConfig, ReadonlyPages} from '@root/i18n';

export type InferNamespaceKey<AnyReadonlyPages extends ReadonlyPages> = {
  readonly [Key in keyof AnyReadonlyPages]: AnyReadonlyPages[Key] extends ReadonlyArray<string>
    ? AnyReadonlyPages[Key][number]
    : AnyReadonlyPages[Key] extends ((
        context: Record<string, unknown>,
      ) => infer Namespaces extends ReadonlyArray<string>)
    ? Namespaces[number]
    : never;
}[keyof AnyReadonlyPages];

type NamespaceKeyUnion = InferNamespaceKey<(typeof i18nConfig)['pages']>;

export const useTranslate = <NamespaceKey extends NamespaceKeyUnion>(
  namespaceKey: NamespaceKey,
) => {
  const translation = useTranslation(namespaceKey);

  return {
    translate: <
      I18nKey extends NamespaceKey extends keyof Namespaces
        ? ObjectType.KeyPaths<Namespaces[NamespaceKey]>
        : never,
      Params extends ArrayType.Tail<Parameters<(typeof translation)['t']>>,
    >(
      i18nKey: I18nKey,
      ...params: Params
    ) => {
      return translation.t(i18nKey, ...params) as Params[1] extends {
        readonly returnObjects: true;
      }
        ? Record<string, unknown>
        : string;
    },
    lang: translation.lang,
  };
};
