import classNames from 'classnames';

import type {ReactNode} from 'react';

type VisuallyHiddenTag = keyof Pick<JSX.IntrinsicElements, 'div' | 'span'>;

type VisuallyHiddenProps = {
  tag?: VisuallyHiddenTag;
  visibleOnFocus?: boolean;
  children: ReactNode;
};

export const VisuallyHidden = ({
  tag: Tag = 'span',
  visibleOnFocus,
  children,
}: VisuallyHiddenProps) => {
  return (
    <Tag
      className={classNames('sr-only', {
        'focus-within:not-sr-only': visibleOnFocus,
      })}
    >
      {children}
    </Tag>
  );
};
