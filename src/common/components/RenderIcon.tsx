import type {ComponentType} from 'react';

type RenderIconProps = {
  readonly icon: ComponentType<React.SVGProps<SVGSVGElement>>;
} & React.SVGProps<SVGSVGElement>;

export function RenderIcon({icon: Icon, ...props}: RenderIconProps) {
  return <Icon {...props} />;
}
