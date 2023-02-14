import type {ObjectType} from '@/common/types/types';
import type {i18nConfig, ReadonlyPages} from '@root/i18n';

type InferNamespaceKey<AnyReadonlyPages extends ReadonlyPages> = {
  readonly [Key in keyof AnyReadonlyPages]: AnyReadonlyPages[Key] extends ReadonlyArray<string>
    ? AnyReadonlyPages[Key][number]
    : AnyReadonlyPages[Key] extends ((
        context: Record<string, unknown>,
      ) => infer Namespaces extends ReadonlyArray<string>)
    ? Namespaces[number]
    : never;
}[keyof AnyReadonlyPages];
export type NamespaceKeyUnion = InferNamespaceKey<(typeof i18nConfig)['pages']>;

type CommonNamespace = {
  readonly pl: typeof import('src/app/locales/pl-PL/common.json');
  readonly en: typeof import('src/app/locales/en-US/common.json');
};

type AccountNamespace = {
  readonly pl: typeof import('src/app/locales/pl-PL/account/index.json');
  readonly en: typeof import('src/app/locales/en-US/account/index.json');
};

export type Namespaces = {
  readonly common: ObjectType.Intersection<
    CommonNamespace['pl'],
    CommonNamespace['en']
  >;
  readonly ['account.index']: ObjectType.Intersection<
    AccountNamespace['en'],
    AccountNamespace['pl']
  >;
};
