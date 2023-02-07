// @TODO - add storybook story
import classNames from 'classnames';
import {forwardRef} from 'react';

import {isObject, isString, keyIn} from '@/common/utils/utils';

import type {AnchorHTMLAttributes, ButtonHTMLAttributes} from 'react';

type Variants = typeof variants;

type AnchorTagProps = AnchorHTMLAttributes<HTMLElement>;
type ButtonTagProps = ButtonHTMLAttributes<HTMLElement>;

type CustomProps = {
  readonly variant: keyof Variants;
};
type ButtonProps = (AnchorTagProps | ButtonTagProps) & CustomProps;

const isAnchor = (props: ButtonProps): props is AnchorTagProps & CustomProps =>
  isObject(props) && keyIn(props, 'href') && isString(props.href);

const variants = {
  green: 'bg-green-500 hover:bg-green-400 text-white',
};

export const Button = forwardRef<
  HTMLInputElement | HTMLAnchorElement,
  ButtonProps
>((props) => {
  const className = classNames(
    'my-3 py-2 w-full rounded-md transition duration-100 text-sm',
    variants.green,
  );

  if (isAnchor(props)) {
    return <a className={className} {...props} />;
  }

  return <button type='button' className={className} {...props} />;
});

Button.displayName = 'Button';
