import useTranslation from 'next-translate/useTranslation';

import type {
  AnyArray,
  ObjectKeyPaths,
  Some,
  Tail,
  UnionToTuple,
  ValueOf,
} from '@/common/types/types';
import type i18nConfig from '@root/i18n';
import type {ReadonlyPages} from '@root/i18n';

type InferNamespaceKey<AnyReadonlyPages extends ReadonlyPages> = {
  readonly [Key in keyof AnyReadonlyPages]: AnyReadonlyPages[Key] extends ReadonlyArray<string>
    ? AnyReadonlyPages[Key][number]
    : AnyReadonlyPages[Key] extends ((
        context: Record<string, unknown>,
      ) => infer Namespaces extends ReadonlyArray<string>)
    ? Namespaces[number]
    : never;
}[keyof AnyReadonlyPages];
type NamespaceKeyUnion = InferNamespaceKey<(typeof i18nConfig)['pages']>;

type IntersectionKeys<Keys extends PropertyKey> = Keys extends Keys
  ? Keys
  : never;

type IntersectionNamespace<
  Namespace extends Record<PropertyKey, Record<PropertyKey, unknown>>,
  NamespaceValues extends Record<string, unknown> = ValueOf<Namespace>,
> = {
  readonly [Key in IntersectionKeys<keyof NamespaceValues> as Some<
    UnionToTuple<NamespaceValues[Key]>,
    AnyArray
  > extends true
    ? never
    : Key]: NamespaceValues[Key];
};

type CommonNamespace = {
  readonly pl: typeof import('src/app/locales/pl/common.json');
  readonly en: typeof import('src/app/locales/en/common.json');
};

type Namespaces = {
  readonly common: IntersectionNamespace<CommonNamespace>;
};

/**
 * @param namespaceKey - key defined in Namespaces.
 */
export const useTranslate = <NamespaceKey extends NamespaceKeyUnion>(
  namespaceKey: NamespaceKey,
) => {
  const translation = useTranslation(namespaceKey);

  return {
    translate: <
      I18nKey extends NamespaceKey extends keyof Namespaces
        ? ObjectKeyPaths<Namespaces[NamespaceKey]>
        : never,
    >(
      i18nKey: I18nKey,
      ...params: Tail<Parameters<(typeof translation)['t']>>
    ) => translation.t(i18nKey, ...params),
    lang: translation.lang,
  };
};
