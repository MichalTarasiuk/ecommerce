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
