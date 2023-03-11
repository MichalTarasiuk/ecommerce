import Link from 'next/link';

import {RenderIcon} from 'components/components';
import {isString} from 'utils/utils';

import type {ButtonHTMLAttributes, ComponentType} from 'react';

type NavigationItemProps = {
  readonly child: ComponentType<React.SVGProps<SVGSVGElement>> | string;
} & (
  | {readonly type: 'link'; readonly href: string}
  | ({readonly type: 'button'} & Pick<
      ButtonHTMLAttributes<HTMLElement>,
      'onClick'
    >)
);

export function NavigationItem({child, ...props}: NavigationItemProps) {
  const className =
    'flex items-center justify-center h-full font-semibold hover:text-blue-500';

  if (props.type === 'link') {
    return (
      <Link {...props} className={className}>
        {isString(child) ? child : <RenderIcon icon={child} />}{' '}
      </Link>
    );
  }

  return (
    <button className={className} {...props}>
      {isString(child) ? child : <RenderIcon icon={child} />}
    </button>
  );
}
