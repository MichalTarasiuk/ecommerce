import classNames from 'classnames';
import Link from 'next/link';

import {useUIHandler} from '@/app/contexts/contexts';
import {RenderIcon} from '@/common/components/components';
import {isLastIndex, isString, objectKeys} from '@/common/utils/utils';
import {ReactComponent as MenuIcon} from 'public/icons/menu.svg';

import {navigationListing} from './consts';

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

export function Navigation() {
  const setUIstate = useUIHandler();

  const openMenu = () => {
    setUIstate({isMenuOpen: true});
  };

  return (
    <nav className='flex h-20 items-center justify-between'>
      {objectKeys(navigationListing).map((key) => {
        const isLeftColumn = key === 'left';
        const isRightColumn = key === 'right';

        return (
          <ul
            key={key}
            className={classNames('flex', {
              'gap-5 hidden lg:flex h-full': isLeftColumn,
              'gap-3.5 ml-auto': isRightColumn,
            })}
          >
            {navigationListing[key].map((listed, index) => (
              <li
                key={listed.href}
                className={classNames({
                  'hidden lg:list-item':
                    isRightColumn &&
                    isLastIndex(navigationListing[key].length, index),
                })}
              >
                <NavigationItem type='link' {...listed} />
              </li>
            ))}
            {isRightColumn && (
              <li className='lg:hidden'>
                <NavigationItem
                  type='button'
                  child={MenuIcon}
                  onClick={openMenu}
                />
              </li>
            )}
          </ul>
        );
      })}
    </nav>
  );
}

function NavigationItem({child, ...props}: NavigationItemProps) {
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
