type RenderIconProps = {
  readonly icon: React.FC<React.SVGProps<SVGSVGElement>>;
} & React.SVGProps<SVGSVGElement>;

export function RenderIcon({icon: Icon, ...props}: RenderIconProps) {
  return <Icon {...props} />;
}
