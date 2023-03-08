import classNames from 'classnames';

import type {ReactNode, HTMLAttributes} from 'react';
import type {inconsolataWeight} from 'styles/Fonts';

type TextSize = 'small' | 'medium' | 'large';

type HeadingTag = keyof Pick<
  JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

type HeadingProps = {
  readonly children: ReactNode;
  readonly tag: HeadingTag;
  readonly size: TextSize;
  readonly weight?: Custom.ValueOf<typeof inconsolataWeight>;
} & HTMLAttributes<HTMLHeadingElement>;

export function Heading({
  tag: Tag,
  size,
  weight = '400',
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={classNames({
        'text-sm': size === 'small',
        'text-base': size === 'medium',
        'text-lg': size === 'large',
        'font-bold': weight === '700',
      })}
      {...props}
    />
  );
}
