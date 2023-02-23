import classNames from 'classnames';

import type {inconsolataWeight} from '@/app/fonts';
import type {Custom} from '@/common/types/types';
import type {ReactNode} from 'react';

type TextSize = 'small' | 'medium' | 'large';
type TextPosition = 'left' | 'center' | 'right';
type Variants = 'default' | 'error';

type TextTag = keyof Pick<JSX.IntrinsicElements, 'p' | 'span'>;

type TextProps = {
  readonly tag: TextTag;
  readonly children: ReactNode;
  readonly size: TextSize;
  readonly weight?: Custom.ValueOf<typeof inconsolataWeight>;
  readonly position?: TextPosition;
  readonly variant?: Variants;
};

export function Text({
  tag: Tag,
  children,
  size,
  position,
  weight = '400',
  variant = 'default',
}: TextProps) {
  return (
    <Tag
      className={classNames(
        {
          'text-sm': size === 'small',
          'text-base': size === 'medium',
          'text-lg': size === 'large',
          'font-bold': weight === '700',
          'text-left': position === 'left',
          'text-center': position === 'center',
          'text-right': position === 'right',
          'text-error': variant === 'error',
          'text-black': variant === 'default',
        },
        'p-0',
      )}
      role={variant === 'error' ? 'alert' : undefined}
    >
      {children}
    </Tag>
  );
}
