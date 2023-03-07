import classNames from 'classnames';

import {none} from '~constants/constants';

import {Link} from '../../Link';

import {isAnchor, typedForwardRef} from './helpers';

import type {RenderParams} from './helpers';

const variants = {
  green: 'bg-green-500 hover:bg-green-400 text-white',
};

export const Button = typedForwardRef((...renderParams: RenderParams) => {
  const className = classNames(
    'w-full text-sm my-2 py-1.5 rounded-md transition duration-100',
    variants[renderParams[0].variant],
  );

  if (isAnchor(renderParams)) {
    const [props, ref] = renderParams;

    return (
      <Link
        ref={ref}
        className={classNames(className, 'inline-block text-center')}
        {...props}
      />
    );
  }

  const [props, ref] = renderParams;

  return (
    <button
      ref={ref}
      className={classNames(
        props.disabled ? className.replace(/hover:[\w-]+/g, none) : className,
        {
          'cursor-not-allowed': props.disabled,
        },
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';