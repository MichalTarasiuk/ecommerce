import type {ReactNode} from 'react';
import classnames from 'classnames';

type TextSize = 'small' | 'medium' | 'large';
type TextPosition = 'left' | 'center' | 'right';
type Variants = 'default' | 'error';

type TextTag = keyof Pick<JSX.IntrinsicElements, 'p' | 'span'>;

type TextProps = {
  tag: TextTag;
  children: ReactNode;
  size: TextSize;
  position?: TextPosition;
  variant?: Variants;
};

export const Text = ({
  tag: Tag,
  children,
  size,
  position,
  variant = 'default',
}: TextProps) => {
  return (
    <Tag
      className={classnames(
        {
          'text-sm': size === 'small',
          'text-base': size === 'medium',
          'text-lg': size === 'large',
          'text-left': position === 'left',
          'text-center': position === 'center',
          'text-right': position === 'right',
          'text-red-600': variant === 'error',
          'text-black': variant === 'default',
        },
        'p-0',
      )}
      role={variant === 'error' ? 'alert' : undefined}
    >
      {children}
    </Tag>
  );
};
