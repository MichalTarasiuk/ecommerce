// TODO: fix types, add story
import classNames from 'classnames';
import {forwardRef} from 'react';

import {isObject, isString, keyIn} from '@/common/utils/utils';

import type {ForwardRef} from '@/common/types/types';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardedRef,
} from 'react';

type CommonProps<Type extends string> = {
  readonly type: Type;
  readonly variant: keyof typeof variants;
};

type AnchorTagProps = AnchorHTMLAttributes<HTMLElement> & CommonProps<'link'>;
type AnchorParams = readonly [AnchorTagProps, ForwardedRef<HTMLAnchorElement>];

type ButtonTagProps = ButtonHTMLAttributes<HTMLElement> &
  CommonProps<'submit' | 'reset' | 'button'>;

type TypedForwardRefParams = Parameters<Parameters<typeof typedForwardRef>[0]>;

const typedForwardRef:
  | ForwardRef<HTMLButtonElement, ButtonTagProps>
  | ForwardRef<HTMLAnchorElement, AnchorTagProps> = forwardRef;

const isAnchor = (
  buttonParams: ReadonlyArray<unknown>,
): buttonParams is AnchorParams => {
  const props = buttonParams[0];

  return isObject(props) && keyIn(props, 'href') && isString(props.href);
};

const variants = {
  green: 'bg-green-500 hover:bg-green-400 text-white',
};

export const Button = typedForwardRef((...params: TypedForwardRefParams) => {
  const className = classNames(
    'my-3 py-2 w-full rounded-md transition duration-100 text-sm',
    variants[params[0].variant],
  );

  if (isAnchor(params)) {
    const [props, ref] = params;

    return <a ref={ref} className={className} {...props} />;
  }

  const [props, ref] = params;

  return <button ref={ref} className={className} {...props} />;
});

Button.displayName = 'Button';
