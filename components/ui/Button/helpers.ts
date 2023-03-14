import {forwardRef} from 'react';

import type {buttonColors, buttonSizes} from './Button';
import type NextLink from 'next/link';
import type {ButtonHTMLAttributes} from 'react';
import type {ForwardRef, InferProps} from 'types/react';

type Props = {
  readonly common: {
    readonly color: keyof typeof buttonColors;
    readonly size: keyof typeof buttonSizes;
  };
  readonly nextLink: InferProps<typeof NextLink>;
};

type AnchorParams = readonly [
  {readonly type: 'link'} & Props['common'] & Props['nextLink'],
  HTMLAnchorElement,
];
type ButtonParams = readonly [
  Props['common'] &
    ObjectType.Required<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
  HTMLButtonElement,
];

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- variance error
export const typedForwardRef = forwardRef as unknown as ForwardRef<
  AnchorParams | ButtonParams
>;

export type RenderParams = Parameters<Parameters<typeof typedForwardRef>[0]>;

export const isAnchor = (
  renderParams: RenderParams,
): renderParams is Extract<
  RenderParams,
  Extract<RenderParams, readonly [{readonly type: 'link'}, unknown]>
> => renderParams[0].type === 'link';
