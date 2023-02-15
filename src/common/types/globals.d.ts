declare module '*.graphql' {
  import type {DocumentNode} from 'graphql';

  const Schema: DocumentNode;

  export = Schema;
}

declare module '*.svg' {
  import type {ComponentType} from 'react';
  export const ReactComponent: ComponentType<React.SVGProps<SVGSVGElement>>;
  const content: {
    readonly ReactComponent: ReactComponent;
  };
  export default content;
}
