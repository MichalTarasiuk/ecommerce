import classNames from 'classnames';

import {Link} from '../../Link';

import {isAnchor, typedForwardRef} from './helpers';

import type {RenderParams} from './helpers';

const variants = {
  green: 'bg-green-500 hover:bg-green-400 text-white',
};

export const Button = typedForwardRef((...renderParams: RenderParams) => {
  const className = classNames(
    'my-2 py-1.5 w-full rounded-md transition duration-100 text-sm',
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
      className={classNames(className, {
        'cursor-not-allowed': props.disabled,
      })}
      {...props}
    />
  );
});

Button.displayName = 'Button';
