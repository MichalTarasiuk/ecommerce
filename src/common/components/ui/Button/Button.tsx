import classNames from 'classnames';

import {typedForwardRef} from './helpers';

const variants = {
  green: 'bg-green-500 hover:bg-green-400 text-white',
};

export const Button = typedForwardRef((...renderParams) => {
  const className = classNames(
    'my-2 py-1.5 w-full rounded-md transition duration-100 text-sm',
    variants[renderParams[0].variant],
  );

  if (renderParams[0].type === 'link') {
    const [props, ref] = renderParams;

    // @ts-ignore
    return <a ref={ref} className={className} {...props} />;
  }

  const [props, ref] = renderParams;

  // @ts-ignore
  return <button ref={ref} className={className} {...props} />;
});

Button.displayName = 'Button';
