declare module '*.graphql' {
  import type {DocumentNode} from 'graphql';

  const Schema: DocumentNode;

  export = Schema;
}

declare module '*.svg' {
  const Component: React.FC<React.SVGProps<SVGSVGElement>>;

  export = Component;
}
