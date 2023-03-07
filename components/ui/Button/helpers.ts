import {forwardRef} from 'react';

import type NextLink from 'next/link';
import type {ButtonHTMLAttributes} from 'react';
import type {ForwardRef, InferProps} from '~types/types';

type CommonProps = {
  readonly variant: 'green';
};

type AnchorParams = readonly [
  {readonly type: 'link'} & CommonProps & InferProps<typeof NextLink>,
  HTMLAnchorElement,
];
type ButtonParams = readonly [
  CommonProps &
    ObjectType.Required<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
  HTMLButtonElement,
];

export type RenderParams = Parameters<Parameters<typeof typedForwardRef>[0]>;
type AnchorRenderParams = Extract<
  RenderParams,
  Extract<RenderParams, readonly [{readonly type: 'link'}, unknown]>
>;

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- variance error
export const typedForwardRef = forwardRef as unknown as ForwardRef<
  AnchorParams | ButtonParams
>;

export const isAnchor = (
  renderParams: RenderParams,
): renderParams is AnchorRenderParams => renderParams[0].type === 'link';
