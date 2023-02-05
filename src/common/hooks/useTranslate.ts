import useTranslation from 'next-translate/useTranslation';

import type {ArrayType, Common, Custom, ObjectType} from '@/common/types/types';
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

type IntersectionNamespace<
  Namespace extends Record<PropertyKey, Record<PropertyKey, unknown>>,
  NamespaceValues extends Record<string, unknown> = Common.ValueOf<Namespace>,
> = {
  readonly [Key in Custom.IntersectionKeys<
    keyof NamespaceValues
  > as ArrayType.Some<
    Custom.UnionToTuple<NamespaceValues[Key]>,
    ArrayType.Any
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
        ? ObjectType.KeyPaths<Namespaces[NamespaceKey]>
        : never,
    >(
      i18nKey: I18nKey,
      ...params: ArrayType.Tail<Parameters<(typeof translation)['t']>>
    ) => translation.t(i18nKey, ...params),
    lang: translation.lang,
  };
};
