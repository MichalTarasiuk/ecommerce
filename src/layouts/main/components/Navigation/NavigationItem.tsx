import Link from 'next/link';

import {RenderIcon} from '@/common/components/components';
import {isString} from '@/common/utils/utils';

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
    'hover:text-blue-500 h-full flex justify-center items-center font-semibold';

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
