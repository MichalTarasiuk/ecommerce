import classNames from 'classnames';
import Link from 'next/link';

import {useUIHandler} from '@/app/contexts';
import {RenderIcon} from '@/common/components/components';
import {isLastIndex, isString, objectKeys} from '@/common/utils/utils';
import MenuIcon from 'public/icons/menu.svg';

import {navigationListing} from './consts';

import type {ButtonHTMLAttributes} from 'react';

type NavigationItemProps = {
  readonly title: React.FC<React.SVGProps<SVGSVGElement>> | string;
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
            {navigationListing[key].map((listed, index) => {
              return (
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
              );
            })}
            {isRightColumn && (
              <li className='lg:hidden'>
                <NavigationItem
                  type='button'
                  title={MenuIcon}
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

function NavigationItem({title, ...props}: NavigationItemProps) {
  const className =
    'hover:text-blue-500 h-full flex justify-center items-center';

  if (props.type === 'link') {
    return (
      <Link {...props} className={className}>
        {isString(title) ? title : <RenderIcon icon={title} />}{' '}
      </Link>
    );
  }

  return (
    <button className={className} {...props}>
      {isString(title) ? title : <RenderIcon icon={title} />}
    </button>
  );
}
