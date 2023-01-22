import useTranslation from 'next-translate/useTranslation';
import i18nConfig from '@/i18n';

import type {ReadonlyPages} from '@/i18n';
import type {ObjectKeyPaths, Tail} from '@/src/common/types/types';

type InferNamespaceKey<AnyReadonlyPages extends ReadonlyPages> = {
  [Key in keyof AnyReadonlyPages]: AnyReadonlyPages[Key] extends ReadonlyArray<string>
    ? AnyReadonlyPages[Key][number]
    : AnyReadonlyPages[Key] extends ((
        context: Record<string, unknown>,
      ) => infer Namespaces extends ReadonlyArray<string>)
    ? Namespaces[number]
    : never;
}[keyof AnyReadonlyPages];
type NamespaceKeyUnion = InferNamespaceKey<(typeof i18nConfig)['pages']>;

type Namespaces = {
  common: typeof import('src/app/locales/en/common.json');
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
