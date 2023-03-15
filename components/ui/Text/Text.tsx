import classNames from 'classnames';

import type {ReactNode} from 'react';
import type {InconsolataWeight} from 'styles/Fonts';

type TextSize = 'small' | 'medium' | 'large';
type TextPosition = 'left' | 'center' | 'right';
type TextVariants = 'default' | 'error';

type TextTag = keyof Pick<JSX.IntrinsicElements, 'p' | 'span'>;

type TextProps = {
  readonly tag: TextTag;
  readonly children: ReactNode;
  readonly size: TextSize;
  readonly weight?: InconsolataWeight;
  readonly position?: TextPosition;
  readonly variant?: TextVariants;
};

const textSizes: Record<TextSize, string> = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
};

const textWeights: Record<InconsolataWeight, string> = {
  '400': 'font-normal	',
  '700': 'font-bold',
};

const textPositions: Record<TextPosition, string> = {
  left: 'text-left',
  center: 'text-cente',
  right: 'text-right',
};

const textVariants: Record<TextVariants, string> = {
  default: 'text-black',
  error: 'text-error',
};

export function Text({
  tag: Tag,
  children,
  size,
  position = 'left',
  weight = '400',
  variant = 'default',
}: TextProps) {
  return (
    <Tag
      className={classNames(
        textSizes[size],
        textWeights[weight],
        textPositions[position],
        textVariants[variant],
      )}
      role={variant === 'error' ? 'alert' : undefined}
    >
      {children}
    </Tag>
  );
}

export function Paragraph(props: Omit<TextProps, 'tag'>) {
  return <Text tag='p' {...props} />;
}

export function Inline(props: Omit<TextProps, 'tag'>) {
  return <Text tag='span' {...props} />;
}
