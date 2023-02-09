type RenderIconProps = {
  readonly icon: React.FC<React.SVGProps<SVGSVGElement>>;
} & React.SVGProps<SVGSVGElement>;

export const RenderIcon = ({icon: Icon, ...props}: RenderIconProps) => (
  <Icon {...props} />
);
