declare module '*.svg' {
  import type {ComponentType} from 'react';
  export const ReactComponent: ComponentType<React.SVGProps<SVGSVGElement>>;
  const content: {
    readonly ReactComponent: ReactComponent;
  };
  export default content;
}
