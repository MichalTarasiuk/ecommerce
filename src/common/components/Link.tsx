import NextLink from 'next/link';
import {forwardRef} from 'react';

import {useRegion} from '@/common/hooks/hooks';

import type {InferProps} from '@/common/types/types';

type LinkProps = InferProps<typeof NextLink>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const region = useRegion();

  return (
    <NextLink
      ref={ref}
      {...props}
      href={region.pathname + props.href.toString()}
    />
  );
});

Link.displayName = 'Link';
