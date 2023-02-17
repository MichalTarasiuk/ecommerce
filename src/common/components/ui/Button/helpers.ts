import {forwardRef} from 'react';

import type {ForwardRef, ObjectType} from '@/common/types/types';
import type {HTMLAttributes, ButtonHTMLAttributes} from 'react';

type CommonProps = {
  readonly variant: 'green';
};

type AnchorRenderParams = readonly [
  {readonly type: 'link'} & CommonProps & HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement,
];
type ButtonRenderParams = readonly [
  CommonProps &
    ObjectType.Required<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
  HTMLButtonElement,
];

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- variance error
export const typedForwardRef = forwardRef as unknown as ForwardRef<
  AnchorRenderParams | ButtonRenderParams
>;
