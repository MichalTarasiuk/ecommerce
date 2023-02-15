import classNames from 'classnames';

import type {ReactNode} from 'react';

type VisuallyHiddenTag = keyof Pick<JSX.IntrinsicElements, 'div' | 'span'>;

type VisuallyHiddenProps = {
  readonly tag?: VisuallyHiddenTag;
  readonly visibleOnFocus?: boolean;
  readonly children: ReactNode;
};

export function VisuallyHidden({
  tag: Tag = 'span',
  visibleOnFocus,
  children,
}: VisuallyHiddenProps) {
  return (
    <Tag
      className={classNames('sr-only abc', {
        'focus-within:not-sr-only': visibleOnFocus,
      })}
    >
      {children}
    </Tag>
  );
}
