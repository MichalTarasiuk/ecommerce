/* eslint-disable @typescript-eslint/consistent-type-assertions -- next translate has wrong types by default */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion -- eslint bug */
import useTranslation from 'next-translate/useTranslation';

import type {Namespaces} from './namespaces';
import type {AnyNamespaceKey} from './types';

export const useTranslate = <NamespaceKey extends AnyNamespaceKey>(
  namespaceKey: NamespaceKey,
) => {
  const unknownNamespaceKey: string = namespaceKey;
  const translation = useTranslation(unknownNamespaceKey);

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
