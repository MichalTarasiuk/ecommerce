import classNames from 'classnames';

import type {ReactNode, HTMLAttributes} from 'react';

type TextSize = 'small' | 'medium' | 'large';

type HeadingTag = keyof Pick<
  JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

type HeadingProps = {
  readonly children: ReactNode;
  readonly tag: HeadingTag;
  readonly size: TextSize;
} & HTMLAttributes<HTMLHeadingElement>;

export const Heading = ({tag: Tag, size, ...props}: HeadingProps) => {
  return (
    <Tag
      className={classNames({
        'text-sm': size === 'small',
        'text-base': size === 'medium',
        'text-lg': size === 'large',
      })}
      {...props}
    />
  );
};
