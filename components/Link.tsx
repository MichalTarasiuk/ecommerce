import NextLink from 'next/link';
import {forwardRef} from 'react';

import {useRegion} from 'lib/region/region';

import type {InferProps} from 'types/react';

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
