import classNames from 'classnames';

import {remvoeInteractivePseudoClasses} from 'lib/tailwindcss';

import {Link} from '../../Link';

import {isAnchor, typedForwardRef} from './helpers';

import type {RenderParams} from './helpers';

export const buttonSizes = {
  medium: 'py-1.5 text-sm',
};

export const buttonColors = {
  green: 'bg-green-500 hover:bg-green-400 text-white',
};

export const Button = typedForwardRef((...renderParams: RenderParams) => {
  const props = renderParams[0];

  const size = buttonSizes[props.size];
  const color = buttonColors[props.color];

  const className = classNames(
    'w-full my-2 rounded-md transition duration-100',
    size,
    color,
  );

  if (isAnchor(renderParams)) {
    const [anchorProps, ref] = renderParams;

    return (
      <Link
        ref={ref}
        className={classNames(className, 'inline-block text-center')}
        {...anchorProps}
      />
    );
  }

  const [buttonProps, ref] = renderParams;

  return (
    <button
      ref={ref}
      className={classNames({
        [`${remvoeInteractivePseudoClasses(className)} cursor-not-allowed`]:
          buttonProps.disabled,
        [`${className}`]: !buttonProps.disabled,
      })}
      {...buttonProps}
    />
  );
});

Button.displayName = 'Button';
