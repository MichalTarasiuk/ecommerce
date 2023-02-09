type RenderIconProps = {
  readonly icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const RenderIcon = ({icon: Icon}: RenderIconProps) => <Icon />;
