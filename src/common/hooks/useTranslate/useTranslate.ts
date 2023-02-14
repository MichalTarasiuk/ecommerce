import useTranslation from 'next-translate/useTranslation';

import type {NamespaceKeyUnion, Namespaces} from './namespaces';
import type {ArrayType, ObjectType} from '@/common/types/types';

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
