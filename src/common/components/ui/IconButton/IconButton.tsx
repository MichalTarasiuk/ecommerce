import classNames from 'classnames';
import {forwardRef} from 'react';

import type {ButtonHTMLAttributes, ComponentType, SVGProps} from 'react';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({icon: Icon, children, className, ...props}, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          className,
          'flex gap-2 py-1.5 px-3 border rounded border-primary',
          'focus:border-active hover:border-active',
        )}
        {...props}
      >
        <Icon />
        {children}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
